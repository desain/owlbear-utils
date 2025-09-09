var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Patcher_newLocals, _Patcher_toDeleteLocals, _Patcher_localUpdates, _Patcher_newItems, _Patcher_toDeleteItems, _Patcher_itemUpdates;
import OBR from "@owlbear-rodeo/sdk";
export class Patcher {
    constructor() {
        _Patcher_newLocals.set(this, []);
        _Patcher_toDeleteLocals.set(this, []);
        _Patcher_localUpdates.set(this, new Map());
        _Patcher_newItems.set(this, []);
        _Patcher_toDeleteItems.set(this, []);
        _Patcher_itemUpdates.set(this, new Map());
        Object.defineProperty(this, "addLocal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...items) => {
                __classPrivateFieldGet(this, _Patcher_newLocals, "f").push(...items);
            }
        });
        Object.defineProperty(this, "deleteLocal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...itemOrIds) => {
                __classPrivateFieldGet(this, _Patcher_toDeleteLocals, "f").push(...itemOrIds.map((itemOrId) => typeof itemOrId === "string" ? itemOrId : itemOrId.id));
            }
        });
        Object.defineProperty(this, "updateLocal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (itemOrId, updater) => {
                const id = typeof itemOrId === "string" ? itemOrId : itemOrId.id;
                const updaters = __classPrivateFieldGet(this, _Patcher_localUpdates, "f").get(id) ?? [];
                updaters.push(updater);
                __classPrivateFieldGet(this, _Patcher_localUpdates, "f").set(id, updaters);
            }
        });
        Object.defineProperty(this, "addGlobal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...items) => {
                __classPrivateFieldGet(this, _Patcher_newItems, "f").push(...items);
            }
        });
        Object.defineProperty(this, "deleteGlobal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...itemOrIds) => {
                __classPrivateFieldGet(this, _Patcher_toDeleteItems, "f").push(...itemOrIds.map((itemOrId) => typeof itemOrId === "string" ? itemOrId : itemOrId.id));
            }
        });
        Object.defineProperty(this, "updateGlobal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (itemOrId, updater) => {
                const id = typeof itemOrId === "string" ? itemOrId : itemOrId.id;
                const updaters = __classPrivateFieldGet(this, _Patcher_itemUpdates, "f").get(id) ?? [];
                updaters.push(updater);
                __classPrivateFieldGet(this, _Patcher_itemUpdates, "f").set(id, updaters);
            }
        });
        Object.defineProperty(this, "apply", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                // TODO need to copy fields to locals and clear them before calling APIs?
                // race condition where this function yields, then a new eg new local comes in
                // then the API is called with the old list, then the new item is lost when
                // the list is cleared?
                // Handle local items
                if (__classPrivateFieldGet(this, _Patcher_newLocals, "f").length > 0) {
                    await OBR.scene.local.addItems(__classPrivateFieldGet(this, _Patcher_newLocals, "f"));
                    __classPrivateFieldSet(this, _Patcher_newLocals, [], "f");
                }
                if (__classPrivateFieldGet(this, _Patcher_toDeleteLocals, "f").length > 0) {
                    await OBR.scene.local.deleteItems(__classPrivateFieldGet(this, _Patcher_toDeleteLocals, "f"));
                    __classPrivateFieldSet(this, _Patcher_toDeleteLocals, [], "f");
                }
                if (__classPrivateFieldGet(this, _Patcher_localUpdates, "f").size > 0) {
                    await OBR.scene.local.updateItems(() => true, (items) => items.forEach((item) => {
                        const updaters = __classPrivateFieldGet(this, _Patcher_localUpdates, "f").get(item.id) ?? [];
                        for (const updater of updaters) {
                            updater(item);
                        }
                    }));
                    __classPrivateFieldGet(this, _Patcher_localUpdates, "f").clear();
                }
                // Handle regular scene items
                if (__classPrivateFieldGet(this, _Patcher_newItems, "f").length > 0) {
                    await OBR.scene.items.addItems(__classPrivateFieldGet(this, _Patcher_newItems, "f"));
                    __classPrivateFieldSet(this, _Patcher_newItems, [], "f");
                }
                if (__classPrivateFieldGet(this, _Patcher_toDeleteItems, "f").length > 0) {
                    await OBR.scene.items.deleteItems(__classPrivateFieldGet(this, _Patcher_toDeleteItems, "f"));
                    __classPrivateFieldSet(this, _Patcher_toDeleteItems, [], "f");
                }
                if (__classPrivateFieldGet(this, _Patcher_itemUpdates, "f").size > 0) {
                    const itemIds = Array.from(__classPrivateFieldGet(this, _Patcher_itemUpdates, "f").keys());
                    await OBR.scene.items.updateItems(itemIds, (items) => items.forEach((item) => {
                        const updaters = __classPrivateFieldGet(this, _Patcher_itemUpdates, "f").get(item.id) ?? [];
                        for (const updater of updaters) {
                            updater(item);
                        }
                    }));
                    __classPrivateFieldGet(this, _Patcher_itemUpdates, "f").clear();
                }
            }
        });
    }
}
_Patcher_newLocals = new WeakMap(), _Patcher_toDeleteLocals = new WeakMap(), _Patcher_localUpdates = new WeakMap(), _Patcher_newItems = new WeakMap(), _Patcher_toDeleteItems = new WeakMap(), _Patcher_itemUpdates = new WeakMap();
//# sourceMappingURL=Patcher.js.map