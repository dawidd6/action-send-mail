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
const node_events_1 = require("node:events");
const index_js_1 = __importDefault(require("../smtp-connection/index.js"));
const index_js_2 = __importDefault(require("../well-known/index.js"));
const shared = __importStar(require("../shared/index.js"));
const index_js_3 = __importDefault(require("../xoauth2/index.js"));
const errors = __importStar(require("../errors.js"));
const packageData = __importStar(require("../package-info.js"));
/**
 * Creates a SMTP transport object for Nodemailer
 *
 * @constructor
 * @param options Connection options
 */
class SMTPTransport extends node_events_1.EventEmitter {
    constructor(options) {
        super();
        options = options || {};
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }
        let urlData;
        let service = options.service;
        if (typeof options.getSocket === 'function') {
            this.getSocket = options.getSocket;
        }
        if (options.url) {
            urlData = shared.parseConnectionUrl(options.url);
            service = service || urlData.service;
        }
        this.options = shared.assign(false, // create new object
        options, // regular options
        urlData, // url options
        (service && (0, index_js_2.default)(service)) // wellknown options
        );
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'smtp-transport'
        });
        this.name = 'SMTP';
        this.version = packageData.version + '[client:' + packageData.version + ']';
        if (this.options.auth) {
            this.auth = this.getAuth({});
        }
    }
    /**
     * Placeholder function for creating proxy sockets. This method immediatelly returns
     * without a socket
     *
     * @param options Connection options
     * @param callback Callback function to run with the socket keys
     */
    getSocket(options, callback) {
        // return immediatelly
        setImmediate(() => callback(null, false));
    }
    getAuth(authOpts) {
        if (!authOpts) {
            if (this.auth && this.auth.oauth2 && this.mailer) {
                // Transport-level auth is resolved in the constructor, before the Mail wrapper
                // assigns `this.mailer`, so a provision callback registered with
                // `transporter.set('oauth2_provision_cb', ...)` has to be re-checked here
                this.auth.oauth2.provisionCallback = this.mailer.get('oauth2_provision_cb') || this.auth.oauth2.provisionCallback;
            }
            return this.auth;
        }
        const authData = Object.assign({}, this.options.auth && typeof this.options.auth === 'object' ? this.options.auth : {}, typeof authOpts === 'object' ? authOpts : {});
        if (Object.keys(authData).length === 0) {
            return false;
        }
        switch ((authData.type || '').toString().toUpperCase()) {
            case 'OAUTH2': {
                if (!authData.service && !authData.user) {
                    return false;
                }
                const oauth2 = new index_js_3.default(authData, this.logger);
                oauth2.provisionCallback = (this.mailer && this.mailer.get('oauth2_provision_cb')) || oauth2.provisionCallback;
                oauth2.on('token', (token) => this.mailer.emit('token', token));
                oauth2.on('error', err => this.emit('error', err));
                return {
                    type: 'OAUTH2',
                    user: authData.user,
                    oauth2,
                    method: 'XOAUTH2'
                };
            }
            default:
                return {
                    type: (authData.type || '').toString().toUpperCase() || 'LOGIN',
                    user: authData.user,
                    credentials: {
                        user: authData.user || '',
                        pass: authData.pass,
                        options: authData.options
                    },
                    method: (authData.method || '').trim().toUpperCase() || this.options.authMethod || false
                };
        }
    }
    /**
     * Sends an e-mail using the selected settings
     *
     * @param mail Mail object
     * @param callback Callback function
     */
    send(mail, callback) {
        this.getSocket(this.options, (err, socketOptions) => {
            if (err) {
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
                // only copy options if we need to modify it
                options = Object.assign(shared.assign(false, options), socketOptions);
            }
            const connection = new index_js_1.default(options);
            let perCallAuth;
            const cleanupPerCallAuth = () => {
                if (perCallAuth && perCallAuth !== this.auth && perCallAuth.oauth2) {
                    perCallAuth.oauth2.removeAllListeners();
                }
                perCallAuth = null;
            };
            connection.once('error', err => {
                if (returned) {
                    return;
                }
                returned = true;
                cleanupPerCallAuth();
                connection.close();
                return callback(err);
            });
            connection.once('end', () => {
                if (returned) {
                    return;
                }
                const timer = setTimeout(() => {
                    if (returned) {
                        return;
                    }
                    returned = true;
                    cleanupPerCallAuth();
                    // still have not returned, this means we have an unexpected connection close
                    const err = new Error('Unexpected socket close');
                    if (connection && connection._socket && connection._socket.upgrading) {
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
            const sendMessage = () => {
                const envelope = mail.message.getEnvelope();
                const messageId = mail.message.messageId();
                const recipients = [].concat(envelope.to || []);
                if (recipients.length > 3) {
                    recipients.push('...and ' + recipients.splice(2).length + ' more');
                }
                if (mail.data.dsn) {
                    envelope.dsn = mail.data.dsn;
                }
                // RFC 8689: Pass requireTLSExtensionEnabled to envelope for MAIL FROM parameter
                if (mail.data.requireTLSExtensionEnabled) {
                    envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
                }
                this.logger.info({
                    tnx: 'send',
                    messageId
                }, 'Sending message %s to <%s>', messageId, recipients.join(', '));
                connection.send(envelope, mail.message.createReadStream(), (err, info) => {
                    returned = true;
                    cleanupPerCallAuth();
                    connection.close();
                    if (err) {
                        this.logger.error({
                            err,
                            tnx: 'send'
                        }, 'Send error for %s: %s', messageId, err.message);
                        return callback(err);
                    }
                    info.envelope = {
                        from: envelope.from,
                        to: envelope.to
                    };
                    info.messageId = messageId;
                    try {
                        return callback(null, info);
                    }
                    catch (E) {
                        this.logger.error({
                            err: E,
                            tnx: 'callback'
                        }, 'Callback error for %s: %s', messageId, E.message);
                    }
                });
            };
            connection.connect(() => {
                if (returned) {
                    return;
                }
                perCallAuth = this.getAuth(mail.data.auth);
                if (perCallAuth && (connection.allowsAuth || options.forceAuth)) {
                    connection.login(perCallAuth, err => {
                        cleanupPerCallAuth();
                        if (returned) {
                            return;
                        }
                        if (err) {
                            returned = true;
                            connection.close();
                            return callback(err);
                        }
                        sendMessage();
                    });
                }
                else {
                    sendMessage();
                }
            });
        });
    }
    verify(callback) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        this.getSocket(this.options, (err, socketOptions) => {
            if (err) {
                return callback(err);
            }
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
                options = Object.assign(shared.assign(false, options), socketOptions);
            }
            const connection = new index_js_1.default(options);
            let returned = false;
            let perCallAuth;
            const cleanupPerCallAuth = () => {
                if (perCallAuth && perCallAuth !== this.auth && perCallAuth.oauth2) {
                    perCallAuth.oauth2.removeAllListeners();
                }
                perCallAuth = null;
            };
            connection.once('error', err => {
                if (returned) {
                    return;
                }
                returned = true;
                cleanupPerCallAuth();
                connection.close();
                return callback(err);
            });
            connection.once('end', () => {
                if (returned) {
                    return;
                }
                returned = true;
                cleanupPerCallAuth();
                return callback(new Error('Connection closed'));
            });
            const finalize = () => {
                if (returned) {
                    return;
                }
                returned = true;
                cleanupPerCallAuth();
                connection.quit();
                return callback(null, true);
            };
            connection.connect(() => {
                if (returned) {
                    return;
                }
                perCallAuth = this.getAuth({});
                if (perCallAuth && (connection.allowsAuth || options.forceAuth)) {
                    connection.login(perCallAuth, err => {
                        cleanupPerCallAuth();
                        if (returned) {
                            return;
                        }
                        if (err) {
                            returned = true;
                            connection.close();
                            return callback(err);
                        }
                        finalize();
                    });
                }
                else if (!perCallAuth && connection.allowsAuth && options.forceAuth) {
                    const err = new Error('Authentication info was not provided');
                    err.code = errors.ENOAUTH;
                    returned = true;
                    cleanupPerCallAuth();
                    connection.close();
                    return callback(err);
                }
                else {
                    finalize();
                }
            });
        });
        return promise;
    }
    /**
     * Releases resources
     */
    close() {
        if (this.auth && this.auth.oauth2) {
            this.auth.oauth2.removeAllListeners();
        }
        this.emit('close');
    }
}
exports.default = SMTPTransport;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
