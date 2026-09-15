import { EventEmitter } from 'node:events';
import net from 'node:net';
import tls from 'node:tls';
import { type Readable } from 'node:stream';
import * as shared from '../shared/index.js';
import type { NodemailerError } from '../errors.js';
import type XOAuth2 from '../xoauth2/index.js';
/**
 * Custom authentication handlers keyed by (case insensitive) SASL method name
 */
export type SMTPConnectionCustomAuthHandlers = {
    [method: string]: SMTPConnectionCustomAuthHandler;
};
/**
 * Options for the SMTP connection, see the SMTPConnection class description
 */
export interface SMTPConnectionOptions {
    /** Port to connect to, defaults to 587, or to 465 when secure is set */
    port?: number | string | undefined;
    /** Hostname or IP address to connect to, defaults to 'localhost' */
    host?: string | undefined;
    /** Use TLS from the start */
    secure?: boolean | undefined;
    /** Marks the provided socket as already upgraded to TLS */
    secured?: boolean | undefined;
    /** Server name for SNI, defaults to host when that is not an IP address */
    servername?: string | undefined;
    /** Ignore STARTTLS even when the server advertises it */
    ignoreTLS?: boolean | undefined;
    /** Force STARTTLS, fail when the server does not support it */
    requireTLS?: boolean | undefined;
    /** Continue unencrypted when the STARTTLS upgrade fails */
    opportunisticTLS?: boolean | undefined;
    /** Name of the client server, sent with EHLO/HELO, CRLF is stripped */
    name?: string | undefined;
    /** Outbound address to bind to */
    localAddress?: string | undefined;
    /** Time to wait in ms for the connection to establish, defaults to 2 minutes */
    connectionTimeout?: number | undefined;
    /** Time to wait in ms until the greeting is received, defaults to 30 seconds */
    greetingTimeout?: number | undefined;
    /** Time of inactivity in ms until the connection is closed, defaults to 10 minutes */
    socketTimeout?: number | undefined;
    /** Time to wait in ms for the DNS requests to be resolved, defaults to 30 seconds */
    dnsTimeout?: number | undefined;
    /** Use LMTP instead of SMTP */
    lmtp?: boolean | undefined;
    /** Bunyan compatible logger interface, true for the default console logger */
    logger?: shared.ExternalLogger | boolean | undefined;
    /** Pass SMTP traffic, including the message data, to the logger */
    debug?: boolean | undefined;
    /** Pass SMTP commands and responses to the logger */
    transactionLog?: boolean | undefined;
    /** Options for tls.connect */
    tls?: tls.ConnectionOptions | undefined;
    /** Existing socket to use instead of creating a new one, not connected yet */
    socket?: net.Socket | undefined;
    /** Already opened connection to use instead of creating a new one */
    connection?: net.Socket | undefined;
    /** Count loopback interfaces when checking which address families are usable */
    allowInternalNetworkInterfaces?: boolean | undefined;
    /** Logger component name, defaults to 'smtp-connection' */
    component?: string | undefined;
    /** Custom authentication handlers keyed by method name */
    customAuth?: SMTPConnectionCustomAuthHandlers | undefined;
}
/**
 * User and password credentials resolved for a SASL mechanism
 */
export interface SMTPConnectionCredentials {
    user?: string | undefined;
    pass?: string | undefined;
    /** Extra options for the authentication method, copied from the auth object */
    options?: {
        [key: string]: any;
    } | undefined;
}
/**
 * Authentication data for login()
 */
export interface SMTPConnectionAuth {
    /** Authentication type, informational */
    type?: string | undefined;
    /** SASL method to use, false or unset picks the first supported one (PLAIN if none is advertised) */
    method?: string | false | undefined;
    user?: string | undefined;
    pass?: string | undefined;
    /** Extra options for the authentication method */
    options?: {
        [key: string]: any;
    } | undefined;
    /** XOAuth2 token generator, selects XOAUTH2 when no method is set */
    oauth2?: XOAuth2 | undefined;
    /** Credentials for the SASL mechanism, filled in from user and pass when missing */
    credentials?: SMTPConnectionCredentials | undefined;
    /** Custom authentication handlers receive the auth object as is, so it may carry any other value */
    [key: string]: any;
}
/**
 * A parsed server reply, handed to the sendCommand callback of a custom authentication handler
 */
export interface SMTPConnectionCustomAuthResponse {
    /** The command that was sent */
    command: string;
    /** Raw server response */
    response: string;
    /** Numeric status code, 0 if the response did not start with one */
    status: number;
    /** Enhanced status code, if any */
    code?: string | undefined;
    /** Response text without the status codes */
    text: string;
}
/**
 * Callback for a command sent by a custom authentication handler
 */
export type SMTPConnectionCustomAuthCommandCallback = (err: Error | null, data: SMTPConnectionCustomAuthResponse) => void;
/**
 * The object a custom authentication handler is run with
 */
