import type { Item } from "@owlbear-rodeo/sdk";
export type ItemMap<ItemType extends Item = Item> = Map<ItemType["id"], ItemType>;
export declare function toItemMap<ItemType extends Item = Item>(items: readonly ItemType[]): ItemMap<ItemType>;
export declare function getAllAttachments<ItemType extends Item>(items: ItemMap<ItemType>, root: Readonly<ItemType>): ItemType[];
export interface ItemDiff<ItemType extends Item = Item> {
    readonly createdItems: ReadonlySet<ItemType>;
    readonly deletedItems: ReadonlySet<ItemType["id"]>;
    readonly updatedItems: readonly ItemType[];
}
export declare function diffItems<ItemType extends Item = Item>(oldItems: ItemMap<ItemType>, newItems: ItemMap<ItemType>): ItemDiff<ItemType>;
//# sourceMappingURL=ItemMap.d.ts.map