export const PI_6 = Math.PI / 6; // 30 deg
export const SQRT_3 = Math.sqrt(3);
export const ORIGIN = { x: 0, y: 0 };
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
export function matrixMultiply(m, v) {
    const [a, b, c, d, e, f] = m;
    return {
        x: a * v.x + b * v.y + c,
        y: d * v.x + e * v.y + f,
    };
}
export function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
}
// Axonometric utils
// isometric angle = pi/6 radians, dimetric angle is 26.5 degrees
export const ANGLE_DIMETRIC_RADIANS = degToRad(26.5);
export const SCALE_ISOMETRIC = {
    x: Math.SQRT1_2 / Math.tan(PI_6),
    y: Math.SQRT1_2,
};
export const SCALE_DIMETRIC = {
    x: Math.SQRT1_2 / Math.tan(ANGLE_DIMETRIC_RADIANS),
    y: Math.SQRT1_2,
};
/**
 * @returns Scale for grid. Normal for most grids, stretched for axonometric grids.
 */
export function getScale(gridType) {
    if (gridType === "ISOMETRIC") {
        return SCALE_ISOMETRIC;
    }
    else if (gridType === "DIMETRIC") {
        return SCALE_DIMETRIC;
    }
    else {
        return { x: 1, y: 1 };
    }
}
export function toPosition(p) {
    return [p.x, p.y];
}
export function toVector2(p) {
    return { x: p[0], y: p[1] };
}
export function toVector2Unchecked(p) {
    const x = p[0];
    const y = p[1];
    if (x === undefined || y === undefined) {
        throw Error("invalid position");
    }
    return { x, y };
}
export function closePolygon(list) {
    const first = list[0];
    if (first) {
        return [...list, first];
    }
    else {
        return list;
    }
}
//# sourceMappingURL=mathUtils.js.map