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
const punycode = __importStar(require("../punycode/index.js"));
const mimeFuncs = __importStar(require("../mime-funcs/index.js"));
const node_crypto_1 = __importDefault(require("node:crypto"));
/**
 * Returns DKIM signature header line
 *
 * @param headers Parsed headers object from MessageParser
 * @param bodyHash Base64 encoded hash of the message
 * @param options DKIM options
 * @param options.domainName Domain name to be signed for
 * @param options.keySelector DKIM key selector to use
 * @param options.privateKey DKIM private key to use
 * @return Complete header line
 */
function sign(headers, hashAlgo, bodyHash, options) {
    options = options || {};
    // all listed fields from RFC4871 #5.5
    const defaultFieldNames = 'From:Sender:Reply-To:Subject:Date:Message-ID:To:' +
        'Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:' +
        'Content-Description:Resent-Date:Resent-From:Resent-Sender:' +
        'Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:' +
        'List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:' +
        'List-Owner:List-Archive';
    const fieldNames = options.headerFieldNames || defaultFieldNames;
    const canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options.skipFields);
    const dkimHeader = generateDKIMHeader(options.domainName, options.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);
    canonicalizedHeaderData.headers += 'dkim-signature:' + relaxedHeaderLine(dkimHeader);
    const signer = node_crypto_1.default.createSign(('rsa-' + hashAlgo).toUpperCase());
    // the header lines are 'binary' strings, so this reproduces the original header bytes
    signer.update(canonicalizedHeaderData.headers, 'latin1');
    let signature;
    try {
        signature = signer.sign(options.privateKey, 'base64');
    }
    catch (_E) {
        return false;
    }
    return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, '$&\r\n ').trim();
}
sign.relaxedHeaders = relaxedHeaders;
exports.default = sign;
function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
    // the caller supplied tag values are interpolated straight into the tag list, and none of
    // them has any way to carry a control char, DEL, or one of the delimiters that would close
    // the value and open a tag of its own
    const cleanTagValue = (value) => (value || '').toString().replace(/[\x00-\x1f\x7f;=]/g, '');
    const dkim = [
        'v=1',
        'a=rsa-' + hashAlgo,
        'c=relaxed/relaxed',
        'd=' + punycode.toASCII(cleanTagValue(domainName)),
        'q=dns/txt',
        's=' + cleanTagValue(keySelector),
        'bh=' + bodyHash,
        'h=' + cleanTagValue(fieldNames)
    ].join('; ');
    return mimeFuncs.foldLines('DKIM-Signature: ' + dkim, 76) + ';\r\n b=';
}
function relaxedHeaders(headers, fieldNames, skipFields) {
    const includedFields = new Set();
    const skip = new Set();
    const headerFields = new Map();
    (skipFields || '')
        .toLowerCase()
        .split(':')
        .forEach(field => {
        skip.add(field.trim());
    });
    (fieldNames || '')
        .toLowerCase()
        .split(':')
        .filter(field => !skip.has(field.trim()))
        .forEach(field => {
        includedFields.add(field.trim());
    });
    for (let i = headers.length - 1; i >= 0; i--) {
        const line = headers[i];
        // only include the first value from bottom to top
        if (includedFields.has(line.key) && !headerFields.has(line.key)) {
            headerFields.set(line.key, relaxedHeaderLine(line.line));
        }
    }
    const headersList = [];
    const fields = [];
    includedFields.forEach(field => {
        if (headerFields.has(field)) {
            fields.push(field);
            headersList.push(field + ':' + headerFields.get(field));
        }
    });
    return {
        headers: headersList.join('\r\n') + '\r\n',
        fieldNames: fields.join(':')
    };
}
/**
 * Relaxed canonicalization of a header field value (RFC 6376 section 3.4.2): unfold, turn
 * every run of SP and HTAB into a single SP and drop the whitespace next to the colon and
 * at the end. Only SP and HTAB count as whitespace, so bytes that decode to other space
 * characters, such as a non-breaking space in a UTF-8 header, stay as they are
 */
function relaxedHeaderLine(line) {
    return line
        .substr(line.indexOf(':') + 1)
        .replace(/\r?\n/g, '')
        .replace(/[ \t]+/g, ' ')
        .replace(/^ | $/g, '');
}
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
