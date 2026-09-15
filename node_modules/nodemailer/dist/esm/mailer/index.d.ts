import { EventEmitter } from 'node:events';
import * as shared from '../shared/index.js';
import DKIM, { type DKIMOptions } from '../dkim/index.js';
import MailMessage, { type MailDefaults, type SendMailOptions } from './mail-message.js';
import net from 'node:net';
import type { ConnectionOptions } from 'node:tls';
import type { MailComposerAlternative, MailComposerAttachment, MailComposerIcalEvent, MailComposerListHeaderEntry, MailComposerListHeaders } from '../mail-composer/index.js';
import type { NodemailerError, ResultCallback } from '../errors.js';
import type { ParsedUrl } from '../shared/url.js';
import type { MimeNodeAddress, MimeNodeEnvelope, MimeNodeEnvelopeInput, MimeNodeHeaders, MimeNodeOptions } from '../mime-node/index.js';
import type { XOAuth2ProvisionCallback } from '../xoauth2/index.js';
export type { SendMailOptions, MailDefaults, MailMessageData, MailMessageDataCallback, MailMessageContentCallback, MailMessageListHeader, MailMessageListHeaderValue } from './mail-message.js';
export type { default as MailMessage } from './mail-message.js';
/**
 * The base shape of the object a transport hands back for a sent message. Every bundled
 * transport sets the envelope and the Message-ID, the rest depends on the transport.
 *
 * The index signature keeps a transport specific field readable through this type, and it
 * is also what a result type has to inherit to stay assignable to it, so the result type
 * of a transport outside this package has to extend this interface rather than restate it
 */
export interface SentMessageInfo {
    /** The envelope the message was sent with */
    envelope: MimeNodeEnvelope;
    /** Message-ID of the sent message */
    messageId: string;
    /** Recipient addresses the transport accepted */
    accepted?: string[] | undefined;
    /** Recipient addresses the transport rejected */
    rejected?: string[] | undefined;
    /** Recipient addresses left pending, LMTP reports these */
    pending?: string[] | undefined;
    /** Last response from the server */
    response?: string | undefined;
    /** The generated message, for the transports that hand it back instead of sending it */
    message?: unknown;
    /** Transport specific fields */
    [key: string]: unknown;
}
/**
 * Callback for sendMail, receives the transport result once the transport has taken the
 * message
 */
export type SendMailCallback<T = SentMessageInfo> = (err: NodemailerError | null, info: T) => void;
/**
 * Callback for verify(), success is true once the transport accepted the configuration
 */
export type VerifyCallback = (err: NodemailerError | null, success?: true) => void;
/**
 * Callback a plugin calls once it is done, an error aborts the send
 */
export type PluginCallback = (err?: NodemailerError | null) => void;
/**
 * A plugin registered with use(): receives the message and a callback to call once done
 */
export type PluginFunction<T = SentMessageInfo> = (mail: MailMessage<T>, callback: PluginCallback) => void;
/**
 * Connection options a getSocket handler receives: the options of the transport asking for
 * the socket, with the host and port to connect to
 */
export interface GetSocketOptions {
    host?: string | undefined;
    port?: number | string | undefined;
    [key: string]: any;
}
/**
 * The result of a getSocket handler, the socket to use for the connection
 */
export interface SocketOptions {
    /** An established socket, the proxied connection */
    connection?: net.Socket | undefined;
}
/**
 * Receives the socket options from a getSocket handler, or the error that prevented the
 * connection
 */
export type GetSocketCallback = (err: NodemailerError | null, socketOptions?: SocketOptions) => void;
/**
 * A socket handler. Mail sets one on the transport as getSocket when a proxy is configured,
 * the SMTP transports call it to get a proxied socket instead of connecting directly
 */
export type GetSocketHandler = (options: GetSocketOptions, callback: GetSocketCallback) => void;
/**
 * A custom proxy handler, registered with set('proxy_handler_' + protocol, handler) for the
 * protocol of the proxy url
 */
export type ProxyHandler = (proxy: ParsedUrl, options: GetSocketOptions, callback: GetSocketCallback) => void;
/**
 * Well known keys of the meta store, see set() and get(): the OAuth2 token provisioning
 * callback the SMTP transports use, the socks module for socks proxies, and a custom proxy
 * handler per proxy protocol
 */
export interface MailMeta {
    /** Called by the SMTP transports when a new OAuth2 access token is needed */
    oauth2_provision_cb: XOAuth2ProvisionCallback;
    /** The socks module, v1 or v2, used to connect through a socks proxy */
    proxy_socks_module: any;
    [key: `proxy_handler_${string}`]: ProxyHandler;
    [key: string]: any;
}
/**
 * A transport as consumed by Mail: any object with a name, a version and a send method
 * works, the rest is optional. Mail forwards its close, isIdle and verify calls to the
 * methods of the same name as they are, so their arguments are up to the transport
 */
