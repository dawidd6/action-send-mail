import { type Duplex, type Readable, type TransformOptions, type Writable } from 'node:stream';
import type { NodemailerError } from '../errors.js';
import type { OutgoingHttpHeaders } from 'node:http';
/**
 * Options for a MimeNode
 */
export interface MimeNodeOptions {
    /** root node for this tree */
    rootNode?: MimeNode | undefined;
    /** immediate parent for this node */
    parentNode?: MimeNode | undefined;
    /** filename for an attachment node */
    filename?: string | undefined;
    /** shared part of the unique multipart boundary */
    baseBoundary?: string | undefined;
    /** prefix for the generated multipart boundaries, defaults to '--_NmP' */
    boundaryPrefix?: string | undefined;
    /** If true, do not exclude Bcc from the generated headers */
    keepBcc?: boolean | undefined;
    /** method to normalize header keys for custom caseing */
    normalizeHeaderKey?: ((key: string, value: string) => string) | undefined;
    /** either 'Q' (the default) or 'B' */
    textEncoding?: string | undefined;
    /** Hostname for default message-id values */
    hostname?: string | undefined;
    /** If set to 'win' then uses \r\n, if 'linux' then \n. If not set (or `raw` is used) then newlines are kept as is */
    newline?: string | undefined;
    /** Reject content that points to a file path, for this node and every node below it */
    disableFileAccess?: boolean | undefined;
    /** Reject content that points to a URL, for this node and every node below it */
    disableUrlAccess?: boolean | undefined;
}
/**
 * An address object as accepted in address headers and produced by getAddresses. Either a
 * mailbox with an address or a group holding a list of addresses
 */
export interface MimeNodeAddress {
    name?: string | undefined;
    address?: string | undefined;
    group?: MimeNodeAddress[] | undefined;
}
/**
 * Addresses as accepted by address headers and envelope fields: an address string, an
 * address object, or an array of these, nested arrays included
 */
export type MimeNodeAddressInput = string | MimeNodeAddress | MimeNodeAddressInput[];
/**
 * A header value object. When `prepared` is set the value is emitted as is, without
 * encoding, and folded only if `foldLines` is set as well
 */
export interface MimeNodePreparedHeaderValue {
    value?: unknown;
    prepared?: boolean | undefined;
    foldLines?: boolean | undefined;
}
/**
 * The values a header can hold: a string, a number, a Date (for the Date header), address
 * objects (for the address headers), a prepared value object, or a list of these
 */
export type MimeNodeHeaderValue = string | number | boolean | Date | MimeNodeAddress | MimeNodePreparedHeaderValue | MimeNodeHeaderValue[] | null | undefined;
/**
 * A single header, the shape the headers are stored in and one of the list forms
 * setHeader and addHeader accept
 */
export interface MimeNodeHeader {
    key: string;
    value: MimeNodeHeaderValue;
}
/**
 * Several headers keyed by header name
 */
export interface MimeNodeHeaderMap {
    [key: string]: MimeNodeHeaderValue;
}
/**
 * Several headers at once, as accepted by setHeader and addHeader: a single {key, value}
 * pair, a list of them, or an object keyed by header name
 */
export type MimeNodeHeaders = MimeNodeHeader | MimeNodeHeader[] | MimeNodeHeaderMap;
/**
 * A content descriptor object, see setContent. Points to the content instead of carrying it
 */
export interface MimeNodeContentObject {
    /** File path to read the content from */
    path?: string | undefined;
    /** URL to fetch the content from */
    href?: string | undefined;
    /** Request headers for a URL fetch */
    httpHeaders?: OutgoingHttpHeaders | undefined;
    /** TLS settings for a URL fetch, see nmfetch */
    tls?: {
        [key: string]: any;
    } | undefined;
}
/**
 * Body content as accepted by setContent and setRaw: a string, a Buffer, a readable stream
 * or an object pointing to the content
 */
export type MimeNodeContent = string | Buffer | Readable | MimeNodeContentObject;
/**
 * SMTP envelope as returned by getEnvelope. Custom fields of an envelope set with
 * setEnvelope are carried along
 */
