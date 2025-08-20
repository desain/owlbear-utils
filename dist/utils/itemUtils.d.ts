import type { Image, Item } from "@owlbear-rodeo/sdk";
export declare function getName(item: Image | Item): string;
export declare function getId(item: Pick<Item, 'id'>): Item['id'];
export declare function hasId(id: string): (item: Pick<Item, 'id'>) => boolean;
export declare function assertItem<T extends Item>(item: Item, f: (item: Item) => item is T): asserts item is T;
export interface HasParameterizedMetadata<Key extends string, M> {
    metadata: Record<Key, M>;
}
//# sourceMappingURL=itemUtils.d.ts.map