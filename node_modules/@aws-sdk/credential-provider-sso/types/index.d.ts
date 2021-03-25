import { SSOClient } from "@aws-sdk/client-sso";
import { SourceProfileInit } from "@aws-sdk/credential-provider-ini";
import { CredentialProvider } from "@aws-sdk/types";
/**
 * The time window (15 mins) that SDK will treat the SSO token expires in before the defined expiration date in token.
 * This is needed because server side may have invalidated the token before the defined expiration date.
 *
 * @internal
 */
export declare const EXPIRE_WINDOW_MS: number;
export interface FromSSOInit extends SourceProfileInit {
    ssoClient?: SSOClient;
}
/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
export declare const fromSSO: (init?: FromSSOInit) => CredentialProvider;
