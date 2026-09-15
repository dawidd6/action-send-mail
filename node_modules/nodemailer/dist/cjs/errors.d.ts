/**
 * Nodemailer Error Codes
 *
 * Centralized error code definitions for consistent error handling.
 *
 * Usage:
 *   import * as errors from './errors.js';
 *   const err: NodemailerError = new Error('Connection closed');
 *   err.code = errors.ECONNECTION;
 */
/**
 * Error code descriptions for documentation and debugging
 */
export declare const ERROR_CODES: {
    readonly ECONNECTION: "Connection closed unexpectedly";
    readonly ETIMEDOUT: "Connection or operation timed out";
    readonly ESOCKET: "Socket-level error";
    readonly EDNS: "DNS resolution failed";
    readonly ETLS: "TLS handshake or STARTTLS failed";
    readonly EREQUIRETLS: "REQUIRETLS not supported by server (RFC 8689)";
    readonly EPROTOCOL: "Invalid SMTP server response";
    readonly EENVELOPE: "Invalid mail envelope (sender or recipients)";
    readonly EMESSAGE: "Message delivery error";
    readonly ESTREAM: "Stream processing error";
    readonly EAUTH: "Authentication failed";
    readonly ENOAUTH: "Authentication credentials not provided";
    readonly EOAUTH2: "OAuth2 token generation or refresh error";
    readonly EMAXLIMIT: "Pool resource limit reached (max messages per connection)";
    readonly EMAXRECIPIENTS: "Recipient count exceeds maxRecipients";
    readonly ESENDMAIL: "Sendmail command error";
    readonly ESES: "AWS SES transport error";
    readonly ECONFIG: "Invalid configuration";
    readonly EPROXY: "Proxy connection error";
    readonly EFILEACCESS: "File access rejected (disableFileAccess is set)";
    readonly EURLACCESS: "URL access rejected (disableUrlAccess is set)";
    readonly EFETCH: "HTTP fetch error";
};
/**
 * Union of all known Nodemailer error codes
 */
export type ErrorCode = keyof typeof ERROR_CODES;
export declare const ECONNECTION = "ECONNECTION";
export declare const ETIMEDOUT = "ETIMEDOUT";
export declare const ESOCKET = "ESOCKET";
export declare const EDNS = "EDNS";
export declare const ETLS = "ETLS";
export declare const EREQUIRETLS = "EREQUIRETLS";
export declare const EPROTOCOL = "EPROTOCOL";
export declare const EENVELOPE = "EENVELOPE";
export declare const EMESSAGE = "EMESSAGE";
export declare const ESTREAM = "ESTREAM";
export declare const EAUTH = "EAUTH";
export declare const ENOAUTH = "ENOAUTH";
export declare const EOAUTH2 = "EOAUTH2";
export declare const EMAXLIMIT = "EMAXLIMIT";
export declare const EMAXRECIPIENTS = "EMAXRECIPIENTS";
export declare const ESENDMAIL = "ESENDMAIL";
export declare const ESES = "ESES";
export declare const ECONFIG = "ECONFIG";
export declare const EPROXY = "EPROXY";
export declare const EFILEACCESS = "EFILEACCESS";
export declare const EURLACCESS = "EURLACCESS";
export declare const EFETCH = "EFETCH";
/**
 * An Error together with the properties Nodemailer attaches to the errors it
 * hands to callers. Every property is optional, the set that is present
 * depends on where the error originated.
 */
export interface NodemailerError extends Error {
    /** Nodemailer error code, see ERROR_CODES */
    code?: string | undefined;
    /** SMTP command that was in flight when the server replied with an error */
    command?: string | undefined;
    /** Raw SMTP server response */
    response?: string | undefined;
    /** Numeric SMTP response code */
    responseCode?: number | undefined;
    /** URL of the resource that could not be fetched */
    sourceUrl?: string | undefined;
    /** Recipient address the error applies to */
    recipient?: string | undefined;
    /** Recipient addresses rejected by the server */
    rejected?: string[] | undefined;
    /** Per-recipient errors for the rejected addresses */
    rejectedErrors?: NodemailerError[] | undefined;
}
/**
 * Node style callback: called with an error, or with null and the result
 */
export type Callback<T> = (err: NodemailerError | null, result: T) => void;
/**
 * Callback as the library calls it on its error paths: with an error alone, or with null and
 * the result. The public signatures use Callback, internally the error paths cast to this
 */
export type ResultCallback<T> = (err: NodemailerError | null, result?: T) => void;