export interface SMTPConnectionCustomAuthContext {
    /** The auth object handed to login() */
    auth: SMTPConnectionAuth;
    /** Selected authentication method name */
    method: string;
    /** SMTP extensions the server advertised */
    extensions: string[];
    /** SASL methods the server advertised */
    authMethods: string[];
    /** Maximum message size the server accepts, false when not advertised */
    maxAllowedSize: number | false;
    /** Sends a command to the server. Returns a promise when no callback is given */
    sendCommand(cmd: string, done?: SMTPConnectionCustomAuthCommandCallback): Promise<SMTPConnectionCustomAuthResponse> | undefined;
    /** Marks the user as authenticated */
    resolve(): void;
    /** Fails the authentication with an error */
    reject(err: Error | string): void;
}
/**
 * A custom authentication handler. Calls resolve() or reject() on the context, or returns a promise
 */
export type SMTPConnectionCustomAuthHandler = (ctx: SMTPConnectionCustomAuthContext) => void | Promise<unknown>;
/**
 * An envelope address, either a plain string or an object with an address property
 */
export interface SMTPEnvelopeAddress {
    address?: string | undefined;
    name?: string | undefined;
}
/**
 * DSN parameters for the envelope (RFC 3461)
 */
export interface SMTPEnvelopeDsn {
    /** Return either 'HDRS' (headers) or 'FULL' (body) with the notification */
    ret?: string | null | undefined;
    /** Alias of ret */
    return?: string | undefined;
    /** Envelope identifier, sent as ENVID */
    envid?: string | null | undefined;
    /** Alias of envid */
    id?: string | undefined;
    /** When to notify: 'NEVER', or any combination of 'SUCCESS', 'FAILURE' and 'DELAY' */
    notify?: string | string[] | null | undefined;
    /** Original recipient, sent as ORCPT */
    recipient?: string | undefined;
    /** Alias of recipient, in the 'rfc822;address' form */
    orcpt?: string | null | undefined;
}
/**
 * Envelope object accepted by send()
 */
export interface SMTPEnvelope {
    /** Sender address */
    from?: string | SMTPEnvelopeAddress | undefined;
    /** Recipient address or addresses */
    to?: string | SMTPEnvelopeAddress | Array<string | SMTPEnvelopeAddress> | undefined;
    /** Message size in bytes, sent as the SIZE parameter when the server supports it */
    size?: number | string | undefined;
    /** DSN parameters, sent when the server supports the DSN extension */
    dsn?: SMTPEnvelopeDsn | undefined;
    /** Declare BODY=8BITMIME when the server supports it */
    use8BitMime?: boolean | undefined;
    /** RFC 8689: send the REQUIRETLS parameter, requires a TLS connection and server support */
    requireTLSExtensionEnabled?: boolean | undefined;
}
/**
 * The envelope as tracked by the connection while a message is being sent. The from and to
 * values are normalized to strings and the recipient bookkeeping is added by _setEnvelope
 */
export interface SMTPConnectionEnvelope extends SMTPEnvelope {
    from?: string | undefined;
    to?: string[] | undefined;
    /** Recipients still waiting for RCPT TO */
    rcptQueue: string[];
    /** Recipients the server rejected */
    rejected: string[];
    /** Errors for the rejected recipients */
    rejectedErrors: NodemailerError[];
    /** Recipients the server accepted */
    accepted: string[];
}
/**
 * Result of a sent message
 */
export interface SMTPConnectionSendInfo {
    /** Recipients the server accepted */
    accepted: string[];
    /** Recipients the server rejected */
    rejected: string[];
    /** EHLO response lines, without the greeting line */
    ehlo?: string[] | undefined;
    /** Errors for the rejected recipients */
    rejectedErrors?: NodemailerError[] | undefined;
    /** Time in ms spent on the envelope commands */
    envelopeTime?: number | undefined;
    /** Time in ms spent on streaming the message */
    messageTime?: number | undefined;
    /** Size of the encoded message in bytes */
    messageSize?: number | undefined;
    /** Final server response for the message */
    response?: string | undefined;
}
/**
 * Callback for send()
 */
export type SMTPConnectionSendCallback = (err: NodemailerError | null, info?: SMTPConnectionSendInfo) => void;
/**
 * Callback for login() and reset(), the result is true on success
 */
export type SMTPConnectionCallback = (err: NodemailerError | null, result?: boolean) => void;
/**
 * Callback for the message data response, yields the server response text
 */
export type SMTPConnectionResponseCallback = (err: NodemailerError | null, response?: string) => void;
/**
 * Callback for connect(), run once the SMTP handshake is finished
 */
export type SMTPConnectionConnectCallback = (err?: NodemailerError) => void;
/**
 * Options handed to net.connect or tls.connect, resolved hostname values are merged in
 */
