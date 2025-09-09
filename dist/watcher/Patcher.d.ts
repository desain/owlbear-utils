import type { Item } from "@owlbear-rodeo/sdk";
import type { WritableDraft } from "immer";
export declare class Patcher {
    #private;
    readonly addLocal: (...items: Item[]) => void;
    readonly deleteLocal: (...itemOrIds: (Item | string)[]) => void;
    readonly updateLocal: (itemOrId: Item | string, updater: (draft: WritableDraft<Item>) => void) => void;
    readonly addGlobal: (...items: Item[]) => void;
    readonly deleteGlobal: (...itemOrIds: (Item | string)[]) => void;
    readonly updateGlobal: (itemOrId: Item | string, updater: (draft: WritableDraft<Item>) => void) => void;
    readonly apply: () => Promise<void>;
}
//# sourceMappingURL=Patcher.d.ts.map