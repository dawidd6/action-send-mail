"use strict";
/* eslint no-console: 0 */
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
exports.encodeXText = exports.assign = exports.parseDataURI = exports.callbackPromise = exports.getLogger = exports._logFunc = exports.parseConnectionUrl = exports.resolveHostname = exports.dnsCache = exports.networkInterfaces = exports._resetCacheCleanup = exports._lastCacheCleanup = exports.copyOwnKeys = exports.isProtoKey = void 0;
exports.resolveContent = resolveContent;
const urllib = __importStar(require("./url.js"));
const node_util_1 = __importDefault(require("node:util"));
const node_fs_1 = __importDefault(require("node:fs"));
const index_js_1 = __importDefault(require("../fetch/index.js"));
const errors = __importStar(require("../errors.js"));
const objects_js_1 = require("./objects.js");
Object.defineProperty(exports, "isProtoKey", { enumerable: true, get: function () { return objects_js_1.isProtoKey; } });
Object.defineProperty(exports, "copyOwnKeys", { enumerable: true, get: function () { return objects_js_1.copyOwnKeys; } });
const node_dns_1 = __importDefault(require("node:dns"));
const node_net_1 = __importDefault(require("node:net"));
const node_os_1 = __importDefault(require("node:os"));
const DNS_TTL = 5 * 60 * 1000;
const CACHE_CLEANUP_INTERVAL = 30 * 1000; // Minimum 30 seconds between cleanups
const MAX_CACHE_SIZE = 1000; // Maximum number of entries in cache
let lastCacheCleanup = 0;
/** @internal */
const _lastCacheCleanup = () => lastCacheCleanup;
exports._lastCacheCleanup = _lastCacheCleanup;
/** @internal */
const _resetCacheCleanup = () => {
    lastCacheCleanup = 0;
};
exports._resetCacheCleanup = _resetCacheCleanup;
try {
    exports.networkInterfaces = node_os_1.default.networkInterfaces();
}
catch (_err) {
    // fails on some systems
}
const isFamilySupported = (family, allowInternal) => {
    const addresses = Object.values(exports.networkInterfaces || {}).flat();
    if (!addresses.length) {
        // hope for the best. Runtimes without an interface table (Cloudflare
        // Workers) report an empty object rather than throwing
        return true;
    }
    return addresses.filter(i => !i.internal || allowInternal).some(i => i.family === 'IPv' + family || i.family === family);
};
const resolve = (family, hostname, options, callback) => {
    options = options || {};
    if (!isFamilySupported(family, options.allowInternalNetworkInterfaces)) {
        return callback(null, []);
    }
    const dnsResolver = node_dns_1.default.Resolver ? new node_dns_1.default.Resolver(options) : node_dns_1.default;
    dnsResolver['resolve' + family](hostname, (err, addresses) => {
        if (err) {
            switch (err.code) {
                case node_dns_1.default.NODATA:
                case node_dns_1.default.NOTFOUND:
                case node_dns_1.default.NOTIMP:
                case node_dns_1.default.SERVFAIL:
                case node_dns_1.default.CONNREFUSED:
                case node_dns_1.default.REFUSED:
                case 'EAI_AGAIN':
                    return callback(null, []);
            }
            return callback(err);
        }
        return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
    });
};
exports.dnsCache = new Map();
const formatDNSValue = (value, extra) => {
    if (!value) {
        return Object.assign({}, extra || {});
    }
    const addresses = value.addresses || [];
    // Select a random address from available addresses, or null if none
    const host = addresses.length > 0 ? addresses[Math.floor(Math.random() * addresses.length)] : null;
    return Object.assign({
        host,
        // Include all addresses for connection fallback support
        _addresses: addresses
    }, extra || {});
};
const resolveHostname = (options, callback) => {
    options = options || {};
    if (!options.host && options.servername) {
        options.host = options.servername;
    }
    if (!options.host || node_net_1.default.isIP(options.host)) {
        // nothing to do here
        const value = {
            addresses: [options.host]
        };
        return callback(null, formatDNSValue(value, {
            servername: options.servername || false,
            cached: false
        }));
    }
    const host = options.host;
    // The TLS server name belongs to the connection asking, not to the host it resolves. The
    // cache is shared by every transport of the process and keyed by host alone, so a server
    // name stored in it would be the one of whichever transport resolved the host first, and a
    // later transport with its own tls.servername would present and verify that name instead
    const servername = options.servername || host;
    let cached;
    if (exports.dnsCache.has(options.host)) {
        cached = exports.dnsCache.get(options.host);
        // Lazy cleanup with time throttling
        const now = Date.now();
        if (now - lastCacheCleanup > CACHE_CLEANUP_INTERVAL) {
            lastCacheCleanup = now;
            // Clean up expired entries
            for (const [host, entry] of exports.dnsCache.entries()) {
                if (entry.expires && entry.expires < now) {
                    exports.dnsCache.delete(host);
                }
            }
            // If cache is still too large, remove oldest entries
            if (exports.dnsCache.size > MAX_CACHE_SIZE) {
                const toDelete = Math.floor(MAX_CACHE_SIZE * 0.1); // Remove 10% of entries
                const keys = Array.from(exports.dnsCache.keys()).slice(0, toDelete);
                keys.forEach(key => exports.dnsCache.delete(key));
            }
        }
        if (!cached.expires || cached.expires >= now) {
            return callback(null, formatDNSValue(cached.value, {
                servername,
                cached: true
            }));
        }
    }
    // Resolve both IPv4 and IPv6 addresses for fallback support
    let ipv4Addresses = [];
    let ipv6Addresses = [];
    let ipv4Error = null;
    let ipv6Error = null;
    resolve(4, options.host, options, (err, addresses) => {
        if (err) {
            ipv4Error = err;
        }
        else {
            ipv4Addresses = addresses || [];
        }
        resolve(6, host, options, (err, addresses) => {
            if (err) {
                ipv6Error = err;
            }
            else {
                ipv6Addresses = addresses || [];
            }
            // Combine addresses: IPv4 first, then IPv6
            const allAddresses = ipv4Addresses.concat(ipv6Addresses);
            if (allAddresses.length) {
                const value = {
                    addresses: allAddresses
                };
                exports.dnsCache.set(host, {
                    value,
                    expires: Date.now() + (options.dnsTtl || DNS_TTL)
                });
                return callback(null, formatDNSValue(value, {
                    servername,
                    cached: false
                }));
            }
            // No addresses from resolve4/resolve6, try dns.lookup as fallback
            if (ipv4Error && ipv6Error) {
                // Both resolvers had errors
                if (cached) {
                    exports.dnsCache.set(host, {
                        value: cached.value,
                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
                    });
                    return callback(null, formatDNSValue(cached.value, {
                        servername,
                        cached: true,
                        error: ipv4Error
                    }));
                }
            }
            try {
                node_dns_1.default.lookup(host, { all: true }, (err, addresses) => {
                    if (err) {
                        if (cached) {
                            exports.dnsCache.set(host, {
                                value: cached.value,
                                expires: Date.now() + (options.dnsTtl || DNS_TTL)
                            });
                            return callback(null, formatDNSValue(cached.value, {
                                servername,
                                cached: true,
                                error: err
                            }));
                        }
                        return callback(err);
                    }
                    // Get all supported addresses from dns.lookup
                    const supportedAddresses = addresses
                        ? addresses.filter(addr => isFamilySupported(addr.family)).map(addr => addr.address)
                        : [];
                    if (addresses && addresses.length && !supportedAddresses.length) {
                        // there are addresses but none can be used
                        console.warn(`Failed to resolve IPv${addresses[0].family} addresses with current network`);
                    }
                    if (!supportedAddresses.length && cached) {
                        // nothing was found, fallback to cached value
                        return callback(null, formatDNSValue(cached.value, {
                            servername,
                            cached: true
                        }));
                    }
                    const value = {
                        addresses: supportedAddresses.length ? supportedAddresses : [host]
                    };
                    exports.dnsCache.set(host, {
                        value,
                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
                    });
                    return callback(null, formatDNSValue(value, {
                        servername,
                        cached: false
                    }));
                });
            }
            catch (lookupErr) {
                if (cached) {
                    exports.dnsCache.set(host, {
                        value: cached.value,
                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
                    });
                    return callback(null, formatDNSValue(cached.value, {
                        servername,
                        cached: true,
                        error: lookupErr
                    }));
                }
                return callback(ipv4Error || ipv6Error || lookupErr);
            }
        });
    });
};
exports.resolveHostname = resolveHostname;
/**
 * Parses connection url to a structured configuration object
 *
 * @param str Connection url
 * @return Configuration object
 */
