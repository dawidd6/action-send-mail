import crypto from 'node:crypto';
import type { MessageParserHeaderLine } from './message-parser.js';
/**
 * Private key accepted by crypto.Sign#sign: a PEM string, a Buffer, a KeyObject or an
 * object with the key and its passphrase
 */
export type DKIMPrivateKey = crypto.KeyLike | crypto.SignKeyObjectInput | crypto.SignPrivateKeyInput;
/**
 * Options for the DKIM signature header generator
 */
export interface DKIMKey {
    /** Domain name to be signed for */
    domainName?: string | undefined;
    /** DKIM key selector to use */
    keySelector?: string | undefined;
    /** DKIM private key to use */
    privateKey?: DKIMPrivateKey | undefined;
}
export interface DKIMSignOptions extends DKIMKey {
    /** Colon separated list of header field names to sign, defaults to the RFC4871 list */
    headerFieldNames?: string | undefined;
    /** Colon separated list of header field names to leave out of the signature */
    skipFields?: string | undefined;
}
/**
 * Canonicalized headers and the list of field names that went into them
 */
export interface DKIMRelaxedHeaders {
    /** Relaxed header lines, each terminated with CRLF, one character per byte ('binary' encoding) */
    headers: string;
    /** Colon separated list of the field names that were included */
    fieldNames: string;
}
/**
 * Returns DKIM signature header line
 *
 * @param headers Parsed headers object from MessageParser
 * @param bodyHash Base64 encoded hash of the message
 * @param options DKIM options
 * @param options.domainName Domain name to be signed for
 * @param options.keySelector DKIM key selector to use
 * @param options.privateKey DKIM private key to use
 * @return Complete header line
 */
declare function sign(headers: MessageParserHeaderLine[], hashAlgo: string, bodyHash: string, options?: DKIMSignOptions): string | false;
declare namespace sign {
    var relaxedHeaders: (headers: MessageParserHeaderLine[], fieldNames?: string, skipFields?: string) => DKIMRelaxedHeaders;
}
export default sign;
