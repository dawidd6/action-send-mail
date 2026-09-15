import Mail from './mailer/index.js';
import type { MailDefaults, SentMessageInfo, Transport, TransportOptions } from './mailer/index.js';
import type { SMTPPoolOptions, SMTPPoolSentMessageInfo } from './smtp-pool/index.js';
import type { SMTPTransportOptions, SMTPSentMessageInfo } from './smtp-transport/index.js';
import type { SendmailTransportOptions, SendmailSentMessageInfo } from './sendmail-transport/index.js';
import type { StreamTransportOptions, StreamSentMessageInfo } from './stream-transport/index.js';
import type { JSONTransportOptions, JSONSentMessageInfo } from './json-transport/index.js';
import type { SESTransportOptions, SESSentMessageInfo } from './ses-transport/index.js';
/**
 * Connection details of a service endpoint of an Ethereal test account
 */
export interface TestAccountService {
    host: string;
    port: number;
    secure: boolean;
}
/**
 * Ethereal test account returned by createTestAccount()
 */
export interface TestAccount {
    user: string;
    pass: string;
    smtp: TestAccountService;
    imap: TestAccountService;
    pop3: TestAccountService;
    web: string;
    /** true if the account can also receive external mail */
    mxEnabled?: boolean | undefined;
    [key: string]: unknown;
}
/**
 * Callback for createTestAccount()
 */
export type TestAccountCallback = (err: Error | null, account: TestAccount) => void;
/**
 * Configuration object of any of the bundled transports
 */
export type TransportConfig = SMTPTransportOptions | SMTPPoolOptions | SendmailTransportOptions | StreamTransportOptions | JSONTransportOptions | SESTransportOptions;
/**
 * Creates a transporter object for sending e-mails
 *
 * @param transporter Transport configuration object, a connection URL or a transport plugin instance
 * @param defaults Default message fields that are merged into every message
 * @returns Mail instance wrapping the transport
 */
export declare function createTransport(transporter: SMTPPoolOptions & {
    pool: true;
}, defaults?: MailDefaults): Mail<SMTPPoolSentMessageInfo>;
export declare function createTransport(transporter: SendmailTransportOptions & {
    sendmail: true | string;
}, defaults?: MailDefaults): Mail<SendmailSentMessageInfo>;
export declare function createTransport(transporter: StreamTransportOptions & {
    streamTransport: true;
}, defaults?: MailDefaults): Mail<StreamSentMessageInfo>;
export declare function createTransport(transporter: JSONTransportOptions & {
    jsonTransport: true;
}, defaults?: MailDefaults): Mail<JSONSentMessageInfo>;
export declare function createTransport(transporter: SESTransportOptions & {
    SES: object;
}, defaults?: MailDefaults): Mail<SESSentMessageInfo>;
export declare function createTransport<T = SentMessageInfo>(transporter: Transport<T>, defaults?: MailDefaults): Mail<T>;
export declare function createTransport(transporter?: SMTPTransportOptions | string, defaults?: MailDefaults): Mail<SMTPSentMessageInfo>;
export declare function createTransport(transporter?: TransportConfig | Transport<any> | string, defaults?: MailDefaults): Mail<any>;
/**
 * Creates a test account from the Ethereal service (https://ethereal.email)
 *
 * @param apiUrl Optional API endpoint, defaults to https://api.nodemailer.com
 * @param callback Callback function to run with the account object. If not set, a Promise is returned
 */
export declare function createTestAccount(callback: TestAccountCallback): void;
export declare function createTestAccount(apiUrl: string | false | null | undefined, callback: TestAccountCallback): void;
export declare function createTestAccount(apiUrl?: string | false | null): Promise<TestAccount>;
/**
 * Resolves the Ethereal web URL for a message sent through an Ethereal test account
 *
 * @param info Result object of sendMail()
 * @returns URL of the message in the Ethereal web interface, or false if the response does not carry one
 */
export declare function getTestMessageUrl(info?: {
    response?: string | Buffer | null | undefined;
} | false | null): string | false;
declare const nodemailer: {
    createTransport: typeof createTransport;
    createTestAccount: typeof createTestAccount;
    getTestMessageUrl: typeof getTestMessageUrl;
};
export default nodemailer;
export type { Mail, MailDefaults, SentMessageInfo, Transport, TransportOptions };
export type { SendMailOptions, Transporter } from './mailer/index.js';
export type { NodemailerError, ErrorCode } from './errors.js';
export type { MailMessage, MailMessageData, PluginFunction, VerifyCallback } from './mailer/index.js';
export type { MailComposerOptions, MailComposerAttachment as Attachment, MailComposerAlternative as AttachmentLike, MailComposerIcalEvent as IcalAttachment, MailComposerListHeaders as ListHeaders } from './mail-composer/index.js';
export type { MimeNodeAddress as Address, MimeNodeHeaders as Headers } from './mime-node/index.js';
export type { SMTPConnectionOptions, SMTPConnectionAuth, SMTPEnvelope, SMTPEnvelopeDsn } from './smtp-connection/index.js';
export type { DKIMOptions } from './dkim/index.js';
export type { XOAuth2Options, XOAuth2Token } from './xoauth2/index.js';
export type { SMTPTransportOptions, SMTPSentMessageInfo };
export type { SMTPPoolOptions, SMTPPoolSentMessageInfo };
export type { SendmailTransportOptions, SendmailSentMessageInfo };
export type { StreamTransportOptions, StreamSentMessageInfo };
export type { JSONTransportOptions, JSONSentMessageInfo };
export type { SESTransportOptions, SESSentMessageInfo };
