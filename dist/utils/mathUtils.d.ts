import type { GridType, Matrix, Vector2, BoundingBox } from "@owlbear-rodeo/sdk";
import type { ZeroToOne } from "./numberUtils.js";
export declare const PI_6: number;
export declare const PI_3: number;
export declare const SQRT_3: number;
export declare const ORIGIN: Vector2;
/**
 * 2D matrix type (row-major):
 * a b
 * c d
 */
export type Matrix2 = [a: number, b: number, c: number, d: number];
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
export declare function matrixMultiply2([a, b, c, d]: Matrix2, { x, y }: Vector2): Vector2;
export declare function degToRad(degrees: number): number;
export declare function distanceSquared(a: Vector2, b: Vector2): number;
export declare const ANGLE_DIMETRIC_RADIANS: number;
export declare const SCALE_ISOMETRIC: Vector2;
export declare const SCALE_DIMETRIC: Vector2;
/**
 * @returns Scale for grid. Normal for most grids, stretched for axonometric grids.
 */
export declare function getScale(gridType: GridType): Vector2;
export type Position2 = [x: number, y: number];
export declare function toPosition(p: Vector2): Position2;
export declare function toVector2(p: Position2): Vector2;
export declare function toVector2Unchecked(p: number[]): Vector2;
export declare function closePolygon<T>(list: readonly T[]): readonly T[];
/**
 * @param radius center to corner distance
 */
export declare function getHexagonPoints(radius: number, isPointyTop: boolean): Vector2[];
export declare function lerp2(a: Vector2, b: Vector2, t: ZeroToOne): Vector2;
export declare function boundingBoxContains(point: Vector2, boundingBox: Pick<BoundingBox, "min" | "max">): boolean;
//# sourceMappingURL=mathUtils.d.ts.map