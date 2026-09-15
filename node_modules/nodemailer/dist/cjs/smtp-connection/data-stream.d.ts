import { Transform, type TransformOptions } from 'node:stream';
/**
 * Escapes dots in the beginning of lines. Ends the stream with <CR><LF>.<CR><LF>
 * Also makes sure that only <CR><LF> sequences are used for linebreaks
 *
 * @param options Stream options
 */
export default class DataStream extends Transform {
    options: TransformOptions;
    inByteCount: number;
    outByteCount: number;
    lastByte: number | false;
    constructor(options?: TransformOptions);
}
