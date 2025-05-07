import OBRSDK from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
const OBR = OBRSDK.default;
/**
 * When a common key is pressed ensure the action is performed in OBR
 * This is done because the OBR window might not have focus so the
 * key won't be triggered
 * Adapted from https://github.com/owlbear-rodeo/outliner/blob/main/src/Outliner.tsx#L42
 */
export function useUndoRedoHandler() {
    useEffect(() => {
        async function handleKeyDown(e) {
            if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey) {
                    await OBR.scene.history.redo();
                }
                else {
                    await OBR.scene.history.undo();
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
}
//# sourceMappingURL=useUndoRedoHandler.js.map