import { getOrInsert } from "./utils/jsUtils.js";
export function toItemMap(items) {
    return new Map(items.map((item) => [item.id, item]));
}
export function getAllAttachments(items, root) {
    const children = new Map();
    for (const item of items.values()) {
        if (item.attachedTo) {
            getOrInsert(children, item.attachedTo, () => []).push(item);
        }
    }
    const visited = new Set();
    function childrenOf(item) {
        // skip children already seen through another path
        if (visited.has(item.id)) {
            return [];
        }
        visited.add(item.id);
        return (children.get(item.id) ?? [])
            .filter((child) => !visited.has(child.id))
            .map((child) => [child, ...childrenOf(child)])
            .flat();
    }
    return childrenOf(root);
}
export function diffItems(oldItems, newItems) {
    const deletedItems = new Set(oldItems.keys());
    const createdItems = new Set(newItems.values());
    const updatedItems = [];
    for (const oldItem of oldItems.values()) {
        if (newItems.has(oldItem.id)) {
            deletedItems.delete(oldItem.id);
        }
    }
    for (const newItem of newItems.values()) {
        const oldItem = oldItems.get(newItem.id);
        if (oldItem) {
            createdItems.delete(newItem);
            if (oldItem.lastModified < newItem.lastModified) {
                updatedItems.push(newItem);
            }
        }
    }
    return { createdItems, updatedItems, deletedItems };
}
//# sourceMappingURL=ItemMap.js.map