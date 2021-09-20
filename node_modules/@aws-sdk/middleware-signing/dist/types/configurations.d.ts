import { Credentials, HashConstructor, Provider, RegionInfoProvider, RequestSigner } from "@aws-sdk/types";
export interface AwsAuthInputConfig {
    /**
     * The credentials used to sign requests.
     */
    credentials?: Credentials | Provider<Credentials>;
    /**
     * The signer to use when signing requests.
     */
    signer?: RequestSigner | Provider<RequestSigner>;
    /**
     * Whether to escape request path when signing the request.
     */
    signingEscapePath?: boolean;
    /**
     * An offset value in milliseconds to apply to all signing times.
     */
    systemClockOffset?: number;
    /**
     * The region where you want to sign your request against. This
     * can be different to the region in the endpoint.
     */
    signingRegion?: string;
}
export interface SigV4AuthInputConfig {
    /**
     * The credentials used to sign requests.
     */
    credentials?: Credentials | Provider<Credentials>;
    /**
     * The signer to use when signing requests.
     */
    signer?: RequestSigner | Provider<RequestSigner>;
    /**
     * Whether to escape request path when signing the request.
     */
    signingEscapePath?: boolean;
    /**
     * An offset value in milliseconds to apply to all signing times.
     */
    systemClockOffset?: number;
}
interface PreviouslyResolved {
    credentialDefaultProvider: (input: any) => Provider<Credentials>;
    region: string | Provider<string>;
    regionInfoProvider: RegionInfoProvider;
    signingName?: string;
    serviceId: string;
    sha256: HashConstructor;
}
interface SigV4PreviouslyResolved {
    credentialDefaultProvider: (input: any) => Provider<Credentials>;
    region: string | Provider<string>;
    signingName: string;
    sha256: HashConstructor;
}
export interface AwsAuthResolvedConfig {
    /**
     * Resolved value for input config {@link AwsAuthInputConfig.credentials}
     */
    credentials: Provider<Credentials>;
    /**
     * Resolved value for input config {@link AwsAuthInputConfig.signer}
     */
    signer: Provider<RequestSigner>;
    /**
     * Resolved value for input config {@link AwsAuthInputConfig.signingEscapePath}
     */
    signingEscapePath: boolean;
    /**
     * Resolved value for input config {@link AwsAuthInputConfig.systemClockOffset}
     */
    systemClockOffset: number;
}
export interface SigV4AuthResolvedConfig extends AwsAuthResolvedConfig {
}
export declare const resolveAwsAuthConfig: <T>(input: T & AwsAuthInputConfig & PreviouslyResolved) => T & AwsAuthResolvedConfig;
export declare const resolveSigV4AuthConfig: <T>(input: T & SigV4AuthInputConfig & SigV4PreviouslyResolved) => T & SigV4AuthResolvedConfig;
export {};
