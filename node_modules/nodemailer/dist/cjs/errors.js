"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFETCH = exports.EURLACCESS = exports.EFILEACCESS = exports.EPROXY = exports.ECONFIG = exports.ESES = exports.ESENDMAIL = exports.EMAXRECIPIENTS = exports.EMAXLIMIT = exports.EOAUTH2 = exports.ENOAUTH = exports.EAUTH = exports.ESTREAM = exports.EMESSAGE = exports.EENVELOPE = exports.EPROTOCOL = exports.EREQUIRETLS = exports.ETLS = exports.EDNS = exports.ESOCKET = exports.ETIMEDOUT = exports.ECONNECTION = exports.ERROR_CODES = void 0;
/**
 * Error code descriptions for documentation and debugging
 */
exports.ERROR_CODES = {
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
exports.ECONNECTION = 'ECONNECTION';
exports.ETIMEDOUT = 'ETIMEDOUT';
exports.ESOCKET = 'ESOCKET';
exports.EDNS = 'EDNS';
exports.ETLS = 'ETLS';
exports.EREQUIRETLS = 'EREQUIRETLS';
exports.EPROTOCOL = 'EPROTOCOL';
exports.EENVELOPE = 'EENVELOPE';
exports.EMESSAGE = 'EMESSAGE';
exports.ESTREAM = 'ESTREAM';
exports.EAUTH = 'EAUTH';
exports.ENOAUTH = 'ENOAUTH';
exports.EOAUTH2 = 'EOAUTH2';
exports.EMAXLIMIT = 'EMAXLIMIT';
exports.EMAXRECIPIENTS = 'EMAXRECIPIENTS';
exports.ESENDMAIL = 'ESENDMAIL';
exports.ESES = 'ESES';
exports.ECONFIG = 'ECONFIG';
exports.EPROXY = 'EPROXY';
exports.EFILEACCESS = 'EFILEACCESS';
exports.EURLACCESS = 'EURLACCESS';
exports.EFETCH = 'EFETCH';
