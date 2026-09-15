"use strict";
/**
 * Minimal HTTP/S proxy client
 */
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
const node_net_1 = __importDefault(require("node:net"));
const node_tls_1 = __importDefault(require("node:tls"));
const urllib = __importStar(require("../shared/url.js"));
const errors = __importStar(require("../errors.js"));
// Cap the CONNECT response we buffer before the header terminator, so a proxy that
// never sends \r\n\r\n cannot grow memory unboundedly before the socket times out.
const MAX_RESPONSE_HEADER_BYTES = 64 * 1024;
function httpProxyClient(proxyUrl, destinationPort, destinationHost, tlsOptions, callback) {
    if (typeof tlsOptions === 'function') {
        callback = tlsOptions;
        tlsOptions = {};
    }
    tlsOptions = tlsOptions || {};
    // Reject CRLF in the destination before it reaches the CONNECT request line
    // and Host header. A tainted host/port could otherwise inject additional
    // request headers into the proxy connection (HTTP request splitting).
    destinationPort = Number(destinationPort) || 0;
    if (!destinationPort || /[\r\n]/.test(destinationHost)) {
        const err = new Error('Invalid proxy destination');
        err.code = errors.EPROXY;
        setImmediate(() => callback(err));
        return;
    }
    const proxy = urllib.parse(proxyUrl);
    const connectOptions = {
        host: proxy.hostname,
        port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === 'https:' ? 443 : 80
    };
    let connect;
    if (proxy.protocol === 'https:') {
        // Validate the proxy's TLS certificate by default. A caller that uses a
        // self-signed proxy (e.g. integration tests) opts out explicitly with
        // tls.rejectUnauthorized === false.
        connectOptions.rejectUnauthorized = tlsOptions.rejectUnauthorized !== false;
        connect = node_tls_1.default.connect.bind(node_tls_1.default);
    }
    else {
        connect = node_net_1.default.connect.bind(node_net_1.default);
    }
    let socket;
    // Error harness for initial connection. Once connection is established, the responsibility
    // to handle errors is passed to whoever uses this socket
    let finished = false;
    const tempSocketErr = (err) => {
        if (finished) {
            return;
        }
        finished = true;
        try {
            socket.destroy();
        }
        catch (_E) {
            // ignore
        }
        callback(err);
    };
    const timeoutErr = () => {
        const err = new Error('Proxy socket timed out');
        err.code = 'ETIMEDOUT';
        tempSocketErr(err);
    };
    socket = connect(connectOptions, () => {
        if (finished) {
            return;
        }
        const reqHeaders = {
            Host: destinationHost + ':' + destinationPort,
            Connection: 'close'
        };
        if (proxy.auth) {
            reqHeaders['Proxy-Authorization'] = 'Basic ' + Buffer.from(proxy.auth).toString('base64');
        }
        socket.write(
        // HTTP method
        'CONNECT ' +
            destinationHost +
            ':' +
            destinationPort +
            ' HTTP/1.1\r\n' +
            // HTTP request headers
            Object.keys(reqHeaders)
                .map(key => key + ': ' + reqHeaders[key])
                .join('\r\n') +
            // End request
            '\r\n\r\n');
        let headers = '';
        const onSocketData = (chunk) => {
            let match;
            let remainder;
            if (finished) {
                return;
            }
            headers += chunk.toString('binary');
            if ((match = headers.match(/\r\n\r\n/))) {
                socket.removeListener('data', onSocketData);
                remainder = headers.substr(match.index + match[0].length);
                headers = headers.substr(0, match.index);
                if (remainder) {
                    socket.unshift(Buffer.from(remainder, 'binary'));
                }
                // proxy connection is now established
                finished = true;
                // check response code
                match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
                if (!match || (match[1] || '').charAt(0) !== '2') {
                    try {
                        socket.destroy();
                    }
                    catch (_E) {
                        // ignore
                    }
                    const err = new Error('Invalid response from proxy' + ((match && ': ' + match[1]) || ''));
                    err.code = errors.EPROXY;
                    return callback(err);
                }
                socket.removeListener('error', tempSocketErr);
                socket.removeListener('timeout', timeoutErr);
                socket.setTimeout(0);
                return callback(null, socket);
            }
            if (headers.length > MAX_RESPONSE_HEADER_BYTES) {
                socket.removeListener('data', onSocketData);
                const err = new Error('Proxy response headers too large');
                err.code = errors.EPROXY;
                return tempSocketErr(err);
            }
        };
        socket.on('data', onSocketData);
    });
    socket.setTimeout(httpProxyClient.timeout || 30 * 1000);
    socket.on('timeout', timeoutErr);
    socket.once('error', tempSocketErr);
}
exports.default = httpProxyClient;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
