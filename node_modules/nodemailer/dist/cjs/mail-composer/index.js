"use strict";
/* eslint no-undefined: 0 */
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
const index_js_1 = __importDefault(require("../mime-node/index.js"));
const mimeFuncs = __importStar(require("../mime-funcs/index.js"));
const index_js_2 = require("../shared/index.js");
/**
 * Creates the object for composing a MimeNode instance out from the mail options
 *
 * @constructor
 * @param mail Mail options
 */
/**
 * Tells whether a content value is a content descriptor object (something to load or to
 * use as is) rather than the content itself
 */
function isContentObject(value) {
    const content = value;
    return typeof value === 'object' && !!(content.content || content.path || content.href || content.raw);
}
class MailComposer {
    constructor(mail) {
        this.mail = mail || {};
        this.message = false;
    }
    /**
     * Builds MimeNode instance
     */
    compile() {
        this._alternatives = this.getAlternatives();
        this._htmlNode = this._alternatives.filter(alternative => /^text\/html\b/i.test(alternative.contentType)).pop();
        this._attachments = this.getAttachments(!!this._htmlNode);
        this._useRelated = !!(this._htmlNode && this._attachments.related.length);
        this._useAlternative = this._alternatives.length > 1;
        this._useMixed = this._attachments.attached.length > 1 || (this._alternatives.length && this._attachments.attached.length === 1);
        // Compose MIME tree
        if (this.mail.raw) {
            this.message = new index_js_1.default('message/rfc822', {
                newline: this.mail.newline,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess
            }).setRaw(this.mail.raw);
        }
        else if (this._useMixed) {
            this.message = this._createMixed();
        }
        else if (this._useAlternative) {
            this.message = this._createAlternative();
        }
        else if (this._useRelated) {
            this.message = this._createRelated();
        }
        else {
            this.message = this._createContentNode(false, []
                .concat(this._alternatives || [])
                .concat(this._attachments.attached || [])
                .shift() || {
                contentType: 'text/plain',
                content: ''
            });
        }
        // Add custom headers
        if (this.mail.headers) {
            this.message.addHeader(this.mail.headers);
        }
        // Add headers to the root node, always overrides custom headers
        ['from', 'sender', 'to', 'cc', 'bcc', 'reply-to', 'in-reply-to', 'references', 'subject', 'message-id', 'date'].forEach(header => {
            const key = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
            if (this.mail[key]) {
                this.message.setHeader(header, this.mail[key]);
            }
        });
        // Sets custom envelope
        if (this.mail.envelope) {
            this.message.setEnvelope(this.mail.envelope);
        }
        // ensure Message-Id value
        this.message.messageId();
        return this.message;
    }
    /**
     * List all attachments. Resulting attachment objects can be used as input for MimeNode nodes
     *
     * @param findRelated If true separate related attachments from attached ones
     * @returns An object of arrays (`related` and `attached`)
     */
    getAttachments(findRelated) {
        let eventObject;
        const attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
            if (/^data:/i.test((attachment.path || attachment.href))) {
                attachment = this._processDataUrl(attachment);
            }
            const contentType = attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || 'bin');
            const isImage = /^image\//i.test(contentType);
            const isMessageNode = /^message\//i.test(contentType);
            const contentDisposition = attachment.contentDisposition || (isMessageNode || (isImage && attachment.cid) ? 'inline' : 'attachment');
            let contentTransferEncoding;
            if ('contentTransferEncoding' in attachment) {
                // also contains `false`, to set
                contentTransferEncoding = attachment.contentTransferEncoding;
            }
            else if (isMessageNode) {
                // the content might include non-ASCII bytes but at this point we do not know it yet
                contentTransferEncoding = '8bit';
            }
            else {
                contentTransferEncoding = 'base64'; // the default
            }
            const data = {
                contentType,
                contentDisposition,
                contentTransferEncoding
            };
            if (attachment.filename) {
                data.filename = attachment.filename;
            }
            else if (!isMessageNode && attachment.filename !== false) {
                data.filename =
                    (attachment.path || attachment.href || '').split('/').pop().split('?').shift() || 'attachment-' + (i + 1);
                if (data.filename.indexOf('.') < 0) {
                    data.filename += '.' + mimeFuncs.detectExtension(data.contentType);
                }
            }
            if (/^https?:\/\//i.test(attachment.path)) {
                attachment.href = attachment.path;
                attachment.path = undefined;
            }
            if (attachment.cid) {
                data.cid = attachment.cid;
            }
            if (attachment.raw) {
                data.raw = attachment.raw;
            }
            else if (attachment.path) {
                data.content = {
                    path: attachment.path
                };
            }
            else if (attachment.href) {
                data.content = {
                    href: attachment.href,
                    httpHeaders: attachment.httpHeaders,
                    tls: attachment.tls
                };
            }
            else {
                data.content = attachment.content || '';
            }
            if (attachment.encoding) {
                data.encoding = attachment.encoding;
            }
            if (attachment.headers) {
                data.headers = attachment.headers;
            }
            return data;
        });
        if (this.mail.icalEvent) {
            eventObject = Object.assign({}, this._getIcalEvent());
            eventObject.contentType = 'application/ics';
            if (!eventObject.headers) {
                eventObject.headers = {};
            }
            eventObject.filename = eventObject.filename || 'invite.ics';
            eventObject.headers['Content-Disposition'] = 'attachment';
            eventObject.headers['Content-Transfer-Encoding'] = 'base64';
        }
        if (!findRelated) {
            return {
                attached: attachments.concat(eventObject || []),
                related: []
            };
        }
        return {
            attached: attachments.filter(attachment => !attachment.cid).concat(eventObject || []),
            related: attachments.filter(attachment => !!attachment.cid)
        };
    }
    /**
     * Returns the icalEvent value with `path`/`href`/data uri input normalized into
     * a `content` entry, the same way as for regular attachments. The same event is
     * included twice (as a text/calendar alternative and as an application/ics
     * attachment), so the shared content object is marked to be resolved just once
     * and the buffered result is reused by the second node.
     *
     * @returns Normalized icalEvent data
     * @internal
     */
    _getIcalEvent() {
        if (!this._icalEvent) {
            let icalEvent;
            if (isContentObject(this.mail.icalEvent)) {
                // an own "__proto__" key would make the copy inherit path/href from caller
                // data, and the mapping below then replaces the content the caller did set
                icalEvent = (0, index_js_2.copyOwnKeys)({}, this.mail.icalEvent);
            }
            else {
                icalEvent = {
                    content: this.mail.icalEvent
                };
            }
            if (/^data:/i.test((icalEvent.path || icalEvent.href))) {
                icalEvent = this._processDataUrl(icalEvent);
            }
            if (/^https?:\/\//i.test(icalEvent.path)) {
                icalEvent.href = icalEvent.path;
                icalEvent.path = undefined;
            }
            if (!icalEvent.raw) {
                // map file path and URL values into `content`, otherwise the content
                // nodes would render an empty body
                if (icalEvent.path) {
                    icalEvent.content = {
                        path: icalEvent.path
                    };
                    icalEvent.path = undefined;
                }
                else if (icalEvent.href) {
                    icalEvent.content = {
                        href: icalEvent.href,
                        httpHeaders: icalEvent.httpHeaders,
                        tls: icalEvent.tls
                    };
                    icalEvent.href = undefined;
                }
            }
            if (icalEvent.content && typeof icalEvent.content === 'object') {
                // we are going to have the same attachment twice, so mark this to be
                // resolved just once
                icalEvent.content._resolve = true;
            }
            this._icalEvent = icalEvent;
        }
        return this._icalEvent;
    }
    /**
     * List alternatives. Resulting objects can be used as input for MimeNode nodes
     *
     * @returns An array of alternative elements. Includes the `text` and `html` values as well
     */
    getAlternatives() {
        const alternatives = [];
        let text, html, watchHtml, amp, eventObject;
        if (this.mail.text) {
            if (isContentObject(this.mail.text)) {
                text = this.mail.text;
            }
            else {
                text = {
                    content: this.mail.text
                };
            }
            text.contentType = 'text/plain; charset=utf-8';
        }
        if (this.mail.watchHtml) {
            if (isContentObject(this.mail.watchHtml)) {
                watchHtml = this.mail.watchHtml;
            }
            else {
                watchHtml = {
                    content: this.mail.watchHtml
                };
            }
            watchHtml.contentType = 'text/watch-html; charset=utf-8';
        }
        if (this.mail.amp) {
            if (isContentObject(this.mail.amp)) {
                amp = this.mail.amp;
            }
            else {
                amp = {
                    content: this.mail.amp
                };
            }
            amp.contentType = 'text/x-amp-html; charset=utf-8';
        }
        // NB! when including attachments with a calendar alternative you might end up in a blank screen on some clients
        if (this.mail.icalEvent) {
            eventObject = Object.assign({}, this._getIcalEvent());
            eventObject.filename = false;
            eventObject.contentType =
                'text/calendar; charset=utf-8; method=' + (eventObject.method || 'PUBLISH').toString().trim().toUpperCase();
            if (!eventObject.headers) {
                eventObject.headers = {};
            }
        }
        if (this.mail.html) {
            if (isContentObject(this.mail.html)) {
                html = this.mail.html;
            }
            else {
                html = {
                    content: this.mail.html
                };
            }
            html.contentType = 'text/html; charset=utf-8';
        }
        []
            .concat(text || [])
            .concat(watchHtml || [])
            .concat(amp || [])
            .concat(html || [])
            .concat(eventObject || [])
            .concat(this.mail.alternatives || [])
            .forEach(alternative => {
            if (/^data:/i.test((alternative.path || alternative.href))) {
                alternative = this._processDataUrl(alternative);
            }
            const data = {
                contentType: alternative.contentType ||
                    mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || 'txt'),
                contentTransferEncoding: alternative.contentTransferEncoding
            };
            if (alternative.filename) {
                data.filename = alternative.filename;
            }
            if (/^https?:\/\//i.test(alternative.path)) {
                alternative.href = alternative.path;
                alternative.path = undefined;
            }
            if (alternative.raw) {
                data.raw = alternative.raw;
            }
            else if (alternative.path) {
                data.content = {
                    path: alternative.path
                };
            }
            else if (alternative.href) {
                data.content = {
                    href: alternative.href,
                    httpHeaders: alternative.httpHeaders,
                    tls: alternative.tls
                };
            }
            else {
                data.content = alternative.content || '';
            }
            if (alternative.encoding) {
                data.encoding = alternative.encoding;
            }
            if (alternative.headers) {
                data.headers = alternative.headers;
            }
            alternatives.push(data);
        });
        return alternatives;
    }
    /**
     * Builds multipart/mixed node. It should always contain different type of elements on the same level
     * eg. text + attachments
     *
     * @param parentNode Parent for this note. If it does not exist, a root node is created
     * @returns MimeNode node element
     * @internal
     */
    _createMixed(parentNode) {
        const node = parentNode
            ? parentNode.createChild('multipart/mixed', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            })
            : new index_js_1.default('multipart/mixed', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        if (this._useAlternative) {
            this._createAlternative(node);
        }
        else if (this._useRelated) {
            this._createRelated(node);
        }
        []
            .concat((!this._useAlternative && this._alternatives) || [])
            .concat(this._attachments.attached || [])
            .forEach(element => {
            // if the element is a html node from related subpart then ignore it
            if (!this._useRelated || element !== this._htmlNode) {
                this._createContentNode(node, element);
            }
        });
        return node;
    }
    /**
     * Builds multipart/alternative node. It should always contain same type of elements on the same level
     * eg. text + html view of the same data
     *
     * @param parentNode Parent for this note. If it does not exist, a root node is created
     * @returns MimeNode node element
     * @internal
     */
    _createAlternative(parentNode) {
        const node = parentNode
            ? parentNode.createChild('multipart/alternative', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            })
            : new index_js_1.default('multipart/alternative', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        this._alternatives.forEach(alternative => {
            if (this._useRelated && this._htmlNode === alternative) {
                this._createRelated(node);
            }
            else {
                this._createContentNode(node, alternative);
            }
        });
        return node;
    }
    /**
     * Builds multipart/related node. It should always contain html node with related attachments
     *
     * @param parentNode Parent for this note. If it does not exist, a root node is created
     * @returns MimeNode node element
     * @internal
     */
    _createRelated(parentNode) {
        const node = parentNode
            ? parentNode.createChild('multipart/related; type="text/html"', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            })
            : new index_js_1.default('multipart/related; type="text/html"', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        this._createContentNode(node, this._htmlNode);
        this._attachments.related.forEach(alternative => this._createContentNode(node, alternative));
        return node;
    }
    /**
     * Creates a regular node with contents
     *
     * @param parentNode Parent for this note. If it does not exist, a root node is created
     * @param element Node data
     * @returns MimeNode node element
     * @internal
     */
    _createContentNode(parentNode, element) {
        element = element || {};
        element.content = element.content || '';
        const encoding = (element.encoding || 'utf8')
            .toString()
            .toLowerCase()
            .replace(/[-_\s]/g, '');
        const node = parentNode
            ? parentNode.createChild(element.contentType, {
                filename: element.filename,
                textEncoding: this.mail.textEncoding,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            })
            : new index_js_1.default(element.contentType, {
                filename: element.filename,
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        // add custom headers
        if (element.headers) {
            node.addHeader(element.headers);
        }
        if (element.cid) {
            node.setHeader('Content-Id', '<' + element.cid.replace(/[<>]/g, '') + '>');
        }
        if (element.contentTransferEncoding) {
            node.setHeader('Content-Transfer-Encoding', element.contentTransferEncoding);
        }
        else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
            node.setHeader('Content-Transfer-Encoding', this.mail.encoding);
        }
        if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
            node.setHeader('Content-Disposition', element.contentDisposition || (element.cid && /^image\//i.test(element.contentType) ? 'inline' : 'attachment'));
        }
        if (typeof element.content === 'string' && !['utf8', 'usascii', 'ascii'].includes(encoding)) {
            element.content = Buffer.from(element.content, encoding);
        }
        // prefer pregenerated raw content
        if (element.raw) {
            node.setRaw(element.raw);
        }
        else {
            node.setContent(element.content);
        }
        return node;
    }
    /**
     * Parses data uri and converts it to a Buffer
     *
     * @param element Content element
     * @return Parsed element
     * @internal
     */
    _processDataUrl(element) {
        const dataUrl = element.path || element.href;
        // Early validation to prevent ReDoS
        if (!dataUrl || typeof dataUrl !== 'string') {
            return element;
        }
        if (!dataUrl.startsWith('data:')) {
            return element;
        }
        if (dataUrl.length > 52428800) {
            // 52428800 chars = 50MB limit for data URL string (~37.5MB decoded image)
            // Extract content type before rejecting to preserve MIME type
            let detectedType = 'application/octet-stream';
            const commaPos = dataUrl.indexOf(',');
            if (commaPos > 0 && commaPos < 200) {
                // Parse header safely with size limit
                const header = dataUrl.substring(5, commaPos); // skip 'data:'
                const parts = header.split(';');
                if (parts[0] && parts[0].includes('/')) {
                    detectedType = parts[0].trim();
                }
            }
            // Return empty content for excessively long data URLs
            return Object.assign((0, index_js_2.copyOwnKeys)({}, element), {
                path: false,
                href: false,
                content: Buffer.alloc(0),
                contentType: element.contentType || detectedType
            });
        }
        let parsedDataUri;
        try {
            parsedDataUri = (0, index_js_2.parseDataURI)(dataUrl);
        }
        catch (_err) {
            return element;
        }
        if (!parsedDataUri) {
            return element;
        }
        element.content = parsedDataUri.data;
        element.contentType = element.contentType || parsedDataUri.contentType;
        if ('path' in element) {
            element.path = false;
        }
        if ('href' in element) {
            element.href = false;
        }
        return element;
    }
}
exports.default = MailComposer;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
