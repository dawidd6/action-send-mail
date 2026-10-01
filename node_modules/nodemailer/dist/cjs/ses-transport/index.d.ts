import EventEmitter from 'node:events';
import type { Logger } from '../shared/index.js';
import { type MimeNodeEnvelope } from '../mime-node/index.js';
import type MailMessage from '../mailer/mail-message.js';
import type { default as Mail, SentMessageInfo, SendMailOptions, TransportOptions, VerifyCallback } from '../mailer/index.js';
/**
 * Options for the SES transport
 */
export interface SESTransportOptions extends TransportOptions {
    /** The AWS SDK v3 objects to send with, `{ sesClient, SendEmailCommand }` from @aws-sdk/client-sesv2 */
    SES: {
        /** SESv2Client instance. Its config.region provider is resolved for the domain of the returned Message-ID */
        sesClient: {
            config?: {
                region?: (() => Promise<string>) | undefined;
                [key: string]: any;
            } | undefined;
            send(command: unknown): Promise<any>;
        };
        /** SendEmailCommand class, constructed with the SendEmailCommandInput of every message */
        SendEmailCommand: new (input: any) => unknown;
    };
}
/** The SESv2Client shape the transport needs */
export type SESTransportClient = SESTransportOptions['SES']['sesClient'];
/** The SendEmailCommand constructor shape the transport needs */
export type SESTransportSendEmailCommand = SESTransportOptions['SES']['SendEmailCommand'];
/**
 * SendEmailCommand parameters, the shape of the `ses` message option that is merged into
 * the API call. Any further SendEmailCommandInput field is accepted as well
 */
export interface SESSendEmailRequest {
    FromEmailAddress?: string | undefined;
    Destination?: {
        ToAddresses?: string[] | undefined;
        CcAddresses?: string[] | undefined;
        BccAddresses?: string[] | undefined;
    } | undefined;
    ReplyToAddresses?: string[] | undefined;
    Content?: unknown;
    EmailTags?: Array<{
        Name?: string | undefined;
        Value?: string | undefined;
    }> | undefined;
    ConfigurationSetName?: string | undefined;
    ListManagementOptions?: unknown;
    FeedbackForwardingEmailAddress?: string | undefined;
    [key: string]: unknown;
}
/**
 * The value the SES transport hands to the send callback
 */
export interface SESSentMessageInfo extends SentMessageInfo {
    /** The envelope the message was sent with */
    envelope: MimeNodeEnvelope;
    /** Message-ID built from the MessageId SES returned */
    messageId: string;
    /** The MessageId SES returned */
    response: string;
    /** The raw RFC822 message that was sent */
    raw: Buffer;
}
/**
 * Generates a Transport object for AWS SES
 *
 * @constructor
 * @param optional config parameter
 */
declare class SESTransport extends EventEmitter {
    mailer: Mail<SESSentMessageInfo>;
    options: SESTransportOptions;
    ses: SESTransportOptions['SES'];
    name: string;
    version: string;
    logger: Logger;
    constructor(options: SESTransportOptions);
    getRegion(cb: (err: Error | null, region?: string | false) => void): void;
    /**
     * Compiles a mailcomposer message and forwards it to SES
     *
     * @param mail MailComposer object
     * @param callback Callback function to run when the sending is completed
     */
    send(mail: MailMessage<SESSentMessageInfo>, callback: (err: Error | null, info?: SESSentMessageInfo) => void): void;
    /**
     * Verifies SES configuration
     *
     * @param callback Callback function
     */
    verify(): Promise<true>;
    verify(callback: VerifyCallback): void;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `SESTransport.Options` style references keep working
 */
declare namespace SESTransport {
    type Options = SESTransportOptions;
    type MailOptions = SendMailOptions;
    type SentMessageInfo = SESSentMessageInfo;
    type SESv2ClientLike = SESTransportClient;
    type SendEmailCommandConstructorLike = SESTransportSendEmailCommand;
    type SendEmailRequestLike = SESSendEmailRequest;
    type MailSesOptions = SESSendEmailRequest;
}
/** The same aliases as module level exports, for `import * as SESTransport` and `import SESTransport = require()` */
export type { SESTransportOptions as Options, SendMailOptions as MailOptions, SESSentMessageInfo as SentMessageInfo, SESTransportClient as SESv2ClientLike, SESTransportSendEmailCommand as SendEmailCommandConstructorLike, SESSendEmailRequest as SendEmailRequestLike, SESSendEmailRequest as MailSesOptions };
export default SESTransport;
