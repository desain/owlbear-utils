import type { Curve, Image, Line, Vector2, Wall } from "@owlbear-rodeo/sdk";
import { type NonCircleShape } from "./obrTypeUtils.js";
import { type GridParams } from "./GridParsed.js";
export declare function getCurveWallWorldPoints(curve: Curve | Wall): Vector2[];
export declare function getLineWorldPoints(line: Line): Vector2[];
export declare function getShapeWorldPoints(shape: NonCircleShape): Vector2[];
/**
 * @returns Points tracing the (rotated) bounding box for an image.
 *          If the image is square, disregards rotation.
 *          Does not return a closed polygon.
 */
export declare function getImageWorldPoints(item: Image, grid: GridParams): Vector2[];
//# sourceMappingURL=getWorldPoints.d.ts.map