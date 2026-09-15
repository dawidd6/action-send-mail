"use strict";
// FIXME:
// replace this Transform mess with a method that pipes input argument to output argument
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_parser_js_1 = __importDefault(require("./message-parser.js"));
const relaxed_body_js_1 = __importDefault(require("./relaxed-body.js"));
const sign_js_1 = __importDefault(require("./sign.js"));
const node_stream_1 = require("node:stream");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const objects_js_1 = require("../shared/objects.js");
const DKIM_ALGO = 'sha256';
const MAX_MESSAGE_SIZE = 10 * 1024 * 1024; // buffer messages larger than this to disk
class DKIMSigner {
    constructor(options, keys, input, output) {
        this.options = options || {};
        this.keys = keys;
        this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
        this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;
        this.cacheDir = this.options.cacheDir || false;
        this.chunks = [];
        this.chunklen = 0;
        this.readPos = 0;
        this.cachePath = this.cacheDir
            ? node_path_1.default.join(this.cacheDir, 'message.' + Date.now() + '-' + node_crypto_1.default.randomBytes(14).toString('hex'))
            : false;
        this.cache = false;
        this.headers = false;
        this.bodyHash = false;
        this.parser = false;
        this.relaxedBody = false;
        this.input = input;
        this.output = output;
        this.output.usingCache = false;
        this.hasErrored = false;
        this.input.on('error', err => {
            this.hasErrored = true;
            this.cleanup();
            output.emit('error', err);
        });
    }
    cleanup() {
        if (!this.cache || !this.cachePath) {
            return;
        }
        node_fs_1.default.unlink(this.cachePath, () => false);
    }
    createReadCache() {
        // pipe remainings to cache file
        this.cache = node_fs_1.default.createReadStream(this.cachePath);
        this.cache.once('error', err => {
            this.cleanup();
            this.output.emit('error', err);
        });
        this.cache.once('close', () => {
            this.cleanup();
        });
        this.cache.pipe(this.output);
    }
    sendNextChunk() {
        if (this.hasErrored) {
            return;
        }
        if (this.readPos >= this.chunks.length) {
            if (!this.cache) {
                this.output.end();
                return;
            }
            return this.createReadCache();
        }
        const chunk = this.chunks[this.readPos++];
        if (this.output.write(chunk) === false) {
            this.output.once('drain', () => {
                this.sendNextChunk();
            });
            return;
        }
        setImmediate(() => this.sendNextChunk());
    }
    sendSignedOutput() {
        let keyPos = 0;
        const signNextKey = () => {
            if (keyPos >= this.keys.length) {
                this.output.write(this.parser.rawHeaders);
                setImmediate(() => this.sendNextChunk());
                return;
            }
            const key = this.keys[keyPos++];
            const dkimField = (0, sign_js_1.default)(this.headers, this.hashAlgo, this.bodyHash, {
                domainName: key.domainName,
                keySelector: key.keySelector,
                privateKey: key.privateKey,
                headerFieldNames: this.options.headerFieldNames,
                skipFields: this.options.skipFields
            });
            if (dkimField) {
                this.output.write(Buffer.from(dkimField + '\r\n'));
            }
            setImmediate(signNextKey);
        };
        if (this.bodyHash && this.headers) {
            return signNextKey();
        }
        this.output.write(this.parser.rawHeaders);
        this.sendNextChunk();
    }
    createWriteCache() {
        this.output.usingCache = true;
        // pipe remainings to cache file
        this.cache = node_fs_1.default.createWriteStream(this.cachePath);
        this.cache.once('error', err => {
            this.cleanup();
            // drain input
            this.relaxedBody.unpipe(this.cache);
            this.relaxedBody.on('readable', () => {
                while (this.relaxedBody.read() !== null) {
                    // do nothing
                }
            });
            this.hasErrored = true;
            // emit error
            this.output.emit('error', err);
        });
        this.cache.once('close', () => {
            this.sendSignedOutput();
        });
        this.relaxedBody.removeAllListeners('readable');
        this.relaxedBody.pipe(this.cache);
    }
    signStream() {
        this.parser = new message_parser_js_1.default();
        this.relaxedBody = new relaxed_body_js_1.default({
            hashAlgo: this.hashAlgo
        });
        this.parser.on('headers', value => {
            this.headers = value;
        });
        this.relaxedBody.on('hash', value => {
            this.bodyHash = value;
        });
        this.relaxedBody.on('readable', () => {
            let chunk;
            if (this.cache) {
                return;
            }
            while ((chunk = this.relaxedBody.read()) !== null) {
                this.chunks.push(chunk);
                this.chunklen += chunk.length;
                if (this.chunklen >= this.cacheTreshold && this.cachePath) {
                    return this.createWriteCache();
                }
            }
        });
        this.relaxedBody.on('end', () => {
            if (this.cache) {
                return;
            }
            this.sendSignedOutput();
        });
        this.parser.pipe(this.relaxedBody);
        setImmediate(() => this.input.pipe(this.parser));
    }
}
class DKIM {
    constructor(options) {
        this.options = options || {};
        this.keys = [].concat(this.options.keys || {
            domainName: options.domainName,
            keySelector: options.keySelector,
            privateKey: options.privateKey
        });
    }
    sign(input, extraOptions) {
        const output = new node_stream_1.PassThrough();
        let inputStream = input;
        let writeValue = false;
        if (Buffer.isBuffer(input)) {
            writeValue = input;
            inputStream = new node_stream_1.PassThrough();
        }
        else if (typeof input === 'string') {
            writeValue = Buffer.from(input);
            inputStream = new node_stream_1.PassThrough();
        }
        let options = this.options;
        if (extraOptions && Object.keys(extraOptions).length) {
            // extraOptions is mail.data._dkim, caller supplied message data. An own
            // "__proto__" key there would let every option this signer reads and the
            // transport did not set, such as skipFields, answer from the caller
            options = (0, objects_js_1.copyOwnKeys)({}, extraOptions);
            (0, objects_js_1.copyOwnKeys)(options, this.options);
        }
        const signer = new DKIMSigner(options, this.keys, inputStream, output);
        setImmediate(() => {
            signer.signStream();
            if (writeValue) {
                setImmediate(() => {
                    inputStream.end(writeValue);
                });
            }
        });
        return output;
    }
}
exports.default = DKIM;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
