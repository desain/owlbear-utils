import { Math2, MathM } from "@owlbear-rodeo/sdk";
import { ANGLE_DIMETRIC_RADIANS, SCALE_DIMETRIC, SCALE_ISOMETRIC, matrixMultiply, distanceSquared, getHexagonPoints, SQRT_3, } from "./mathUtils.js";
import { pixels, pixelsToCells, } from "./numberUtils.js";
import { isHexGrid, } from "./obrTypeUtils.js";
import { minBy } from "./jsUtils.js";
const X_SCALE_DIMETRIC = 1 / Math.tan(ANGLE_DIMETRIC_RADIANS);
/**
 * @returns hexagon size / radius (center to corner distance) based on parallel edge distance (DPI)
 */
function hexRadius(grid) {
    return grid.dpi / SQRT_3;
}
/**
 * @returns the corner positions of a grid cell (square or hex) given its center and grid info.
 *          the point list is open (last position is not equal to first).
 */
export function getGridCorners(center, { type, dpi }) {
    if (isHexGrid(type)) {
        // 6 corners for hex, dpi is flat-to-flat distance
        return getHexagonPoints(hexRadius({ dpi }), isPointyTop(type)).map((point) => Math2.add(point, center));
    }
    else if (type === "ISOMETRIC") {
        const halfDpi = dpi / 2;
        const xOffset = halfDpi * SQRT_3;
        return [
            { x: center.x, y: center.y - halfDpi }, // top
            {
                x: center.x + xOffset,
                y: center.y,
            }, // right
            { x: center.x, y: center.y + halfDpi }, // bottom
            {
                x: center.x - xOffset,
                y: center.y,
            }, // left
        ];
    }
    else if (type === "DIMETRIC") {
        const halfDpi = dpi / 2;
        const xOffset = halfDpi * X_SCALE_DIMETRIC;
        return [
            { x: center.x, y: center.y - halfDpi }, // top
            {
                x: center.x + xOffset,
                y: center.y,
            }, // right
            { x: center.x, y: center.y + halfDpi }, // bottom
            {
                x: center.x - xOffset,
                y: center.y,
            }, // left
        ];
    }
    else {
        // 4 corners for square
        const halfDpi = dpi / 2;
        return [
            { x: center.x - halfDpi, y: center.y - halfDpi }, // top left
            { x: center.x + halfDpi, y: center.y - halfDpi }, // top right
            { x: center.x + halfDpi, y: center.y + halfDpi }, // bottom right
            { x: center.x - halfDpi, y: center.y + halfDpi }, // bottom left
        ];
    }
}
const ROTATE45 = MathM.fromRotation(45);
/**
 * Turn a square grid position into an isometric position.
 */
const TRANSFORM_ISOMETRIC = MathM.multiply(MathM.fromScale(SCALE_ISOMETRIC), ROTATE45);
/**
 * Turn a square grid position into a dimetric position.
 */
const TRANSFORM_DIMETRIC = MathM.multiply(MathM.fromScale(SCALE_DIMETRIC), ROTATE45);
const INVERSE_TRANSFORM_ISOMETRIC = MathM.inverse(TRANSFORM_ISOMETRIC);
const INVERSE_TRANSFORM_DIMETRIC = MathM.inverse(TRANSFORM_DIMETRIC);
const IDENTITY = [1, 0, 0, 0, 1, 0, 0, 0, 1];
export function getTransformMatrices(grid) {
    if (grid.type === "ISOMETRIC") {
        return [INVERSE_TRANSFORM_ISOMETRIC, TRANSFORM_ISOMETRIC];
    }
    else if (grid.type === "DIMETRIC") {
        return [INVERSE_TRANSFORM_DIMETRIC, TRANSFORM_DIMETRIC];
    }
    else if (isHexGrid(grid.type)) {
        const offset = hexRadius(grid) / 2;
        return isPointyTop(grid.type)
            ? [
                MathM.fromPosition({ x: 0, y: offset }),
                MathM.fromPosition({ x: 0, y: -offset }),
            ]
            : [
                MathM.fromPosition({ x: offset, y: 0 }),
                MathM.fromPosition({ x: -offset, y: 0 }),
            ];
    }
    else {
        return [IDENTITY, IDENTITY];
    }
}
/**
 * @returns chebyshev / chessboard / L_∞ / diagonal distance.
 */
