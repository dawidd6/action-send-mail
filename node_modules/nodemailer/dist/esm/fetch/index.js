import http from 'node:http';
import https from 'node:https';
import * as urllib from '../shared/url.js';
import zlib from 'node:zlib';
import { PassThrough } from 'node:stream';
import Cookies from './cookies.js';
import * as packageData from '../package-info.js';
import net from 'node:net';
import * as errors from '../errors.js';
import { isProtoKey } from '../shared/objects.js';
const MAX_REDIRECTS = 5;
// a stalled server would otherwise hold the request, and whatever waits on it, open forever
const DEFAULT_TIMEOUT = 60 * 1000;
// the body is usually buffered in memory by the caller, so an unbounded download is refused
const DEFAULT_MAX_BYTES = 64 * 1024 * 1024;
// Only genuine TLS settings are taken from options.tls. That object reaches us straight
// from a user supplied attachment (content.tls), so keys like host, port, path, socketPath
// or lookup would otherwise repoint the request at a destination that never went through
// the URL checks below.
//
// The source of truth is the tls.connect() option list in the Node docs. A key missing
// here is dropped silently, so extend this list rather than working around it.
const TLS_OPTION_KEYS = [
    'ALPNProtocols',
    'ca',
    'cert',
    'checkServerIdentity',
    'ciphers',
    'crl',
    'dhparam',
    'ecdhCurve',
    'honorCipherOrder',
    'key',
    'maxVersion',
    'minVersion',
    'passphrase',
    'pfx',
    'rejectUnauthorized',
    'secureContext',
    'secureOptions',
    'secureProtocol',
    'servername',
    'sessionIdContext',
    'sigalgs'
];
/**
 * Marks an error of the request as a fetch error, unless it is a permission model
 * denial, which keeps its own code (see ERR_ACCESS_DENIED)
 *
 * @param err Error to mark
 */
function setFetchCode(err) {
    if (err.code !== errors.ERR_ACCESS_DENIED) {
        err.code = errors.EFETCH;
    }
}
/**
 * Resolves a URL only if it is one this module is willing to request.
 *
 * urllib.parse throws for a host that contains forbidden bytes, and it is called for
 * every URL that reaches nmfetch, including ones that arrive from a message attachment
 * or from a redirect Location header. An uncaught throw here takes the process down,
 * so a URL that does not parse is reported the same way as one with a scheme we refuse.
 *
 * @param url URL to parse
 * @returns Parsed URL, or false if it is not a usable http(s) URL
 */
