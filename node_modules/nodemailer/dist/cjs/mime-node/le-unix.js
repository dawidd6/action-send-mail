"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_stream_1 = require("node:stream");
/**
 * Ensures that only <LF> is used for linebreaks
 *
 * @param options Stream options
 */
class LeUnix extends node_stream_1.Transform {
    constructor(options) {
        super(options);
    }
    /**
     * Escapes dots
     * @internal
     */
    _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
            if (chunk[i] === 0x0d) {
                // \r
                buf = chunk.slice(lastPos, i);
                lastPos = i + 1;
                this.push(buf);
            }
        }
        if (lastPos && lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            this.push(buf);
        }
        else if (!lastPos) {
            this.push(chunk);
        }
        done();
    }
}
exports.default = LeUnix;
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
