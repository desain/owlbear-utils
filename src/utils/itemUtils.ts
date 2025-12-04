import type { Image, Item } from "@owlbear-rodeo/sdk";
import { isImage } from "@owlbear-rodeo/sdk";

export function getName(item: Image | Item): string {
    if (isImage(item) && item.text.plainText) {
        return item.text.plainText;
    }
    return item.name;
}

export function getId(item: Pick<Item, 'id'>): Item['id'] {
    return item.id;
}

export function hasId(id: string): (item: Pick<Item, 'id'>) => boolean {
    return (item: Pick<Item, 'id'>) => getId(item) === id;
}

export function assertItem<T extends Item>(
    item: Item,
    f: (item: Item) => item is T,
): asserts item is T {
    if (!f(item)) {
        throw new Error(`Expected item to be of type ${f.name}`);
    }
}

export interface HasParameterizedMetadata<Key extends string, M> {
    metadata: Record<Key, M>;
}

export type AttachedItem<I extends Item> = I & {
    attachedTo: NonNullable<I["attachedTo"]>;
};

export function verifyAttached<I extends Item>(item: I): AttachedItem<I> {
    if (!item.attachedTo) {
        throw Error("item is not attached: " + item.id);
    }
    return item as AttachedItem<I>;
}
