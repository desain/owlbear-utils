import OBR, { buildBillboard, buildCurve, buildEffect, buildImage, buildImageUpload, buildLabel, buildLight, buildLine, buildPath, buildPointer, buildRuler, buildSceneUpload, buildShape, buildText, buildWall, isBillboard, isCurve, isEffect, isImage, isLabel, isLight, isLine, isPath, isPointer, isRuler, isShape, isText, isWall, Math2, MathM, } from "@owlbear-rodeo/sdk";
// eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions
const AsyncFunction = async function () {
    // no content since we're just getting the constructor
}.constructor;
export function compileObrAsyncFunction(code, parameters) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const obrAsyncFunction = AsyncFunction("OBR", "Math2", "MathM", "buildBillboard", "isBillboard", "buildCurve", "isCurve", "buildEffect", "isEffect", "buildImage", "isImage", "buildLabel", "isLabel", "buildLight", "isLight", "buildLine", "isLine", "buildPointer", "isPointer", "buildRuler", "isRuler", "buildShape", "isShape", "buildText", "isText", "buildPath", "isPath", "buildWall", "isWall", "buildImageUpload", "buildSceneUpload", ...parameters, "'use strict';" + code);
    return obrAsyncFunction;
}
export function executeObrAsyncFunction(obrAsyncFunction, ...args) {
    return obrAsyncFunction(OBR, Math2, MathM, buildBillboard, isBillboard, buildCurve, isCurve, buildEffect, isEffect, buildImage, isImage, buildLabel, isLabel, buildLight, isLight, buildLine, isLine, buildPointer, isPointer, buildRuler, isRuler, buildShape, isShape, buildText, isText, buildPath, isPath, buildWall, isWall, buildImageUpload, buildSceneUpload, ...args);
}
//# sourceMappingURL=ObrAsyncFunction.js.map