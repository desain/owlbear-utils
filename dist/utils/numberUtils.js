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
/************************ RANGES *************************/
const ZERO_TO_ONE_SYMBOL = Symbol("Cells");
export function zeroToOne(x) {
    return Math.max(0, Math.min(1, x));
}
/************************ HELPERS ************************/
export function unitsToCells(units, grid) {
    return cells(units / grid.parsedScale.multiplier);
}
export function cellsToUnits(cells, grid) {
    return units(cells * grid.parsedScale.multiplier);
}
export function unitsToPixels(units, grid) {
    return pixels(units * grid.dpi / grid.parsedScale.multiplier);
}
export function pixelsToUnits(pixels, grid) {
    return units(pixels * grid.parsedScale.multiplier / grid.dpi);
}
export function pixelsToCells(pixels, grid) {
    return cells(pixels / grid.dpi);
}
export function cellsToPixels(cells, grid) {
    return cells * grid.dpi;
}
//# sourceMappingURL=numberUtils.js.map