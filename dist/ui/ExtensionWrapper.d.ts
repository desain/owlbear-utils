import type { Theme as MuiTheme } from "@mui/material/styles";
import type { Theme as ObrTheme } from "@owlbear-rodeo/sdk";
import type React from "react";
type StartSyncing = () => [
    initialized: Promise<void>,
    unsubscribe: VoidFunction
];
interface Store {
    readonly theme: ObrTheme;
}
type UseStoreFn = <T>(f: (store: Store) => T) => T;
interface ExtensionWrapperProps {
    children: React.ReactNode;
    startSyncing: StartSyncing;
    useStoreFn: UseStoreFn;
}
/**
 * Create a MUI theme based off of the current OBR theme
 */
export declare function getTheme(obrTheme: ObrTheme): MuiTheme;
export declare const ExtensionWrapper: React.FC<ExtensionWrapperProps>;
export {};
//# sourceMappingURL=ExtensionWrapper.d.ts.map