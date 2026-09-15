/**
 * Parsed URL in the shape of the legacy `url.parse()` result
 */
export interface ParsedUrl {
    protocol: string | null;
    host: string | null;
    hostname: string | null;
    port: string | null;
    pathname: string | null;
    search: string | null;
    path: string | null;
    href: string;
    auth: string | null;
    /** Decoded user name, null when the URL carries no credentials */
    username: string | null;
    /** Decoded password, null when the URL carries none */
    password: string | null;
    query: string | null | Record<string, string | string[]>;
}
export declare const parse: (input?: string | null, parseQueryString?: boolean) => ParsedUrl;
export declare const resolve: (from: string, to: string) => string;
