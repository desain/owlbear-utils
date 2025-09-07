export function isObject(object: unknown): object is object {
    return object != null && typeof object === "object";
}

export function isDeepEqual<T extends object>(
    object1: T | null | undefined,
    object2: T | null | undefined,
) {
    if (object1 === undefined && object2 === undefined) {
        return true;
    } else if (object1 === null && object2 === null) {
        return true;
    } else if (
        object1 === undefined ||
        object1 === null ||
        object2 === undefined ||
        object2 === null
    ) {
        return false;
    }

    const objKeys1: (keyof T)[] = Object.keys(object1) as (keyof T)[];
    const objKeys2 = Object.keys(object2);

    if (objKeys1.length !== objKeys2.length) {
        return false;
    }

    for (const key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];

        const isObjects = isObject(value1) && isObject(value2);

        if (
            (isObjects && !isDeepEqual(value1, value2)) ||
            (!isObjects && value1 !== value2)
        ) {
            return false;
        }
    }
    return true;
}

export function groupBy<T, K extends string | number | symbol>(
    ts: T[],
    key: (t: T) => K,
): Record<K, T[]> {
    return ts.reduce((acc, t) => {
        const k = key(t);
        if (acc[k]) {
            acc[k].push(t);
        } else {
            acc[k] = [t];
        }
        return acc;
    }, {} as Record<K, T[]>);
}

export function deferCallAll(...functions: VoidFunction[]): VoidFunction {
    return () => functions.forEach((f) => f());
}

export function getOrInsert<K, V>(m: Map<K, V>, key: K, insert: () => V): V {
    const maybeV = m.get(key);
    if (maybeV !== undefined) {
        return maybeV;
    } else {
        const value = insert();
        m.set(key, value);
        return value;
    }
}

/**
 * Iterate through array with indices
 * @param ts Array
 * @yields [item, index]
 * @returns Last index.
 */
export function* withIndices<T>(
    ts: T[],
): Iterator<[item: T, index: number], number, unknown> {
    let i;
    for (i = 0; i < ts.length; i++) {
        yield [ts[i], i];
    }
    return i;
}

/**
 * Utility method to filter iterator results.
 * @param it Iterator.
 * @param predicate Test for each value.
 * @yields Values that pass the predicate
 * @returns Underlying iterator return value.
 */
export function* filterIterator<T, TReturn, TNext>(
    it: Iterator<T, TReturn, TNext>,
    predicate: (val: T) => boolean,
): Generator<T, TReturn, TNext> {
    let v;
    while (true) {
        v = it.next();
        if (v.done) {
            return v.value;
        } else if (predicate(v.value)) {
            yield v.value;
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (this: void, ...args: any[]) => unknown;
export type ExtractNonFunctions<T> = {
    [K in keyof T as T[K] extends AnyFunction ? never : K]: T[K];
};

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * Return the value of a promise or reject if it takes too much time.
 */
export function withTimeout<T>(
    underlying: Promise<T>,
    duration?: number,
    timeoutReason?: string,
) {
    return Promise.race([
        underlying,
        new Promise<T>((_resolve, reject) =>
            setTimeout(
                () => reject(Error(`Timed out ${timeoutReason}`)),
                duration ?? 1000,
            ),
        ),
    ]);
}

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
export type DistributiveOmit<T, K extends keyof any> = T extends any 
  ? Omit<T, K> 
  : never;

export const DO_NOTHING: VoidFunction = () => {
    // Do nothing
};

/**
 * @returns all pairs of items in an array.
 */
export function* pairs<T>(a: readonly T[]): Generator<[a: T, b: T]> {
    for (let i = 0; i < a.length - 1; i++) {
        yield [a[i]!, a[i + 1]!];
    }
}

/**
 * @param k Property key
 * @returns Comparison function
 */
export function comparingByProperty<
    K extends string,
    T extends Record<K, number>,
>(k: K, opts?: { reverse?: boolean }): (a: T, b: T) => number {
    return opts?.reverse ? (a, b) => b[k] - a[k] : (a, b) => a[k] - b[k];
}