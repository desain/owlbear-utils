import OBR, { buildLine, buildShape } from "@owlbear-rodeo/sdk";
export function debugPoints(points, timeMs = 5000) {
    if (!points) {
        return;
    }
    if (!Array.isArray(points)) {
        points = [points];
    }
    const shapes = points.map((pt) => buildShape()
        .layer("POINTER")
        .shapeType("CIRCLE")
        .position(pt)
        .width(10)
        .height(10)
        .fillColor("#ff0000")
        .fillOpacity(0.5)
        .strokeColor("#ff0000")
        .strokeOpacity(1)
        .strokeWidth(5)
        .disableHit(true)
        .locked(true)
        .build());
    void OBR.scene.local.addItems(shapes);
    setTimeout(() => {
        void OBR.scene.local.deleteItems(shapes.map(shape => shape.id));
    }, timeMs);
}
export function debugLineString(points, timeMs = 5000) {
    if (!points) {
        return;
    }
    debugPoints(points, timeMs);
    const lines = points.slice(undefined, -1).map((pt, i) => buildLine()
        .layer("POINTER")
        .startPosition(pt)
        .endPosition(points[i + 1])
        .strokeColor("#ff0000")
        .strokeOpacity(1)
        .strokeWidth(5)
        .disableHit(true)
        .locked(true)
        .build());
    void OBR.scene.local.addItems(lines);
    setTimeout(() => {
        void OBR.scene.local.deleteItems(lines.map(line => line.id));
    }, timeMs);
}
//# sourceMappingURL=debug.js.map