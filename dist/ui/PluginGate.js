import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
// Stolen from https://github.com/owlbear-rodeo/weather/blob/main/src/menu/util/PluginGate.tsx
import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useState } from "react";
/**
 * Only render the children when we're within a plugin
 * and that plugin is ready.
 */
export function PluginGate({ children }) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (OBR.isAvailable) {
            OBR.onReady(() => setReady(true));
        }
    }, []);
    if (ready) {
        return _jsx(_Fragment, { children: children });
    }
    else {
        return null;
    }
}
//# sourceMappingURL=PluginGate.js.map