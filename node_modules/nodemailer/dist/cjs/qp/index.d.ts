import { Transform } from 'node:stream';
export declare function encode(buffer: Buffer | string): string;
/**
 * Adds soft line breaks to a Quoted-Printable string
 *
 * @param str Quoted-Printable encoded string that might need line wrapping
 * @param [lineLength=76] Maximum allowed length for a line
 * @returns Soft-wrapped Quoted-Printable encoded string
 */
export declare function wrap(str: string, lineLength?: number): string;
/**
 * Options for the Quoted-Printable encoder stream
 */
export interface QPEncoderOptions {
    /** Maximum length for lines, set to false to disable wrapping */
    lineLength?: number | false | undefined;
}
/**
 * Creates a transform stream for encoding data to Quoted-Printable encoding
 *
 * @constructor
 * @param options Stream options
 * @param [options.lineLength=76] Maximum length for lines, set to false to disable wrapping
 */
export declare class Encoder extends Transform {
    options: QPEncoderOptions;
    inputBytes: number;
    outputBytes: number;
    constructor(options?: QPEncoderOptions);
}