export interface MimeNodeEnvelope {
    from: string | false;
    to: string[];
    [key: string]: unknown;
}
/**
 * Envelope as accepted by setEnvelope. Recipients are collected from to, cc and bcc, any
 * other field is copied to the envelope as is
 */
export interface MimeNodeEnvelopeInput {
    from?: MimeNodeAddressInput | undefined;
    to?: MimeNodeAddressInput | undefined;
    cc?: MimeNodeAddressInput | undefined;
    bcc?: MimeNodeAddressInput | undefined;
    [key: string]: unknown;
}
/**
 * Parsed address headers as returned by getAddresses, keyed by lowercase header name
 */
export interface MimeNodeAddresses {
    from?: MimeNodeAddress[] | undefined;
    sender?: MimeNodeAddress[] | undefined;
    'reply-to'?: MimeNodeAddress[] | undefined;
    to?: MimeNodeAddress[] | undefined;
    cc?: MimeNodeAddress[] | undefined;
    bcc?: MimeNodeAddress[] | undefined;
}
/**
 * Options for createReadStream. Handed to the PassThrough the message is written to and to
 * the base64 / quoted-printable encoders, which read `lineLength` from it
 */
export interface MimeNodeStreamOptions extends TransformOptions {
    /** Maximum line length for base64 and quoted-printable bodies, false disables wrapping */
    lineLength?: number | false | undefined;
}
/**
 * A transform stream the message is piped through, or a function returning one
 */
export type MimeNodeTransform = Duplex | (() => Duplex);
/**
 * A post process function, takes the message stream and returns the stream to expose instead
 */
export type MimeNodeProcessFunc = (input: Readable) => Readable;
/**
 * Callback for build
 */
export type MimeNodeBuildCallback = (err: NodemailerError | null, message: Buffer) => void;
/**
 * Creates a new mime tree node. Assumes 'multipart/*' as the content type
 * if it is a branch, anything else counts as leaf. If rootNode is missing from
 * the options, assumes this is the root.
 *
 * @param contentType Define the content type for the node. Can be left blank for attachments (derived from filename)
 * @param [options] optional options
 * @param [options.rootNode] root node for this tree
 * @param [options.parentNode] immediate parent for this node
 * @param [options.filename] filename for an attachment node
 * @param [options.baseBoundary] shared part of the unique multipart boundary
 * @param [options.keepBcc] If true, do not exclude Bcc from the generated headers
 * @param [options.normalizeHeaderKey] method to normalize header keys for custom caseing
 * @param [options.textEncoding] either 'Q' (the default) or 'B'
 */
