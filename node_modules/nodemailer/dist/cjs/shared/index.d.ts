import { isProtoKey, copyOwnKeys } from './objects.js';
import os from 'node:os';
import type { Readable } from 'node:stream';
import type { OutgoingHttpHeaders } from 'node:http';
export { isProtoKey, copyOwnKeys };
/**
 * Options for resolveHostname. The object is also handed to dns.Resolver, so its
 * `timeout` and `tries` settings apply to the lookups
 */
export interface ResolveHostnameOptions {
    /** Hostname or IP address to resolve */
    host?: string | undefined;
    /** Server name for TLS, used as the host when no host is set */
    servername?: string | undefined;
    /** Count loopback interfaces when checking which address families are usable */
    allowInternalNetworkInterfaces?: boolean | undefined;
    /** How long a resolved value stays cached, in milliseconds (default 5 minutes) */
    dnsTtl?: number | undefined;
    /** Query timeout in milliseconds, passed to dns.Resolver */
    timeout?: number | undefined;
    /** Number of query attempts, passed to dns.Resolver */
    tries?: number | undefined;
}
/**
 * Resolved value handed to the resolveHostname callback
 */
export interface ResolvedHostname {
    /** Server name to use for TLS, false when an IP literal was given without one */
    servername?: string | false | undefined;
    /** Address to connect to, picked at random from the resolved addresses */
    host?: string | null | undefined;
    /** Whether the value came from the DNS cache */
    cached?: boolean | undefined;
    /** The resolver error when a cached value was used because of it */
    error?: Error | undefined;
}
/**
 * Resolved addresses as stored in the DNS cache
 */
export interface DnsCacheValue {
    addresses: string[];
}
/**
 * A DNS cache entry
 */
export interface DnsCacheEntry {
    value: DnsCacheValue;
    /** Expiration time as a timestamp, entries without one never expire */
    expires?: number | undefined;
}
/**
 * Configuration object parsed from a connection url. Query parameters become
 * top level keys, `tls.*` parameters go into `tls`
 */
export interface ConnectionUrlOptions {
    secure?: boolean | undefined;
    direct?: boolean | undefined;
    port?: number | undefined;
    host?: string | undefined;
    /** Well-known service name from the ?service= query parameter */
    service?: string | undefined;
    auth?: {
        user: string;
        pass: string;
    } | undefined;
    tls?: {
        [key: string]: unknown;
    } | undefined;
    [key: string]: unknown;
}
/**
 * Structured data attached to a log line. tnx, sid and cid drive the line prefix
 * of the default console logger
 */
export interface LogEntry {
    /** 'server' or 'client' for SMTP transaction lines */
    tnx?: string | undefined;
    /** Session id */
    sid?: string | undefined;
    /** Connection id */
    cid?: string | number | undefined;
    level?: string | undefined;
    [key: string]: any;
}
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
/**
 * A logger supplied by the caller, bunyan style. Any object works, a level it does not
 * implement is routed to one it does, see _logFunc
 */
export interface ExternalLogger {
    trace?(...args: any[]): any;
    debug?(...args: any[]): any;
    info?(...args: any[]): any;
    warn?(...args: any[]): any;
    error?(...args: any[]): any;
    fatal?(...args: any[]): any;
    log?(...args: any[]): any;
    [level: string]: any;
}
/**
 * Options for getLogger
 */
export interface GetLoggerOptions {
    /** A bunyan compatible logger, true for the default console logger, false or unset for no logging */
    logger?: ExternalLogger | boolean | undefined;
}
/**
 * The bunyan compatible logger interface returned by getLogger
 */
export interface Logger {
    trace(data?: LogEntry, message?: string, ...args: any[]): void;
    debug(data?: LogEntry, message?: string, ...args: any[]): void;
    info(data?: LogEntry, message?: string, ...args: any[]): void;
    warn(data?: LogEntry, message?: string, ...args: any[]): void;
    error(data?: LogEntry, message?: string, ...args: any[]): void;
    fatal(data?: LogEntry, message?: string, ...args: any[]): void;
}
/**
 * A parsed data URI
 */
