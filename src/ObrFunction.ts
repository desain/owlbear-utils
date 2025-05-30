import OBR, {
    buildBillboard,
    buildCurve,
    buildEffect,
    buildImage,
    buildImageUpload,
    buildLabel,
    buildLight,
    buildLine,
    buildPath,
    buildPointer,
    buildRuler,
    buildSceneUpload,
    buildShape,
    buildText,
    buildWall,
    isBillboard,
    isCurve,
    isEffect,
    isImage,
    isLabel,
    isLight,
    isLine,
    isPath,
    isPointer,
    isRuler,
    isShape,
    isText,
    isWall,
    Math2,
    MathM,
} from "@owlbear-rodeo/sdk";

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
] as const;

/**
 * Function that can do things with the OBR APIs.
 */
export type ObrFunction<Args extends unknown[] = [], Result = void> = (
    obr: typeof OBR,
    math2: typeof Math2,
    mathM: typeof MathM,
    _buildBillboard: typeof buildBillboard,
    _isBillboard: typeof isBillboard,
    _buildCurve: typeof buildCurve,
    _isCurve: typeof isCurve,
    _buildEffect: typeof buildEffect,
    _isEffect: typeof isEffect,
    _buildImage: typeof buildImage,
    _isImage: typeof isImage,
    _buildLabel: typeof buildLabel,
    _isLabel: typeof isLabel,
    _buildLight: typeof buildLight,
    _isLight: typeof isLight,
    _buildLine: typeof buildLine,
    _isLine: typeof isLine,
    _buildPointer: typeof buildPointer,
    _isPointer: typeof isPointer,
    _buildRuler: typeof buildRuler,
    _isRuler: typeof isRuler,
    _buildShape: typeof buildShape,
    _isShape: typeof isShape,
    _buildText: typeof buildText,
    _isText: typeof isText,
    _buildPath: typeof buildPath,
    _isPath: typeof isPath,
    _buildWall: typeof buildWall,
    _isWall: typeof isWall,
    _buildImageUpload: typeof buildImageUpload,
    _buildSceneUpload: typeof buildSceneUpload,
    ...args: Args
) => Result;

/**
 * Async function that can do things with the OBR APIs.
 */
export type ObrAsyncFunction<
    Args extends unknown[] = [],
    Result = void,
> = ObrFunction<Args, Promise<Result>>;

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
] as const;

export function compileObrFunction<Args extends unknown[], Result>(
    code: string,
    parameters: string[] = [],
) {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const obrFunction = Function(
        ...obrParams,
        ...parameters,
        "'use strict';" + code,
    ) as ObrFunction<Args, Result>;
    return obrFunction;
}

export function compileObrAsyncFunction<Args extends unknown[], Result>(
    code: string,
    parameters: string[] = [],
) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const obrAsyncFunction: ObrAsyncFunction<Args, Result> = AsyncFunction(
        ...obrParams,
        ...parameters,
        "'use strict';" + code,
    );
    return obrAsyncFunction;
}

export function executeObrFunction<Args extends unknown[], Result>(
    obrFunction: ObrFunction<Args, Result>,
    ...args: Args
): Result {
    return obrFunction(...obrApis, ...args);
}

export function executeObrAsyncFunction<Args extends unknown[], Result>(
    obrAsyncFunction: ObrAsyncFunction<Args, Result>,
    ...args: Args
): Promise<Result> {
    return obrAsyncFunction(...obrApis, ...args);
}