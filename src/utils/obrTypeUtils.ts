import type OBR from "@owlbear-rodeo/sdk";
import type {
    AttachmentBehavior,
    BlendMode,
    CurveStyle,
    GridType,
    Image,
    ImageAssetType,
    Layer,
    Shape,
    ShapeStyle,
    ShapeType,
    Vector2,
} from "@owlbear-rodeo/sdk";
import type { Vector3 } from "@owlbear-rodeo/sdk/lib/types/Vector3";
import { isObject } from "./jsUtils.js";

export const BLEND_MODES: BlendMode[] = [
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

export function isBlendMode(mode: unknown): mode is BlendMode {
    const blendModes2: string[] = BLEND_MODES; // hack to widen type
    return typeof mode === "string" && blendModes2.includes(mode);
}

export const LAYERS: Layer[] = [
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

export function isLayer(layer: unknown): layer is Layer {
    const layers2: string[] = LAYERS; // hack to widen type
    return typeof layer === "string" && layers2.includes(layer);
}

export const IMAGE_ASSET_TYPES: ImageAssetType[] = [
    "MAP",
    "PROP",
    "MOUNT",
    "CHARACTER",
    "ATTACHMENT",
    "NOTE",
];

export function isImageAssetType(ty: unknown): ty is ImageAssetType {
    const tys: string[] = IMAGE_ASSET_TYPES; // hack to widen type
    return typeof ty === "string" && tys.includes(ty);
}

export function isVector2(v: unknown): v is Vector2 {
    return (
        isObject(v) &&
        "x" in v &&
        typeof v.x === "number" &&
        "y" in v &&
        typeof v.y === "number"
    );
}

export function isVector3(v: unknown): v is Vector3 {
    return (
        isObject(v) &&
        "x" in v &&
        typeof v.x === "number" &&
        "y" in v &&
        typeof v.y === "number" &&
        "z" in v &&
        typeof v.z === "number"
    );
}

export function isShapeStyle(style: unknown): style is ShapeStyle {
    return (
        isObject(style) &&
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
        style.strokeDash.every((dash) => typeof dash === "number")
    );
}

export function isCurveStyle(style: unknown): style is CurveStyle {
    return (
        isShapeStyle(style) &&
        "tension" in style &&
        typeof style.tension === "number" &&
        (!("closed" in style) || typeof style.closed === "boolean")
    );
}

export type Role = Awaited<ReturnType<typeof OBR.player.getRole>>;

export type HexGridType = "HEX_HORIZONTAL" | "HEX_VERTICAL";
export function isHexGrid(gridType: GridType): gridType is HexGridType {
    return gridType === "HEX_HORIZONTAL" || gridType === "HEX_VERTICAL";
}

export type ItemApi = typeof OBR.scene.items | typeof OBR.scene.local;

/**
 * All the data needed to build an image, excluding text.
 */
export type ImageBuildParams = Pick<Image, "image" | "grid">;
export function isImageBuildParams(
    params: unknown,
): params is ImageBuildParams {
    return (
        isObject(params) &&
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
        isVector2(params.grid.offset)
    );
}

export function vector2Equals(a: Vector2, b: Vector2) {
    return a.x === b.x && a.y === b.y;
}

export type NonCircleShape = Shape & {
    shapeType: Exclude<ShapeType, "CIRCLE">;
};
export function isNonCircleShape(shape: Shape): shape is NonCircleShape {
    return shape.shapeType !== "CIRCLE";
}

export interface OwlbearError {
    error: {
        name: string;
        message: string;
    };
}
export function isOwlbearError(e: unknown): e is OwlbearError {
    return (
        isObject(e) &&
        "error" in e &&
        isObject(e.error) &&
        "name" in e.error &&
        typeof e.error.name === "string" &&
        "message" in e.error &&
        typeof e.error.message === "string"
    );
}

export function isAttachmentBehavior(b: unknown): b is AttachmentBehavior {
    return (
        b === "VISIBLE" ||
        b === "SCALE" ||
        b === "ROTATION" ||
        b === "POSITION" ||
        b === "DELETE" ||
        b === "LOCKED" ||
        b === "COPY"
    );
}