export interface ParsedDataURI {
    /** Decoded payload */
    data: Buffer;
    /** 'base64', 'utf8' or 'utf-8' when the URI declared one, null otherwise */
    encoding: string | null;
    contentType: string;
    /** Further `key=value` parameters from the metadata section */
    params: {
        [key: string]: string;
    };
}
/**
 * Access policy for resolveContent
 */
export interface ResolveContentOptions {
    /** Reject content that points to a file path */
    disableFileAccess?: boolean | undefined;
    /** Reject content that points to a URL */
    disableUrlAccess?: boolean | undefined;
}
/**
 * An object value resolveContent understands. A plain string or Buffer value is returned as
 * is and a readable stream is read into a Buffer, an object carries the content in `content`
 * or points to it with `path` or `href`
 */
export interface ContentDescriptor {
    /** The content itself, a string, a Buffer or a readable stream */
    content?: string | Buffer | Readable | undefined;
    /** Encoding of a string `content`, it is decoded into a Buffer unless it is utf8 or ascii */
    encoding?: string | undefined;
    /** File path, http(s) URL or data URI to read the content from */
    path?: string | undefined;
    /** URL to fetch the content from */
    href?: string | undefined;
    /** Request headers for a URL fetch */
    httpHeaders?: OutgoingHttpHeaders | undefined;
    /** TLS settings for a URL fetch, see nmfetch */
    tls?: {
        [key: string]: any;
    } | undefined;
}
export type ResolveContentCallback = (err: Error | null, value?: any) => void;
export declare let networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]> | undefined;
export declare const dnsCache: Map<string, DnsCacheEntry>;
export declare const resolveHostname: (options: ResolveHostnameOptions | undefined, callback: (err: Error | null, result?: ResolvedHostname) => void) => void;
/**
 * Parses connection url to a structured configuration object
 *
 * @param str Connection url
 * @return Configuration object
 */
export declare const parseConnectionUrl: (str?: string | null) => ConnectionUrlOptions;
/**
 * Returns a bunyan-compatible logger interface. Uses either provided logger or
 * creates a default console logger
 *
 * @param [options] Options object that might include 'logger' value
 * @return bunyan compatible logger
 */
export declare const getLogger: (options?: GetLoggerOptions, defaults?: LogEntry) => Logger;
/**
 * Wrapper for creating a callback that either resolves or rejects a promise
 * based on input
 *
 * @param resolve Function to run if callback is called
 * @param reject Function to run if callback ends with an error
 */
export declare const callbackPromise: (resolve: (...args: any[]) => void, reject: (reason?: any) => void) => (...args: any[]) => void;
export declare const parseDataURI: (uri: unknown) => ParsedDataURI | null;
/**
 * Resolves a String or a Buffer value for content value. Useful if the value
 * is a Stream or a file or an URL. If the value is a Stream, overwrites
 * the stream object with the resolved value (you can't stream a value twice).
 *
 * This is useful when you want to create a plugin that needs a content value,
 * for example the `html` or `text` value as a String or a Buffer but not as
 * a file path or an URL.
 *
 * @param data An object or an Array you want to resolve an element for, see ContentDescriptor for the values it understands
 * @param key Property name or an Array index
 * @param [options] Optional access policy: { disableFileAccess, disableUrlAccess }
 * @param callback Callback function with (err, value)
 */
export declare function resolveContent(data: {
    [key: string]: any;
}, key: string | number, callback: ResolveContentCallback): void;
export declare function resolveContent(data: {
    [key: string]: any;
}, key: string | number, options: ResolveContentOptions | false | undefined, callback: ResolveContentCallback): void;
export declare function resolveContent(data: {
    [key: string]: any;
}, key: string | number, options?: ResolveContentOptions | false): Promise<any>;
export declare function resolveContent(data: {
    [key: string]: any;
}, key: string | number, options: ResolveContentOptions | false | undefined, callback: ResolveContentCallback | undefined): Promise<any> | void;
/**
 * Copies properties from source objects to target objects
 */
export declare const assign: (...args: ({
    [key: string]: any;
} | false | null | undefined)[]) => {
    [key: string]: any;
};
export declare const encodeXText: (str: string) => string;
