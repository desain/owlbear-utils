import { type FormControlProps } from "@mui/material";
import { type HexColor } from "../utils/colorUtils.js";
interface ColorInputBaseProps {
    value: HexColor;
    onChange: (value: HexColor) => void;
}
export declare const ColorInput: React.FC<ColorInputBaseProps & Omit<FormControlProps, "onChange">>;
export {};
//# sourceMappingURL=ColorInput.d.ts.map