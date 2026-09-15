import { Transform } from 'node:stream';
/**
 * Encodes a Buffer into a base64 encoded string
 *
 * @param buffer Buffer to convert
 * @returns base64 encoded string
 */
export declare function encode(buffer: Buffer | string): string;
/**
 * Adds soft line breaks to a base64 string
 *
 * @param str base64 encoded string that might need line wrapping
 * @param [lineLength=76] Maximum allowed length for a line
 * @returns Soft-wrapped base64 encoded string
 */
export declare function wrap(str: string, lineLength?: number | false): string;
/**
 * Options for the base64 encoder stream
 */
export interface EncoderOptions {
    /** Maximum length for lines, set to false to disable wrapping */
    lineLength?: number | false | undefined;
}
/**
 * Creates a transform stream for encoding data to base64 encoding
 *
 * @constructor
 * @param options Stream options
 * @param [options.lineLength=76] Maximum length for lines, set to false to disable wrapping
 */
export declare class Encoder extends Transform {
    options: EncoderOptions;
    inputBytes: number;
    outputBytes: number;
    constructor(options?: EncoderOptions);
}
