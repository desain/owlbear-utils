import { type Item } from "@owlbear-rodeo/sdk";
import type { ItemDiff } from "../ItemMap.js";
import { Patcher } from "./Patcher.js";
interface ItemWatcherCtor<GlobalItemType extends Item = Item> {
    isTarget: (item: Item) => item is GlobalItemType;
    new (globalItem: GlobalItemType, patcher: Patcher): ItemWatcher<GlobalItemType>;
}
export interface ItemWatcher<GlobalItemType extends Item = Item> {
    handleItemUpdate: (globalItem: GlobalItemType, patcher: Patcher) => void;
    handleItemDelete: (patcher: Patcher) => void;
    handleMessage?: (message: unknown, patcher: Patcher) => void;
}
export declare class Watcher {
    #private;
    addWatcher: <GlobalItemType extends Item = Item>(ctor: ItemWatcherCtor<GlobalItemType>) => void;
    handleMessage: (message: unknown) => Promise<void>;
    handleGlobalItemsUpdate: ({ createdItems, updatedItems, deletedItems, }: ItemDiff) => Promise<void>;
}
export {};
//# sourceMappingURL=Watcher.d.ts.map