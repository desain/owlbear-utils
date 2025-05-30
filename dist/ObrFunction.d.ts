import OBR, { buildBillboard, buildCurve, buildEffect, buildImage, buildImageUpload, buildLabel, buildLight, buildLine, buildPath, buildPointer, buildRuler, buildSceneUpload, buildShape, buildText, buildWall, isBillboard, isCurve, isEffect, isImage, isLabel, isLight, isLine, isPath, isPointer, isRuler, isShape, isText, isWall, Math2, MathM } from "@owlbear-rodeo/sdk";
/**
 * Function that can do things with the OBR APIs.
 */
export type ObrFunction<Args extends unknown[] = [], Result = void> = (obr: typeof OBR, math2: typeof Math2, mathM: typeof MathM, _buildBillboard: typeof buildBillboard, _isBillboard: typeof isBillboard, _buildCurve: typeof buildCurve, _isCurve: typeof isCurve, _buildEffect: typeof buildEffect, _isEffect: typeof isEffect, _buildImage: typeof buildImage, _isImage: typeof isImage, _buildLabel: typeof buildLabel, _isLabel: typeof isLabel, _buildLight: typeof buildLight, _isLight: typeof isLight, _buildLine: typeof buildLine, _isLine: typeof isLine, _buildPointer: typeof buildPointer, _isPointer: typeof isPointer, _buildRuler: typeof buildRuler, _isRuler: typeof isRuler, _buildShape: typeof buildShape, _isShape: typeof isShape, _buildText: typeof buildText, _isText: typeof isText, _buildPath: typeof buildPath, _isPath: typeof isPath, _buildWall: typeof buildWall, _isWall: typeof isWall, _buildImageUpload: typeof buildImageUpload, _buildSceneUpload: typeof buildSceneUpload, ...args: Args) => Result;
/**
 * Async function that can do things with the OBR APIs.
 */
export type ObrAsyncFunction<Args extends unknown[] = [], Result = void> = ObrFunction<Args, Promise<Result>>;
export declare function compileObrFunction<Args extends unknown[], Result>(code: string, parameters?: string[]): ObrFunction<Args, Result>;
export declare function compileObrAsyncFunction<Args extends unknown[], Result>(code: string, parameters?: string[]): ObrAsyncFunction<Args, Result>;
export declare function executeObrFunction<Args extends unknown[], Result>(obrFunction: ObrFunction<Args, Result>, ...args: Args): Result;
export declare function executeObrAsyncFunction<Args extends unknown[], Result>(obrAsyncFunction: ObrAsyncFunction<Args, Result>, ...args: Args): Promise<Result>;
//# sourceMappingURL=ObrFunction.d.ts.map