export declare function isObject(object: unknown): object is object;
export declare function isDeepEqual<T extends object>(object1: T | null | undefined, object2: T | null | undefined): boolean;
export declare function groupBy<T, K extends string>(ts: T[], key: (t: T) => K): Record<K, T[]>;
export declare function deferCallAll(...functions: VoidFunction[]): VoidFunction;
export declare function getOrInsert<K, V>(m: Map<K, V>, key: K, insert: () => V): V;
/**
 * Iterate through array with indices
 * @param ts Array
 * @yields [item, index]
 * @returns Last index.
 */
export declare function withIndices<T>(ts: T[]): Iterator<[item: T, index: number], number, unknown>;
/**
 * Utility method to filter iterator results.
 * @param it Iterator.
 * @param predicate Test for each value.
 * @yields Values that pass the predicate
 * @returns Underlying iterator return value.
 */
export declare function filterIterator<T, TReturn, TNext>(it: Iterator<T, TReturn, TNext>, predicate: (val: T) => boolean): Generator<T, TReturn, TNext>;
type AnyFunction = (this: void, ...args: any[]) => unknown;
export type ExtractNonFunctions<T> = {
    [K in keyof T as T[K] extends AnyFunction ? never : K]: T[K];
};
export type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
/**
 * Return the value of a promise or reject if it takes too much time.
 */
export declare function withTimeout<T>(underlying: Promise<T>, duration?: number, timeoutReason?: string): Promise<Awaited<T>>;
export {};
//# sourceMappingURL=jsUtils.d.ts.map