const parseConnectionUrl = (str) => {
    str = str || '';
    const options = {};
    const url = urllib.parse(str, true);
    switch (url.protocol) {
        case 'smtp:':
            options.secure = false;
            break;
        case 'smtps:':
            options.secure = true;
            break;
        case 'direct:':
            options.direct = true;
            break;
    }
    if (!isNaN(url.port) && Number(url.port)) {
        options.port = Number(url.port);
    }
    if (url.hostname) {
        options.host = url.hostname;
    }
    if (url.username || url.password) {
        options.auth = {
            user: url.username || '',
            pass: url.password || ''
        };
    }
    Object.keys(url.query || {}).forEach(key => {
        let obj = options;
        let lKey = key;
        let value = url.query[key];
        if (!isNaN(value)) {
            value = Number(value);
        }
        switch (value) {
            case 'true':
                value = true;
                break;
            case 'false':
                value = false;
                break;
        }
        // tls is nested object
        if (key.indexOf('tls.') === 0) {
            lKey = key.substr(4);
            if (!options.tls) {
                options.tls = {};
            }
            obj = options.tls;
        }
        else if (key.indexOf('.') >= 0) {
            // ignore nested properties besides tls
            return;
        }
        // `in` already keeps "__proto__" out, but only as a side effect of it being an
        // Object.prototype member. Say it, so the protection survives a change to the check
        if (!(0, objects_js_1.isProtoKey)(lKey) && !(lKey in obj)) {
            obj[lKey] = value;
        }
    });
    return options;
};
exports.parseConnectionUrl = parseConnectionUrl;
/** @internal */
const _logFunc = (logger, level, defaults, data, message, ...args) => {
    const entry = Object.assign({}, defaults || {}, data || {});
    delete entry.level;
    let logLevel = level;
    if (typeof logger[logLevel] !== 'function') {
        // Provided logger does not implement this level. Fall back to a
        // lower-severity handler instead of throwing.
        logLevel = ['info', 'debug', 'log', 'trace', 'warn', 'error'].find(name => typeof logger[name] === 'function');
    }
    if (logLevel) {
        logger[logLevel](entry, message, ...args);
    }
};
exports._logFunc = _logFunc;
/**
 * Returns a bunyan-compatible logger interface. Uses either provided logger or
 * creates a default console logger
 *
 * @param [options] Options object that might include 'logger' value
 * @return bunyan compatible logger
 */
