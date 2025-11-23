import type { Curve, Image, Item, Line, Path, Vector2, Wall } from "@owlbear-rodeo/sdk";
import { type GridParams } from "./GridParsed.js";
import { type NonCircleShape } from "./obrTypeUtils.js";
export declare function getCurveWallWorldPoints(curve: Curve | Wall): Vector2[];
export declare function getLineWorldPoints(line: Line): Vector2[];
export declare function getShapeWorldPoints(shape: NonCircleShape): Vector2[];
/**
 * @returns Points tracing the (rotated) bounding box for an image.
 *          If the image is square, disregards rotation.
 *          Does not return a closed polygon.
 */
export declare function getImageWorldPoints(item: Image, grid: GridParams): Vector2[];
type WorldPointsItem = Line | NonCircleShape | Curve | Path | Wall | Image;
export declare function isWorldPointsItem(item: Item): item is WorldPointsItem;
export declare function getWorldPoints(item: WorldPointsItem, grid: GridParams): Vector2[];
export {};
//# sourceMappingURL=getWorldPoints.d.ts.map