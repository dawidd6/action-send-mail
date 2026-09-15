"use strict";
// module to handle cookies
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
const urllib = __importStar(require("../shared/url.js"));
const SESSION_TIMEOUT = 1800; // 30 min
/**
 * Creates a biskviit cookie jar for managing cookie values in memory
 *
 * @constructor
 * @param [options] Optional options object
 */
class Cookies {
    constructor(options) {
        this.options = options || {};
        this.cookies = [];
    }
    /**
     * Stores a cookie string to the cookie storage
     *
     * @param cookieStr Value from the 'Set-Cookie:' header
     * @param url Current URL
     */
    set(cookieStr, url) {
        const urlparts = urllib.parse(url || '');
        const cookie = this.parse(cookieStr);
        let domain;
        if (cookie.domain) {
            domain = cookie.domain.replace(/^\./, '');
            // do not allow cross origin cookies. There is no public suffix list here, so a
            // multi-label suffix like 'co.uk' can not be told apart from a registrable domain
            if (
            // can't be valid if the requested domain is shorter than current hostname
            urlparts.hostname.length < domain.length ||
                // a top level domain is not a valid scope, 'Domain=com' would otherwise be
                // sent to every .com host. A trailing dot does not make 'com.' any better
                domain.indexOf('.') < 0 ||
                domain.endsWith('.') ||
                // an IP address has no subdomains, so cookies set on it stay host-only
                node_net_1.default.isIP(urlparts.hostname) ||
                // prefix domains with dot to be sure that partial matches are not used
                !('.' + urlparts.hostname).endsWith('.' + domain)) {
                cookie.domain = urlparts.hostname;
            }
        }
        else {
            cookie.domain = urlparts.hostname;
        }
        if (!cookie.path) {
            cookie.path = this.getPath(urlparts.pathname);
        }
        // if no expire date, then use sessionTimeout value
        if (!cookie.expires) {
            cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1000);
        }
        return this.add(cookie);
    }
    /**
     * Returns cookie string for the 'Cookie:' header.
     *
     * @param url URL to check for
     * @returns Cookie header or empty string if no matches were found
     */
    get(url) {
        return this.list(url)
            .map(cookie => cookie.name + '=' + cookie.value)
            .join('; ');
    }
    /**
     * Lists all valied cookie objects for the specified URL
     *
     * @param url URL to check for
     * @returns An array of cookie objects
     */
    list(url) {
        const result = [];
        for (let i = this.cookies.length - 1; i >= 0; i--) {
            const cookie = this.cookies[i];
            if (this.isExpired(cookie)) {
                this.cookies.splice(i, 1);
                continue;
            }
            if (this.match(cookie, url)) {
                result.unshift(cookie);
            }
        }
        return result;
    }
    /**
     * Parses cookie string from the 'Set-Cookie:' header
     *
     * @param cookieStr String from the 'Set-Cookie:' header
     * @returns Cookie object
     */
    parse(cookieStr) {
        const cookie = {};
        (cookieStr || '')
            .toString()
            .split(';')
            .forEach(cookiePart => {
            const valueParts = cookiePart.split('=');
            const key = valueParts.shift().trim().toLowerCase();
            let value = valueParts.join('=').trim();
            let domain;
            if (!key) {
                // skip empty parts
                return;
            }
            switch (key) {
                case 'expires': {
                    const expires = new Date(value);
                    // ignore date if can not parse it
                    if (expires.toString() !== 'Invalid Date') {
                        cookie.expires = expires;
                    }
                    break;
                }
                case 'path':
                    cookie.path = value;
                    break;
                case 'domain':
                    domain = value.toLowerCase();
                    if (domain.length && domain.charAt(0) !== '.') {
                        domain = '.' + domain; // ensure preceeding dot for user set domains
                    }
                    cookie.domain = domain;
                    break;
                case 'max-age':
                    cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1000);
                    break;
                case 'secure':
                    cookie.secure = true;
                    break;
                case 'httponly':
                    cookie.httponly = true;
                    break;
                default:
                    if (!cookie.name) {
                        cookie.name = key;
                        cookie.value = value;
                    }
            }
        });
        return cookie;
    }
    /**
     * Checks if a cookie object is valid for a specified URL
     *
     * @param cookie Cookie object
     * @param url URL to check for
     * @returns true if cookie is valid for specifiec URL
     */
    match(cookie, url) {
        const urlparts = urllib.parse(url || '');
        // check if hostname matches
        // .foo.com also matches subdomains, foo.com does not
        if (urlparts.hostname !== cookie.domain &&
            (cookie.domain.charAt(0) !== '.' ||
                ('.' + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
            return false;
        }
        // check if the request path path-matches the cookie path (RFC 6265 section 5.1.4):
        // identical paths match, otherwise the cookie path must be a directory prefix
        const pathname = urlparts.pathname || '/';
        const cookiePath = cookie.path;
        const pathMatches = pathname === cookiePath ||
            (pathname.startsWith(cookiePath) && (cookiePath.endsWith('/') || pathname.charAt(cookiePath.length) === '/'));
        if (!pathMatches) {
            return false;
        }
        // check secure argument
        if (cookie.secure && urlparts.protocol !== 'https:') {
            return false;
        }
        return true;
    }
    /**
     * Adds (or updates/removes if needed) a cookie object to the cookie storage
     *
     * @param cookie Cookie value to be stored
     */
    add(cookie) {
        // nothing to do here
        if (!cookie || !cookie.name) {
            return false;
        }
        // overwrite if has same params
        for (let i = 0, len = this.cookies.length; i < len; i++) {
            if (this.compare(this.cookies[i], cookie)) {
                // check if the cookie needs to be removed instead
                if (this.isExpired(cookie)) {
                    this.cookies.splice(i, 1); // remove expired/unset cookie
                    return false;
                }
                this.cookies[i] = cookie;
                return true;
            }
        }
        // add as new if not already expired
        if (!this.isExpired(cookie)) {
            this.cookies.push(cookie);
        }
        return true;
    }
    /**
     * Checks if two cookie objects are the same
     *
     * @param a Cookie to check against
     * @param b Cookie to check against
     * @returns True, if the cookies are the same
     */
    compare(a, b) {
        return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === b.httponly;
    }
    /**
     * Checks if a cookie is expired
     *
     * @param cookie Cookie object to check against
     * @returns True, if the cookie is expired
     */
    isExpired(cookie) {
        return (cookie.expires && cookie.expires < new Date()) || !cookie.value;
    }
    /**
     * Returns the default path for an URL path argument, the default-path of
     * RFC 6265 section 5.1.4. A cookie that carries no Path attribute is scoped
     * to the directory of the URL it was set from
     *
     * @param pathname
     * @returns Default path
     */
    getPath(pathname) {
        const pathParts = (pathname || '/').split('/');
        pathParts.pop(); // remove filename part
        const path = pathParts.join('/').trim();
        // a path that holds no more than one '/' is scoped to the root path, and so
        // is one that does not start with '/' at all
        if (path.charAt(0) !== '/') {
            return '/';
        }
        return path;
    }
}
exports.default = Cookies;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
