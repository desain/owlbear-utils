import { type BoundingBox, type Curve, type Image, type Item, type Line, type Path, type Shape, type Wall } from "@owlbear-rodeo/sdk";
import type { GridParams } from "./GridParsed.js";
type BoundableItem = Image | Shape | Line | Curve | Path | Wall;
export declare function isBoundableItem(item: Item): item is BoundableItem;
export declare function getBounds(item: BoundableItem, grid: GridParams): BoundingBox;
export {};
//# sourceMappingURL=getBounds.d.ts.map