import { Transform } from 'node:stream';
export default class LastNewline extends Transform {
    lastByte: number | false;
    constructor();
}