const getLogger = (options, defaults) => {
    options = options || {};
    const response = {};
    const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
    if (!options.logger) {
        // use vanity logger
        levels.forEach(level => {
            response[level] = () => false;
        });
        return response;
    }
    const logger = options.logger === true ? createDefaultLogger(levels) : options.logger;
    levels.forEach(level => {
        response[level] = (data, message, ...args) => {
            (0, exports._logFunc)(logger, level, defaults, data, message, ...args);
        };
    });
    return response;
};
exports.getLogger = getLogger;
/**
 * Wrapper for creating a callback that either resolves or rejects a promise
 * based on input
 *
 * @param resolve Function to run if callback is called
 * @param reject Function to run if callback ends with an error
 */
const callbackPromise = (resolve, reject) => function (...args) {
    const err = args.shift();
    if (err) {
        reject(err);
    }
    else {
        resolve(...args);
    }
};
exports.callbackPromise = callbackPromise;
const parseDataURI = (uri) => {
    if (typeof uri !== 'string') {
        return null;
    }
    // Early return for non-data URIs to avoid unnecessary processing
    if (!uri.startsWith('data:')) {
        return null;
    }
    // Find the first comma safely - this prevents ReDoS
    const commaPos = uri.indexOf(',');
    if (commaPos === -1) {
        return null;
    }
    const data = uri.substring(commaPos + 1);
    const metaStr = uri.substring('data:'.length, commaPos);
    let encoding;
    const metaEntries = metaStr.split(';');
    if (metaEntries.length > 0) {
        const lastEntry = metaEntries[metaEntries.length - 1].toLowerCase().trim();
        // Only recognize valid encoding types to prevent manipulation
        if (['base64', 'utf8', 'utf-8'].includes(lastEntry) && lastEntry.indexOf('=') === -1) {
            encoding = lastEntry;
            metaEntries.pop();
        }
    }
    const contentType = metaEntries.length > 0 ? metaEntries.shift() : 'application/octet-stream';
    const params = {};
    for (let i = 0; i < metaEntries.length; i++) {
        const entry = metaEntries[i];
        const sepPos = entry.indexOf('=');
        if (sepPos > 0) {
            // Ensure there's a key before the '='
            const key = entry.substring(0, sepPos).trim();
            const value = entry.substring(sepPos + 1).trim();
            if (key && !(0, objects_js_1.isProtoKey)(key)) {
                params[key] = value;
            }
        }
    }
    // Decode data based on encoding with proper error handling
    let bufferData;
    try {
        if (encoding === 'base64') {
            bufferData = Buffer.from(data, 'base64');
        }
        else {
            try {
                bufferData = Buffer.from(decodeURIComponent(data));
            }
            catch (_decodeError) {
                bufferData = Buffer.from(data);
            }
        }
    }
    catch (_bufferError) {
        bufferData = Buffer.alloc(0);
    }
    return {
        data: bufferData,
        encoding: encoding || null,
        contentType: contentType || 'application/octet-stream',
        params
    };
};
exports.parseDataURI = parseDataURI;
function resolveContent(data, key, options, callback) {
    // options is optional; support the legacy resolveContent(data, key, callback) signature
    if (!callback && typeof options === 'function') {
        callback = options;
        options = false;
    }
    options = options || {};
    let promise;
    if (!callback) {
        promise = new Promise((resolve, reject) => {
            callback = (0, exports.callbackPromise)(resolve, reject);
        });
    }
    resolveContentValue(data, key, options, callback);
    return promise;
}
function resolveContentValue(data, key, options, callback) {
    let content = (data && data[key] && data[key].content) || data[key];
    const encoding = ((typeof data[key] === 'object' && data[key].encoding) || 'utf8')
        .toString()
        .toLowerCase()
        .replace(/[-_\s]/g, '');
    if (!content) {
        return callback(null, content);
    }
    if (typeof content === 'object') {
        if (typeof content.pipe === 'function') {
            return resolveStream(content, (err, value) => {
                if (err) {
                    return callback(err);
                }
                // we can't stream twice the same content, so we need
                // to replace the stream object with the streaming result
                if (data[key].content) {
                    data[key].content = value;
                }
                else {
                    data[key] = value;
                }
                callback(null, value);
            });
        }
        else if (/^data:/i.test(content.path || content.href)) {
            const parsedDataUri = (0, exports.parseDataURI)(content.path || content.href);
            return callback(null, parsedDataUri && parsedDataUri.data ? parsedDataUri.data : Buffer.alloc(0));
        }
        else if (content.href || /^https?:\/\//i.test(content.path)) {
            // An href is always a URL, and so is a path that looks like one. Let nmfetch
            // decide whether it is fetchable, it validates the parsed URL. Testing the raw
            // string here instead would let a file: href fall through to the "return as is"
            // default below and travel on inside the resolved message.
            const url = content.href || content.path;
            if (options.disableUrlAccess) {
                setImmediate(() => {
                    const err = new Error('Url access rejected for ' + url);
                    err.code = errors.EURLACCESS;
                    callback(err);
                });
                return;
            }
            return resolveStream((0, index_js_1.default)(url, { headers: content.httpHeaders, tls: content.tls }), callback);
        }
        else if (content.path) {
            if (options.disableFileAccess) {
                setImmediate(() => {
                    const err = new Error('File access rejected for ' + content.path);
                    err.code = errors.EFILEACCESS;
                    callback(err);
                });
                return;
            }
            return resolveStream(node_fs_1.default.createReadStream(content.path), callback);
        }
    }
    if (typeof data[key].content === 'string' && !['utf8', 'usascii', 'ascii'].includes(encoding)) {
        content = Buffer.from(data[key].content, encoding);
    }
    // default action, return as is
    setImmediate(() => callback(null, content));
}
/**
 * Copies properties from source objects to target objects
 */
