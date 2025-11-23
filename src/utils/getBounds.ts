import {
    isCurve,
    isImage,
    isLine,
    isPath,
    isShape,
    isWall,
    Math2,
    MathM,
    type BoundingBox,
    type Curve,
    type Image,
    type Item,
    type Line,
    type Path,
    type Shape,
    type Wall,
} from "@owlbear-rodeo/sdk";
import { getWorldPoints, isWorldPointsItem } from "./getWorldPoints.js";
import type { GridParams } from "./GridParsed.js";
import { assertItem } from "./itemUtils.js";
import { matrixMultiply } from "./mathUtils.js";
import { isCircle, type Circle } from "./obrTypeUtils.js";

type BoundableItem = Image | Shape | Line | Curve | Path | Wall;
export function isBoundableItem(item: Item): item is BoundableItem {
    return (
        isImage(item) ||
        isShape(item) ||
        isLine(item) ||
        isCurve(item) ||
        isPath(item) ||
        isWall(item)
    );
}

function getCircleBounds(circle: Circle): BoundingBox {
    const transform = MathM.fromItem(circle);

    const halfWidth = circle.width / 2;
    const halfHeight = circle.height / 2;
    const points = [
        { x: -halfWidth, y: -halfHeight }, // top left
        { x: -halfWidth, y: halfHeight }, // bottom left
        { x: halfWidth, y: halfHeight }, // bottom right
        { x: halfWidth, y: -halfHeight }, // top right
    ].map((point) => matrixMultiply(transform, point));

    return Math2.boundingBox(points);
}

export function getBounds(item: BoundableItem, grid: GridParams): BoundingBox {
    if (isWorldPointsItem(item)) {
        return Math2.boundingBox(getWorldPoints(item, grid));
    } else {
        // circle
        assertItem(item, isCircle);
        return getCircleBounds(item);
    }
}
