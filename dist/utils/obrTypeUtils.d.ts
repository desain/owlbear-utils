import type { BlendMode, CurveStyle, GridType, Image, Layer, ShapeStyle, Vector2, Shape, ShapeType } from "@owlbear-rodeo/sdk";
import type OBR from "@owlbear-rodeo/sdk";
import type { Vector3 } from "@owlbear-rodeo/sdk/lib/types/Vector3";
export declare const BLEND_MODES: BlendMode[];
export declare function isBlendMode(mode: unknown): mode is BlendMode;
export declare const LAYERS: Layer[];
export declare function isLayer(layer: unknown): layer is Layer;
export declare function isVector2(v: unknown): v is Vector2;
export declare function isVector3(v: unknown): v is Vector3;
export declare function isShapeStyle(style: unknown): style is ShapeStyle;
export declare function isCurveStyle(style: unknown): style is CurveStyle;
export type Role = Awaited<ReturnType<typeof OBR.player.getRole>>;
export type HexGridType = "HEX_HORIZONTAL" | "HEX_VERTICAL";
export declare function isHexGrid(gridType: GridType): gridType is HexGridType;
export type ItemApi = typeof OBR.scene.items | typeof OBR.scene.local;
/**
 * All the data needed to build an image, excluding text.
 */
export type ImageBuildParams = Pick<Image, "image" | "grid">;
export declare function isImageBuildParams(params: unknown): params is ImageBuildParams;
export declare function vector2Equals(a: Vector2, b: Vector2): boolean;
export type NonCircleShape = Shape & {
    shapeType: Exclude<ShapeType, "CIRCLE">;
};
export declare function isNonCircleShape(shape: Shape): shape is NonCircleShape;
//# sourceMappingURL=obrTypeUtils.d.ts.map