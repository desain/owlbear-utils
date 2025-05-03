// Stolen from https://github.com/owlbear-rodeo/weather/blob/main/src/menu/util/PluginGate.tsx

import OBR from "@owlbear-rodeo/sdk";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

/**
 * Only render the children when we're within a plugin
 * and that plugin is ready.
 */
export function PluginGate({ children }: { children: ReactNode }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (OBR.isAvailable) {
            OBR.onReady(() => setReady(true));
        }
    }, []);

    if (ready) {
        return <>{children}</>;
    } else {
        return null;
    }
}
