import http from 'node:http';
import { PassThrough, type Readable } from 'node:stream';
import Cookies from './cookies.js';
/**
 * Options for nmfetch
 */
export interface FetchOptions {
    /** HTTP method, defaults to GET, or to POST when a body is given */
    method?: string | undefined;
    /** Request headers, keys are lowercased before use */
    headers?: http.OutgoingHttpHeaders | undefined;
    /** Overrides the default User-Agent header */
    userAgent?: string | undefined;
    /** Cookie string(s) to seed the cookie jar with for this URL */
    cookie?: string | string[] | false | undefined;
    /** Cookie jar shared across redirects, created when missing */
    cookies?: Cookies | undefined;
    /** Request body: a readable stream, a Buffer, a form object or a string */
    body?: Readable | Buffer | {
        [key: string]: any;
    } | string | false | undefined;
    /** Content-Type header for the body, false leaves it out for a stream body */
    contentType?: string | false | undefined;
    /** TLS settings, only the keys listed in TLS_OPTION_KEYS are used */
    tls?: {
        [key: string]: any;
    } | undefined;
    /** Request timeout in milliseconds */
    timeout?: number | undefined;
    /** Maximum number of redirects to follow (default 5) */
    maxRedirects?: number | undefined;
    /** Resolve responses with a status code of 300 or above instead of emitting an error */
    allowErrorResponse?: boolean | undefined;
    /** Redirects followed so far, set by nmfetch itself */
    redirects?: number | undefined;
    /** Response stream shared across redirects, set by nmfetch itself */
    fetchRes?: FetchResponse | undefined;
}
/**
 * The stream nmfetch returns. The response body is piped into it, the status code and
 * headers of the final response are attached once they arrive
 */
export interface FetchResponse extends PassThrough {
    statusCode?: number | undefined;
    headers?: http.IncomingHttpHeaders | undefined;
}
declare function nmfetch(url: string, options?: FetchOptions): FetchResponse;
declare namespace nmfetch {
    var Cookies: typeof import("./cookies.js").default;
}
export default nmfetch;
