import type { GridType, Matrix, Vector2 } from "@owlbear-rodeo/sdk";
export declare const PI_6: number;
export declare const SQRT_3: number;
export declare const ORIGIN: Vector2;
/**
 * Why isn't this in MathM?
 * @param m a b c
 *          d e f
 *          g h i
 * @param v x
 *          y
 *          (z = implicit 1)
 * @returns ax + by + c
 *          dx + ey + f
 */
export declare function matrixMultiply(m: Matrix, v: Vector2): Vector2;
export declare function degToRad(degrees: number): number;
export declare const ANGLE_DIMETRIC_RADIANS: number;
export declare const SCALE_ISOMETRIC: Vector2;
export declare const SCALE_DIMETRIC: Vector2;
/**
 * @returns Scale for grid. Normal for most grids, stretched for axonometric grids.
 */
export declare function getScale(gridType: GridType): Vector2;
export type Position = [x: number, y: number];
export declare function toPosition(p: Vector2): Position;
export declare function toVector2(p: Position): Vector2;
export declare function toVector2Unchecked(p: number[]): Vector2;
//# sourceMappingURL=mathUtils.d.ts.map