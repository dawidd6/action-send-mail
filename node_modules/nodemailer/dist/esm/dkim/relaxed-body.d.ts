import { Transform } from 'node:stream';
import crypto from 'node:crypto';
/**
 * Options for the relaxed body hash stream
 */
export interface RelaxedBodyOptions {
    /** Hash algorithm for the body hash, defaults to sha256 */
    hashAlgo?: string | undefined;
    /** Collect the canonicalized body and emit it with the 'hash' event */
    debug?: boolean | undefined;
}
/**
 * Passes the message body through unchanged and hashes its relaxed
 * canonicalization (RFC 6376 section 3.4.4) on the side: whitespace at the end
 * of a line is dropped, runs of whitespace within a line become a single space,
 * every line ends with CRLF, empty lines at the end of the body are ignored and
 * a non-empty body always ends with CRLF. Bytes are canonicalized as they arrive,
 * so a line of any length costs constant memory.
 */
export default class RelaxedBody extends Transform {
    bodyHash: crypto.Hash;
    /** Bytes of the original body seen so far */
    byteLength: number;
    debug: boolean | undefined;
    constructor(options?: RelaxedBodyOptions);
    updateHash(chunk: Buffer, final?: boolean): void;
}
