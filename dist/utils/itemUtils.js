import { isImage } from "@owlbear-rodeo/sdk";
export function getName(item) {
    if (isImage(item) && item.text.plainText) {
        return item.text.plainText;
    }
    return item.name;
}
export function getId(item) {
    return item.id;
}
export function hasId(id) {
    return (item) => getId(item) === id;
}
export function assertItem(item, f) {
    if (!f(item)) {
        throw new Error(`Expected item to be of type ${f.name}`);
    }
}
export function verifyAttached(item) {
    if (!item.attachedTo) {
        throw Error("item is not attached: " + item.id);
    }
    return item;
}
//# sourceMappingURL=itemUtils.js.map