export interface Transport<T = SentMessageInfo> {
    /** Transport name, used for logging */
    name: string;
    /** Transport version, used for logging */
    version: string;
    /** Hands a message to the transport, the callback receives the transport result */
    send(mail: MailMessage<T>, callback: ResultCallback<T>): void;
    /** Checks the configuration, the SMTP transports connect and authenticate for it */
    verify?(...args: any[]): any;
    /** Closes the transport */
    close?(...args: any[]): any;
    /** Tells whether the transport can take a message right away */
    isIdle?(...args: any[]): any;
    /** Registers an event listener, the transport may emit 'log', 'error', 'idle' and 'clear' */
    on?(event: string | symbol, listener: (...args: any[]) => void): this;
    /** The Mail object the transport belongs to, set by Mail */
    mailer?: Mail<T> | undefined;
    /** Socket handler for a proxied connection, set by Mail when a proxy is configured */
    getSocket?: GetSocketHandler | undefined;
}
/**
 * Transport configuration as read by Mail itself. The transport reads its own options from
 * the same object, see the transport for those
 */
export interface TransportOptions {
    /** Bunyan compatible logger, true for the default console logger, false or unset for no logging */
    logger?: shared.ExternalLogger | boolean | undefined;
    /** Component name for the log lines, defaults to 'mail' */
    component?: string | undefined;
    /** DKIM signing options, every message is signed with these unless it carries its own */
    dkim?: DKIMOptions | undefined;
    /** Proxy url. http(s) proxies work as is, socks proxies need the socks module set with set('proxy_socks_module', socks) */
    proxy?: string | undefined;
    /** TLS options, rejectUnauthorized applies to an https proxy as well */
    tls?: ConnectionOptions | undefined;
    /** Reject content that points to a file path, forced onto every message */
    disableFileAccess?: boolean | undefined;
    /** Reject content that points to a URL, forced onto every message */
    disableUrlAccess?: boolean | undefined;
    /** Method to normalize header keys for custom caseing, forced onto every message */
    normalizeHeaderKey?: MimeNodeOptions['normalizeHeaderKey'] | undefined;
    /** Recipients allowed on one message, forced onto every message, 0 disables the limit, defaults to 100000 */
    maxRecipients?: number | undefined;
    /** Convert data: images in the html into embedded attachments */
    attachDataUrls?: boolean | undefined;
}
/**
 * The transporter object createTransport returns, a Mail instance wrapping a transport
 */
export type Transporter<T = SentMessageInfo> = Mail<T>;
/**
 * Creates an object for exposing the Mail API
 *
 * @constructor
 * @param transporter Transport object instance to pass the mails to
 */
declare class Mail<out T = SentMessageInfo> extends EventEmitter {
    options: TransportOptions;
    /** Message defaults given to createTransport, kept public because the DefinitelyTyped typings declared it */
    _defaults: MailDefaults;
    meta: Map<string, any>;
    dkim: DKIM | false;
    transporter: Transport<T>;
    logger: shared.Logger;
    /** Closes the transport, the pooled SMTP transport closes its connections */
    close: () => void;
    /** Tells whether the transport can take a message right away */
    isIdle: () => boolean;
    /** Checks the configuration, the SMTP transports connect and authenticate for it */
    verify: {
        (callback: VerifyCallback): void;
        (): Promise<true>;
    };
    /** Socket handler for a proxied connection, set by setupProxy and handed to the transport on the next send */
    getSocket?: GetSocketHandler | false | undefined;
    constructor(transporter: Transport<T>, options?: TransportOptions, defaults?: MailDefaults);
    use(step: string, plugin: PluginFunction<T>): this;
    /**
     * Sends an email using the preselected transport object
     *
     * @param data E-data description
     * @param callback Callback to run once the sending succeeded or failed
     */
    sendMail(data: SendMailOptions): Promise<T>;
    sendMail(data: SendMailOptions, callback: SendMailCallback<T>): void;
    getVersionString(): string;
    /**
     * Sets up proxy handler for a Nodemailer object
     *
     * @param proxyUrl Proxy configuration url
     */
    setupProxy(proxyUrl: string): void;
    set<K extends keyof MailMeta & string>(key: K, value: MailMeta[K]): Map<string, any>;
    get<K extends keyof MailMeta & string>(key: K): MailMeta[K] | undefined;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `Mail.Options` style references keep working
 */
type MailPluginFunction<T> = PluginFunction<T>;
declare namespace Mail {
    type Options = SendMailOptions;
    type Address = MimeNodeAddress;
    type Attachment = MailComposerAttachment;
    type AttachmentLike = MailComposerAlternative;
    type AmpAttachment = MailComposerAlternative;
    type IcalAttachment = MailComposerIcalEvent;
    type Headers = MimeNodeHeaders;
    type ListHeader = MailComposerListHeaderEntry;
    type ListHeaders = MailComposerListHeaders;
    type Envelope = MimeNodeEnvelopeInput;
    type TextEncoding = NonNullable<SendMailOptions['textEncoding']>;
    type PluginFunction<T = SentMessageInfo> = MailPluginFunction<T>;
}
export default Mail;
