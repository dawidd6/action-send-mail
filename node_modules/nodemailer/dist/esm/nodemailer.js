import Mail from './mailer/index.js';
import * as shared from './shared/index.js';
import SMTPPool from './smtp-pool/index.js';
import SMTPTransport from './smtp-transport/index.js';
import SendmailTransport from './sendmail-transport/index.js';
import StreamTransport from './stream-transport/index.js';
import JSONTransport from './json-transport/index.js';
import SESTransport from './ses-transport/index.js';
import * as errors from './errors.js';
import nmfetch from './fetch/index.js';
import * as packageData from './package-info.js';
const ETHEREAL_API = (process.env.ETHEREAL_API || 'https://api.nodemailer.com').replace(/\/+$/, '');
const ETHEREAL_WEB = (process.env.ETHEREAL_WEB || 'https://ethereal.email').replace(/\/+$/, '');
const ETHEREAL_API_KEY = (process.env.ETHEREAL_API_KEY || '').replace(/\s*/g, '') || null;
const ETHEREAL_CACHE = ['true', 'yes', 'y', '1'].includes((process.env.ETHEREAL_CACHE || 'yes').toString().trim().toLowerCase());
let testAccount = false;
export function createTransport(transporter, defaults) {
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
            transporter = new SMTPPool(options);
        }
        else if (options.sendmail) {
            transporter = new SendmailTransport(options);
        }
        else if (options.streamTransport) {
            transporter = new StreamTransport(options);
        }
        else if (options.jsonTransport) {
            transporter = new JSONTransport(options);
        }
        else if (options.SES) {
            const ses = options.SES;
            if (ses.ses && ses.aws) {
                const error = new Error('Using legacy SES configuration, expecting @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/');
                error.code = errors.ECONFIG;
                throw error;
            }
            transporter = new SESTransport(options);
        }
        else {
            transporter = new SMTPTransport(options);
        }
    }
    return new Mail(transporter, options, defaults);
}
export function createTestAccount(apiUrl, callback) {
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
    const req = nmfetch(apiUrl + '/user', fetchOptions);
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
export function getTestMessageUrl(info) {
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
export default nodemailer;
