import OBR from "@owlbear-rodeo/sdk";
export async function getParsedGrid() {
    const [dpi, fullScale, measurement, type] = await Promise.all([
        OBR.scene.grid.getDpi(),
        OBR.scene.grid.getScale(),
        OBR.scene.grid.getMeasurement(),
        OBR.scene.grid.getType(),
    ]);
    return {
        dpi,
        parsedScale: fullScale.parsed,
        measurement,
        type,
    };
}
//# sourceMappingURL=GridParsed.js.map