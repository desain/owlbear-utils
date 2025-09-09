import OBR from "@owlbear-rodeo/sdk";

// Abstract Interaction
export {
    createLocalInteraction,
    wrapRealInteraction,
} from "./AbstractInteraction.js";
export type { AbstractInteraction } from "./AbstractInteraction.js";

// ObrAsyncFunction
export {
    compileObrFunction,
    executeObrFunction,
    compileObrAsyncFunction,
    executeObrAsyncFunction,
} from "./ObrFunction.js";
export type { ObrFunction, ObrAsyncFunction } from "./ObrFunction.js";

// Number utils
export * from "./utils/numberUtils.js";

// Color utils
export type { RgbColor, HexColor } from "./utils/colorUtils.js";
export { isHexColor, assumeHexColor, hexToRgb, rgbToHex, WHITE_HEX, PINK_RGB, WHITE_RGB, RED_RGB, YELLOW_RGB } from "./utils/colorUtils.js"

// UI
export { Control } from "./ui/Control.js";
export { ExtensionWrapper } from "./ui/ExtensionWrapper.js";
export { useActionResizer } from "./ui/useActionResizer.js";
export { startRehydrating, useRehydrate } from "./ui/useRehydrate.js";
export { useUndoRedoHandler } from "./ui/useUndoRedoHandler.js";

// Debug stuff
export { debugPoints, debugLineString, debugCurve } from "./utils/debug.js";

// Misc utils
export * from "./utils/GridParsed.js";
export * from "./utils/itemUtils.js";
export * from "./utils/jsUtils.js";
export * from "./utils/mathUtils.js";
export * from "./utils/obrTypeUtils.js";
export * from "./ItemMap.js";
export * from "./watcher/Watcher.js";
export * from "./watcher/Patcher.js";

export function complain(message: string) {
    console.error(message);
    void OBR.notification.show(message, "ERROR");
}
