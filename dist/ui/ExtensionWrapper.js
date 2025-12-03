import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useState } from "react";
/**
 * Create a MUI theme based off of the current OBR theme
 */
export function getTheme(obrTheme) {
    return createTheme({
        palette: {
            mode: obrTheme.mode === "LIGHT" ? "light" : "dark",
            text: obrTheme.text,
            primary: obrTheme.primary,
            secondary: obrTheme.secondary,
            background: obrTheme.background,
        },
        shape: {
            borderRadius: 16,
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: "initial",
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    input: {
                        "&:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px #222639 inset",
                        },
                        borderRadius: 16,
                        "&::-webkit-search-cancel-button": {
                            appearance: "none",
                            display: "inline-block",
                            width: "11px",
                            height: "12px",
                            marginLeft: "10px",
                            background: obrTheme.mode === "LIGHT"
                                ? "linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 43%,#000 45%,#000 55%,rgba(0,0,0,0) 57%,rgba(0,0,0,0) 100%),linear-gradient(135deg, transparent 0%,transparent 43%,#000 45%,#000 55%,transparent 57%,transparent 100%)"
                                : "linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 43%, rgb(255, 255, 255) 45%, rgb(255, 255, 255) 55%, rgba(0, 0, 0, 0) 57%, rgba(0, 0, 0, 0) 100%), linear-gradient(135deg, transparent 0%, transparent 43%, rgb(255, 255, 255) 45%, rgb(255, 255, 255) 55%, transparent 57%, transparent 100%)",
                        },
                    },
                },
            },
        },
    });
}
/**
 * Wrapper component that:
 * - Sets the MUI theme based on the OBR theme from the Zustand store
 * - Starts the store sync and waits for its initialization before rendering children.
 */
export const ExtensionWrapper = ({ children, startSyncing, useStoreFn, }) => {
    const [initialized, setInitialized] = useState(false);
    const obrTheme = useStoreFn((state) => state.theme);
    const [muiTheme, setMuiTheme] = useState(() => getTheme(obrTheme));
    useEffect(() => {
        let unsubscribe;
        let cancelled = false;
        OBR.onReady(async () => {
            if (cancelled) {
                return;
            }
            const [initialized, unsubscribeSyncing] = startSyncing();
            unsubscribe = unsubscribeSyncing;
            await initialized;
            if (!cancelled) {
                setInitialized(true);
            }
        });
        return () => {
            cancelled = true;
            unsubscribe?.();
        };
    }, [startSyncing]);
    useEffect(() => {
        setMuiTheme(getTheme(obrTheme));
    }, [obrTheme]);
    if (initialized) {
        return (_jsxs(ThemeProvider, { theme: muiTheme, children: [_jsx(CssBaseline, {}), children] }));
    }
    else {
        return null;
    }
};
//# sourceMappingURL=ExtensionWrapper.js.map