const assign = function (...args) {
    const target = args.shift() || {};
    args.forEach(source => {
        Object.keys(source || {}).forEach(key => {
            if ((0, objects_js_1.isProtoKey)(key)) {
                return;
            }
            if (['tls', 'auth'].includes(key) &&
                source[key] &&
                typeof source[key] === 'object') {
                // tls and auth are special keys that need to be enumerated separately
                // other objects are passed as is. Enumerating is a copy of user supplied
                // keys just like the loop above, so it gets the same treatment
                target[key] = (0, objects_js_1.copyOwnKeys)(target[key] || {}, source[key]);
            }
            else {
                target[key] = source[key];
            }
        });
    });
    return target;
};
exports.assign = assign;
const encodeXText = (str) => {
    // ! 0x21
    // + 0x2B
    // = 0x3D
    // ~ 0x7E
    if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
        return str;
    }
    const buf = Buffer.from(str);
    let result = '';
    for (let i = 0, len = buf.length; i < len; i++) {
        const c = buf[i];
        if (c < 0x21 || c > 0x7e || c === 0x2b || c === 0x3d) {
            result += '+' + (c < 0x10 ? '0' : '') + c.toString(16).toUpperCase();
        }
        else {
            result += String.fromCharCode(c);
        }
    }
    return result;
};
exports.encodeXText = encodeXText;
/**
 * Streams a stream value into a Buffer
 *
 * @param stream Readable stream
 * @param callback Callback function with (err, value)
 */
