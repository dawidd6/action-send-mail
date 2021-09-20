"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateDefaultCredentialProvider = exports.getDefaultRoleAssumerWithWebIdentity = exports.getDefaultRoleAssumer = void 0;
const AssumeRoleCommand_1 = require("./commands/AssumeRoleCommand");
const AssumeRoleWithWebIdentityCommand_1 = require("./commands/AssumeRoleWithWebIdentityCommand");
const ASSUME_ROLE_DEFAULT_REGION = "us-east-1";
/**
 * Inject the fallback STS region of us-east-1.
 */
const decorateDefaultRegion = (region) => {
    if (typeof region !== "function") {
        return region === undefined ? ASSUME_ROLE_DEFAULT_REGION : region;
    }
    return async () => {
        try {
            return await region();
        }
        catch (e) {
            return ASSUME_ROLE_DEFAULT_REGION;
        }
    };
};
/**
 * The default role assumer that used by credential providers when sts:AssumeRole API is needed.
 * @internal
 */
const getDefaultRoleAssumer = (stsOptions, stsClientCtor) => {
    let stsClient;
    let closureSourceCreds;
    return async (sourceCreds, params) => {
        closureSourceCreds = sourceCreds;
        if (!stsClient) {
            const { logger, region, requestHandler } = stsOptions;
            stsClient = new stsClientCtor({
                logger,
                // A hack to make sts client uses the credential in current closure.
                credentialDefaultProvider: () => async () => closureSourceCreds,
                region: decorateDefaultRegion(region || stsOptions.region),
                ...(requestHandler ? { requestHandler } : {}),
            });
        }
        const { Credentials } = await stsClient.send(new AssumeRoleCommand_1.AssumeRoleCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
        }
        return {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
        };
    };
};
exports.getDefaultRoleAssumer = getDefaultRoleAssumer;
/**
 * The default role assumer that used by credential providers when sts:AssumeRoleWithWebIdentity API is needed.
 * @internal
 */
const getDefaultRoleAssumerWithWebIdentity = (stsOptions, stsClientCtor) => {
    let stsClient;
    return async (params) => {
        if (!stsClient) {
            const { logger, region, requestHandler } = stsOptions;
            stsClient = new stsClientCtor({
                logger,
                region: decorateDefaultRegion(region || stsOptions.region),
                ...(requestHandler ? { requestHandler } : {}),
            });
        }
        const { Credentials } = await stsClient.send(new AssumeRoleWithWebIdentityCommand_1.AssumeRoleWithWebIdentityCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
        }
        return {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
        };
    };
};
exports.getDefaultRoleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity;
/**
 * The default credential providers depend STS client to assume role with desired API: sts:assumeRole,
 * sts:assumeRoleWithWebIdentity, etc. This function decorates the default credential provider with role assumers which
 * encapsulates the process of calling STS commands. This can only be imported by AWS client packages to avoid circular
 * dependencies.
 *
 * @internal
 */
const decorateDefaultCredentialProvider = (provider) => (input) => provider({
    roleAssumer: exports.getDefaultRoleAssumer(input, input.stsClientCtor),
    roleAssumerWithWebIdentity: exports.getDefaultRoleAssumerWithWebIdentity(input, input.stsClientCtor),
    ...input,
});
exports.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;
//# sourceMappingURL=defaultStsRoleAssumers.js.map