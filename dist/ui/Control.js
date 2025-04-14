import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const SmallLabel = styled(FormLabel)({
    fontSize: "0.75rem",
    marginBottom: 4,
});
export function Control({ label, children, ...props }) {
    return (_jsxs(FormControl, { ...props, children: [_jsx(SmallLabel, { children: label }), children] }));
}
//# sourceMappingURL=Control.js.map