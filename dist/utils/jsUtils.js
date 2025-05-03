export function isObject(object) {
    return object != null && typeof object === "object";
}
export function isDeepEqual(object1, object2) {
    if (object1 === undefined && object2 === undefined) {
        return true;
    }
    else if (object1 === null && object2 === null) {
        return true;
    }
    else if (object1 === undefined ||
        object1 === null ||
        object2 === undefined ||
        object2 === null) {
        return false;
    }
    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);
    if (objKeys1.length !== objKeys2.length)
        return false;
    for (const key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];
        const isObjects = isObject(value1) && isObject(value2);
        if ((isObjects && !isDeepEqual(value1, value2)) ||
            (!isObjects && value1 !== value2)) {
            return false;
        }
    }
    return true;
}
export function groupBy(ts, key) {
    return ts.reduce((acc, t) => {
        const k = key(t);
        if (acc[k]) {
            acc[k].push(t);
        }
        else {
            acc[k] = [t];
        }
        return acc;
    }, {});
}
export function deferCallAll(...functions) {
    return () => functions.forEach((f) => f());
}
export function getOrInsert(m, key, insert) {
    const maybeV = m.get(key);
    if (maybeV !== undefined) {
        return maybeV;
    }
    else {
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
export function* withIndices(ts) {
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
export function* filterIterator(it, predicate) {
    let v;
    while (true) {
        v = it.next();
        if (v.done) {
            return v.value;
        }
        else if (predicate(v.value)) {
            yield v.value;
        }
    }
}
//# sourceMappingURL=jsUtils.js.map