/**
 * Connection settings of a well-known e-mail service
 */
export interface WellKnownServiceDefinition {
    /** Human readable description of the service */
    description?: string | undefined;
    /** Domains of e-mail addresses hosted by the service */
    domains?: string[] | undefined;
    /** Alternative names the service can be looked up by */
    aliases?: string[] | undefined;
    /** SMTP hostname */
    host?: string | undefined;
    /** SMTP port (a numeric string in a few entries) */
    port?: number | string | undefined;
    /** true for implicit TLS (usually port 465) */
    secure?: boolean | undefined;
    /** Preferred authentication method */
    authMethod?: string | undefined;
    /** Set to true to require STARTTLS on a plaintext connection */
    requireTLS?: boolean | undefined;
    /** Set to true to skip STARTTLS */
    ignoreTLS?: boolean | undefined;
}
/**
 * SMTP settings of a well-known service, without the lookup keys
 */
export type WellKnownService = Omit<WellKnownServiceDefinition, 'domains' | 'aliases'>;
/**
 * Resolves SMTP config for given key. Key can be a name (like 'Gmail'), alias (like 'Google Mail') or
 * an email address (like 'test@googlemail.com').
 *
 * @param key Service name, alias or an email address
 * @returns SMTP config or false if not found
 */
export default function wellKnown(key: string): WellKnownService | false;
