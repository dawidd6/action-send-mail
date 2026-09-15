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
const index_js_1 = __importDefault(require("../smtp-connection/index.js"));
const index_js_2 = require("../shared/index.js");
const index_js_3 = __importDefault(require("../xoauth2/index.js"));
const errors = __importStar(require("../errors.js"));
const node_events_1 = require("node:events");
/**
 * Creates an element for the pool
 *
 * @constructor
 * @param pool SMTPPool instance
 */
class PoolResource extends node_events_1.EventEmitter {
    constructor(pool) {
        super();
        this.pool = pool;
        this.options = pool.options;
        this.logger = this.pool.logger;
        if (this.options.auth) {
            switch ((this.options.auth.type || '').toString().toUpperCase()) {
                case 'OAUTH2': {
                    const oauth2 = new index_js_3.default(this.options.auth, this.logger);
                    oauth2.provisionCallback =
                        (this.pool.mailer && this.pool.mailer.get('oauth2_provision_cb')) || oauth2.provisionCallback;
                    this.auth = {
                        type: 'OAUTH2',
                        user: this.options.auth.user,
                        oauth2,
                        method: 'XOAUTH2'
                    };
                    oauth2.on('token', (token) => this.pool.mailer.emit('token', token));
                    oauth2.on('error', err => this.emit('error', err));
                    break;
                }
                default:
                    if (!this.options.auth.user && !this.options.auth.pass) {
                        break;
                    }
                    this.auth = {
                        type: (this.options.auth.type || '').toString().toUpperCase() || 'LOGIN',
                        user: this.options.auth.user,
                        credentials: {
                            user: this.options.auth.user || '',
                            pass: this.options.auth.pass,
                            options: this.options.auth.options
                        },
                        method: (this.options.auth.method || '').trim().toUpperCase() || this.options.authMethod || false
                    };
            }
        }
        this._connection = false;
        this._connected = false;
        this.messages = 0;
        this.available = true;
    }
    /**
     * Initiates a connection to the SMTP server
     *
     * @param callback Callback function to run once the connection is established or failed
     */
    connect(callback) {
        this.pool.getSocket(this.options, (err, socketOptions) => {
            if (err) {
                // nothing was connected, so no 'close' event is coming that would free the
                // slot this resource holds in the pool, report the failure the way a failed
                // login does
                this.emit('error', err);
                return callback(err);
            }
            let returned = false;
            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info({
                    tnx: 'proxy',
                    remoteAddress: socketOptions.connection.remoteAddress,
                    remotePort: socketOptions.connection.remotePort,
                    destHost: options.host || '',
                    destPort: options.port || '',
                    action: 'connected'
                }, 'Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
                options = Object.assign((0, index_js_2.assign)(false, options), socketOptions);
            }
            this.connection = new index_js_1.default(options);
            this.connection.once('error', err => {
                this.emit('error', err);
                if (returned) {
                    return;
                }
                returned = true;
                return callback(err);
            });
            this.connection.once('end', () => {
                this.close();
                if (returned) {
                    return;
                }
                returned = true;
                const timer = setTimeout(() => {
                    if (returned) {
                        return;
                    }
                    // still have not returned, this means we have an unexpected connection close
                    const err = new Error('Unexpected socket close');
                    if (this.connection &&
                        this.connection._socket &&
                        this.connection._socket.upgrading) {
                        // starttls connection errors
                        err.code = errors.ETLS;
                    }
                    callback(err);
                }, 1000);
                try {
                    timer.unref();
                }
                catch (_E) {
                    // Ignore. Happens on envs with non-node timer implementation
                }
            });
            this.connection.connect(() => {
                if (returned) {
                    return;
                }
                if (this.auth && (this.connection.allowsAuth || options.forceAuth)) {
                    this.connection.login(this.auth, err => {
                        if (returned) {
                            return;
                        }
                        returned = true;
                        if (err) {
                            this.connection.close();
                            this.emit('error', err);
                            return callback(err);
                        }
                        this._connected = true;
                        callback(null, true);
                    });
                }
                else {
                    returned = true;
                    this._connected = true;
                    return callback(null, true);
                }
            });
        });
    }
    /**
     * Sends an e-mail to be sent using the selected settings
     *
     * @param mail Mail object
     * @param callback Callback function
     */
    send(mail, callback) {
        if (!this._connected) {
            return this.connect(err => {
                if (err) {
                    return callback(err);
                }
                return this.send(mail, callback);
            });
        }
        const envelope = mail.message.getEnvelope();
        const messageId = mail.message.messageId();
        const recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info({
            tnx: 'send',
            messageId,
            cid: this.id
        }, 'Sending message %s using #%s to <%s>', messageId, this.id, recipients.join(', '));
        if (mail.data.dsn) {
            envelope.dsn = mail.data.dsn;
        }
        // RFC 8689: Pass requireTLSExtensionEnabled to envelope for MAIL FROM parameter
        if (mail.data.requireTLSExtensionEnabled) {
            envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
        }
        this.connection.send(envelope, mail.message.createReadStream(), (err, info) => {
            this.messages++;
            if (err) {
                this.connection.close();
                this.emit('error', err);
                return callback(err);
            }
            info.envelope = {
                from: envelope.from,
                to: envelope.to
            };
            info.messageId = messageId;
            setImmediate(() => {
                if (this.messages >= this.options.maxMessages) {
                    const err = new Error('Resource exhausted');
                    err.code = errors.EMAXLIMIT;
                    this.connection.close();
                    this.emit('error', err);
                }
                else {
                    this.pool._checkRateLimit(() => {
                        this.available = true;
                        this.emit('available');
                    });
                }
            });
            callback(null, info);
        });
    }
    /**
     * Closes the connection
     */
    close() {
        this._connected = false;
        if (this.auth && this.auth.oauth2) {
            this.auth.oauth2.removeAllListeners();
        }
        if (this.connection) {
            this.connection.close();
        }
        this.emit('close');
    }
}
exports.default = PoolResource;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
