// FIXME:
// replace this Transform mess with a method that pipes input argument to output argument
import MessageParser from './message-parser.js';
import RelaxedBody from './relaxed-body.js';
import sign from './sign.js';
import { PassThrough } from 'node:stream';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { copyOwnKeys } from '../shared/objects.js';
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
            ? path.join(this.cacheDir, 'message.' + Date.now() + '-' + crypto.randomBytes(14).toString('hex'))
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
        this.input.on('error', err => this.fail(err));
        // A consumer that goes away before the signed message was read in full destroys the
        // output. Stop reading the input and drop the cache file instead of leaving them open
        this.output.once('close', () => {
            if (this.output.writableFinished) {
                return;
            }
            this.hasErrored = true;
            this.input.unpipe();
            this.input.destroy();
            this.cleanup();
        });
    }
    /**
     * Ends the output with an error and releases the cache file
     */
    fail(err) {
        this.hasErrored = true;
        this.cleanup();
        this.output.destroy(err);
    }
    cleanup() {
        if (!this.cache || !this.cachePath) {
            return;
        }
        const cache = this.cache;
        this.cache = false;
        cache.destroy();
        fs.unlink(this.cachePath, () => false);
    }
    createReadCache() {
        // pipe remainings to cache file
        this.cache = fs.createReadStream(this.cachePath);
        this.cache.once('error', err => this.fail(err));
        this.cache.once('close', () => {
            this.cleanup();
        });
        this.cache.pipe(this.output);
    }
    sendNextChunk() {
        while (!this.hasErrored) {
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
        }
    }
    sendSignedOutput() {
        if (this.hasErrored) {
            return;
        }
        let keyPos = 0;
        const signNextKey = () => {
            if (keyPos >= this.keys.length) {
                this.output.write(this.parser.rawHeaders);
                setImmediate(() => this.sendNextChunk());
                return;
            }
            const key = this.keys[keyPos++];
            let dkimField;
            try {
                dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
                    domainName: key.domainName,
                    keySelector: key.keySelector,
                    privateKey: key.privateKey,
                    headerFieldNames: this.options.headerFieldNames,
                    skipFields: this.options.skipFields
                });
            }
            catch (err) {
                this.fail(err);
                return;
            }
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
        this.cache = fs.createWriteStream(this.cachePath);
        this.cache.once('error', err => {
            // drain input
            this.relaxedBody.unpipe(this.cache);
            this.relaxedBody.on('readable', () => {
                while (this.relaxedBody.read() !== null) {
                    // do nothing
                }
            });
            this.fail(err);
        });
        this.cache.once('close', () => {
            if (this.hasErrored) {
                return;
            }
            this.sendSignedOutput();
        });
        this.relaxedBody.removeAllListeners('readable');
        this.relaxedBody.pipe(this.cache);
    }
    signStream() {
        this.parser = new MessageParser();
        this.relaxedBody = new RelaxedBody({
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
        const output = new PassThrough();
        let inputStream = input;
        let writeValue = false;
        if (Buffer.isBuffer(input)) {
            writeValue = input;
            inputStream = new PassThrough();
        }
        else if (typeof input === 'string') {
            writeValue = Buffer.from(input);
            inputStream = new PassThrough();
        }
        let options = this.options;
        if (extraOptions && Object.keys(extraOptions).length) {
            // extraOptions is mail.data._dkim, caller supplied message data. An own
            // "__proto__" key there would let every option this signer reads and the
            // transport did not set, such as skipFields, answer from the caller
            options = copyOwnKeys({}, extraOptions);
            copyOwnKeys(options, this.options);
        }
        const signer = new DKIMSigner(options, this.keys, inputStream, output);
        setImmediate(() => {
            try {
                signer.signStream();
            }
            catch (_E) {
                // the body hash is created here, an unknown hashAlgo throws inside this timer
                // where nothing else could catch it
                signer.fail(sign.unsupportedHashAlgoError(signer.hashAlgo));
                return;
            }
            if (writeValue) {
                setImmediate(() => {
                    inputStream.end(writeValue);
                });
            }
        });
        return output;
    }
}
export default DKIM;
