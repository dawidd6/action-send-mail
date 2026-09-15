import { Stream } from 'node:stream';
import crypto from 'node:crypto';
import * as shared from '../shared/index.js';
import type { OutgoingHttpHeaders } from 'node:http';
/**
 * Receives the result of a provisionCallback run: an error, or the new access token and
 * an optional expire time in milliseconds
 */
export type XOAuth2ProvisionResultCallback = (err: Error | null, accessToken?: string, expires?: number) => void;
/**
 * Custom access token provider. `renew` is true when the existing token failed and a new
 * one is needed
 */
export type XOAuth2ProvisionCallback = (user: string, renew: boolean, callback: XOAuth2ProvisionResultCallback) => void;
/**
 * Receives an access token, or the error that prevented generating one
 */
export type XOAuth2TokenCallback = (err: Error | null, accessToken?: string) => void;
/**
 * A private key accepted by crypto.createSign().sign()
 */
export type XOAuth2PrivateKey = crypto.KeyLike | crypto.SignKeyObjectInput | crypto.SignPrivateKeyInput;
/**
 * Client information for token generation
 */
export interface XOAuth2Options {
    /** User e-mail address */
    user?: string | undefined;
    /** Client ID value */
    clientId?: string | undefined;
    /** Client secret value */
    clientSecret?: string | undefined;
    /** Refresh token for an user */
    refreshToken?: string | undefined;
    /** Endpoint for token generation, defaults to 'https://accounts.google.com/o/oauth2/token' */
    accessUrl?: string | undefined;
    /** An existing valid accessToken */
    accessToken?: string | undefined;
    /** Private key for JSW */
    privateKey?: XOAuth2PrivateKey | undefined;
    /** Optional Access Token expire time in ms */
    expires?: number | undefined;
    /** Optional TTL for Access Token in seconds */
    timeout?: number | undefined;
    /** Function to run when a new access token is required */
    provisionCallback?: XOAuth2ProvisionCallback | undefined;
    /** Optional TLS options forwarded to the HTTPS token request. Defaults to strict cert validation; supply { rejectUnauthorized: false } only for self-hosted OAuth providers on private CAs. */
    tls?: {
        [key: string]: any;
    } | undefined;
    /** Service account client id (the JWT issuer), switches to the JWT bearer flow */
    serviceClient?: string | undefined;
    /** Lifetime of the service account JWT in seconds, defaults to 5 minutes, capped at an hour */
    serviceRequestTimeout?: number | undefined;
    /** OAuth2 scope for the service account flow, defaults to 'https://mail.google.com/' */
    scope?: string | undefined;
    /** Logger component name, defaults to 'OAuth2' */
    component?: string | undefined;
    /** Extra headers for the token request */
    customHeaders?: OutgoingHttpHeaders | undefined;
    /** Extra form fields for the token request */
    customParams?: {
        [key: string]: any;
    } | undefined;
}
/**
 * The object emitted with the 'token' event once a new access token has been generated
 */
export interface XOAuth2Token {
    /** User e-mail address */
    user?: string | undefined;
    /** The new access token */
    accessToken: string;
    /** Expire time as a timestamp in milliseconds, 0 when unknown */
    expires: number;
}
/**
 * A getToken request waiting for an in-flight renewal to complete
 */
export interface XOAuth2QueuedRequest {
    renew: boolean;
    callback: XOAuth2TokenCallback;
}
/**
 * XOAUTH2 access_token generator for Gmail.
 * Create client ID for web applications in Google API console to use it.
 * See Offline Access for receiving the needed refreshToken for an user
 * https://developers.google.com/accounts/docs/OAuth2WebServer#offline
 *
 * Usage for generating access tokens with a custom method using provisionCallback:
 * provisionCallback(user, renew, callback)
 *   * user is the username to get the token for
 *   * renew is a boolean that if true indicates that existing token failed and needs to be renewed
 *   * callback is the callback to run with (error, accessToken [, expires])
 *     * accessToken is a string
 *     * expires is an optional expire time in milliseconds
 * If provisionCallback is used, then Nodemailer does not try to attempt generating the token by itself
 *
 * @constructor
 * @param options Client information for token generation
 * @param options.user User e-mail address
 * @param options.clientId Client ID value
 * @param options.clientSecret Client secret value
 * @param options.refreshToken Refresh token for an user
 * @param options.accessUrl Endpoint for token generation, defaults to 'https://accounts.google.com/o/oauth2/token'
 * @param options.accessToken An existing valid accessToken
 * @param options.privateKey Private key for JSW
 * @param options.expires Optional Access Token expire time in ms
 * @param options.timeout Optional TTL for Access Token in seconds
 * @param options.provisionCallback Function to run when a new access token is required
 * @param options.tls Optional TLS options forwarded to the HTTPS token request. Defaults to strict cert validation; supply { rejectUnauthorized: false } only for self-hosted OAuth providers on private CAs.
 */
declare class XOAuth2 extends Stream {
    options: XOAuth2Options;
    logger: shared.Logger;
    provisionCallback: XOAuth2ProvisionCallback | false;
    accessToken: string | false;
    expires: number;
    renewing: boolean;
    renewalQueue: XOAuth2QueuedRequest[];
    constructor(options?: XOAuth2Options, logger?: shared.ExternalLogger | boolean);
    /**
     * Returns or generates (if previous has expired) a XOAuth2 token
     *
     * @param renew If false then use cached access token (if available)
     * @param callback Callback function with error object and token string
     */
    getToken(renew: boolean, callback: XOAuth2TokenCallback): void;
    /**
     * Updates token values
     *
     * @param accessToken New access token
     * @param timeout Access token lifetime in seconds
     *
     * Emits 'token': { user: User email-address, accessToken: the new accessToken, timeout: TTL in seconds}
     */
    updateToken(accessToken: string, timeout?: number | string): void;
    /**
     * Generates a new XOAuth2 token with the credentials provided at initialization
     *
     * @param callback Callback function with error object and token string
     */
    generateToken(callback: XOAuth2TokenCallback): void;
    /**
     * Converts an access_token and user id into a base64 encoded XOAuth2 token
     *
     * @param [accessToken] Access token string
     * @return Base64 encoded token for IMAP or SMTP login
     */
    buildXOAuth2Token(accessToken?: string): string;
    /**
     * Custom POST request handler.
     * This is only needed to keep paths short in Windows, usually this module
     * is a dependency of a dependency and if it tries to require something
     * like the request module the paths get way too long to handle for Windows.
     * As we do only a simple POST request we do not actually require complicated
     * logic support (no redirects, no nothing) anyway.
     *
     * @param url Url to POST to
     * @param payload Payload to POST
     * @param params Client options, the customHeaders and tls values are used for the request
     * @param callback Callback function with (err, buff)
     */
    postRequest(url: string, payload: {
        [key: string]: any;
    } | string | Buffer, params: XOAuth2Options, callback: (err: Error | null, buff?: Buffer) => void): void;
    /**
     * Encodes a buffer or a string into Base64url format
     *
     * @param data The data to convert
     * @return The encoded string
     */
    toBase64URL(data: Buffer | string): string;
    /**
     * Creates a JSON Web Token signed with RS256 (SHA256 + RSA)
     *
     * @param payload The payload to include in the generated token
     * @return The generated and signed token
     */
    jwtSignRS256(payload: {
        [key: string]: any;
    }): string;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `XOAuth2.Options` style references keep working
 */
declare namespace XOAuth2 {
    type Options = XOAuth2Options;
    type Token = XOAuth2Token;
}
export default XOAuth2;
