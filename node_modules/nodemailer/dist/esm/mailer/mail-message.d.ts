import MimeNode, { type MimeNodePreparedHeaderValue } from '../mime-node/index.js';
import type { MailComposerOptions } from '../mail-composer/index.js';
import type { DKIMOptions } from '../dkim/index.js';
import type { SMTPEnvelopeDsn } from '../smtp-connection/index.js';
import type { SMTPTransportAuthOptions } from '../smtp-transport/index.js';
import type { SESSendEmailRequest } from '../ses-transport/index.js';
import type { NodemailerError } from '../errors.js';
import type { ResolveContentOptions } from '../shared/index.js';
import type Mail from './index.js';
import type { SentMessageInfo } from './index.js';
/**
 * The message data accepted by sendMail. MailComposerOptions describes the fields the MIME
 * tree is built from, the fields below are the ones the mailer reads on top of those
 */
export interface SendMailOptions extends MailComposerOptions {
    /** DKIM signing options for this message, used instead of the ones of the transporter */
    dkim?: DKIMOptions | undefined;
    /** Extra DKIM options for this message, merged over the options of the signer. The SES transport sets skipFields here, the option is not meant for callers */
    _dkim?: DKIMOptions | undefined;
    /** Recipients allowed on this message, 0 disables the limit, defaults to 100000 */
    maxRecipients?: number | undefined;
    /** SMTP transports: DSN parameters for the envelope, sent when the server supports the DSN extension */
    dsn?: SMTPEnvelopeDsn | undefined;
    /** SMTP transports: RFC 8689, send the REQUIRETLS parameter with MAIL FROM */
    requireTLSExtensionEnabled?: boolean | undefined;
    /** SMTP transports: per-message authentication settings, used instead of the transport level auth */
    auth?: SMTPTransportAuthOptions | undefined;
    /** SES transport: extra SendEmailCommand parameters merged into the API call */
    ses?: SESSendEmailRequest | undefined;
}
/**
 * Default message fields, the third argument of createTransport. Applied to every message
 * for the fields the message does not set itself, the headers are merged one by one
 */
export type MailDefaults = SendMailOptions;
/**
 * The message data as held by a MailMessage: the options the caller passed to sendMail with
 * the transporter defaults applied. resolveAll rewrites the content and address fields in
 * place and normalize adds the envelope, the Message-ID and the normalized headers
 */
export interface MailMessageData extends SendMailOptions {
    /** Header values flattened to strings and keyed by lowercase header name, set by normalize */
    normalizedHeaders?: {
        [key: string]: string;
    } | undefined;
}
/**
 * Callback for resolveAll and normalize, receives the message data with every content value
 * resolved
 */
export type MailMessageDataCallback = (err: NodemailerError | null, data: MailMessageData) => void;
/**
 * Callback for resolveContent, receives the resolved content value
 */
export type MailMessageContentCallback = (err: NodemailerError | null, value?: any) => void;
/**
 * A single prepared List-* header value, emitted as is
 */
export interface MailMessageListHeaderValue extends MimeNodePreparedHeaderValue {
    prepared: boolean;
    foldLines: boolean;
    value: string;
}
/**
 * A List-* header as built from the list value, one prepared value per list entry
 */
export interface MailMessageListHeader {
    /** Header key, 'list-' followed by the lowercase list key */
    key: string;
    value: MailMessageListHeaderValue[];
}
export default class MailMessage<T = SentMessageInfo> {
    mailer: Mail<T>;
    data: MailMessageData;
    /**
     * The compiled MIME tree. Set once the compile step is done, so it is null while the
     * 'compile' plugins run and set by the time the 'stream' plugins and the transport see
     * the message. Declared as always set, the way @types/nodemailer declared it, since the
     * plugins that read it are the ones that run after it is set
     */
    message: MimeNode;
    constructor(mailer: Mail<T>, data?: SendMailOptions);
    resolveContent(data: {
        [key: string]: any;
    }, key: string | number, callback: MailMessageContentCallback): void;
    resolveContent(data: {
        [key: string]: any;
    }, key: string | number, options: ResolveContentOptions | false | undefined, callback: MailMessageContentCallback): void;
    resolveContent(data: {
        [key: string]: any;
    }, key: string | number, options?: ResolveContentOptions | false): Promise<any>;
    resolveAll(callback: MailMessageDataCallback): void;
    normalize(callback: MailMessageDataCallback): void;
    setMailerHeader(): void;
    setPriorityHeaders(): void;
    setListHeaders(): void;
}
