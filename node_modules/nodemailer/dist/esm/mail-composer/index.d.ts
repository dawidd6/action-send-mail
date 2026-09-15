import MimeNode, { type MimeNodeAddressInput, type MimeNodeContent, type MimeNodeEnvelopeInput, type MimeNodeHeaders, type MimeNodeOptions } from '../mime-node/index.js';
import type { Readable } from 'node:stream';
import type { OutgoingHttpHeaders } from 'node:http';
/**
 * A content element, the shape of the text, html, watchHtml, amp and alternatives values.
 * The content is either given in `content`, read from `path` or `href`, or `raw` supplies
 * a pregenerated MIME part
 */
export interface MailComposerAlternative {
    /** The content itself: a string, a Buffer, a readable stream or a content descriptor */
    content?: MimeNodeContent | undefined;
    /** File path, data URI or http(s) URL to read the content from */
    path?: string | false | undefined;
    /** URL or data URI to fetch the content from */
    href?: string | false | undefined;
    /** Request headers for a URL fetch */
    httpHeaders?: OutgoingHttpHeaders | undefined;
    /** TLS settings for a URL fetch, see nmfetch */
    tls?: {
        [key: string]: any;
    } | undefined;
    /** Encoding of a string `content`, decoded into a Buffer unless it is utf8 or ascii */
    encoding?: string | undefined;
    /** Pregenerated MIME part, used as is instead of building the node */
    raw?: MimeNodeContent | undefined;
    /** Content type, detected from the filename, path or URL when not set */
    contentType?: string | undefined;
    /** Content-Transfer-Encoding for the node, false leaves the choice to the node */
    contentTransferEncoding?: string | false | undefined;
    /** Filename for the node, false suppresses the generated one */
    filename?: string | false | undefined;
    /** Additional headers for the node */
    headers?: MimeNodeHeaders | undefined;
}
/**
 * An attachment, the shape of the attachments entries
 */
export interface MailComposerAttachment extends MailComposerAlternative {
    /** Content-Disposition for the node, 'attachment' by default and 'inline' for a message node or an image with a cid */
    contentDisposition?: string | undefined;
    /** Content-Id for an embedded image, moves the attachment into the multipart/related node beside the html */
    cid?: string | undefined;
}
/**
 * The icalEvent value as an object
 */
export interface MailComposerIcalEvent extends MailComposerAlternative {
    /** iCalendar method, PUBLISH by default */
    method?: string | undefined;
}
/**
 * The attachments as sorted by getAttachments
 */
export interface MailComposerAttachments {
    /** Attachments for the multipart/mixed node, the icalEvent attachment included */
    attached: MailComposerAttachment[];
    /** Attachments with a cid, embedded in the multipart/related node beside the html */
    related: MailComposerAttachment[];
}
/**
 * A List-* header entry, a bare url or an url with a comment
 */
export type MailComposerListHeaderEntry = string | {
    url: string;
    comment?: string | undefined;
};
/**
 * The list value: List-* headers keyed by the part after "List-" (help, unsubscribe,
 * subscribe, post, owner, archive, id). An array emits one header per entry, an entry that
 * is itself an array joins its values into one header
 */
export interface MailComposerListHeaders {
    [key: string]: MailComposerListHeaderEntry | (MailComposerListHeaderEntry | MailComposerListHeaderEntry[])[];
}
/**
 * Mail options, the message data MailComposer builds the MIME tree from. The address
 * fields, subject, messageId, date, inReplyTo and references become headers of the root
 * node. Some fields are read by the mailer that hands the data to MailComposer rather than
 * by MailComposer itself, these are marked as such
 */
