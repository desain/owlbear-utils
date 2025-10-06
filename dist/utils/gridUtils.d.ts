import type { Matrix } from "@owlbear-rodeo/sdk";
import { type Grid, type Vector2 } from "@owlbear-rodeo/sdk";
import { type HexGridType } from "./obrTypeUtils.js";
/**
 * @returns the corner positions of a grid cell (square or hex) given its center and grid info.
 *          the point list is open (last position is not equal to first).
 */
export declare function getGridCorners(center: Vector2, { type, dpi }: Pick<Grid, "type" | "dpi">): Vector2[];
export declare function getTransformMatrices(grid: Pick<Grid, "type" | "dpi">): [un: Matrix, re: Matrix];
/**
 * @returns chebyshev / chessboard / L_∞ / diagonal distance.
 */
export declare function chebyshev(a: Vector2, b: Vector2): number;
export declare function manhattan(a: Vector2, b: Vector2): number;
export declare function alternating(a: Vector2, b: Vector2, grid: Pick<Grid, "dpi">): number;
export declare function isPointyTop(type: HexGridType): type is "HEX_VERTICAL";
/**
 * @param centersNotCorners snap to grid cell centers instead of corners (default)
 */
export declare function snap(p: Vector2, grid: Pick<Grid, "dpi" | "type">, centersNotCorners: boolean): Vector2;
export declare function distance(a: Vector2, b: Vector2, grid: Pick<Grid, "measurement" | "type" | "dpi">): number;
//# sourceMappingURL=gridUtils.d.ts.map