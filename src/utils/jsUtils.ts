
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

    if (objKeys1.length !== objKeys2.length) return false;

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

export function groupBy<T, K extends string>(
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
export function* withIndices<T>(ts: T[]): Iterator<[T, number], number, unknown> {
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
