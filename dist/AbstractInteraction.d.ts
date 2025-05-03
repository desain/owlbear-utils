import type { Item } from "@owlbear-rodeo/sdk";
import type { Draft } from "immer";
import type { ItemApi } from "./utils/obrTypeUtils";
/**
 * Type that abstracts over a network interaction or a local item interaction
 */
export interface AbstractInteraction<Items> {
    update: (updater: (value: Draft<Items>) => void) => Promise<Items>;
    keepAndStop: (toReAdd: readonly Item[]) => Promise<void>;
    itemApi: ItemApi;
}
export declare function wrapRealInteraction<Items extends Item[]>(...items: Readonly<Items>): Promise<AbstractInteraction<Items>>;
export declare function createLocalInteraction<Items extends Item[]>(...items: Readonly<Items>): Promise<AbstractInteraction<Items>>;
//# sourceMappingURL=AbstractInteraction.d.ts.map