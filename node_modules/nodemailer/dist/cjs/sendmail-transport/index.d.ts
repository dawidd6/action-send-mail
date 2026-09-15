import type { Logger } from '../shared/index.js';
import type { MimeNodeEnvelope } from '../mime-node/index.js';
import type MailMessage from '../mailer/mail-message.js';
import type { default as Mail, SentMessageInfo, SendMailOptions, TransportOptions } from '../mailer/index.js';
/**
 * Options for the Sendmail transport
 */
export interface SendmailTransportOptions extends TransportOptions {
    /** Selects this transport in createTransport, the binary itself is set with `path` */
    sendmail?: boolean | string | undefined;
    /** Path to the sendmail binary, defaults to 'sendmail' */
    path?: string | undefined;
    /** Either 'windows' or 'unix', the line ending of the message piped to sendmail */
    newline?: string | undefined;
    /** Arguments for the sendmail binary, replaces the default '-f <sender>' */
    args?: string[] | undefined;
}
/**
 * The value the Sendmail transport hands to the send callback
 */
export interface SendmailSentMessageInfo extends SentMessageInfo {
    /** The envelope the message was sent with */
    envelope: MimeNodeEnvelope;
    /** Message-ID value of the message */
    messageId: string;
    /** Always 'Messages queued for delivery' */
    response: string;
}
/**
 * Generates a Transport object for Sendmail
 *
 * Possible options can be the following:
 *
 *  * **path** optional path to sendmail binary
 *  * **newline** either 'windows' or 'unix'
 *  * **args** an array of arguments for the sendmail binary
 *
 * @constructor
 * @param optional config parameter for Sendmail
 */
declare class SendmailTransport {
    mailer: Mail<SendmailSentMessageInfo>;
    options: SendmailTransportOptions;
    name: string;
    version: string;
    path: string;
    args: string[] | false;
    logger: Logger;
    winbreak: boolean;
    constructor(options?: SendmailTransportOptions | string);
    /**
     * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
     *
     * @param mail MailComposer object
     * @param done Callback function to run when the sending is completed
     */
    send(mail: MailMessage<SendmailSentMessageInfo>, done: (err: Error | null, info?: SendmailSentMessageInfo) => void): void;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `SendmailTransport.Options` style references keep working
 */
declare namespace SendmailTransport {
    type Options = SendmailTransportOptions;
    type MailOptions = SendMailOptions;
    type SentMessageInfo = SendmailSentMessageInfo;
}
export default SendmailTransport;
