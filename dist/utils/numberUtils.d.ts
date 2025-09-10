import type { Grid, ImageGrid } from "@owlbear-rodeo/sdk";
import type { GridParsed } from "./GridParsed.js";
/************************* TYPES *************************/
declare const CELLS_SYMBOL: unique symbol;
/**
 * Number of grid cells.
 */
export type Cells = number & {
    readonly [CELLS_SYMBOL]: unique symbol;
};
export declare function cells(x: number): Cells;
declare const CELLS_WHOLE_SYMBOL: unique symbol;
/**
 * Number of grid cells.
 */
export type CellsWhole = Cells & {
    readonly [CELLS_WHOLE_SYMBOL]: unique symbol;
};
/**
 * @returns Input floored to remove fractional part.
 */
export declare function floorCells(x: Cells): CellsWhole;
/**
 * @returns Input rounded to remove fractional part.
 */
export declare function roundCells(x: Cells): CellsWhole;
declare const PIXELS_SYMBOL: unique symbol;
/**
 * Number of grid pixels.
 */
export type Pixels = number & {
    readonly [PIXELS_SYMBOL]: unique symbol;
};
export declare function pixels(x: number): Pixels;
declare const UNITS_SYMBOL: unique symbol;
/**
 * Number of grid units. E.g on a 5ft grid, one unit = 1ft = 1/5 of a cell.
 */
export type Units = number & {
    readonly [UNITS_SYMBOL]: unique symbol;
};
export declare function units(x: number): Units;
/************************ RANGES *************************/
declare const ZERO_TO_ONE_SYMBOL: unique symbol;
export type ZeroToOne = number & {
    readonly [ZERO_TO_ONE_SYMBOL]: unique symbol;
};
export declare function zeroToOne(x: number): ZeroToOne;
/************************ HELPERS ************************/
export declare function unitsToCells(units: Units, grid: GridParsed): Cells;
export declare function cellsToUnits(cells: Cells, grid: GridParsed): Units;
export declare function unitsToPixels(units: Units, grid: GridParsed): Pixels;
export declare function pixelsToUnits(pixels: Pixels, grid: GridParsed): Units;
export declare function pixelsToCells(pixels: Pixels, grid: Grid | GridParsed | ImageGrid): Cells;
export declare function cellsToPixels(cells: Cells, grid: Grid | GridParsed | ImageGrid): number;
export {};
//# sourceMappingURL=numberUtils.d.ts.map