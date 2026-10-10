import { spawn } from 'node:child_process';
import { pipeline } from 'node:stream';
import * as packageData from '../package-info.js';
import * as shared from '../shared/index.js';
import * as errors from '../errors.js';
import LeWindows from '../mime-node/le-windows.js';
import LeUnix from '../mime-node/le-unix.js';
// how long an stdin error waits for the exit code of the process before it is reported
const STDIN_ERROR_EXIT_WAIT = 1000;
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
class SendmailTransport {
    constructor(options) {
        options = options || {};
        // use a reference to spawn for mocking purposes
        this._spawn = spawn;
        this.options = options;
        this.name = 'Sendmail';
        this.version = packageData.version;
        this.path = 'sendmail';
        this.args = false;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'sendmail'
        });
        if (typeof options === 'string') {
            this.path = options;
        }
        else if (typeof options === 'object') {
            if (options.path) {
                this.path = options.path;
            }
            if (Array.isArray(options.args)) {
                this.args = options.args;
            }
        }
        this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes((options.newline || '').toString().toLowerCase());
    }
    /**
     * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
     *
     * @param mail MailComposer object
     * @param done Callback function to run when the sending is completed
     */
    send(mail, done) {
        // Sendmail strips this header line by itself. send() runs after the message was
        // compiled, so mail.message is set
        mail.message.keepBcc = true;
        const envelope = mail.message.getEnvelope();
        const messageId = mail.message.messageId();
        let returned;
        const hasInvalidAddresses = []
            .concat(envelope.from || [])
            .concat(envelope.to || [])
            // a local part is either a dot-atom or a quoted-string, so a leading dash sits at
            // offset 0 or, behind the opening quote, at offset 1. Only the first shape is read
            // as an option by sendmail, but both are the address this guard keeps out of argv
            .some(addr => /^"?-/.test(addr));
        if (hasInvalidAddresses) {
            const err = new Error('Can not send mail. Invalid envelope addresses.');
            err.code = errors.ESENDMAIL;
            return done(err);
        }
        // force -i to keep single dots
        const args = this.args
            ? ['-i'].concat(this.args).concat(envelope.to)
            : ['-i'].concat(envelope.from ? ['-f', envelope.from] : []).concat(envelope.to);
        const callback = (err) => {
            if (returned) {
                // ignore any additional responses, already done
                return;
            }
            returned = true;
            if (typeof done === 'function') {
                if (err) {
                    return done(err);
                }
                return done(null, {
                    envelope,
                    messageId,
                    response: 'Messages queued for delivery'
                });
            }
        };
        let sendmail;
        try {
            sendmail = this._spawn(this.path, args);
        }
        catch (E) {
            this.logger.error({
                err: E,
                tnx: 'spawn',
                messageId
            }, 'Error occurred while spawning sendmail. %s', E.message);
            return callback(E);
        }
        if (sendmail) {
            let stream;
            // ended once the whole message was handed to stdin
            const messageWritten = () => !!stream && stream.readableEnded;
            // an EPIPE says less than the exit code that usually follows it, so it is only
            // reported when the process exits without one
            let stdinError = null;
            // releases whatever the message is still being read from
            const release = () => {
                if (stream && !messageWritten()) {
                    stream.destroy();
                }
            };
            const fail = (err) => {
                release();
                callback(err);
            };
            sendmail.on('error', err => {
                this.logger.error({
                    err,
                    tnx: 'spawn',
                    messageId
                }, 'Error occurred when sending message %s. %s', messageId, err.message);
                fail(err);
            });
            // 'close' follows 'exit' with the same arguments, it is only listened to in case the
            // process ends without an 'exit' event
            const onExit = (code, signal) => {
                let err = null;
                if (code) {
                    err = new Error(code === 127 ? 'Sendmail command not found, process exited with code ' + code : 'Sendmail exited with code ' + code);
                }
                else if (signal) {
                    err = new Error('Sendmail was terminated by ' + signal);
                }
                else if (!messageWritten()) {
                    // exiting with 0 before the message was written does not mean it was queued
                    err = new Error('Sendmail exited before the message was written');
                }
                else if (stdinError) {
                    err = stdinError;
                }
                if (!err) {
                    return callback();
                }
                err.code = err.code || errors.ESENDMAIL;
                this.logger.error({
                    err,
                    tnx: 'stdin',
                    messageId
                }, 'Error sending message %s to sendmail. %s', messageId, err.message);
                fail(err);
            };
            sendmail.once('exit', onExit);
            sendmail.once('close', onExit);
            sendmail.stdin.on('error', err => {
                this.logger.error({
                    err,
                    tnx: 'stdin',
                    messageId
                }, 'Error occurred when piping message %s to sendmail. %s', messageId, err.message);
                if (stdinError) {
                    return;
                }
                stdinError = err;
                release();
                // a process that closed its stdin normally exits right after, with a code that
                // tells more than the EPIPE. Report the EPIPE if it does not
                const exitTimer = setTimeout(() => fail(err), STDIN_ERROR_EXIT_WAIT);
                sendmail.once('exit', () => clearTimeout(exitTimer));
            });
            const recipients = [].concat(envelope.to || []);
            if (recipients.length > 3) {
                recipients.push('...and ' + recipients.splice(2).length + ' more');
            }
            this.logger.info({
                tnx: 'send',
                messageId
            }, 'Sending message %s to <%s>', messageId, recipients.join(', '));
            const sourceStream = mail.message.createReadStream();
            stream = sourceStream;
            if (this.options.newline) {
                // apply the transport-level line ending transform; the message-level
                // `newline` option is handled by MimeNode in createReadStream()
                stream = pipeline(sourceStream, this.winbreak ? new LeWindows() : new LeUnix(), () => false);
            }
            stream.once('error', err => {
                this.logger.error({
                    err,
                    tnx: 'stdin',
                    messageId
                }, 'Error occurred when generating message %s. %s', messageId, err.message);
                sendmail.kill('SIGINT'); // do not deliver the message
                callback(err);
            });
            stream.pipe(sendmail.stdin);
        }
        else {
            const err = new Error('sendmail was not found');
            err.code = errors.ESENDMAIL;
            return callback(err);
        }
    }
}
export default SendmailTransport;
