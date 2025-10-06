import type { GridType, Matrix, Vector2 } from "@owlbear-rodeo/sdk";
import { Math2 } from "@owlbear-rodeo/sdk";
import type { ZeroToOne } from "./numberUtils.js";

export const PI_6 = Math.PI / 6; // 30 deg
export const PI_3 = Math.PI / 3; // 60 deg
export const SQRT_3 = Math.sqrt(3);
export const ORIGIN: Vector2 = { x: 0, y: 0 };

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
export function matrixMultiply(m: Matrix, v: Vector2): Vector2 {
    const [a, b, c, d, e, f] = m;
    return {
        x: a * v.x + b * v.y + c,
        y: d * v.x + e * v.y + f,
    };
}

export function matrixMultiply2([a, b, c, d]: Matrix2, {x, y}: Vector2): Vector2 {
    return {
        x: a * x + b * y,
        y: c * x + d * y,
    };
}


export function degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

export function distanceSquared(a: Vector2, b: Vector2) {
    return Math2.magnitudeSquared(Math2.subtract(a, b));
}

// Axonometric utils

// isometric angle = pi/6 radians, dimetric angle is 26.5 degrees
export const ANGLE_DIMETRIC_RADIANS = degToRad(26.5);

export const SCALE_ISOMETRIC: Vector2 = {
    x: Math.SQRT1_2 / Math.tan(PI_6),
    y: Math.SQRT1_2,
};
export const SCALE_DIMETRIC: Vector2 = {
    x: Math.SQRT1_2 / Math.tan(ANGLE_DIMETRIC_RADIANS),
    y: Math.SQRT1_2,
};

/**
 * @returns Scale for grid. Normal for most grids, stretched for axonometric grids.
 */
export function getScale(gridType: GridType): Vector2 {
    if (gridType === "ISOMETRIC") {
        return SCALE_ISOMETRIC;
    } else if (gridType === "DIMETRIC") {
        return SCALE_DIMETRIC;
    } else {
        return { x: 1, y: 1 };
    }
}

// Interaction with comp geo libs
export type Position2 = [x: number, y: number];
export function toPosition(p: Vector2): Position2 {
    return [p.x, p.y];
}
export function toVector2(p: Position2): Vector2 {
    return { x: p[0], y: p[1] };
}
export function toVector2Unchecked(p: number[]): Vector2 {
    const x = p[0];
    const y = p[1];
    if (x === undefined || y === undefined) {
        throw Error("invalid position");
    }
    return { x, y };
}

export function closePolygon<T>(list: readonly T[]): readonly T[] {
    const first = list[0];
    if (first) {
        return [...list, first];
    } else {
        return list;
    }
}

/**
 * @param radius center to corner distance
 */
export function getHexagonPoints(
    radius: number,
    isPointyTop: boolean,
): Vector2[] {
    const angleOffset = isPointyTop ? PI_6 : 0;
    return Array.from({ length: 6 }, (_, i) => {
        const angle = angleOffset + (Math.PI / 3) * i;
        return {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
        };
    });
}

export function lerp2(a: Vector2, b: Vector2, t: ZeroToOne): Vector2 {
    return Math2.add(a, Math2.multiply(Math2.subtract(b, a), t));
}