declare class MimeNode {
    nodeCounter: number;
    baseBoundary: string;
    boundaryPrefix: string;
    disableFileAccess: boolean;
    disableUrlAccess: boolean;
    normalizeHeaderKey: MimeNodeOptions['normalizeHeaderKey'];
    date: Date | null;
    rootNode: MimeNode;
    keepBcc: boolean;
    textEncoding: string;
    parentNode: MimeNode | undefined;
    hostname: string | undefined;
    newline: string | undefined;
    childNodes: MimeNode[];
    /** Filename for this node. Useful with attachments */
    filename?: string | undefined;
    /** Body content, or the error a content stream emitted before it was read */
    content?: MimeNodeContent | Error | undefined;
    /** Lowercase content type, set when the headers are built */
    contentType?: string | undefined;
    /** Multipart subtype, false for a non-multipart node, set when the headers are built */
    multipart?: string | false | undefined;
    /** Multipart boundary, false for a non-multipart node, set when the headers are built */
    boundary?: string | false | undefined;
    constructor(contentType?: string | false, options?: MimeNodeOptions);
    /**
     * Creates and appends a child node.Arguments provided are passed to MimeNode constructor
     *
     * @param [contentType] Optional content type
     * @param [options] Optional options object
     * @return Created node object
     */
    createChild(contentType?: string | false | MimeNodeOptions, options?: MimeNodeOptions): MimeNode;
    /**
     * Appends an existing node to the mime tree. Removes the node from an existing
     * tree if needed
     *
     * @param childNode node to be appended
     * @return Appended node object
     */
    appendChild(childNode: MimeNode): MimeNode;
    /**
     * Replaces current node with another node
     *
     * @param node Replacement node
     * @return Replacement node
     */
    replace(node: MimeNode): MimeNode;
    /**
     * Removes current node from the mime tree
     *
     * @return removed node
     */
    remove(): MimeNode | undefined;
    /**
     * Sets a header value. If the value for selected key exists, it is overwritten.
     * You can set multiple values as well by using [{key:'', value:''}] or
     * {key: 'value'} as the first argument.
     *
     * @param key Header key or a list of key value pairs
     * @param value Header value
     * @return current node
     */
    setHeader(key: string | MimeNodeHeaders, value?: MimeNodeHeaderValue): this;
    /**
     * Adds a header value. If the value for selected key exists, the value is appended
     * as a new field and old one is not touched.
     * You can set multiple values as well by using [{key:'', value:''}] or
     * {key: 'value'} as the first argument.
     *
     * @param key Header key or a list of key value pairs
     * @param value Header value
     * @return current node
     */
    addHeader(key: string | MimeNodeHeaders, value?: MimeNodeHeaderValue): this;
    /**
     * Retrieves the first mathcing value of a selected key
     *
     * @param key Key to search for
     * @retun Value for the key
     */
    getHeader(key: string): MimeNodeHeaderValue;
    /**
     * Sets body content for current node. If the value is a string, charset is added automatically
     * to Content-Type (if it is text/*). If the value is a Buffer, you need to specify
     * the charset yourself
     *
     * @param content Body content
     * @return current node
     */
    setContent(content: MimeNodeContent): this;
    build(): Promise<Buffer>;
    build(callback: MimeNodeBuildCallback): void;
    getTransferEncoding(): string | false;
    /**
     * Builds the header block for the mime node. Append \r\n\r\n before writing the content
     *
     * @returns Headers
     */
    buildHeaders(): string;
    /**
     * Streams the rfc2822 message from the current node. If this is a root node,
     * mandatory header fields are set if missing (Date, Message-Id, MIME-Version)
     *
     * @return Compiled message
     */
    createReadStream(options?: MimeNodeStreamOptions): Readable;
    /**
     * Appends a transform stream object to the transforms list. Final output
     * is passed through this stream before exposing
     *
     * @param transform Read-Write stream
     */
    transform(transform: MimeNodeTransform): void;
    /**
     * Appends a post process function. The functon is run after transforms and
     * uses the following syntax
     *
     *   processFunc(input) -> outputStream
     *
     * @param processFunc Read-Write stream
     */
    processFunc(processFunc: MimeNodeProcessFunc): void;
    stream(outputStream: Writable, options: MimeNodeStreamOptions, done: (err?: Error | null) => void): void;
    /**
     * Sets envelope to be used instead of the generated one
     *
     * @return SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
     */
    setEnvelope(envelope: MimeNodeEnvelopeInput): this;
    /**
     * Generates and returns an object with parsed address fields
     *
     * @return Address object
     */
    getAddresses(): MimeNodeAddresses;
    /**
     * Generates and returns SMTP envelope with the sender address and a list of recipients addresses
     *
     * @return SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
     */
    getEnvelope(): MimeNodeEnvelope;
    /**
     * Returns Message-Id value. If it does not exist, then creates one
     *
     * @return Message-Id value
     */
    messageId(): string;
    /**
     * Sets pregenerated content that will be used as the output of this node
     *
     * @param raw Raw MIME contents
     */
    setRaw(raw: MimeNodeContent): this;
}
/**
 * Type aliases in the layout of @types/nodemailer, so `MimeNode.Options` style references keep working
 */
declare namespace MimeNode {
    type Options = MimeNodeOptions;
    type Addresses = MimeNodeAddresses;
    type Envelope = MimeNodeEnvelope;
}
export default MimeNode;
