import { isObject } from "./jsUtils.js";
export const BLEND_MODES = [
    "SRC_OVER", // Default/normal
    "PLUS", // Commonly used for light effects
    "MULTIPLY", // Good for shadows/darkening
    "SCREEN", // Good for brightening
    "OVERLAY", // Good for contrast
    "SOFT_LIGHT", // Subtle blending
    "HARD_LIGHT", // Strong blending
    "LIGHTEN", // Maximum of both
    "DARKEN", // Minimum of both
    "COLOR_DODGE", // Brightening effect
    "COLOR_BURN", // Darkening effect
    "DIFFERENCE", // Special effects
    "EXCLUSION", // Special effects
    "HUE", // Color adjustments
    "SATURATION", // Color adjustments
    "COLOR", // Color adjustments
    "LUMINOSITY", // Color adjustments
    "MODULATE", // Technical blend modes below
    "XOR",
    "CLEAR",
    "SRC",
    "DST",
    "DST_OVER",
    "SRC_IN",
    "DST_IN",
    "SRC_OUT",
    "DST_OUT",
    "SRC_ATOP",
    "DST_ATOP",
];
export function isBlendMode(mode) {
    const blendModes2 = BLEND_MODES; // hack to widen type
    return typeof mode === "string" && blendModes2.includes(mode);
}
export const LAYERS = [
    "MAP",
    "GRID",
    "DRAWING",
    "PROP",
    "MOUNT",
    "CHARACTER",
    "ATTACHMENT",
    "NOTE",
    "TEXT",
    "RULER",
    "FOG",
    "POINTER",
    "POST_PROCESS",
    "CONTROL",
    "POPOVER",
];
export function isLayer(layer) {
    const layers2 = LAYERS; // hack to widen type
    return typeof layer === "string" && layers2.includes(layer);
}
export function isVector2(v) {
    return (isObject(v) &&
        "x" in v &&
        typeof v.x === "number" &&
        "y" in v &&
        typeof v.y === "number");
}
export function isVector3(v) {
    return (isObject(v) &&
        "x" in v &&
        typeof v.x === "number" &&
        "y" in v &&
        typeof v.y === "number" &&
        "z" in v &&
        typeof v.z === "number");
}
export function isShapeStyle(style) {
    return (isObject(style) &&
        "fillColor" in style &&
        typeof style.fillColor === "string" &&
        "fillOpacity" in style &&
        typeof style.fillOpacity === "number" &&
        "strokeColor" in style &&
        typeof style.strokeColor === "string" &&
        "strokeOpacity" in style &&
        typeof style.strokeOpacity === "number" &&
        "strokeWidth" in style &&
        typeof style.strokeWidth === "number" &&
        "strokeDash" in style &&
        Array.isArray(style.strokeDash) &&
        style.strokeDash.every((dash) => typeof dash === "number"));
}
export function isCurveStyle(style) {
    return (isShapeStyle(style) &&
        "tension" in style &&
        typeof style.tension === "number" &&
        (!("closed" in style) || typeof style.closed === "boolean"));
}
export function isHexGrid(gridType) {
    return gridType === "HEX_HORIZONTAL" || gridType === "HEX_VERTICAL";
}
export function isImageBuildParams(params) {
    return (isObject(params) &&
        "image" in params &&
        isObject(params.image) &&
        "url" in params.image &&
        typeof params.image.url === "string" &&
        "mime" in params.image &&
        typeof params.image.mime === "string" &&
        "width" in params.image &&
        typeof params.image.width === "number" &&
        "height" in params.image &&
        typeof params.image.height === "number" &&
        "grid" in params &&
        isObject(params.grid) &&
        "dpi" in params.grid &&
        typeof params.grid.dpi === "number" &&
        "offset" in params.grid &&
        isVector2(params.grid.offset));
}
//# sourceMappingURL=obrTypeUtils.js.map