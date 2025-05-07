import OBR from "@owlbear-rodeo/sdk";

export {
    createLocalInteraction,
    wrapRealInteraction,
} from "./AbstractInteraction.js";
export type { AbstractInteraction } from "./AbstractInteraction.js";
export { Control } from "./ui/Control.js";
export { PluginGate } from "./ui/PluginGate.js";
export { PluginThemeProvider } from "./ui/PluginThemeProvider.js";
export { useActionResizer } from "./ui/useActionResizer.js";
export { startRehydrating, useRehydrate } from "./ui/useRehydrate.js";
export { useUndoRedoHandler } from "./ui/useUndoRedoHandler.js";
export * from "./utils/GridParsed.js";
export * from "./utils/itemUtils.js";
export * from "./utils/jsUtils.js";
export * from "./utils/mathUtils.js";
export * from "./utils/obrTypeUtils.js";

export function complain(message: string) {
    console.error(message);
    void OBR.notification.show(message, "ERROR");
}
