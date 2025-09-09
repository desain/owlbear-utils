var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Watcher_patcher, _Watcher_watcherCtors, _Watcher_watchers;
import { Patcher } from "./Patcher.js";
export class Watcher {
    constructor() {
        _Watcher_patcher.set(this, new Patcher());
        _Watcher_watcherCtors.set(this, new Set());
        _Watcher_watchers.set(this, new Map());
        Object.defineProperty(this, "addWatcher", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (ctor) => {
                __classPrivateFieldGet(this, _Watcher_watcherCtors, "f").add(ctor);
            }
        });
        Object.defineProperty(this, "handleMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (message) => {
                for (const watcher of [...__classPrivateFieldGet(this, _Watcher_watchers, "f").values()].flat()) {
                    watcher.handleMessage?.(message, __classPrivateFieldGet(this, _Watcher_patcher, "f"));
                }
                return __classPrivateFieldGet(this, _Watcher_patcher, "f").apply();
            }
        });
        // clear = () => {
        //     this.#watcherCtors.clear();
        //     this.#watchers.clear();
        // };
        Object.defineProperty(this, "handleGlobalItemsUpdate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ({ createdItems, updatedItems, deletedItems, }) => {
                for (const deletedItem of deletedItems) {
                    __classPrivateFieldGet(this, _Watcher_watchers, "f")
                        .get(deletedItem)
                        ?.forEach((watcher) => watcher.handleItemDelete(__classPrivateFieldGet(this, _Watcher_patcher, "f")));
                    __classPrivateFieldGet(this, _Watcher_watchers, "f").delete(deletedItem);
                }
                for (const createdItem of createdItems) {
                    const watchers = [...__classPrivateFieldGet(this, _Watcher_watcherCtors, "f")]
                        .filter((ctor) => ctor.isTarget(createdItem))
                        .map((ctor) => new ctor(createdItem, __classPrivateFieldGet(this, _Watcher_patcher, "f")));
                    __classPrivateFieldGet(this, _Watcher_watchers, "f").set(createdItem.id, watchers);
                }
                for (const updatedItem of updatedItems) {
                    __classPrivateFieldGet(this, _Watcher_watchers, "f")
                        .get(updatedItem.id)
                        ?.forEach((watcher) => watcher.handleItemUpdate(updatedItem, __classPrivateFieldGet(this, _Watcher_patcher, "f")));
                }
                return __classPrivateFieldGet(this, _Watcher_patcher, "f").apply();
            }
        });
    }
}
_Watcher_patcher = new WeakMap(), _Watcher_watcherCtors = new WeakMap(), _Watcher_watchers = new WeakMap();
//# sourceMappingURL=Watcher.js.map