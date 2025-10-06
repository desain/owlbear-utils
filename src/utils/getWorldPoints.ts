import type {
    Curve,
    Image,
    Line,
    Vector2,
    Wall,
} from "@owlbear-rodeo/sdk";
import { Math2, MathM } from "@owlbear-rodeo/sdk";
import { getHexagonPoints, matrixMultiply } from "./mathUtils.js";
import { type NonCircleShape } from "./obrTypeUtils.js";
import { type GridParams } from "./GridParsed.js";

export function getCurveWallWorldPoints(curve: Curve | Wall): Vector2[] {
    const transform = MathM.fromItem(curve);
    return curve.points.map((point) => matrixMultiply(transform, point));
}

export function getLineWorldPoints(line: Line): Vector2[] {
    const transform = MathM.fromItem(line);
    return [
        matrixMultiply(transform, line.startPosition),
        matrixMultiply(transform, line.endPosition),
    ];
}

export function getShapeWorldPoints(shape: NonCircleShape): Vector2[] {
    let points: Vector2[];
    switch (shape.shapeType) {
        case "RECTANGLE":
            points = [
                { x: 0, y: 0 }, // top left
                { x: shape.width, y: 0 }, // top right
                { x: shape.width, y: shape.height }, // bottom right
                { x: 0, y: shape.height }, // bottom left
            ];
            break;
        case "HEXAGON":
            points = getHexagonPoints(
                Math.max(shape.width, shape.height) / 2,
                false,
            );
            break;
        case "TRIANGLE":
            points = [
                { x: 0, y: 0 }, // top
                { x: -shape.height / 2, y: shape.height }, // bottom left
                { x: shape.height / 2, y: shape.height }, // bottom right
            ];
            break;
    }
    const transform = MathM.fromItem(shape);
    return points.map((point) => matrixMultiply(transform, point));
}

/**
 * @returns Points tracing the (rotated) bounding box for an image.
 *          If the image is square, disregards rotation.
 *          Does not return a closed polygon.
 */
export function getImageWorldPoints(item: Image, grid: GridParams): Vector2[] {
    let transform = MathM.fromItem(item);
    // Counteract rotation for square images, as they're likely to be
    // circular tokens, in which case having the bounding box extend
    // outside the grid cell when the token is rotated is untuitive
    // behavior.
    // This behavior is incorrect for images of squares though.
    // TODO: is there a way to detect when images are circular tokens?
    if (item.image.width === item.image.height && item.rotation !== 0) {
        transform = MathM.multiply(
            transform,
            MathM.fromRotation(-item.rotation),
        );
    }

    const dpiScaling = grid.dpi / item.grid.dpi;
    return [
        { x: 0, y: 0 }, // top left
        { x: 0, y: item.image.height }, // bottom left
        { x: item.image.width, y: item.image.height }, // bottom right
        { x: item.image.width, y: 0 }, // top right
    ].map((point) =>
        matrixMultiply(
            transform,
            Math2.multiply(Math2.subtract(point, item.grid.offset), dpiScaling),
        ),
    );
}