const HEX_COLOR = Symbol("HexColor");
const RGB_COLOR = Symbol("RgbColor");
function parseColor(color) {
    return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
}
export function isHexColor(color) {
    return parseColor(color) !== null;
}
export function assumeHexColor(color) {
    return color;
}
export function assumeRgbColor(color) {
    return color;
}
export function hexToRgb(hex) {
    const result = parseColor(hex);
    return result?.[1] && result[2] && result[3]
        ? {
            x: parseInt(result[1], 16) / 255,
            y: parseInt(result[2], 16) / 255,
            z: parseInt(result[3], 16) / 255,
        }
        : null;
}
export function rgbToHex({ x, y, z }) {
    const r = Math.floor(x * 255), g = Math.floor(y * 255), b = Math.floor(z * 255);
    return assumeHexColor("#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1));
}
export const WHITE_HEX = assumeHexColor("#FFFFFF");
export const BLACK_HEX = assumeHexColor("#000000");
export const PINK_RGB = { x: 1, y: 0, z: 1 };
export const WHITE_RGB = { x: 1, y: 1, z: 1 };
export const RED_RGB = { x: 1, y: 0, z: 0 };
export const YELLOW_RGB = { x: 1, y: 1, z: 0 };
export const BLACK_RGB = { x: 0, y: 0, z: 0 };
//# sourceMappingURL=colorUtils.js.map