export interface SMTPConnectionConnectOptions extends tls.ConnectionOptions {
    port: number;
    host: string;
    /** Outbound address to bind to */
    localAddress?: string | undefined;
    /** Count loopback interfaces when resolving the hostname */
    allowInternalNetworkInterfaces?: boolean | undefined;
    /** DNS lookup timeout in ms */
    timeout?: number | undefined;
}
/**
 * A queued handler for the next server response
 */
export type SMTPConnectionResponseAction = (str: string) => void;
/**
 * Generates a SMTP connection object
 *
 * Optional options object takes the following possible properties:
 *
 *  * **port** - is the port to connect to (defaults to 587 or 465)
 *  * **host** - is the hostname or IP address to connect to (defaults to 'localhost')
 *  * **secure** - use SSL
 *  * **ignoreTLS** - ignore server support for STARTTLS
 *  * **requireTLS** - forces the client to use STARTTLS
 *  * **name** - the name of the client server
 *  * **localAddress** - outbound address to bind to (see: http://nodejs.org/api/net.html#net_net_connect_options_connectionlistener)
 *  * **greetingTimeout** - Time to wait in ms until greeting message is received from the server (defaults to 30 seconds)
 *  * **connectionTimeout** - how many milliseconds to wait for the connection to establish (defaults to 2 minutes)
 *  * **socketTimeout** - Time of inactivity until the connection is closed (defaults to 10 minutes)
 *  * **dnsTimeout** - Time to wait in ms for the DNS requests to be resolved (defaults to 30 seconds)
 *  * **lmtp** - if true, uses LMTP instead of SMTP protocol
 *  * **logger** - bunyan compatible logger interface
 *  * **debug** - if true pass SMTP traffic to the logger
 *  * **tls** - options for createCredentials
 *  * **socket** - existing socket to use instead of creating a new one (see: http://nodejs.org/api/net.html#net_class_net_socket)
 *  * **secured** - boolean indicates that the provided socket has already been upgraded to tls
 *
 * @constructor
 * @namespace SMTP Client module
 * @param [options] Option properties
 */
declare class SMTPConnection extends EventEmitter {
    id: string;
    stage: string;
    options: SMTPConnectionOptions;
    secureConnection: boolean;
    alreadySecured: boolean;
    port: number;
    host: string;
    servername: string | false;
    allowInternalNetworkInterfaces: boolean;
    name: string;
    logger: shared.Logger;
    customAuth: Map<string, SMTPConnectionCustomAuthHandler>;
    /**
     * Expose version nr, just for the reference
     */
    version: string;
    /**
     * If true, then the user is authenticated
     */
    authenticated: boolean;
    /**
     * If set to true, this instance is no longer active
     * @private
     */
    destroyed: boolean;
    /**
     * Defines if the current connection is secure or not. If not,
     * STARTTLS can be used if available
     * @private
     */
    secure: boolean;
    lastServerResponse: string | false;
    /**
     * The socket connecting to the server
     * @public
     */
    _socket: net.Socket | false | null;
    /**
     * Set to true, if EHLO response includes "AUTH".
     * If false then authentication is not tried
     */
    allowsAuth: boolean;
    /**
     * True while the STARTTLS upgrade is in progress
     * @private
     */
    upgrading?: boolean | undefined;
    constructor(options?: SMTPConnectionOptions);
    /**
     * Creates a connection to a SMTP server and sets up connection
     * listener
     */
    connect(connectCallback?: SMTPConnectionConnectCallback): void;
    /**
     * Sends QUIT
     */
    quit(): void;
    /**
     * Closes the connection to the server
     */
    close(): void;
    /**
     * Authenticate user
     */
    login(authData: SMTPConnectionAuth | undefined, callback: SMTPConnectionCallback): void;
    /**
     * Sends a message
     *
     * @param envelope Envelope object, {from: addr, to: [addr]}
     * @param message String, Buffer or a Stream
     * @param callback Callback to return once sending is completed
     */
    send(envelope: SMTPEnvelope, message: string | Buffer | Readable, done: SMTPConnectionSendCallback): void;
    /**
     * Resets connection state
     *
     * @param callback Callback to return once connection is reset
     */
    reset(callback: SMTPConnectionCallback): void;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `SMTPConnection.Options` style references keep working
 */
declare namespace SMTPConnection {
    type Options = SMTPConnectionOptions;
    type AuthenticationType = SMTPConnectionAuth;
    type Credentials = SMTPConnectionCredentials;
    type Envelope = SMTPEnvelope;
    type DSNOptions = SMTPEnvelopeDsn;
    type SentMessageInfo = SMTPConnectionSendInfo;
    type CustomAuthenticationContext = SMTPConnectionCustomAuthContext;
    type CustomAuthenticationResponse = SMTPConnectionCustomAuthResponse;
    type CustomAuthenticationHandlers = SMTPConnectionCustomAuthHandlers;
}
export default SMTPConnection;