export interface MailComposerOptions {
    from?: MimeNodeAddressInput | undefined;
    sender?: MimeNodeAddressInput | undefined;
    to?: MimeNodeAddressInput | undefined;
    cc?: MimeNodeAddressInput | undefined;
    bcc?: MimeNodeAddressInput | undefined;
    replyTo?: MimeNodeAddressInput | undefined;
    inReplyTo?: string | undefined;
    references?: string | string[] | undefined;
    subject?: string | undefined;
    /** Message-ID header value, generated when missing */
    messageId?: string | undefined;
    /** Date header value, the current time when missing */
    date?: Date | string | undefined;
    /** Plaintext version of the message */
    text?: string | Buffer | Readable | MailComposerAlternative | undefined;
    /** HTML version of the message */
    html?: string | Buffer | Readable | MailComposerAlternative | undefined;
    /** Apple Watch specific HTML version of the message */
    watchHtml?: string | Buffer | Readable | MailComposerAlternative | undefined;
    /** AMP4EMAIL version of the message */
    amp?: string | Buffer | Readable | MailComposerAlternative | undefined;
    /** iCalendar event, included both as a text/calendar alternative and as an application/ics attachment */
    icalEvent?: string | Buffer | Readable | MailComposerIcalEvent | undefined;
    attachments?: MailComposerAttachment[] | undefined;
    /** Further alternatives for the multipart/alternative node, after text, watchHtml, amp, html and the calendar event */
    alternatives?: MailComposerAlternative[] | undefined;
    /** Custom headers for the root node, the standard headers above override them */
    headers?: MimeNodeHeaders | undefined;
    /** List-* headers, read by the mailer */
    list?: MailComposerListHeaders | undefined;
    /** SMTP envelope to use instead of the one generated from the headers */
    envelope?: MimeNodeEnvelopeInput | undefined;
    /** Content-Transfer-Encoding to force for the text/* nodes that do not set their own */
    encoding?: string | undefined;
    /** Header string encoding, 'Q' (the default) or 'B', 'quoted-printable' and 'base64' are accepted as well */
    textEncoding?: string | undefined;
    /** Pregenerated rfc822 message, used as is instead of building one */
    raw?: MimeNodeContent | undefined;
    /** Reject content that points to a URL */
    disableUrlAccess?: boolean | undefined;
    /** Reject content that points to a file path */
    disableFileAccess?: boolean | undefined;
    /** Convert data: images in the html into embedded attachments, read by the mailer */
    attachDataUrls?: boolean | undefined;
    /** Prefix for the generated multipart boundaries */
    boundaryPrefix?: string | undefined;
    /** Shared part of the unique multipart boundary */
    baseBoundary?: string | undefined;
    /** 'win' for CRLF and 'linux' for LF line breaks in the generated message, kept as is when not set */
    newline?: string | undefined;
    /** Keep the Bcc header in the generated message, listed for completeness, the transports set it on the message directly */
    keepBcc?: boolean | undefined;
    /** Method to normalize header keys for custom caseing */
    normalizeHeaderKey?: MimeNodeOptions['normalizeHeaderKey'] | undefined;
    /** 'high', 'normal' or 'low', sets the priority headers, read by the mailer */
    priority?: string | undefined;
    /** X-Mailer header value, false leaves the header out, read by the mailer */
    xMailer?: string | false | undefined;
}
declare class MailComposer {
    mail: MailComposerOptions;
    message: MimeNode | false;
    constructor(mail?: MailComposerOptions);
    /**
     * Builds MimeNode instance
     */
    compile(): MimeNode;
    /**
     * List all attachments. Resulting attachment objects can be used as input for MimeNode nodes
     *
     * @param findRelated If true separate related attachments from attached ones
     * @returns An object of arrays (`related` and `attached`)
     */
    getAttachments(findRelated?: boolean): MailComposerAttachments;
    /**
     * List alternatives. Resulting objects can be used as input for MimeNode nodes
     *
     * @returns An array of alternative elements. Includes the `text` and `html` values as well
     */
    getAlternatives(): MailComposerAlternative[];
}
/**
 * Type alias in the layout of the other modules (@types/nodemailer had no namespace for MailComposer)
 */
declare namespace MailComposer {
    type Options = MailComposerOptions;
}
export default MailComposer;
