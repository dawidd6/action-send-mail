/**
 * Options for addressparser
 */
export interface AddressParserOptions {
    /** Flatten groups into a single list of mailboxes */
    flatten?: boolean | undefined;
}
/**
 * A single mailbox. Either value may be an empty string when the input did not carry it
 */
export interface MailboxAddress {
    name: string;
    address: string;
    group?: undefined;
}
/**
 * An address group. RFC 5322 does not allow nested groups, so any nesting is flattened
 * into `group`
 */
export interface GroupAddress {
    name: string;
    group: Address[];
    address?: undefined;
}
/**
 * A parsed address entry, either a mailbox or a group
 */
export type Address = MailboxAddress | GroupAddress;
/**
 * Parses structured e-mail addresses from an address field
 *
 * Example:
 *
 *    'Name <address@domain>'
 *
 * will be converted to
 *
 *     [{name: 'Name', address: 'address@domain'}]
 *
 * @param str Address field
 * @param options Optional options object
 * @param options._depth Internal recursion depth counter (do not set manually)
 * @return An array of address objects
 */
export default function addressparser(str?: string | null, options?: AddressParserOptions): Address[];
