"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageData = __importStar(require("../package-info.js"));
const shared = __importStar(require("../shared/index.js"));
const le_windows_js_1 = __importDefault(require("../mime-node/le-windows.js"));
const le_unix_js_1 = __importDefault(require("../mime-node/le-unix.js"));
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
class StreamTransport {
    constructor(options) {
        options = options || {};
        this.options = options;
        this.name = 'StreamTransport';
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'stream-transport'
        });
        this.winbreak = ['win', 'windows', 'dos', '\r\n'].includes((options.newline || '').toString().toLowerCase());
    }
    /**
     * Compiles a mailcomposer message and forwards it to handler that sends it
     *
     * @param mail MailComposer object
     * @param done Callback function to run when the sending is completed
     */
    send(mail, done) {
        // We probably need this in the output. send() runs after the message was compiled,
        // so mail.message is set
        mail.message.keepBcc = true;
        const envelope = mail.message.getEnvelope();
        const messageId = mail.message.messageId();
        const recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info({
            tnx: 'send',
            messageId
        }, 'Sending message %s to <%s> using %s line breaks', messageId, recipients.join(', '), this.winbreak ? '<CR><LF>' : '<LF>');
        setImmediate(() => {
            let stream;
            try {
                stream = mail.message.createReadStream();
                if (this.options.newline) {
                    // apply the transport-level line ending transform; the message-level
                    // `newline` option is handled by MimeNode in createReadStream()
                    const sourceStream = stream;
                    stream = sourceStream.pipe(this.winbreak ? new le_windows_js_1.default() : new le_unix_js_1.default());
                    sourceStream.once('error', err => stream.emit('error', err));
                }
            }
            catch (E) {
                this.logger.error({
                    err: E,
                    tnx: 'send',
                    messageId
                }, 'Creating send stream failed for %s. %s', messageId, E.message);
                return done(E);
            }
            if (!this.options.buffer) {
                stream.once('error', err => {
                    this.logger.error({
                        err,
                        tnx: 'send',
                        messageId
                    }, 'Failed creating message for %s. %s', messageId, err.message);
                });
                return done(null, {
                    envelope,
                    messageId,
                    message: stream
                });
            }
            const chunks = [];
            let chunklen = 0;
            stream.on('readable', () => {
                let chunk;
                while ((chunk = stream.read()) !== null) {
                    chunks.push(chunk);
                    chunklen += chunk.length;
                }
            });
            stream.once('error', err => {
                this.logger.error({
                    err,
                    tnx: 'send',
                    messageId
                }, 'Failed creating message for %s. %s', messageId, err.message);
                return done(err);
            });
            stream.on('end', () => done(null, {
                envelope,
                messageId,
                message: Buffer.concat(chunks, chunklen)
            }));
        });
    }
}
exports.default = StreamTransport;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