export function chebyshev(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}
export function manhattan(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
export function alternating(a, b, grid) {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    const max = Math.max(dx, dy);
    const min = Math.min(dx, dy);
    const minCells = pixelsToCells(pixels(min), grid);
    const cycles = Math.floor(minCells / 2);
    const currentCycle = Math.max(0, minCells - cycles * 2 - 1);
    return max + grid.dpi * (cycles + currentCycle);
}
export function isPointyTop(type) {
    return type === "HEX_VERTICAL";
}
function pixelToAxial(point, orientation, dpi) {
    point = Math2.divide(point, hexRadius({ dpi }));
    if (isPointyTop(orientation)) {
        const q = (SQRT_3 / 3) * point.x - (1 / 3) * point.y;
        const r = (2 / 3) * point.y;
        return { x: q, y: r };
    }
    else {
        const q = (2 / 3) * point.x;
        const r = (-1 / 3) * point.x + (SQRT_3 / 3) * point.y;
        return { x: q, y: r };
    }
}
function axialToPixel(hex, orientation, dpi) {
    hex = Math2.multiply(hex, hexRadius({ dpi }));
    if (isPointyTop(orientation)) {
        const x = SQRT_3 * hex.x + (SQRT_3 / 2) * hex.y;
        const y = (3 / 2) * hex.y;
        return { x, y };
    }
    else {
        const x = (3 / 2) * hex.x;
        const y = (SQRT_3 / 2) * hex.x + SQRT_3 * hex.y;
        return { x, y };
    }
}
function axialRound({ x: q, y: r }) {
    // Convert to cube coordinates (x + y + z = 0)
    const s = -q - r;
    // Round each coordinate
    let rq = Math.round(q);
    let rr = Math.round(r);
    let rs = Math.round(s);
    // Fix rounding errors to maintain constraint x + y + z = 0
    const qDiff = Math.abs(rq - q);
    const rDiff = Math.abs(rr - r);
    const sDiff = Math.abs(rs - s);
    if (qDiff > rDiff && qDiff > sDiff) {
        rq = -rr - rs;
    }
    else if (rDiff > sDiff) {
        rr = -rq - rs;
    }
    else {
        rs = -rq - rr;
    }
    return { x: rq, y: rr };
}
/**
 * @param centersNotCorners snap to grid cell centers instead of corners (default)
 */
export function snap(p, grid, centersNotCorners) {
    const [un, re] = getTransformMatrices(grid);
    p = matrixMultiply(un, p);
    let result;
    if (isHexGrid(grid.type)) {
        const axial = pixelToAxial(p, grid.type, grid.dpi);
        console.log(axial);
        const hex = axialRound(axial);
        const centerPx = axialToPixel(hex, grid.type, grid.dpi);
        if (centersNotCorners) {
            result = centerPx;
        }
        else {
            const corners = getGridCorners(centerPx, grid);
            const closest = minBy(corners, (corner) => distanceSquared(corner, p));
            result = closest ?? centerPx;
        }
    }
    else {
        const offset = centersNotCorners ? grid.dpi / 2 : 0;
        result = {
            x: Math.round((p.x - offset) / grid.dpi) * grid.dpi + offset,
            y: Math.round((p.y - offset) / grid.dpi) * grid.dpi + offset,
        };
    }
    return matrixMultiply(re, result);
}
export function distance(a, b, grid) {
    if (grid.measurement === "EUCLIDEAN") {
        return Math2.distance(a, b);
    }
    else if (grid.measurement === "CHEBYSHEV" && grid.type === "SQUARE") {
        return chebyshev(a, b);
    }
    else if (grid.measurement === "MANHATTAN" && grid.type === "SQUARE") {
        return manhattan(a, b);
    }
    else if (grid.measurement === "ALTERNATING" && grid.type === "SQUARE") {
        return alternating(a, b, grid);
    }
    throw Error("Unsupported grid type");
}
//# sourceMappingURL=gridUtils.js.map