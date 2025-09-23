import type { Grid } from "@owlbear-rodeo/sdk";
import type { GridParsed } from "./GridParsed.js";

/************************* TYPES *************************/
// Use the tagged type pattern from https://kubyshkin.name/posts/newtype-in-typescript/
// to create more type-safe number types

const CELLS_SYMBOL = Symbol("Cells");
/**
 * Number of grid cells.
 */
export type Cells = number & { readonly [CELLS_SYMBOL]: unique symbol };
export function cells(x: number): Cells {
    return x as Cells;
}

const CELLS_WHOLE_SYMBOL = Symbol("CellsWhole");
/**
 * Number of grid cells.
 */
export type CellsWhole = Cells & {
    readonly [CELLS_WHOLE_SYMBOL]: unique symbol;
};
/**
 * @returns Input floored to remove fractional part.
 */
export function floorCells(x: Cells): CellsWhole {
    return Math.floor(x) as CellsWhole;
}
/**
 * @returns Input rounded to remove fractional part.
 */
export function roundCells(x: Cells): CellsWhole {
    return Math.round(x) as CellsWhole;
}

const PIXELS_SYMBOL = Symbol("Pixels");
/**
 * Number of grid pixels.
 */
export type Pixels = number & { readonly [PIXELS_SYMBOL]: unique symbol };
export function pixels(x: number): Pixels {
    return x as Pixels;
}

const UNITS_SYMBOL = Symbol("Units");
/**
 * Number of grid units. E.g on a 5ft grid, one unit = 1ft = 1/5 of a cell.
 */
export type Units = number & { readonly [UNITS_SYMBOL]: unique symbol };
export function units(x: number): Units {
    return x as Units;
}

/************************ RANGES *************************/
const ZERO_TO_ONE_SYMBOL = Symbol("ZeroToOne");
export type ZeroToOne = number & { readonly [ZERO_TO_ONE_SYMBOL]: unique symbol };
export function zeroToOne(x: number): ZeroToOne {
    return Math.max(0, Math.min(1, x)) as ZeroToOne;
}

/************************ HELPERS ************************/

export function unitsToCells(units: Units, grid: GridParsed): Cells {
    return cells(units / grid.parsedScale.multiplier);
}

export function cellsToUnits(cells: Cells, grid: GridParsed): Units {
    return units(cells * grid.parsedScale.multiplier);
}

export function unitsToPixels(units: Units, grid: GridParsed): Pixels {
    return pixels(units * grid.dpi / grid.parsedScale.multiplier);
}

export function pixelsToUnits(pixels: Pixels, grid: GridParsed): Units {
    return units(pixels * grid.parsedScale.multiplier / grid.dpi);
}

export function pixelsToCells(
    pixels: Pixels,
    grid: Pick<Grid, "dpi">,
): Cells {
    return cells(pixels / grid.dpi);
}

export function cellsToPixels(cells: Cells, grid: Pick<Grid, "dpi">): Pixels {
    return pixels(cells * grid.dpi);
}