function parseFetchUrl(url) {
    let parsed;
    try {
        parsed = urllib.parse(url);
    }
    catch (_err) {
        return false;
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return false;
    }
    return parsed;
}
function nmfetch(url, options) {
    options = options || {};
    options.fetchRes = options.fetchRes || new PassThrough();
    options.cookies = options.cookies || new Cookies();
    options.redirects = options.redirects || 0;
    options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;
    const fetchRes = options.fetchRes;
    const parsed = parseFetchUrl(url);
    if (!parsed) {
        // Only http(s) URLs can be fetched. Any other scheme (file:, gopher:, a
        // protocol-relative redirect target etc.) would otherwise be silently served over
        // plain HTTP, possibly against an unintended host. Bail out before the cookie jar
        // is touched so a refused URL can not seed it, and release a caller supplied body:
        // this is the one exit that runs before the error handler below is attached to it,
        // so an error on that stream would have nowhere to go and the fd or socket behind
        // it would never be released.
        if (options.body && typeof options.body.destroy === 'function') {
            options.body.on('error', () => false);
            options.body.destroy();
        }
        setImmediate(() => {
            const err = new Error('Unsupported protocol for URL ' + url);
            err.code = errors.EFETCH;
            err.sourceUrl = url;
            fetchRes.emit('error', err);
        });
        return fetchRes;
    }
    if (options.cookie) {
        [].concat(options.cookie || []).forEach(cookie => {
            options.cookies.set(cookie, url);
        });
        options.cookie = false;
    }
    let method = (options.method || '').toString().trim().toUpperCase() || 'GET';
    let finished = false;
    let cookies;
    let body;
    const handler = parsed.protocol === 'https:' ? https : http;
    const headers = {
        'accept-encoding': 'gzip,deflate',
        'user-agent': 'nodemailer/' + packageData.version
    };
    Object.keys(options.headers || {}).forEach(key => {
        // options.headers is the caller's httpHeaders, straight off an attachment
        if (isProtoKey(key.toLowerCase().trim())) {
            return;
        }
        headers[key.toLowerCase().trim()] = options.headers[key];
    });
    if (options.userAgent) {
        headers['user-agent'] = options.userAgent;
    }
    if (parsed.auth) {
        headers.Authorization = 'Basic ' + Buffer.from(parsed.auth).toString('base64');
    }
    if ((cookies = options.cookies.get(url))) {
        headers.cookie = cookies;
    }
    if (options.body) {
        if (options.contentType !== false) {
            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
        }
        if (typeof options.body.pipe === 'function') {
            // it's a stream
            headers['Transfer-Encoding'] = 'chunked';
            body = options.body;
            body.on('error', (err) => {
                if (finished) {
                    return;
                }
                finished = true;
                setFetchCode(err);
                err.sourceUrl = url;
                fetchRes.emit('error', err);
            });
        }
        else {
            if (options.body instanceof Buffer) {
                body = options.body;
            }
            else if (typeof options.body === 'object') {
                try {
                    // encodeURIComponent can fail on invalid input (partial emoji etc.)
                    body = Buffer.from(Object.keys(options.body)
                        .map(key => {
                        const value = options.body[key].toString().trim();
                        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
                    })
                        .join('&'));
                }
                catch (E) {
                    // the caller attaches its error listener once nmfetch has returned, so
                    // the error is emitted on the next tick and the stream is handed back
                    // the way every other failure is reported
                    finished = true;
                    E.code = errors.EFETCH;
                    E.sourceUrl = url;
                    setImmediate(() => fetchRes.emit('error', E));
                    return fetchRes;
                }
            }
            else {
                body = Buffer.from(options.body.toString().trim());
            }
            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
            headers['Content-Length'] = body.length;
        }
        // if method is not provided, use POST instead of GET
        method = (options.method || '').toString().trim().toUpperCase() || 'POST';
    }
    let req;
    const reqOptions = {
        method,
        host: parsed.hostname,
        path: parsed.path,
        port: parsed.port ? parsed.port : parsed.protocol === 'https:' ? 443 : 80,
        headers,
        // Validate TLS certificates by default. Callers that genuinely need to
        // reach a self-signed/internal host opt out explicitly with
        // options.tls = { rejectUnauthorized: false }.
        rejectUnauthorized: true,
        agent: false
    };
    if (options.tls) {
        // see TLS_OPTION_KEYS
        Object.keys(options.tls).forEach(key => {
            if (TLS_OPTION_KEYS.includes(key)) {
                reqOptions[key] = options.tls[key];
            }
        });
    }
    if (parsed.protocol === 'https:' &&
        parsed.hostname &&
        parsed.hostname !== reqOptions.host &&
        !net.isIP(parsed.hostname) &&
        !reqOptions.servername) {
        reqOptions.servername = parsed.hostname;
    }
    try {
        req = handler.request(reqOptions);
    }
    catch (E) {
        finished = true;
        setImmediate(() => {
            setFetchCode(E);
            E.sourceUrl = url;
            fetchRes.emit('error', E);
        });
        return fetchRes;
    }
    // reports the first failure of this request on fetchRes and releases the request
    const fail = (err, sourceUrl = url) => {
        if (finished) {
            return;
        }
        finished = true;
        setFetchCode(err);
        err.sourceUrl = sourceUrl;
        fetchRes.emit('error', err);
        req.abort();
    };
    const timeout = typeof options.timeout === 'number' && options.timeout >= 0 ? options.timeout : DEFAULT_TIMEOUT;
    if (timeout) {
        req.setTimeout(timeout, () => fail(new Error('Request Timeout')));
    }
    req.on('error', (err) => fail(err));
    // a consumer that destroys the response stream before it ended does not want the rest of
    // the body, release the request now instead of when the timeout fires
    fetchRes.once('close', () => {
        if (finished || fetchRes.readableEnded) {
            return;
        }
        finished = true;
        req.destroy();
    });
    req.on('response', res => {
        let inflate;
        if (finished) {
            return;
        }
        switch (res.headers['content-encoding']) {
            case 'gzip':
            case 'deflate':
                inflate = zlib.createUnzip();
                break;
        }
        if (res.headers['set-cookie']) {
            [].concat(res.headers['set-cookie'] || []).forEach(cookie => {
                options.cookies.set(cookie, url);
            });
        }
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
            // redirect
            options.redirects++;
            if (options.redirects > options.maxRedirects) {
                return fail(new Error('Maximum redirect count exceeded'));
            }
            // redirect does not include POST body
            options.method = 'GET';
            options.body = false;
            let redirectUrl;
            try {
                redirectUrl = urllib.resolve(url, res.headers.location);
            }
            catch (_err) {
                // the legacy resolver throws on a Location the WHATWG parser also refused,
                // so fall through to the check below with what the server actually sent
                redirectUrl = res.headers.location;
            }
            const redirectParsed = parseFetchUrl(redirectUrl);
            if (!redirectParsed) {
                // Refuse the redirect target here rather than leaving it to the recursive
                // call: that call gets its own `finished` flag and no handle on this
                // request, so this one would stay open and could emit a second error on
                // the shared fetchRes once it times out. Callers listen with req.once().
                return fail(new Error('Unsupported protocol for URL ' + redirectUrl), redirectUrl);
            }
            // Do not forward credentials when the redirect leaves the original
            // security context: a different host, or a downgrade from https to
            // http (which would otherwise put them on the wire in cleartext).
            // Strip sensitive request headers so an attacker who controls the
            // redirect target cannot harvest them.
            const crossHost = redirectParsed.hostname !== parsed.hostname;
            const downgrade = parsed.protocol === 'https:' && redirectParsed.protocol === 'http:';
            if (options.headers && (crossHost || downgrade)) {
                const sensitive = ['authorization', 'cookie', 'proxy-authorization'];
                Object.keys(options.headers).forEach(key => {
                    if (sensitive.includes(key.toLowerCase())) {
                        delete options.headers[key];
                    }
                });
            }
            // this request is done with, release it so its socket and timeout do not
            // outlive it and report a late error on the shared fetchRes
            finished = true;
            res.resume();
            req.abort();
            return nmfetch(redirectUrl, options);
        }
        fetchRes.statusCode = res.statusCode;
        fetchRes.headers = res.headers;
        if (res.statusCode >= 300 && !options.allowErrorResponse) {
            return fail(new Error('Invalid status code ' + res.statusCode));
        }
        res.on('error', (err) => fail(err));
        const maxBytes = typeof options.maxBytes === 'number' && options.maxBytes > 0 ? options.maxBytes : DEFAULT_MAX_BYTES;
        const source = inflate || res;
        let received = 0;
        source.on('data', (chunk) => {
            received += chunk.length;
            if (received <= maxBytes || finished) {
                return;
            }
            source.unpipe(fetchRes);
            fail(new Error('Response size exceeds the allowed ' + maxBytes + ' bytes'));
        });
        if (inflate) {
            res.pipe(inflate).pipe(fetchRes);
            inflate.on('error', (err) => fail(err));
        }
        else {
            res.pipe(fetchRes);
        }
    });
    setImmediate(() => {
        if (body) {
            try {
                if (typeof body.pipe === 'function') {
                    return body.pipe(req);
                }
                req.write(body);
            }
            catch (err) {
                return fail(err);
            }
        }
        req.end();
    });
    return fetchRes;
}
nmfetch.Cookies = Cookies;
nmfetch.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
export default nmfetch;
