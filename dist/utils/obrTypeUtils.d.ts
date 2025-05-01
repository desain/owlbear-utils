import OBR, { BlendMode, CurveStyle, GridType, Layer, ShapeStyle, Vector2 } from "@owlbear-rodeo/sdk";
import { Vector3 } from "@owlbear-rodeo/sdk/lib/types/Vector3";
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
//# sourceMappingURL=obrTypeUtils.d.ts.map