import { jsx as _jsx } from "react/jsx-runtime";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
/**
 * Create a MUI theme based off of the current OBR theme
 */
function getTheme(obrTheme) {
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
                            background: obrTheme?.mode === "LIGHT"
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
export function PluginThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => getTheme());
    useEffect(() => {
        const updateTheme = (theme) => {
            setTheme(getTheme(theme));
        };
        void OBR.theme.getTheme().then(updateTheme);
        return OBR.theme.onChange(updateTheme);
    }, []);
    return _jsx(ThemeProvider, { theme: theme, children: children });
}
//# sourceMappingURL=PluginThemeProvider.js.map