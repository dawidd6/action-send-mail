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
const node_events_1 = __importDefault(require("node:events"));
const packageData = __importStar(require("../package-info.js"));
const shared = __importStar(require("../shared/index.js"));
const errors = __importStar(require("../errors.js"));
const le_windows_js_1 = __importDefault(require("../mime-node/le-windows.js"));
const index_js_1 = __importDefault(require("../mime-node/index.js"));
/**
 * Tags AWS SDK rejections that carry no `code` property (SDK v3 errors only
 * have a `name`) with the generic SES transport error code, keeping the
 * original error object intact
 */
function tagSesError(err) {
    if (err && typeof err === 'object' && !err.code) {
        err.code = errors.ESES;
    }
    return err;
}
/**
 * Generates a Transport object for AWS SES
 *
 * @constructor
 * @param optional config parameter
 */
class SESTransport extends node_events_1.default {
    constructor(options) {
        super();
        if (!options || !options.SES || !options.SES.sesClient) {
            const error = new Error('Missing SES configuration, expecting { sesClient, SendEmailCommand } from @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/');
            error.code = errors.ECONFIG;
            throw error;
        }
        this.options = options;
        this.ses = this.options.SES;
        this.name = 'SESTransport';
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'ses-transport'
        });
    }
    getRegion(cb) {
        if (this.ses.sesClient.config && typeof this.ses.sesClient.config.region === 'function') {
            // Resolve the region provider. Use the two-argument form of then() so that a
            // synchronous throw from cb is not recaught here and used to invoke cb a second time.
            this.ses.sesClient.config.region().then(region => cb(null, region), err => cb(err));
            return;
        }
        return cb(null, false);
    }
    /**
     * Compiles a mailcomposer message and forwards it to SES
     *
     * @param mail MailComposer object
     * @param callback Callback function to run when the sending is completed
     */
    send(mail, callback) {
        // send() runs after the message was compiled, so mail.message is set
        let fromHeader = mail.message._headers.find(header => /^from$/i.test(header.key));
        if (fromHeader) {
            const mimeNode = new index_js_1.default('text/plain');
            fromHeader = mimeNode._convertAddresses(mimeNode._parseAddresses(fromHeader.value));
        }
        const envelope = mail.message.getEnvelope();
        const messageId = mail.message.messageId();
        const recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info({
            tnx: 'send',
            messageId
        }, 'Sending message %s to <%s>', messageId, recipients.join(', '));
        const getRawMessage = (next) => {
            // do not use Message-ID and Date in DKIM signature
            if (!mail.data._dkim) {
                mail.data._dkim = {};
            }
            if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === 'string') {
                mail.data._dkim.skipFields += ':date:message-id';
            }
            else {
                mail.data._dkim.skipFields = 'date:message-id';
            }
            const sourceStream = mail.message.createReadStream();
            const stream = sourceStream.pipe(new le_windows_js_1.default());
            const chunks = [];
            let chunklen = 0;
            stream.on('readable', () => {
                let chunk;
                while ((chunk = stream.read()) !== null) {
                    chunks.push(chunk);
                    chunklen += chunk.length;
                }
            });
            sourceStream.once('error', err => stream.emit('error', err));
            stream.once('error', err => next(err));
            stream.once('end', () => next(null, Buffer.concat(chunks, chunklen)));
        };
        setImmediate(() => getRawMessage((err, raw) => {
            if (err) {
                this.logger.error({
                    err,
                    tnx: 'send',
                    messageId
                }, 'Failed creating message for %s. %s', messageId, err.message);
                return callback(err);
            }
            // mail.data.ses is caller supplied message data, so copy its own keys only
            const sesMessage = shared.copyOwnKeys({
                Content: {
                    Raw: {
                        // required
                        Data: raw // required
                    }
                },
                FromEmailAddress: fromHeader || envelope.from,
                Destination: {
                    ToAddresses: envelope.to
                }
            }, mail.data.ses);
            this.getRegion((err, region) => {
                if (err || !region) {
                    region = 'us-east-1';
                }
                let sendPromise;
                try {
                    // command construction or dispatch can throw synchronously on a
                    // misconfigured SDK; surface it as a single error callback instead
                    // of letting it escape into getRegion's promise chain
                    const command = new this.ses.SendEmailCommand(sesMessage);
                    sendPromise = this.ses.sesClient.send(command);
                }
                catch (err) {
                    tagSesError(err);
                    this.logger.error({
                        err,
                        tnx: 'send'
                    }, 'Send error for %s: %s', messageId, err.message);
                    setImmediate(() => callback(err));
                    return;
                }
                sendPromise
                    .then(data => {
                    if (region === 'us-east-1') {
                        region = 'email';
                    }
                    const info = {
                        envelope: {
                            from: envelope.from,
                            to: envelope.to
                        },
                        messageId: '<' + data.MessageId + (!/@/.test(data.MessageId) ? '@' + region + '.amazonses.com' : '') + '>',
                        response: data.MessageId,
                        raw: raw
                    };
                    // invoke the callback outside the promise chain so a throw from it
                    // is not recaught by .catch() and used to call it a second time
                    setImmediate(() => callback(null, info));
                })
                    .catch(err => {
                    tagSesError(err);
                    this.logger.error({
                        err,
                        tnx: 'send'
                    }, 'Send error for %s: %s', messageId, err.message);
                    setImmediate(() => callback(err));
                });
            });
        }));
    }
    verify(callback) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        const done = callback;
        const cb = (err) => {
            if (err && !['InvalidParameterValue', 'MessageRejected'].includes(err.code || err.Code || err.name)) {
                return done(tagSesError(err));
            }
            return done(null, true);
        };
        const sesMessage = {
            Content: {
                Raw: {
                    Data: Buffer.from('From: <invalid@invalid>\r\nTo: <invalid@invalid>\r\n Subject: Invalid\r\n\r\nInvalid')
                }
            },
            FromEmailAddress: 'invalid@invalid',
            Destination: {
                ToAddresses: ['invalid@invalid']
            }
        };
        // the region value is not used for anything when verifying, but the lookup
        // exercises the client configuration the same way as send() does
        this.getRegion(() => {
            let sendPromise;
            try {
                const command = new this.ses.SendEmailCommand(sesMessage);
                sendPromise = this.ses.sesClient.send(command);
            }
            catch (err) {
                setImmediate(() => cb(err));
                return;
            }
            sendPromise.then(() => setImmediate(() => cb(null))).catch(err => setImmediate(() => cb(err)));
        });
        return promise;
    }
}
exports.default = SESTransport;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
