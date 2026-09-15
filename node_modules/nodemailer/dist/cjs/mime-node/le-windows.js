"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_stream_1 = require("node:stream");
/**
 * Ensures that only <CR><LF> sequences are used for linebreaks
 *
 * @param options Stream options
 */
class LeWindows extends node_stream_1.Transform {
    constructor(options) {
        super(options);
        this.lastByte = false;
    }
    /**
     * Escapes dots
     * @internal
     */
    _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
            if (chunk[i] === 0x0a) {
                // \n
                if ((i && chunk[i - 1] !== 0x0d) || (!i && this.lastByte !== 0x0d)) {
                    if (i > lastPos) {
                        buf = chunk.slice(lastPos, i);
                        this.push(buf);
                    }
                    this.push(Buffer.from('\r\n'));
                    lastPos = i + 1;
                }
            }
        }
        if (lastPos && lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            this.push(buf);
        }
        else if (!lastPos) {
            this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
    }
}
exports.default = LeWindows;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
