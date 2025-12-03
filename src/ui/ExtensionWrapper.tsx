import { CssBaseline } from "@mui/material";
import type { Theme as MuiTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { Theme as ObrTheme } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import type React from "react";
import { useEffect, useState } from "react";

type StartSyncing = () => [
    initialized: Promise<void>,
    unsubscribe: VoidFunction,
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
export function getTheme(obrTheme: ObrTheme): MuiTheme {
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
                            background:
                                obrTheme.mode === "LIGHT"
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
export const ExtensionWrapper: React.FC<ExtensionWrapperProps> = ({
    children,
    startSyncing,
    useStoreFn,
}) => {
    const [initialized, setInitialized] = useState(false);
    const obrTheme = useStoreFn((state) => state.theme);
    const [muiTheme, setMuiTheme] = useState<MuiTheme>(() =>
        getTheme(obrTheme),
    );

    useEffect(() => {
        let unsubscribe: VoidFunction | undefined;
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
        return (
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        );
    } else {
        return null;
    }
};
