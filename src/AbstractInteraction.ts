import type { Item } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import type { Draft } from "immer";
import { ItemApi } from "./utils/obrTypeUtils";

/**
 * Type that abstracts over a network interaction or a local item interaction
 */
export interface AbstractInteraction<Items> {
    update: (updater: (value: Draft<Items>) => void) => Promise<Items>;
    keepAndStop: (toReAdd: readonly Item[]) => Promise<void>;
    itemApi: ItemApi;
}

export async function wrapRealInteraction<Items extends Item[]>(
    ...items: Readonly<Items>
): Promise<AbstractInteraction<Items>> {
    const [update, stop] = await OBR.interaction.startItemInteraction<Items>(
        items,
    );
    return {
        update: (updater: (items: Draft<Items>) => void) => {
            const newItems: Items = update(updater);
            return Promise.resolve(newItems);
        },
        keepAndStop: async (items: readonly Item[]) => {
            await OBR.scene.items.addItems(items as Item[]); // SAFETY: OBR.scene.items.addItems does not mutate the argument, so casting to mutable is fine
            stop();
        },
        itemApi: OBR.scene.items,
    };
}

export async function createLocalInteraction<Items extends Item[]>(
    ...items: Readonly<Items>
): Promise<AbstractInteraction<Items>> {
    const ids = items.map((item) => item.id);
    const existingIds = (await OBR.scene.local.getItems(ids)).map(
        (item) => item.id,
    );
    const newItems = items.filter((item) => !existingIds.includes(item.id));
    await OBR.scene.local.addItems(newItems);
    return {
        update: async (updater: (items: Draft<Items>) => void) => {
            await OBR.scene.local.updateItems(
                ids,
                (items) => updater(items as Draft<Items>), // SAFETY: items to update will always be the interaction items
            );
            return OBR.scene.local.getItems(ids) as unknown as Promise<Items>; // SAFETY: retrieved items will always be the interaction items
        },
        keepAndStop: async (items: readonly Item[]) => {
            const idsToKeep = items.map((item) => item.id);
            const toDelete = newItems
                .map((item) => item.id)
                .filter((id) => !idsToKeep.includes(id));
            await OBR.scene.local.deleteItems(toDelete);
        },
        itemApi: OBR.scene.local,
    };
}
