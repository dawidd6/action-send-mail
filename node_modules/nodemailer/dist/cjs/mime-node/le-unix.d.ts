import { Transform, type TransformOptions } from 'node:stream';
/**
 * Ensures that only <LF> is used for linebreaks
 *
 * @param options Stream options
 */
export default class LeUnix extends Transform {
    constructor(options?: TransformOptions);
}
