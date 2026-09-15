import * as packageData from '../package-info.js';
import * as shared from '../shared/index.js';
/**
 * Generates a Transport object to generate JSON output
 *
 * @constructor
 * @param optional config parameter
 */
class JSONTransport {
    constructor(options) {
        options = options || {};
        this.options = options;
        this.name = 'JSONTransport';
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'json-transport'
        });
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
        const recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info({
            tnx: 'send',
            messageId
        }, 'Composing JSON structure of %s to <%s>', messageId, recipients.join(', '));
        setImmediate(() => {
            mail.normalize((err, data) => {
                if (err) {
                    this.logger.error({
                        err,
                        tnx: 'send',
                        messageId
                    }, 'Failed building JSON structure for %s. %s', messageId, err.message);
                    return done(err);
                }
                delete data.envelope;
                delete data.normalizedHeaders;
                return done(null, {
                    envelope,
                    messageId,
                    message: this.options.skipEncoding ? data : JSON.stringify(data)
                });
            });
        });
    }
}
export default JSONTransport;
