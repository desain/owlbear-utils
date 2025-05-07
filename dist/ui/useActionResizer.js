import OBRSDK from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
const OBR = OBRSDK.default;
export function useActionResizer(baseHeight, maxHeight, container) {
    useEffect(() => {
        if (!container.current) {
            return;
        }
        const observer = new ResizeObserver(async (entries) => {
            if (entries.length === 0) {
                return;
            }
            const entry = entries[0];
            if (!entry.borderBoxSize) {
                return;
            }
            const height = Math.min(maxHeight, baseHeight + entry.borderBoxSize[0].blockSize);
            await OBR.action.setHeight(height);
        });
        observer.observe(container.current);
        return () => {
            observer.disconnect();
            void OBR.action.setHeight(baseHeight);
        };
    }, [container, baseHeight, maxHeight]);
}
//# sourceMappingURL=useActionResizer.js.map