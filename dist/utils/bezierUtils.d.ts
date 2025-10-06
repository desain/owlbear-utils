import { type PathCommand, type Vector2 } from "@owlbear-rodeo/sdk";
/**
 * @param commands Path commands.
 * @param startIdx Index that subpath starts at in command array.
 * @throws Error if the path command array is invalid.
 * @returns Points and index that next subpath starts at in command array.
 */
export declare function parseSubpath(commands: readonly PathCommand[], startIdx: number): [subpathPoints: Vector2[], index: number];
//# sourceMappingURL=bezierUtils.d.ts.map