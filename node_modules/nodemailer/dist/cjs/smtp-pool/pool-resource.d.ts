import SMTPConnection from '../smtp-connection/index.js';
import { type Logger } from '../shared/index.js';
import { EventEmitter } from 'node:events';
import type { SMTPTransportAuth, SMTPTransportSendCallback } from '../smtp-transport/index.js';
import type MailMessage from '../mailer/mail-message.js';
import type SMTPPool from './index.js';
import type { SMTPPoolResolvedOptions, SMTPPoolQueueEntry } from './index.js';
/**
 * Callback for connect(), the result is true once the connection is ready for messages
 */
export type PoolResourceConnectCallback = (err: Error | null, connected?: true) => void;
/**
 * Callback for send()
 */
export type PoolResourceSendCallback = SMTPTransportSendCallback;
/**
 * Creates an element for the pool
 *
 * @constructor
 * @param pool SMTPPool instance
 */
export default class PoolResource extends EventEmitter {
    pool: SMTPPool;
    options: SMTPPoolResolvedOptions;
    logger: Logger;
    /**
     * Authentication data for the connection, set when the pool options include auth
     */
    auth?: SMTPTransportAuth | undefined;
    messages: number;
    available: boolean;
    /**
     * The SMTP connection, set by connect()
     */
    connection: SMTPConnection;
    /**
     * Resource id, assigned by the pool
     */
    id: number;
    /**
     * The queue entry being sent, assigned by the pool. False once it has been handled
     */
    queueEntry?: SMTPPoolQueueEntry | false | undefined;
    constructor(pool: SMTPPool);
    /**
     * Initiates a connection to the SMTP server
     *
     * @param callback Callback function to run once the connection is established or failed
     */
    connect(callback: PoolResourceConnectCallback): void;
    /**
     * Sends an e-mail to be sent using the selected settings
     *
     * @param mail Mail object
     * @param callback Callback function
     */
    send(mail: MailMessage, callback: PoolResourceSendCallback): void;
    /**
     * Closes the connection
     */
    close(): void;
}
