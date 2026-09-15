/**
 * Options for the Cookies jar
 */
export interface CookiesOptions {
    /** Lifetime in seconds for cookies that do not set their own expiration (default 1800) */
    sessionTimeout?: number | string | undefined;
}
/**
 * A cookie as parsed from a 'Set-Cookie:' header and kept in the jar
 */
export interface Cookie {
    name?: string | undefined;
    value?: string | undefined;
    domain?: string | undefined;
    path?: string | undefined;
    expires?: Date | undefined;
    secure?: boolean | undefined;
    httponly?: boolean | undefined;
}
/**
 * Creates a biskviit cookie jar for managing cookie values in memory
 *
 * @constructor
 * @param [options] Optional options object
 */
export default class Cookies {
    options: CookiesOptions;
    cookies: Cookie[];
    constructor(options?: CookiesOptions);
    /**
     * Stores a cookie string to the cookie storage
     *
     * @param cookieStr Value from the 'Set-Cookie:' header
     * @param url Current URL
     */
    set(cookieStr: string, url?: string): boolean;
    /**
     * Returns cookie string for the 'Cookie:' header.
     *
     * @param url URL to check for
     * @returns Cookie header or empty string if no matches were found
     */
    get(url?: string): string;
    /**
     * Lists all valied cookie objects for the specified URL
     *
     * @param url URL to check for
     * @returns An array of cookie objects
     */
    list(url?: string): Cookie[];
    /**
     * Parses cookie string from the 'Set-Cookie:' header
     *
     * @param cookieStr String from the 'Set-Cookie:' header
     * @returns Cookie object
     */
    parse(cookieStr?: string): Cookie;
    /**
     * Checks if a cookie object is valid for a specified URL
     *
     * @param cookie Cookie object
     * @param url URL to check for
     * @returns true if cookie is valid for specifiec URL
     */
    match(cookie: Cookie, url?: string): boolean;
    /**
     * Adds (or updates/removes if needed) a cookie object to the cookie storage
     *
     * @param cookie Cookie value to be stored
     */
    add(cookie: Cookie): boolean;
    /**
     * Checks if two cookie objects are the same
     *
     * @param a Cookie to check against
     * @param b Cookie to check against
     * @returns True, if the cookies are the same
     */
    compare(a: Cookie, b: Cookie): boolean;
    /**
     * Checks if a cookie is expired
     *
     * @param cookie Cookie object to check against
     * @returns True, if the cookie is expired
     */
    isExpired(cookie: Cookie): boolean;
    /**
     * Returns the default path for an URL path argument, the default-path of
     * RFC 6265 section 5.1.4. A cookie that carries no Path attribute is scoped
     * to the directory of the URL it was set from
     *
     * @param pathname
     * @returns Default path
     */
    getPath(pathname?: string | null): string;
}
