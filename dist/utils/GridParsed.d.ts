import type { Grid, GridScale } from "@owlbear-rodeo/sdk";
export type GridParams = Pick<Grid, "dpi" | "type" | "measurement">;
export interface GridParsed extends GridParams {
    parsedScale: GridScale["parsed"];
}
export declare function getParsedGrid(): Promise<GridParsed>;
//# sourceMappingURL=GridParsed.d.ts.map