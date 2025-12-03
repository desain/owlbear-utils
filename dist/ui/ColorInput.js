import { jsx as _jsx } from "react/jsx-runtime";
import { FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { assumeHexColor } from "../utils/colorUtils.js";
import { Control } from "./Control.js";
const UPDATE_DELAY_MS = 100;
const ColorInputBase = ({ value, onChange }) => {
    // value to display - updates as fast as the user moves their cursor
    const [displayValue, setDisplayValue] = useState(value);
    useEffect(() => {
        setDisplayValue(value);
    }, [value]);
    // Ughhhhhh
    // React breaks the dom 'onchange' event, which is the behavior I want.
    // React makes it behave the same as 'oninput', which fires constantly while the user is using the selector.
    // That breaks OBR since it creates too many API calls.
    // So work around that by debouncing the input, so it at least doesn't fire all the time
    useEffect(() => {
        const handler = setTimeout(() => {
            if (displayValue !== value) {
                onChange(displayValue);
            }
        }, UPDATE_DELAY_MS);
        return () => clearTimeout(handler); // Clear timeout if color changes within the delay
    }, [value, displayValue, onChange]);
    return (_jsx(FormLabel, { className: "color-label", sx: {
            background: displayValue,
            display: "block",
            boxSizing: "border-box",
            width: "30px",
            height: "30px",
            margin: "5px",
            borderRadius: "15px",
            cursor: "pointer",
            "&:hover": {
                transform: "scale(1.15)",
                // transition: "transform 0.1s", // Safari flashes other elements while the animation is playing
            },
        }, children: _jsx("input", { type: "color", value: displayValue, style: {
                // browsers don't accept styling this element very well, so just hide it and style the label
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                cursor: "pointer",
            }, onChange: (e) => {
                setDisplayValue(assumeHexColor(e.currentTarget.value));
            } }) }));
};
export const ColorInput = ({ value, onChange, title, ...props }) => (_jsx(Control, { ...props, sx: { alignItems: "center" }, label: title ?? "Color", children: _jsx(ColorInputBase, { value: value, onChange: onChange }) }));
//# sourceMappingURL=ColorInput.js.map