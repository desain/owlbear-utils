import OBR, { buildBillboard, buildCurve, buildEffect, buildImage, buildImageUpload, buildLabel, buildLight, buildLine, buildPath, buildPointer, buildRuler, buildSceneUpload, buildShape, buildText, buildWall, isBillboard, isCurve, isEffect, isImage, isLabel, isLight, isLine, isPath, isPointer, isRuler, isShape, isText, isWall, Math2, MathM, } from "@owlbear-rodeo/sdk";
const obrApis = [
    OBR,
    Math2,
    MathM,
    buildBillboard,
    isBillboard,
    buildCurve,
    isCurve,
    buildEffect,
    isEffect,
    buildImage,
    isImage,
    buildLabel,
    isLabel,
    buildLight,
    isLight,
    buildLine,
    isLine,
    buildPointer,
    isPointer,
    buildRuler,
    isRuler,
    buildShape,
    isShape,
    buildText,
    isText,
    buildPath,
    isPath,
    buildWall,
    isWall,
    buildImageUpload,
    buildSceneUpload,
];
// eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions
const AsyncFunction = async function () {
    // no content since we're just getting the constructor
}.constructor;
const obrParams = [
    "OBR",
    "Math2",
    "MathM",
    "buildBillboard",
    "isBillboard",
    "buildCurve",
    "isCurve",
    "buildEffect",
    "isEffect",
    "buildImage",
    "isImage",
    "buildLabel",
    "isLabel",
    "buildLight",
    "isLight",
    "buildLine",
    "isLine",
    "buildPointer",
    "isPointer",
    "buildRuler",
    "isRuler",
    "buildShape",
    "isShape",
    "buildText",
    "isText",
    "buildPath",
    "isPath",
    "buildWall",
    "isWall",
    "buildImageUpload",
    "buildSceneUpload",
];
export function compileObrFunction(code, parameters = []) {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const obrFunction = Function(...obrParams, ...parameters, "'use strict';" + code);
    return obrFunction;
}
export function compileObrAsyncFunction(code, parameters = []) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const obrAsyncFunction = AsyncFunction(...obrParams, ...parameters, "'use strict';" + code);
    return obrAsyncFunction;
}
export function executeObrFunction(obrFunction, ...args) {
    return obrFunction(...obrApis, ...args);
}
export function executeObrAsyncFunction(obrAsyncFunction, ...args) {
    return obrAsyncFunction(...obrApis, ...args);
}
//# sourceMappingURL=ObrFunction.js.map