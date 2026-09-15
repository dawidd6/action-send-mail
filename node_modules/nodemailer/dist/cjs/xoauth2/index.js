"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_stream_1 = require("node:stream");
const index_js_1 = __importDefault(require("../fetch/index.js"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const shared = __importStar(require("../shared/index.js"));
const errors = __importStar(require("../errors.js"));
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
class XOAuth2 extends node_stream_1.Stream {
    constructor(options, logger) {
        super();
        this.options = options || {};
        if (options && options.serviceClient) {
            if (!options.privateKey || !options.user) {
                const err = new Error('Options "privateKey" and "user" are required for service account!');
                err.code = errors.EOAUTH2;
                setImmediate(() => this.emit('error', err));
                return;
            }
            const serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
            this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
        }
        this.logger = shared.getLogger({
            logger
        }, {
            component: this.options.component || 'OAuth2'
        });
        this.provisionCallback = typeof this.options.provisionCallback === 'function' ? this.options.provisionCallback : false;
        this.options.accessUrl = this.options.accessUrl || 'https://accounts.google.com/o/oauth2/token';
        this.options.customHeaders = this.options.customHeaders || {};
        this.options.customParams = this.options.customParams || {};
        this.accessToken = this.options.accessToken || false;
        if (this.options.expires && Number(this.options.expires)) {
            this.expires = this.options.expires;
        }
        else {
            const timeout = Math.max(Number(this.options.timeout) || 0, 0);
            this.expires = (timeout && Date.now() + timeout * 1000) || 0;
        }
        this.renewing = false; // Track if renewal is in progress
        this.renewalQueue = []; // Queue for pending requests during renewal
    }
    /**
     * Returns or generates (if previous has expired) a XOAuth2 token
     *
     * @param renew If false then use cached access token (if available)
     * @param callback Callback function with error object and token string
     */
    getToken(renew, callback) {
        if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
            this.logger.debug({
                tnx: 'OAUTH2',
                user: this.options.user,
                action: 'reuse'
            }, 'Reusing existing access token for %s', this.options.user);
            return callback(null, this.accessToken);
        }
        // check if it is possible to renew, if not, return the current token or error
        if (!this.provisionCallback && !this.options.refreshToken && !this.options.serviceClient) {
            if (this.accessToken) {
                this.logger.debug({
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'reuse'
                }, 'Reusing existing access token (no refresh capability) for %s', this.options.user);
                return callback(null, this.accessToken);
            }
            this.logger.error({
                tnx: 'OAUTH2',
                user: this.options.user,
                action: 'renew'
            }, 'Cannot renew access token for %s: No refresh mechanism available', this.options.user);
            const err = new Error("Can't create new access token for user");
            err.code = errors.EOAUTH2;
            return callback(err);
        }
        // If renewal already in progress, queue this request instead of starting another
        if (this.renewing) {
            this.renewalQueue.push({ renew, callback });
            return;
        }
        this.renewing = true;
        // Handles token renewal completion - processes queued requests and cleans up
        const generateCallback = (err, accessToken) => {
            this.renewalQueue.forEach(item => item.callback(err, accessToken));
            this.renewalQueue = [];
            this.renewing = false;
            if (err) {
                this.logger.error({
                    err,
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'renew'
                }, 'Failed generating new Access Token for %s', this.options.user);
            }
            else {
                this.logger.info({
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'renew'
                }, 'Generated new Access Token for %s', this.options.user);
            }
            // Complete original request
            callback(err, accessToken);
        };
        if (this.provisionCallback) {
            this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires) => {
                if (!err && accessToken) {
                    this.accessToken = accessToken;
                    this.expires = expires || 0;
                }
                generateCallback(err, accessToken);
            });
        }
        else {
            this.generateToken(generateCallback);
        }
    }
    /**
     * Updates token values
     *
     * @param accessToken New access token
     * @param timeout Access token lifetime in seconds
     *
     * Emits 'token': { user: User email-address, accessToken: the new accessToken, timeout: TTL in seconds}
     */
    updateToken(accessToken, timeout) {
        this.accessToken = accessToken;
        timeout = Math.max(Number(timeout) || 0, 0);
        this.expires = (timeout && Date.now() + timeout * 1000) || 0;
        this.emit('token', {
            user: this.options.user,
            accessToken: accessToken || '',
            expires: this.expires
        });
    }
    /**
     * Generates a new XOAuth2 token with the credentials provided at initialization
     *
     * @param callback Callback function with error object and token string
     */
    generateToken(callback) {
        let urlOptions;
        let loggedUrlOptions;
        if (this.options.serviceClient) {
            // service account - https://developers.google.com/identity/protocols/OAuth2ServiceAccount
            const iat = Math.floor(Date.now() / 1000); // unix time
            const tokenData = {
                iss: this.options.serviceClient,
                scope: this.options.scope || 'https://mail.google.com/',
                sub: this.options.user,
                aud: this.options.accessUrl,
                iat,
                exp: iat + this.options.serviceRequestTimeout
            };
            let token;
            try {
                token = this.jwtSignRS256(tokenData);
            }
            catch (_err) {
                const err = new Error("Can't generate token. Check your auth options");
                err.code = errors.EOAUTH2;
                return callback(err);
            }
            urlOptions = {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: token
            };
            loggedUrlOptions = {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: tokenData
            };
        }
        else {
            if (!this.options.refreshToken) {
                const err = new Error("Can't create new access token for user");
                err.code = errors.EOAUTH2;
                return callback(err);
            }
            // web app - https://developers.google.com/identity/protocols/OAuth2WebServer
            urlOptions = {
                client_id: this.options.clientId || '',
                client_secret: this.options.clientSecret || '',
                refresh_token: this.options.refreshToken,
                grant_type: 'refresh_token'
            };
            loggedUrlOptions = {
                client_id: this.options.clientId || '',
                client_secret: (this.options.clientSecret || '').substr(0, 6) + '...',
                refresh_token: (this.options.refreshToken || '').substr(0, 6) + '...',
                grant_type: 'refresh_token'
            };
        }
        Object.assign(urlOptions, this.options.customParams);
        Object.assign(loggedUrlOptions, this.options.customParams);
        this.logger.debug({
            tnx: 'OAUTH2',
            user: this.options.user,
            action: 'generate'
        }, 'Requesting token using: %s', JSON.stringify(loggedUrlOptions));
        this.postRequest(this.options.accessUrl, urlOptions, this.options, (error, body) => {
            let data;
            if (error) {
                return callback(error);
            }
            try {
                data = JSON.parse(body.toString());
            }
            catch (E) {
                return callback(E);
            }
            if (!data || typeof data !== 'object') {
                this.logger.debug({
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'post'
                }, 'Response: %s', (body || '').toString());
                const err = new Error('Invalid authentication response');
                err.code = errors.EOAUTH2;
                return callback(err);
            }
            const logData = Object.assign({}, data);
            if (logData.access_token) {
                logData.access_token = (logData.access_token || '').toString().substr(0, 6) + '...';
            }
            this.logger.debug({
                tnx: 'OAUTH2',
                user: this.options.user,
                action: 'post'
            }, 'Response: %s', JSON.stringify(logData));
            if (data.error) {
                // Error Response : https://tools.ietf.org/html/rfc6749#section-5.2
                let errorMessage = data.error;
                if (data.error_description) {
                    errorMessage += ': ' + data.error_description;
                }
                if (data.error_uri) {
                    errorMessage += ' (' + data.error_uri + ')';
                }
                const err = new Error(errorMessage);
                err.code = errors.EOAUTH2;
                return callback(err);
            }
            if (data.access_token) {
                this.updateToken(data.access_token, data.expires_in);
                return callback(null, this.accessToken);
            }
            const err = new Error('No access token');
            err.code = errors.EOAUTH2;
            return callback(err);
        });
    }
    /**
     * Converts an access_token and user id into a base64 encoded XOAuth2 token
     *
     * @param [accessToken] Access token string
     * @return Base64 encoded token for IMAP or SMTP login
     */
    buildXOAuth2Token(accessToken) {
        const authData = ['user=' + (this.options.user || ''), 'auth=Bearer ' + (accessToken || this.accessToken), '', ''];
        return Buffer.from(authData.join('\x01'), 'utf-8').toString('base64');
    }
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
    postRequest(url, payload, params, callback) {
        let returned = false;
        const chunks = [];
        let chunklen = 0;
        const fetchOptions = {
            method: 'post',
            headers: params.customHeaders,
            body: payload,
            allowErrorResponse: true
        };
        // OAuth2 token endpoints are credential-bearing. src/fetch already
        // validates certs by default; pin rejectUnauthorized:true here so the
        // token fetch stays strict, while still layering params.tls (the
        // user's options.tls) on top so callers with a self-hosted provider on
        // a private CA can override.
        if (/^https:/i.test(url)) {
            fetchOptions.tls = Object.assign({ rejectUnauthorized: true }, params.tls || {});
        }
        const req = (0, index_js_1.default)(url, fetchOptions);
        req.on('readable', () => {
            let chunk;
            while ((chunk = req.read()) !== null) {
                chunks.push(chunk);
                chunklen += chunk.length;
            }
        });
        req.once('error', err => {
            if (returned) {
                return;
            }
            returned = true;
            return callback(err);
        });
        req.once('end', () => {
            if (returned) {
                return;
            }
            returned = true;
            return callback(null, Buffer.concat(chunks, chunklen));
        });
    }
    /**
     * Encodes a buffer or a string into Base64url format
     *
     * @param data The data to convert
     * @return The encoded string
     */
    toBase64URL(data) {
        if (typeof data === 'string') {
            data = Buffer.from(data);
        }
        return data
            .toString('base64')
            .replace(/[=]+/g, '') // remove '='s
            .replace(/\+/g, '-') // '+' → '-'
            .replace(/\//g, '_'); // '/' → '_'
    }
    /**
     * Creates a JSON Web Token signed with RS256 (SHA256 + RSA)
     *
     * @param payload The payload to include in the generated token
     * @return The generated and signed token
     */
    jwtSignRS256(payload) {
        const signedPayload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map(val => this.toBase64URL(val)).join('.');
        const signature = node_crypto_1.default
            .createSign('RSA-SHA256')
            .update(signedPayload)
            .sign(this.options.privateKey);
        return signedPayload + '.' + this.toBase64URL(signature);
    }
}
exports.default = XOAuth2;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
