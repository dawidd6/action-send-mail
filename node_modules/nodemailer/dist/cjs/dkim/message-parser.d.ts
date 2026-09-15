import { Transform, type TransformOptions } from 'node:stream';
/**
 * A header line as emitted with the 'headers' event
 */
export interface MessageParserHeaderLine {
    /** Lowercase header field name */
    key: string;
    /** Full header line, folded continuation lines included, one character per byte ('binary' encoding) */
    line: string;
}
/**
 * MessageParser instance is a transform stream that separates message headers
 * from the rest of the body. Headers are emitted with the 'headers' event. Message
 * body is passed on as the resulting stream.
 */
export default class MessageParser extends Transform {
    lastBytes: Buffer;
    headersParsed: boolean;
    headerBytes: number;
    headerChunks: Buffer[] | null;
    rawHeaders: Buffer | false;
    bodySize: number;
    constructor(options?: TransformOptions);
    /**
     * Keeps count of the last 4 bytes in order to detect line breaks on chunk boundaries
     *
     * @param data Next data chunk from the stream
     */
    updateLastBytes(data: Buffer): void;
    /**
     * Finds and removes message headers from the remaining body. We want to keep
     * headers separated until final delivery to be able to modify these
     *
     * @param data Next chunk of data
     * @return Returns true if headers are already found or false otherwise
     */
    checkHeaders(data: Buffer): boolean;
    parseHeaders(): MessageParserHeaderLine[];
}
