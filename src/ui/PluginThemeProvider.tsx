// stolen from https://github.com/owlbear-rodeo/weather/blob/main/src/menu/util/PluginThemeProvider.tsx

import type { Theme as MuiTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { Theme as ObrTheme } from "@owlbear-rodeo/sdk";
import OBRSDK from "@owlbear-rodeo/sdk";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const OBR = OBRSDK.default;

/**
 * Create a MUI theme based off of the current OBR theme
 */
function getTheme(obrTheme?: ObrTheme): MuiTheme {
    return createTheme({
        palette: obrTheme
            ? {
                  mode: obrTheme.mode === "LIGHT" ? "light" : "dark",
                  text: obrTheme.text,
                  primary: obrTheme.primary,
                  secondary: obrTheme.secondary,
                  background: obrTheme.background,
              }
            : undefined,
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
                                obrTheme?.mode === "LIGHT"
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
 * Provide a MUI theme with the same palette as the parent OBR window
 */
export function PluginThemeProvider({ children }: { children?: ReactNode }) {
    const [theme, setTheme] = useState<MuiTheme>(() => getTheme());
    useEffect(() => {
        const updateTheme = (theme: ObrTheme) => {
            setTheme(getTheme(theme));
        };
        void OBR.theme.getTheme().then(updateTheme);
        return OBR.theme.onChange(updateTheme);
    }, []);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
