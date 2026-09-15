import { Transform, type TransformOptions } from 'node:stream';
/**
 * Ensures that only <CR><LF> sequences are used for linebreaks
 *
 * @param options Stream options
 */
export default class LeWindows extends Transform {
    lastByte: number | false;
    constructor(options?: TransformOptions);
}
