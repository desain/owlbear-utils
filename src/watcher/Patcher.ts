import type { Item } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import { backOff, type BackoffOptions } from "exponential-backoff";
import type { WritableDraft } from "immer";
import { isOwlbearError } from "../utils/obrTypeUtils.js";

const BACKOFF_OPTIONS: BackoffOptions = {
    jitter: "full",
    startingDelay: 1000,
    retry: (e) => {
        if (isOwlbearError(e) && e.error.name === "RateLimitHit") {
            console.warn("Rate limit hit, backing off...");
            return true;
        } else {
            // console.error("not an owlbear error", e);
            return false;
        }
    },
};

export class Patcher {
    #newLocals: Item[] = [];
    #toDeleteLocals: Item["id"][] = [];
    readonly #localUpdates = new Map<
        Item["id"],
        ((draft: WritableDraft<Item>) => void)[]
    >();

    #newItems: Item[] = [];
    #toDeleteItems: Item["id"][] = [];
    readonly #itemUpdates = new Map<
        Item["id"],
        ((draft: WritableDraft<Item>) => void)[]
    >();

    readonly addLocal = (...items: Item[]) => {
        this.#newLocals.push(...items);
    };

    readonly deleteLocal = (...itemOrIds: (Item | string)[]) => {
        this.#toDeleteLocals.push(
            ...itemOrIds.map((itemOrId) =>
                typeof itemOrId === "string" ? itemOrId : itemOrId.id,
            ),
        );
    };

    readonly updateLocal = (
        itemOrId: Item | string,
        updater: (draft: WritableDraft<Item>) => void,
    ) => {
        const id = typeof itemOrId === "string" ? itemOrId : itemOrId.id;
        const updaters = this.#localUpdates.get(id) ?? [];
        updaters.push(updater);
        this.#localUpdates.set(id, updaters);
    };

    readonly addGlobal = (...items: Item[]) => {
        this.#newItems.push(...items);
    };

    readonly deleteGlobal = (...itemOrIds: (Item | string)[]) => {
        this.#toDeleteItems.push(
            ...itemOrIds.map((itemOrId) =>
                typeof itemOrId === "string" ? itemOrId : itemOrId.id,
            ),
        );
    };

    readonly updateGlobal = (
        itemOrId: Item | string,
        updater: (draft: WritableDraft<Item>) => void,
    ) => {
        const id = typeof itemOrId === "string" ? itemOrId : itemOrId.id;
        const updaters = this.#itemUpdates.get(id) ?? [];
        updaters.push(updater);
        this.#itemUpdates.set(id, updaters);
    };

    readonly apply = async () => {
        // TODO need to copy fields to locals and clear them before calling APIs?
        // race condition where this function yields, then a new eg new local comes in
        // then the API is called with the old list, then the new item is lost when
        // the list is cleared?

        // Handle local items
        if (this.#newLocals.length > 0) {
            await backOff(
                () => OBR.scene.local.addItems(this.#newLocals),
                BACKOFF_OPTIONS,
            );
            this.#newLocals = [];
        }

        if (this.#toDeleteLocals.length > 0) {
            await backOff(
                () => OBR.scene.local.deleteItems(this.#toDeleteLocals),
                BACKOFF_OPTIONS,
            );
            this.#toDeleteLocals = [];
        }

        if (this.#localUpdates.size > 0) {
            await backOff(
                () =>
                    OBR.scene.local.updateItems(
                        [...this.#localUpdates.keys()],
                        (items) =>
                            items.forEach((item) => {
                                const updaters =
                                    this.#localUpdates.get(item.id) ?? [];
                                for (const updater of updaters) {
                                    updater(item);
                                }
                            }),
                    ),
                BACKOFF_OPTIONS,
            );
            this.#localUpdates.clear();
        }

        // Handle regular scene items
        if (this.#newItems.length > 0) {
            await backOff(
                () => OBR.scene.items.addItems(this.#newItems),
                BACKOFF_OPTIONS,
            );
            this.#newItems = [];
        }

        if (this.#toDeleteItems.length > 0) {
            await backOff(
                () => OBR.scene.items.deleteItems(this.#toDeleteItems),
                BACKOFF_OPTIONS,
            );
            this.#toDeleteItems = [];
        }

        if (this.#itemUpdates.size > 0) {
            await backOff(
                () =>
                    OBR.scene.items.updateItems(
                        [...this.#itemUpdates.keys()],
                        (items) =>
                            items.forEach((item) => {
                                const updaters =
                                    this.#itemUpdates.get(item.id) ?? [];
                                for (const updater of updaters) {
                                    updater(item);
                                }
                            }),
                    ),
                BACKOFF_OPTIONS,
            );
            this.#itemUpdates.clear();
        }
    };
}
