/**
 * Detects a key that can not be copied onto a plain object with `target[key] = value`.
 *
 * "__proto__" is the only one: assigning it runs the inherited setter and replaces the
 * prototype of the target instead of adding a property to it, so a caller can smuggle
 * values past validation that only inspects own keys. JSON.parse produces such a key
 * where an object literal can not. "constructor" and "prototype" have no such setter and
 * become ordinary own properties, so dropping them would only discard legitimate values.
 *
 * @param key Key to check
 * @returns true if the key must not be copied
 */
export declare const isProtoKey: (key: string) => boolean;
/**
 * Copies own enumerable keys from a source object to a target object. Every copy that
 * walks the keys of user supplied data goes through here, see isProtoKey.
 *
 * @param target Object to copy the keys to
 * @param source Object to copy the keys from
 * @param [skip] Optional predicate, return true to leave a key out
 * @returns The target object
 */
export declare const copyOwnKeys: <T extends object>(target: T, source: object | null | undefined, skip?: (key: string) => boolean) => T;
