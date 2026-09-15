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
const shared = __importStar(require("../shared/index.js"));
const mimeTypes = __importStar(require("../mime-funcs/mime-types.js"));
const index_js_1 = __importDefault(require("../mail-composer/index.js"));
const index_js_2 = __importDefault(require("../dkim/index.js"));
const http_proxy_client_js_1 = __importDefault(require("../smtp-connection/http-proxy-client.js"));
const errors = __importStar(require("../errors.js"));
const node_util_1 = __importDefault(require("node:util"));
const urllib = __importStar(require("../shared/url.js"));
const packageData = __importStar(require("../package-info.js"));
const mail_message_js_1 = __importDefault(require("./mail-message.js"));
const node_net_1 = __importDefault(require("node:net"));
const node_dns_1 = __importDefault(require("node:dns"));
const node_crypto_1 = __importDefault(require("node:crypto"));
/**
 * Recipients allowed on one message unless the caller sets its own maxRecipients. A backstop
 * against a runaway or hostile recipient list rather than a delivery policy: RFC 5321 only
 * asks a server to accept 100, so a real send is bounded far below this.
 */
const DEFAULT_MAX_RECIPIENTS = 100000;
/**
 * Creates an object for exposing the Mail API
 *
 * @constructor
 * @param transporter Transport object instance to pass the mails to
 */
