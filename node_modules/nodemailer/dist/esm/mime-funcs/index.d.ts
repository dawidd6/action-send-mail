/**
 * A header value split into the value token and its parameters, the result of parseHeaderValue
 */
export interface ParsedHeaderValue {
    /** The value ahead of the parameters, for example the content type */
    value: string | false;
    /** Parameter values keyed by lowercase parameter name */
    params: Record<string, string>;
}
/**
 * Header value structure accepted by buildHeaderValue
 */
export interface StructuredHeaderValue {
    /** The value ahead of the parameters, for example the content type */
    value: string | false;
    /** Parameter values keyed by parameter name */
    params?: Record<string, string> | undefined;
}
/**
 * A single key=value pair of an rfc2231 encoded header parameter
 */
export interface EncodedHeaderParam {
    /** Parameter name with the continuation suffix, for example title*0* */
    key: string;
    /** Parameter value of this part */
    value: string;
}
/**
 * Checks if a value is plaintext string (uses only printable 7bit chars)
 *
 * When isParam is set the value is destined for a header parameter, so HT, CR and LF
 * are not plaintext either: a header parameter has no way to carry them. HT is a valid
 * fold point, so folding and unfolding a header would rewrite it as a space, and CR/LF
 * cannot appear in a header value at all. DEL is neither a token character nor qtext,
 * so it can not be carried bare or quoted. Such values have to go through the rfc2231
 * parameter continuation encoding instead, the same way a quote already does.
 *
 * @param value String to be tested
 * @param [isParam] Set to true if the value is a header parameter value
 * @returns true if it is a plaintext string
 */
export declare function isPlainText(value: unknown, isParam?: boolean): boolean;
/**
 * Wraps a value into a quoted-string. Inside one a quote would end the string early
 * and a backslash would escape whatever follows it, so both go out as quoted-pairs.
 *
 * @param value String to be quoted
 * @returns The value as a quoted-string, quotes included
 */
export declare function quoteString(value?: string): string;
/**
 * Checks if a multi line string containes lines longer than the selected value.
 *
 * Useful when detecting if a mail message needs any processing at all:
 * if only plaintext characters are used and lines are short, then there is
 * no need to encode the values in any way. If the value is plaintext but has
 * longer lines then allowed, then use format=flowed
 *
 * @param lineLength Max line length to check for
 * @returns Returns true if there is at least one line longer than lineLength chars
 */
export declare function hasLongerLines(str: string, lineLength: number): boolean;
/**
 * Encodes a string or an Buffer to an UTF-8 MIME Word (rfc2047)
 *
 * @param data String to be encoded
 * @param mimeWordEncoding='Q' Encoding for the mime word, either Q or B
 * @param [maxLength=0] If set, split mime words into several chunks if needed
 * @return Single or several mime words joined together
 */
export declare function encodeWord(data: string | Buffer, mimeWordEncoding?: string, maxLength?: number): string;
/**
 * Finds word sequences with non ascii text and converts these to mime words
 *
 * @param value String to be encoded
 * @param mimeWordEncoding='Q' Encoding for the mime word, either Q or B
 * @param [maxLength=0] If set, split mime words into several chunks if needed
 * @param [encodeAll=false] If true and the value needs encoding then encodes entire string, not just the smallest match
 * @return String with possible mime words
 */
export declare function encodeWords(value: string, mimeWordEncoding?: string, maxLength?: number, encodeAll?: boolean): string;
/**
 * Joins parsed header value together as 'value; param1=value1; param2=value2'
 * PS: We are following RFC 822 for the list of special characters that we need to keep in quotes.
 *      Refer: https://www.w3.org/Protocols/rfc1341/4_Content-Type.html
 * @param structured Parsed header value
 * @return joined header value
 */
export declare function buildHeaderValue(structured: StructuredHeaderValue): string;
/**
 * Encodes a string or an Buffer to an UTF-8 Parameter Value Continuation encoding (rfc2231)
 * Useful for splitting long parameter values.
 *
 * For example
 *      title="unicode string"
 * becomes
 *     title*0*=utf-8''unicode
 *     title*1*=%20string
 *
 * @param data String to be encoded
 * @param [maxLength=50] Max length for generated chunks
 * @param [fromCharset='UTF-8'] Source sharacter set
 * @return A list of encoded keys and headers
 */
export declare function buildHeaderParam(key: string, data: string | Buffer, maxLength?: number): EncodedHeaderParam[];
/**
 * Parses a header value with key=value arguments into a structured
 * object.
 *
 *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
 *   {
 *     'value': 'text/plain',
 *     'params': {
 *       'charset': 'UTF-8'
 *     }
 *   }
 *
 * @param str Header value
 * @return Header value as a parsed structure
 */
export declare function parseHeaderValue(str: string): ParsedHeaderValue;
/**
 * Returns file extension for a content type string. If no suitable extensions
 * are found, 'bin' is used as the default extension
 *
 * @param mimeType Content type to be checked for
 * @return File extension
 */
export declare function detectExtension(mimeType?: string | false): string;
/**
 * Returns content type for a file extension. If no suitable content types
 * are found, 'application/octet-stream' is used as the default content type
 *
 * @param extension Extension to be checked for
 * @return File extension
 */
export declare function detectMimeType(extension?: string | false): string;
/**
 * Folds long lines, useful for folding header lines (afterSpace=false) and
 * flowed text (afterSpace=true)
 *
 * @param str String to be folded
 * @param [lineLength=76] Maximum length of a line
 * @param afterSpace If true, leave a space in th end of a line
 * @return String with folded lines
 */
export declare function foldLines(str: string, lineLength?: number, afterSpace?: boolean): string;
/**
 * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
 *
 * @param str Mime encoded string to be split up
 * @param maxlen Maximum length of characters for one part (minimum 12)
 * @return Split string
 */
export declare function splitMimeEncodedString(str: string, maxlen?: number): string[];
export declare function encodeURICharComponent(chr: string): string;
export declare function safeEncodeURIComponent(str: string): string;
