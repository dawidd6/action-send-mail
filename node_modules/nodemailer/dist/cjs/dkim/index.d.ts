import { type DKIMKey, type DKIMPrivateKey, type DKIMSignOptions } from './sign.js';
import { PassThrough, type Readable } from 'node:stream';
/**
 * A single DKIM signing key
 */
export type { DKIMKey, DKIMPrivateKey, DKIMSignOptions };
/**
 * Options for the DKIM signer
 */
export interface DKIMOptions extends DKIMSignOptions {
    /** One or more signing keys, used instead of the domainName, keySelector and privateKey options */
    keys?: DKIMKey | DKIMKey[] | undefined;
    /** Directory for buffering large message bodies to disk, no buffering when not set */
    cacheDir?: string | false | undefined;
    /** Body size in bytes from which the body is buffered to cacheDir, defaults to 10 MB */
    cacheTreshold?: number | undefined;
    /** Hash algorithm for the body hash and the signature, defaults to sha256 */
    hashAlgo?: string | undefined;
}
/**
 * The signed message as returned by DKIM#sign
 */
export interface DKIMSignedStream extends PassThrough {
    /** true if the message body was buffered to cacheDir while signing */
    usingCache: boolean;
}
declare class DKIM {
    options: DKIMOptions;
    keys: DKIMKey[];
    constructor(options: DKIMOptions);
    sign(input: Readable | Buffer | string, extraOptions?: DKIMOptions): DKIMSignedStream;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `DKIM.Options` style references keep working
 */
declare namespace DKIM {
    type Options = DKIMOptions;
    type SingleKeyOptions = Omit<DKIMOptions, 'keys'>;
}
export default DKIM;
