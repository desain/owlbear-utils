import { Matrix, Vector2 } from "@owlbear-rodeo/sdk";
export declare const PI_6: number;
export declare const SQRT_3: number;
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
//# sourceMappingURL=mathUtils.d.ts.map