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
    return blendModes2.includes(mode);
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
    return layers2.includes(layer);
}
//# sourceMappingURL=obrTypeUtils.js.map