import OBR from "@owlbear-rodeo/sdk";
import { isOwlbearError } from "./utils/obrTypeUtils.js";
export * from "./AbstractInteraction.js";
export * from "./defaults.js";
export * from "./ItemMap.js";
export * from "./ObrFunction.js";
export * from "./ui/ColorInput.js";
export * from "./ui/Control.js";
export * from "./ui/ExtensionWrapper.js";
export * from "./ui/useActionResizer.js";
export * from "./ui/usePopoverResizer.js";
export * from "./ui/useRehydrate.js";
export * from "./ui/useUndoRedoHandler.js";
export * from "./utils/bezierUtils.js";
export * from "./utils/colorUtils.js";
export * from "./utils/debug.js";
export * from "./utils/getBounds.js";
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
export function complain(e) {
    const message = typeof e === "string"
        ? e
        : e instanceof Error
            ? e.message
            : isOwlbearError(e)
                ? e.error.message
                : String(e);
    console.error(message);
    void OBR.notification.show(message, "ERROR");
}
//# sourceMappingURL=index.js.map