class Mail extends node_events_1.EventEmitter {
    constructor(transporter, options, defaults) {
        super();
        this.options = options || {};
        this._defaults = defaults || {};
        this._defaultPlugins = {
            compile: [(...args) => this._convertDataImages(...args)],
            stream: []
        };
        this._userPlugins = {
            compile: [],
            stream: []
        };
        this.meta = new Map();
        this.dkim = this.options.dkim ? new index_js_2.default(this.options.dkim) : false;
        this.transporter = transporter;
        this.transporter.mailer = this;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'mail'
        });
        this.logger.debug({
            tnx: 'create'
        }, 'Creating transport: %s', this.getVersionString());
        // setup emit handlers for the transporter
        if (typeof this.transporter.on === 'function') {
            // deprecated log interface
            this.transporter.on('log', log => {
                this.logger.debug({
                    tnx: 'transport'
                }, '%s: %s', log.type, log.message);
            });
            // transporter errors
            this.transporter.on('error', err => {
                this.logger.error({
                    err,
                    tnx: 'transport'
                }, 'Transport Error: %s', err.message);
                this.emit('error', err);
            });
            // indicates if the sender has became idle
            this.transporter.on('idle', (...args) => {
                this.emit('idle', ...args);
            });
            // indicates if the sender has became idle and all connections are terminated
            this.transporter.on('clear', (...args) => {
                this.emit('clear', ...args);
            });
        }
        /**
         * Optional methods passed to the underlying transport object
         */
        ['close', 'isIdle', 'verify'].forEach(method => {
            this[method] = (...args) => {
                if (typeof this.transporter[method] === 'function') {
                    if (method === 'verify' && typeof this.getSocket === 'function') {
                        this.transporter.getSocket = this.getSocket;
                        this.getSocket = false;
                    }
                    return this.transporter[method](...args);
                }
                this.logger.warn({
                    tnx: 'transport',
                    methodName: method
                }, 'Non existing method %s called for transport', method);
                return false;
            };
        });
        // setup proxy handling
        if (this.options.proxy && typeof this.options.proxy === 'string') {
            this.setupProxy(this.options.proxy);
        }
    }
    use(step, plugin) {
        step = (step || '').toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
            this._userPlugins[step] = [plugin];
        }
        else {
            this._userPlugins[step].push(plugin);
        }
        return this;
    }
    sendMail(data, callback = null) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        const done = callback;
        if (typeof this.getSocket === 'function') {
            this.transporter.getSocket = this.getSocket;
            this.getSocket = false;
        }
        const mail = new mail_message_js_1.default(this, data);
        this.logger.debug({
            tnx: 'transport',
            name: this.transporter.name,
            version: this.transporter.version,
            action: 'send'
        }, 'Sending mail using %s/%s', this.transporter.name, this.transporter.version);
        this._processPlugins('compile', mail, err => {
            if (err) {
                this.logger.error({
                    err,
                    tnx: 'plugin',
                    action: 'compile'
                }, 'PluginCompile Error: %s', err.message);
                return done(err);
            }
            let recipientCount;
            try {
                mail.message = new index_js_1.default(mail.data).compile();
                mail.setMailerHeader();
                mail.setPriorityHeaders();
                mail.setListHeaders();
                recipientCount = mail.message.getEnvelope().to.length;
            }
            catch (err) {
                // message data can throw while it is compiled, the error belongs to the callback
                this.logger.error({
                    err,
                    tnx: 'transport',
                    action: 'send'
                }, 'Compile Error: %s', err.message);
                return done(err);
            }
            const maxRecipients = mail.data.maxRecipients === undefined ? DEFAULT_MAX_RECIPIENTS : mail.data.maxRecipients;
            if (maxRecipients && recipientCount > maxRecipients) {
                const err = new Error(`Message has ${recipientCount} recipients, which is over the ${maxRecipients} allowed by maxRecipients`);
                err.code = errors.EMAXRECIPIENTS;
                this.logger.error({
                    err,
                    tnx: 'transport',
                    action: 'send'
                }, 'Send Error: %s', err.message);
                return done(err);
            }
            this._processPlugins('stream', mail, err => {
                if (err) {
                    this.logger.error({
                        err,
                        tnx: 'plugin',
                        action: 'stream'
                    }, 'PluginStream Error: %s', err.message);
                    return done(err);
                }
                if (mail.data.dkim || this.dkim) {
                    mail.message.processFunc(input => {
                        const dkim = mail.data.dkim ? new index_js_2.default(mail.data.dkim) : this.dkim;
                        this.logger.debug({
                            tnx: 'DKIM',
                            messageId: mail.message.messageId(),
                            dkimDomains: dkim.keys.map(key => key.keySelector + '.' + key.domainName).join(', ')
                        }, 'Signing outgoing message with %s keys', dkim.keys.length);
                        return dkim.sign(input, mail.data._dkim);
                    });
                }
                this.transporter.send(mail, (...args) => {
                    if (args[0]) {
                        this.logger.error({
                            err: args[0],
                            tnx: 'transport',
                            action: 'send'
                        }, 'Send Error: %s', args[0].message);
                    }
                    done(...args);
                });
            });
        });
        return promise;
    }
    getVersionString() {
        return node_util_1.default.format('%s (%s; +%s; %s/%s)', packageData.name, packageData.version, packageData.homepage, this.transporter.name, this.transporter.version);
    }
    /** @internal */
    _processPlugins(step, mail, callback) {
        step = (step || '').toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
            return callback();
        }
        const userPlugins = this._userPlugins[step] || [];
        const defaultPlugins = this._defaultPlugins[step] || [];
        if (userPlugins.length) {
            this.logger.debug({
                tnx: 'transaction',
                pluginCount: userPlugins.length,
                step
            }, 'Using %s plugins for %s', userPlugins.length, step);
        }
        if (userPlugins.length + defaultPlugins.length === 0) {
            return callback();
        }
        let pos = 0;
        let block = 'default';
        const processPlugins = () => {
            let curplugins = block === 'default' ? defaultPlugins : userPlugins;
            if (pos >= curplugins.length) {
                if (block === 'default' && userPlugins.length) {
                    block = 'user';
                    pos = 0;
                    curplugins = userPlugins;
                }
                else {
                    return callback();
                }
            }
            const plugin = curplugins[pos++];
            plugin(mail, err => {
                if (err) {
                    return callback(err);
                }
                processPlugins();
            });
        };
        processPlugins();
    }
    /**
     * Sets up proxy handler for a Nodemailer object
     *
     * @param proxyUrl Proxy configuration url
     */
    setupProxy(proxyUrl) {
        const proxy = urllib.parse(proxyUrl);
        // setup socket handler for the mailer object
        this.getSocket = (options, callback) => {
            const protocol = proxy.protocol.replace(/:$/, '').toLowerCase();
            if (this.meta.has('proxy_handler_' + protocol)) {
                return this.meta.get('proxy_handler_' + protocol)(proxy, options, callback);
            }
            switch (protocol) {
                // Connect using a HTTP CONNECT method
                case 'http':
                case 'https':
                    (0, http_proxy_client_js_1.default)(proxy.href, options.port, options.host, this.options.tls || {}, (err, socket) => {
                        if (err) {
                            return callback(err);
                        }
                        return callback(null, {
                            connection: socket
                        });
                    });
                    return;
                case 'socks':
                case 'socks5':
                case 'socks4':
                case 'socks4a': {
                    if (!this.meta.has('proxy_socks_module')) {
                        let err = new Error('Socks module not loaded');
                        err.code = errors.EPROXY;
                        return callback(err);
                    }
                    const connect = (ipaddress) => {
                        const proxyV2 = !!this.meta.get('proxy_socks_module').SocksClient;
                        const socksClient = proxyV2 ? this.meta.get('proxy_socks_module').SocksClient : this.meta.get('proxy_socks_module');
                        const proxyType = Number(proxy.protocol.replace(/\D/g, '')) || 5;
                        const connectionOpts = {
                            proxy: {
                                ipaddress,
                                port: Number(proxy.port),
                                type: proxyType
                            },
                            [proxyV2 ? 'destination' : 'target']: {
                                host: options.host,
                                port: options.port
                            },
                            command: 'connect'
                        };
                        if (proxy.username || proxy.password) {
                            const username = proxy.username || '';
                            const password = proxy.password || '';
                            if (proxyV2) {
                                connectionOpts.proxy.userId = username;
                                connectionOpts.proxy.password = password;
                            }
                            else if (proxyType === 4) {
                                connectionOpts.userid = username;
                            }
                            else {
                                connectionOpts.authentication = {
                                    username,
                                    password
                                };
                            }
                        }
                        socksClient.createConnection(connectionOpts, (err, info) => {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                connection: info.socket || info
                            });
                        });
                    };
                    if (node_net_1.default.isIP(proxy.hostname)) {
                        return connect(proxy.hostname);
                    }
                    return node_dns_1.default.resolve(proxy.hostname, (err, address) => {
                        if (err) {
                            return callback(err);
                        }
                        connect(Array.isArray(address) ? address[0] : address);
                    });
                }
            }
            let err = new Error('Unknown proxy configuration');
            err.code = errors.EPROXY;
            callback(err);
        };
    }
    /** @internal */
    _convertDataImages(mail, callback) {
        if ((!this.options.attachDataUrls && !mail.data.attachDataUrls) || !mail.data.html) {
            return callback();
        }
        mail.resolveContent(mail.data, 'html', { disableFileAccess: mail.data.disableFileAccess, disableUrlAccess: mail.data.disableUrlAccess }, (err, html) => {
            if (err) {
                return callback(err);
            }
            let cidCounter = 0;
            html = (html || '')
                .toString()
                .replace(/(<img\b[^<>]{0,1024} src\s{0,20}=[\s"']{0,20})(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
                const cid = node_crypto_1.default.randomBytes(10).toString('hex') + '@localhost';
                if (!mail.data.attachments) {
                    mail.data.attachments = [];
                }
                if (!Array.isArray(mail.data.attachments)) {
                    mail.data.attachments = [].concat(mail.data.attachments || []);
                }
                mail.data.attachments.push({
                    path: dataUri,
                    cid,
                    filename: 'image-' + ++cidCounter + '.' + mimeTypes.detectExtension(mimeType)
                });
                return prefix + 'cid:' + cid;
            });
            mail.data.html = html;
            callback();
        });
    }
    set(key, value) {
        return this.meta.set(key, value);
    }
    get(key) {
        return this.meta.get(key);
    }
}
exports.default = Mail;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
