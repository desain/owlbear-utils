export declare function isObject(object: unknown): object is object;
export declare function isDeepEqual<T extends object>(object1: T | null | undefined, object2: T | null | undefined): boolean;
export declare function groupBy<T, K extends string>(ts: T[], key: (t: T) => K): Record<K, T[]>;
export declare function deferCallAll(...functions: VoidFunction[]): VoidFunction;
export declare function getOrInsert<K, V>(m: Map<K, V>, key: K, insert: () => V): V;
//# sourceMappingURL=jsUtils.d.ts.map