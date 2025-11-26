export declare function isObject(object: unknown): object is object;
export declare function isDeepEqual<T extends object>(object1: T | null | undefined, object2: T | null | undefined): boolean;
export declare function groupBy<T, K extends string | number | symbol>(ts: T[], key: (t: T) => K): Record<K, T[]>;
export declare function deferCallAll(...functions: VoidFunction[]): VoidFunction;
export declare function getOrInsert<K, V>(m: Map<K, V>, key: K, insert: () => V): V;
/**
 * Iterate through array with indices
 * @param ts Array
 * @yields [item, index]
 * @returns Last index.
 */
export declare function withIndices<T>(ts: T[]): Generator<[item: T, index: number], number, unknown>;
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
/**
 * Distribute an Omit<> across all union values of T.
 *
 * Eg if you have:
 *
 * ```
 * interface BaseCreature {
 *     name: string;
 * }
 *
 * interface Person extends BaseCreature {
 *     kind: 'person';
 *     address: string;
 * }
 *
 * interface Dog extends BaseCreature {
 *     kind: 'dog';
 *     favoriteToy: string;
 *  }
 * type Creature = Person | Dog;
 * ```
 *
 * Then `Omit<Creature, 'name'>` = `{kind: 'person' | 'dog'}`.
 *
 * But `DistributiveOmit<Creature, 'name'>` = `{kind: 'person', address: string} | {kind: 'dog', favoriteToy: string}`
 */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export declare const DO_NOTHING: VoidFunction;
export declare function makeIdempotent(f: VoidFunction): VoidFunction;
/**
 * @returns all pairs of items in an array.
 */
export declare function pairs<T>(a: readonly T[]): Generator<[a: T, b: T]>;
/**
 * @param k Property key
 * @returns Comparison function
 */
export declare function comparingByProperty<K extends string, T extends Record<K, number>>(k: K, opts?: {
    reverse?: boolean;
}): (a: T, b: T) => number;
export declare function range(n: number): Generator<number>;
export declare function sum(ns: Iterable<number>): number;
export declare function minBy<T>(arr: T[], fn: (item: T) => number): T | undefined;
/**
 * @returns true if the object does not contain the key, the key is explicitly set to undefined,
 *          or the predicate is true for the key; false otherwise
 */
export declare function containsImplies<O extends object, K extends string, V>(o: O, k: K, p: (v: unknown) => v is V): boolean;
export declare function isNumber(n: unknown): n is number;
export declare function isString(v: unknown): v is string;
export declare function isFalse(v: unknown): v is false;
export declare function isTrue(v: unknown): v is true;
export declare function isBoolean(v: unknown): v is boolean;
export declare function diffSets<T extends string | number>(oldSet: Set<T>, newSet: Set<T>): {
    created: T[];
    deleted: T[];
};
export declare function waitFor(ms: number): Promise<void>;
export {};
//# sourceMappingURL=jsUtils.d.ts.map