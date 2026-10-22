/**
 * Reads the Message-ID a receiving server gave the message out of its final 250 reply. Some
 * servers replace the Message-ID header of a submitted message with one of their own, and
 * the copy the recipients and the sent folder get carries that one instead of the id the
 * message was built with. Only replies in a format known to carry such an id are read.
 */
/**
 * Reads the server assigned Message-ID out of the final reply to a message
 *
 * @param response Final server reply for the message
 * @param [host] Hostname the connection was made to, SES replies are only read for an SES host
 * @returns The Message-ID with its angle brackets, or undefined when the reply names none
 */
export declare function parseServerMessageId(response: string | undefined, host?: string): string | undefined;
