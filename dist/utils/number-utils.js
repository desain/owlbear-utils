/************************* TYPES *************************/
// Use the tagged type pattern from https://kubyshkin.name/posts/newtype-in-typescript/
// to create more type-safe number types
const CELLS_SYMBOL = Symbol("Cells");
export function cells(x) {
    return x;
}
const CELLS_WHOLE_SYMBOL = Symbol("CellsWhole");
/**
 * @returns Input floored to remove fractional part.
 */
export function floorCells(x) {
    return Math.floor(x);
}
/**
 * @returns Input rounded to remove fractional part.
 */
export function roundCells(x) {
    return Math.round(x);
}
const PIXELS_SYMBOL = Symbol("Pixels");
export function pixels(x) {
    return x;
}
const UNITS_SYMBOL = Symbol("Units");
export function units(x) {
    return x;
}
/************************ HELPERS ************************/
export function unitsToCells(units, grid) {
    return cells(units / grid.parsedScale.multiplier);
}
export function pixelsToCells(pixels, grid) {
    return cells(pixels / grid.dpi);
}
export function cellsToPixels(cells, grid) {
    return cells * grid.dpi;
}
//# sourceMappingURL=number-utils.js.map