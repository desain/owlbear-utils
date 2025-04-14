import OBR from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
export function useActionResizer(baseHeight, maxHeight, tabContainer) {
    useEffect(() => {
        if (!tabContainer.current) {
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
        observer.observe(tabContainer.current);
        return () => {
            observer.disconnect();
            void OBR.action.setHeight(baseHeight);
        };
    }, [tabContainer]);
}
//# sourceMappingURL=useActionResizer.js.map