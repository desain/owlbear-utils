import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useState } from "react";

export function useActionResizer(
    minHeight: number,
    maxHeight: number,
) {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    useEffect(() => {
        if (!container) {
            return;
        }

        const observer = new ResizeObserver(async (entries) => {
            if (entries.length === 0) {
                return;
            }
            const box = entries[0]?.borderBoxSize?.[0];

            if (!box) {
                return;
            }

            const height = Math.min(
                maxHeight,
                Math.max(minHeight, box.blockSize),
            );

            await OBR.action.setHeight(height);
        });

        observer.observe(container.current);
        return () => {
            observer.disconnect();
            void OBR.action.setHeight(minHeight);
        };
    }, [container, minHeight, maxHeight]);

    return setContainer;
}
