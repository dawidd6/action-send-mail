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
exports.createTransport = createTransport;
exports.createTestAccount = createTestAccount;
exports.getTestMessageUrl = getTestMessageUrl;
const index_js_1 = __importDefault(require("./mailer/index.js"));
const shared = __importStar(require("./shared/index.js"));
const index_js_2 = __importDefault(require("./smtp-pool/index.js"));
const index_js_3 = __importDefault(require("./smtp-transport/index.js"));
const index_js_4 = __importDefault(require("./sendmail-transport/index.js"));
const index_js_5 = __importDefault(require("./stream-transport/index.js"));
const index_js_6 = __importDefault(require("./json-transport/index.js"));
const index_js_7 = __importDefault(require("./ses-transport/index.js"));
const errors = __importStar(require("./errors.js"));
const index_js_8 = __importDefault(require("./fetch/index.js"));
const packageData = __importStar(require("./package-info.js"));
const ETHEREAL_API = (process.env.ETHEREAL_API || 'https://api.nodemailer.com').replace(/\/+$/, '');
const ETHEREAL_WEB = (process.env.ETHEREAL_WEB || 'https://ethereal.email').replace(/\/+$/, '');
const ETHEREAL_API_KEY = (process.env.ETHEREAL_API_KEY || '').replace(/\s*/g, '') || null;
const ETHEREAL_CACHE = ['true', 'yes', 'y', '1'].includes((process.env.ETHEREAL_CACHE || 'yes').toString().trim().toLowerCase());
let testAccount = false;
function createTransport(transporter, defaults) {
    let options;
    if (
    // provided transporter is a configuration object, not transporter plugin
    (typeof transporter === 'object' && typeof transporter.send !== 'function') ||
        // provided transporter looks like a connection url
        (typeof transporter === 'string' && /^(smtps?|direct):/i.test(transporter))) {
        const urlConfig = typeof transporter === 'string' ? transporter : transporter.url;
        if (urlConfig) {
            // parse a configuration URL into configuration options. The other keys of a
            // configuration object apply where the url does not set them, merged the same
            // way the SMTP transports merge their own url option
            const parsed = shared.parseConnectionUrl(urlConfig);
            options = (typeof transporter === 'object'
                ? shared.assign(false, shared.copyOwnKeys({}, transporter, key => key === 'url'), parsed)
                : parsed);
        }
        else {
            options = transporter;
        }
        if (options.pool) {
            transporter = new index_js_2.default(options);
        }
        else if (options.sendmail) {
            transporter = new index_js_4.default(options);
        }
        else if (options.streamTransport) {
            transporter = new index_js_5.default(options);
        }
        else if (options.jsonTransport) {
            transporter = new index_js_6.default(options);
        }
        else if (options.SES) {
            const ses = options.SES;
            if (ses.ses && ses.aws) {
                const error = new Error('Using legacy SES configuration, expecting @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/');
                error.code = errors.ECONFIG;
                throw error;
            }
            transporter = new index_js_7.default(options);
        }
        else {
            transporter = new index_js_3.default(options);
        }
    }
    return new index_js_1.default(transporter, options, defaults);
}
function createTestAccount(apiUrl, callback) {
    let promise;
    if (!callback && typeof apiUrl === 'function') {
        callback = apiUrl;
        apiUrl = false;
    }
    if (!callback) {
        promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
        });
    }
    const done = callback;
    if (ETHEREAL_CACHE && testAccount) {
        setImmediate(() => done(null, testAccount));
        return promise;
    }
    apiUrl = apiUrl || ETHEREAL_API;
    const chunks = [];
    let chunklen = 0;
    const requestHeaders = {};
    const requestBody = {
        requestor: packageData.name,
        version: packageData.version
    };
    if (ETHEREAL_API_KEY) {
        requestHeaders.Authorization = 'Bearer ' + ETHEREAL_API_KEY;
    }
    const fetchOptions = {
        contentType: 'application/json',
        method: 'POST',
        headers: requestHeaders,
        body: Buffer.from(JSON.stringify(requestBody))
    };
    // Credential-bearing request to the Ethereal API. src/fetch already
    // validates certs by default; pin rejectUnauthorized:true here so this
    // call stays strict regardless of any future default change and is never
    // relaxed for a real-cert endpoint.
    if (/^https:/i.test(apiUrl)) {
        fetchOptions.tls = { rejectUnauthorized: true };
    }
    const req = (0, index_js_8.default)(apiUrl + '/user', fetchOptions);
    req.on('readable', () => {
        let chunk;
        while ((chunk = req.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
        }
    });
    req.once('error', err => done(err));
    req.once('end', () => {
        const res = Buffer.concat(chunks, chunklen);
        let data;
        try {
            data = JSON.parse(res.toString());
        }
        catch (E) {
            return done(E);
        }
        if (data.status !== 'success' || data.error) {
            return done(new Error(data.error || 'Request failed'));
        }
        delete data.status;
        testAccount = data;
        done(null, testAccount);
    });
    return promise;
}
/**
 * Resolves the Ethereal web URL for a message sent through an Ethereal test account
 *
 * @param info Result object of sendMail()
 * @returns URL of the message in the Ethereal web interface, or false if the response does not carry one
 */
function getTestMessageUrl(info) {
    if (!info || !info.response) {
        return false;
    }
    const infoProps = new Map();
    // Extract the trailing "[...]" part of the response (no "]" allowed inside)
    // with linear string scanning; the equivalent regex /\[([^\]]+)\]$/ was
    // flagged for polynomial backtracking on adversarial server responses
    const response = info.response.toString();
    if (response.length > 2 && response.charAt(response.length - 1) === ']') {
        const open = response.indexOf('[', response.lastIndexOf(']', response.length - 2) + 1);
        if (open >= 0 && open < response.length - 2) {
            const props = response.substring(open + 1, response.length - 1);
            props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m, key, value) => {
                infoProps.set(key, value);
                return m;
            });
        }
    }
    if (infoProps.has('STATUS') && infoProps.has('MSGID')) {
        return ((testAccount && testAccount.web) || ETHEREAL_WEB) + '/message/' + infoProps.get('MSGID');
    }
    return false;
}
const nodemailer = {
    createTransport,
    createTestAccount,
    getTestMessageUrl
};
exports.default = nodemailer;
