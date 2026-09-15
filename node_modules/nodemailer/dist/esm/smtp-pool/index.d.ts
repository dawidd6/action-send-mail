import { EventEmitter } from 'node:events';
import * as shared from '../shared/index.js';
import type { SMTPTransportOptions, SMTPTransportGetSocketCallback, SMTPTransportSendCallback, SMTPSentMessageInfo } from '../smtp-transport/index.js';
import type MailMessage from '../mailer/mail-message.js';
import type { default as Mail, SendMailOptions, VerifyCallback } from '../mailer/index.js';
/**
 * Options for the pooled SMTP transport, the SMTP transport options plus the pool settings
 */
export interface SMTPPoolOptions extends SMTPTransportOptions {
    /** Set to true to get this pooled transport from createTransport */
    pool?: boolean | undefined;
    /** Maximum number of open connections, defaults to 5 */
    maxConnections?: number | undefined;
    /** Number of messages a connection sends before it is closed and replaced, defaults to 100 */
    maxMessages?: number | undefined;
    /** Maximum number of messages to send in rateDelta milliseconds, unlimited when not set */
    rateLimit?: number | undefined;
    /** Time window for rateLimit in milliseconds, defaults to 1000 */
    rateDelta?: number | undefined;
    /** How many times a message is requeued when its connection closes while sending, unlimited when not set or negative */
    maxRequeues?: number | undefined;
}
/**
 * The pool options once the constructor has applied the defaults
 */
export type SMTPPoolResolvedOptions = SMTPPoolOptions & {
    maxConnections: number;
    maxMessages: number;
};
/**
 * Result of a message sent through the pool, same as for the SMTP transport
 */
export type SMTPPoolSentMessageInfo = SMTPSentMessageInfo;
/**
 * Callback for send()
 */
export type SMTPPoolSendCallback = SMTPTransportSendCallback;
/**
 * A message waiting in the pool queue
 */
export interface SMTPPoolQueueEntry {
    /** The message to send */
    mail: MailMessage;
    /** How many times the entry was put back on the queue after its connection closed */
    requeueAttempts: number;
    /** Callback to run once the message is sent or failed */
    callback: SMTPPoolSendCallback;
    /** Message-ID value without the angle brackets, set when the entry is assigned to a connection */
    messageId?: string | undefined;
}
/**
 * Rate limiter state of the pool
 */
export interface SMTPPoolRateLimit {
    /** Messages assigned within the current window */
    counter: number;
    /** Timer that clears the current window */
    timeout: NodeJS.Timeout | null;
    /** Availability callbacks waiting for the window to clear */
    waiting: Array<() => void>;
    /** Start of the current window as a timestamp, false when no window is open */
    checkpoint: number | false;
    /** Window length in milliseconds */
    delta: number;
    /** Maximum number of messages per window, 0 for no limit */
    limit: number;
}
/**
 * Creates a SMTP pool transport object for Nodemailer
 *
 * @constructor
 * @param options SMTP Connection options
 */
declare class SMTPPool extends EventEmitter {
    options: SMTPPoolResolvedOptions;
    logger: shared.Logger;
    name: string;
    version: string;
    idling: boolean;
    /**
     * The Mail instance using this transport, assigned by Mail
     */
    mailer?: Mail<SMTPPoolSentMessageInfo> | undefined;
    constructor(options?: SMTPPoolOptions | string);
    /**
     * Placeholder function for creating proxy sockets. This method immediatelly returns
     * without a socket
     *
     * @param options Connection options
     * @param callback Callback function to run with the socket keys
     */
    getSocket(options: SMTPPoolOptions, callback: SMTPTransportGetSocketCallback): void;
    /**
     * Queues an e-mail to be sent using the selected settings
     *
     * @param mail Mail object
     * @param callback Callback function
     */
    send(mail: MailMessage, callback: SMTPPoolSendCallback): boolean;
    /**
     * Closes all connections in the pool. If there is a message being sent, the connection
     * is closed later
     */
    close(): void;
    /**
     * Returns true if there are free slots in the queue
     */
    isIdle(): boolean;
    /**
     * Verifies SMTP configuration
     *
     * @param callback Callback function
     */
    verify(): Promise<true>;
    verify(callback: VerifyCallback): void;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `SMTPPool.Options` style references keep working
 */
declare namespace SMTPPool {
    type Options = SMTPPoolOptions;
    type MailOptions = SendMailOptions;
    type SentMessageInfo = SMTPPoolSentMessageInfo;
}
export default SMTPPool;
