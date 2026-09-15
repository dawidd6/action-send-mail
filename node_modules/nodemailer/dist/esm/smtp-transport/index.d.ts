import { EventEmitter } from 'node:events';
import { type SMTPConnectionOptions, type SMTPConnectionAuth, type SMTPConnectionSendInfo } from '../smtp-connection/index.js';
import * as shared from '../shared/index.js';
import { type XOAuth2Options } from '../xoauth2/index.js';
import type { ResultCallback } from '../errors.js';
import type MailMessage from '../mailer/mail-message.js';
import type { default as Mail, SentMessageInfo, SendMailOptions, TransportOptions, VerifyCallback } from '../mailer/index.js';
import type { MimeNodeEnvelope } from '../mime-node/index.js';
/**
 * Authentication settings, either from the transport options or from the message data.
 * OAuth2 settings are handed to XOAuth2 as is
 */
export interface SMTPTransportAuthOptions extends XOAuth2Options {
    /** 'OAuth2' selects XOAUTH2, anything else is a password login, 'LOGIN' when not set */
    type?: string | undefined;
    /** Username */
    user?: string | undefined;
    /** Password */
    pass?: string | undefined;
    /** SASL method to use, e.g. 'PLAIN', 'LOGIN' or 'CRAM-MD5' */
    method?: string | undefined;
    /** Extra options for the authentication method, handed to a custom SASL handler */
    options?: {
        [key: string]: any;
    } | undefined;
    /** Service identifier, an OAuth2 login needs either this or a user */
    service?: string | undefined;
}
/**
 * Authentication data built by getAuth() and handed to SMTPConnection#login
 */
export interface SMTPTransportAuth extends SMTPConnectionAuth {
    /** 'OAUTH2', or the upper cased type from the settings, 'LOGIN' when none was given */
    type: string;
    /** 'XOAUTH2' for OAuth2, otherwise the configured SASL method, false lets the connection pick one */
    method: string | false;
}
/**
 * Receives the socket details from getSocket, false when a new socket should be opened. The
 * object is merged into the connection options, a proxy handler provides the connected socket
 * as `connection`
 */
export type SMTPTransportGetSocketCallback = (err: Error | null, socketOptions?: SMTPConnectionOptions | false) => void;
/**
 * Custom socket provider, replaces the getSocket method of the transport
 */
export type SMTPTransportGetSocket = (options: SMTPTransportOptions, callback: SMTPTransportGetSocketCallback) => void;
/**
 * Options for the SMTP transport, the connection options plus the transport level settings
 */
export interface SMTPTransportOptions extends SMTPConnectionOptions, TransportOptions {
    /** Well-known service name, e.g. 'Gmail', fills in host, port and secure */
    service?: string | undefined;
    /** Connection url, e.g. 'smtps://user:pass@smtp.example.com', parsed into options */
    url?: string | undefined;
    /** Authentication settings, no authentication when not set */
    auth?: SMTPTransportAuthOptions | undefined;
    /** Custom socket provider, e.g. for connecting through a proxy, replaces the getSocket method */
    getSocket?: SMTPTransportGetSocket | undefined;
    /** Authenticate even when the server does not advertise AUTH, and fail verify() when it does but no credentials were given */
    forceAuth?: boolean | undefined;
    /** Default SASL method for the password logins when the auth settings do not name one */
    authMethod?: string | undefined;
    /** Logger component name, defaults to 'smtp-transport' */
    component?: string | undefined;
    /** Set to true to get a pooled transport from createTransport, this transport does not read it */
    pool?: boolean | undefined;
}
/**
 * Result of a sent message, the connection result plus the envelope and the Message-ID
 */
export interface SMTPSentMessageInfo extends SMTPConnectionSendInfo, SentMessageInfo {
    /** Envelope the message was sent with */
    envelope: MimeNodeEnvelope;
    /** Message-ID value of the sent message */
    messageId: string;
    /** Recipients the server accepted */
    accepted: string[];
    /** Recipients the server rejected */
    rejected: string[];
}
/**
 * Callback for send()
 */
export type SMTPTransportSendCallback = ResultCallback<SMTPSentMessageInfo>;
/**
 * Creates a SMTP transport object for Nodemailer
 *
 * @constructor
 * @param options Connection options
 */
declare class SMTPTransport extends EventEmitter {
    options: SMTPTransportOptions;
    logger: shared.Logger;
    name: string;
    version: string;
    /**
     * Transport level authentication data, set when the options include auth
     */
    auth?: SMTPTransportAuth | false | undefined;
    /**
     * The Mail instance using this transport, assigned by Mail
     */
    mailer?: Mail<SMTPSentMessageInfo> | undefined;
    constructor(options?: SMTPTransportOptions | string);
    /**
     * Placeholder function for creating proxy sockets. This method immediatelly returns
     * without a socket
     *
     * @param options Connection options
     * @param callback Callback function to run with the socket keys
     */
    getSocket(options: SMTPTransportOptions, callback: SMTPTransportGetSocketCallback): void;
    getAuth(authOpts?: SMTPTransportAuthOptions | false | null): SMTPTransportAuth | false | undefined;
    /**
     * Sends an e-mail using the selected settings
     *
     * @param mail Mail object
     * @param callback Callback function
     */
    send(mail: MailMessage, callback: SMTPTransportSendCallback): void;
    /**
     * Verifies SMTP configuration
     *
     * @param callback Callback function
     */
    verify(): Promise<true>;
    verify(callback: VerifyCallback): void;
    /**
     * Releases resources
     */
    close(): void;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `SMTPTransport.Options` style references keep working
 */
declare namespace SMTPTransport {
    type Options = SMTPTransportOptions;
    type MailOptions = SendMailOptions;
    type SentMessageInfo = SMTPSentMessageInfo;
    type AuthenticationType = SMTPTransportAuth;
}
export default SMTPTransport;
