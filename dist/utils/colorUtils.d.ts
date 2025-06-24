import type { Vector3 } from "@owlbear-rodeo/sdk/lib/types/Vector3.js";
declare const HEX_COLOR: unique symbol;
export type HexColor = string & {
    readonly [HEX_COLOR]: unique symbol;
};
declare const RGB_COLOR: unique symbol;
export type RgbColor = Vector3 & {
    readonly [RGB_COLOR]: unique symbol;
};
export declare function isHexColor(color: string): color is HexColor;
export declare function assumeHexColor(color: string): HexColor;
export declare function hexToRgb(hex: string): RgbColor | null;
export declare function rgbToHex({ x, y, z }: RgbColor): HexColor;
export declare const WHITE_HEX: HexColor;
export declare const BLACK_HEX: HexColor;
export declare const PINK_RGB: RgbColor;
export declare const WHITE_RGB: RgbColor;
export declare const RED_RGB: RgbColor;
export declare const YELLOW_RGB: RgbColor;
export {};
//# sourceMappingURL=colorUtils.d.ts.map