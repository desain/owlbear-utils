import OBR from "@owlbear-rodeo/sdk";
import { isOwlbearError } from "./utils/obrTypeUtils.js";

// Abstract Interaction
export {
    createLocalInteraction,
    wrapRealInteraction,
} from "./AbstractInteraction.js";
export type { AbstractInteraction } from "./AbstractInteraction.js";

// ObrAsyncFunction
export {
    compileObrAsyncFunction,
    compileObrFunction,
    executeObrAsyncFunction,
    executeObrFunction,
} from "./ObrFunction.js";
export type { ObrAsyncFunction, ObrFunction } from "./ObrFunction.js";

// UI
export { Control } from "./ui/Control.js";
export { ExtensionWrapper, getTheme } from "./ui/ExtensionWrapper.js";
export * from "./ui/useActionResizer.js";
export * from "./ui/usePopoverResizer.js";

export { startRehydrating, useRehydrate } from "./ui/useRehydrate.js";
export { useUndoRedoHandler } from "./ui/useUndoRedoHandler.js";

// Misc utils
export * from "./defaults.js";
export * from "./ItemMap.js";
export * from "./utils/bezierUtils.js";
export * from "./utils/colorUtils.js";
export * from "./utils/debug.js";
export * from "./utils/getWorldPoints.js";
export * from "./utils/GridParsed.js";
export * from "./utils/gridUtils.js";
export * from "./utils/itemUtils.js";
export * from "./utils/jsUtils.js";
export * from "./utils/mathUtils.js";
export * from "./utils/numberUtils.js";
export * from "./utils/obrTypeUtils.js";
export * from "./utils/sceneUtils.js";
export * from "./watcher/Patcher.js";
export * from "./watcher/Watcher.js";

export function complain(e: unknown) {
    const message =
        typeof e === "string"
            ? e
            : e instanceof Error
            ? e.message
            : isOwlbearError(e)
            ? e.error.message
            : String(e);
    console.error(message);
    void OBR.notification.show(message, "ERROR");
}
