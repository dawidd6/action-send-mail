import type { Readable } from 'node:stream';
import type { Logger } from '../shared/index.js';
import type { MimeNodeEnvelope } from '../mime-node/index.js';
import type MailMessage from '../mailer/mail-message.js';
import type { default as Mail, SentMessageInfo, SendMailOptions, TransportOptions } from '../mailer/index.js';
/**
 * Options for the Stream transport
 */
export interface StreamTransportOptions extends TransportOptions {
    /** Selects this transport in createTransport */
    streamTransport?: boolean | undefined;
    /** If true, the message is returned as a Buffer object instead of a stream */
    buffer?: boolean | undefined;
    /** Either 'windows' or 'unix', the line ending of the generated message */
    newline?: string | undefined;
}
/**
 * The value the Stream transport hands to the send callback
 */
export interface StreamSentMessageInfo extends SentMessageInfo {
    /** The envelope the message was generated with */
    envelope: MimeNodeEnvelope;
    /** Message-ID value of the message */
    messageId: string;
    /** The generated message, a Buffer when the buffer option is set, a readable stream otherwise */
    message: Readable | Buffer;
}
/**
 * Generates a Transport object for streaming
 *
 * Possible options can be the following:
 *
 *  * **buffer** if true, then returns the message as a Buffer object instead of a stream
 *  * **newline** either 'windows' or 'unix'
 *
 * @constructor
 * @param optional config parameter
 */
declare class StreamTransport {
    mailer: Mail<StreamSentMessageInfo>;
    options: StreamTransportOptions;
    name: string;
    version: string;
    logger: Logger;
    winbreak: boolean;
    constructor(options?: StreamTransportOptions);
    /**
     * Compiles a mailcomposer message and forwards it to handler that sends it
     *
     * @param mail MailComposer object
     * @param done Callback function to run when the sending is completed
     */
    send(mail: MailMessage<StreamSentMessageInfo>, done: (err: Error | null, info?: StreamSentMessageInfo) => void): void;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `StreamTransport.Options` style references keep working
 */
declare namespace StreamTransport {
    type Options = StreamTransportOptions;
    type MailOptions = SendMailOptions;
    type SentMessageInfo = StreamSentMessageInfo;
}
export default StreamTransport;
