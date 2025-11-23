import { isCurve, isImage, isLine, isPath, isShape, isWall, Math2, MathM, } from "@owlbear-rodeo/sdk";
import { getWorldPoints, isWorldPointsItem } from "./getWorldPoints.js";
import { assertItem } from "./itemUtils.js";
import { matrixMultiply } from "./mathUtils.js";
import { isCircle } from "./obrTypeUtils.js";
export function isBoundableItem(item) {
    return (isImage(item) ||
        isShape(item) ||
        isLine(item) ||
        isCurve(item) ||
        isPath(item) ||
        isWall(item));
}
function getCircleBounds(circle) {
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
export function getBounds(item, grid) {
    if (isWorldPointsItem(item)) {
        return Math2.boundingBox(getWorldPoints(item, grid));
    }
    else {
        // circle
        assertItem(item, isCircle);
        return getCircleBounds(item);
    }
}
//# sourceMappingURL=getBounds.js.map