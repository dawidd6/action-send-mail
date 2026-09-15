/**
 * Nodemailer Error Codes
 *
 * Centralized error code definitions for consistent error handling.
 *
 * Usage:
 *   import * as errors from './errors.js';
 *   const err: NodemailerError = new Error('Connection closed');
 *   err.code = errors.ECONNECTION;
 */
/**
 * Error code descriptions for documentation and debugging
 */
export const ERROR_CODES = {
    // Connection errors
    ECONNECTION: 'Connection closed unexpectedly',
    ETIMEDOUT: 'Connection or operation timed out',
    ESOCKET: 'Socket-level error',
    EDNS: 'DNS resolution failed',
    // TLS/Security errors
    ETLS: 'TLS handshake or STARTTLS failed',
    EREQUIRETLS: 'REQUIRETLS not supported by server (RFC 8689)',
    // Protocol errors
    EPROTOCOL: 'Invalid SMTP server response',
    EENVELOPE: 'Invalid mail envelope (sender or recipients)',
    EMESSAGE: 'Message delivery error',
    ESTREAM: 'Stream processing error',
    // Authentication errors
    EAUTH: 'Authentication failed',
    ENOAUTH: 'Authentication credentials not provided',
    EOAUTH2: 'OAuth2 token generation or refresh error',
    // Resource errors
    EMAXLIMIT: 'Pool resource limit reached (max messages per connection)',
    EMAXRECIPIENTS: 'Recipient count exceeds maxRecipients',
    // Transport-specific errors
    ESENDMAIL: 'Sendmail command error',
    ESES: 'AWS SES transport error',
    // Configuration and access errors
    ECONFIG: 'Invalid configuration',
    EPROXY: 'Proxy connection error',
    EFILEACCESS: 'File access rejected (disableFileAccess is set)',
    EURLACCESS: 'URL access rejected (disableUrlAccess is set)',
    EFETCH: 'HTTP fetch error'
};
// Error codes as string constants
export const ECONNECTION = 'ECONNECTION';
export const ETIMEDOUT = 'ETIMEDOUT';
export const ESOCKET = 'ESOCKET';
export const EDNS = 'EDNS';
export const ETLS = 'ETLS';
export const EREQUIRETLS = 'EREQUIRETLS';
export const EPROTOCOL = 'EPROTOCOL';
export const EENVELOPE = 'EENVELOPE';
export const EMESSAGE = 'EMESSAGE';
export const ESTREAM = 'ESTREAM';
export const EAUTH = 'EAUTH';
export const ENOAUTH = 'ENOAUTH';
export const EOAUTH2 = 'EOAUTH2';
export const EMAXLIMIT = 'EMAXLIMIT';
export const EMAXRECIPIENTS = 'EMAXRECIPIENTS';
export const ESENDMAIL = 'ESENDMAIL';
export const ESES = 'ESES';
export const ECONFIG = 'ECONFIG';
export const EPROXY = 'EPROXY';
export const EFILEACCESS = 'EFILEACCESS';
export const EURLACCESS = 'EURLACCESS';
export const EFETCH = 'EFETCH';
