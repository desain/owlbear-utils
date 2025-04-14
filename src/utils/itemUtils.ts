import { Item } from "@owlbear-rodeo/sdk";

export function getId(item: Item): string {
    return item.id;
}

export function hasId(id: string): (item: Item) => boolean {
    return (item: Item) => getId(item) === id;
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
    metadata: {
        [Property in Key]: M;
    };
}