function resolveStream(stream, callback) {
    let responded = false;
    const chunks = [];
    let chunklen = 0;
    stream.on('error', err => {
        if (responded) {
            return;
        }
        responded = true;
        callback(err);
    });
    stream.on('readable', () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
        }
    });
    stream.on('end', () => {
        if (responded) {
            return;
        }
        responded = true;
        let value;
        try {
            value = Buffer.concat(chunks, chunklen);
        }
        catch (E) {
            return callback(E);
        }
        callback(null, value);
    });
}
/**
 * Generates a bunyan-like logger that prints to console
 *
 * @returns Bunyan logger instance
 */
function createDefaultLogger(levels) {
    const levelMaxLen = levels.reduce((max, level) => Math.max(max, level.length), 0);
    const levelNames = new Map();
    levels.forEach(level => {
        let levelName = level.toUpperCase();
        if (levelName.length < levelMaxLen) {
            levelName += ' '.repeat(levelMaxLen - levelName.length);
        }
        levelNames.set(level, levelName);
    });
    const print = (level, entry, message, ...args) => {
        let prefix = '';
        if (entry) {
            if (entry.tnx === 'server') {
                prefix = 'S: ';
            }
            else if (entry.tnx === 'client') {
                prefix = 'C: ';
            }
            if (entry.sid) {
                prefix = '[' + entry.sid + '] ' + prefix;
            }
            if (entry.cid) {
                prefix = '[#' + entry.cid + '] ' + prefix;
            }
        }
        message = node_util_1.default.format(message, ...args);
        message.split(/\r?\n/).forEach((line) => {
            console.log('[%s] %s %s', new Date().toISOString().substr(0, 19).replace(/T/, ' '), levelNames.get(level), prefix + line);
        });
    };
    const logger = {};
    levels.forEach(level => {
        logger[level] = print.bind(null, level);
    });
    return logger;
}
