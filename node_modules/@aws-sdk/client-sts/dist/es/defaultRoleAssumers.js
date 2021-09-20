import { __assign } from "tslib";
// Please do not touch this file. It's generated from template in:
// https://github.com/aws/aws-sdk-js-v3/blob/main/codegen/smithy-aws-typescript-codegen/src/main/resources/software/amazon/smithy/aws/typescript/codegen/sts-client-defaultRoleAssumers.ts
import { getDefaultRoleAssumer as StsGetDefaultRoleAssumer, getDefaultRoleAssumerWithWebIdentity as StsGetDefaultRoleAssumerWithWebIdentity, } from "./defaultStsRoleAssumers";
import { STSClient } from "./STSClient";
/**
 * The default role assumer that used by credential providers when sts:AssumeRole API is needed.
 */
export var getDefaultRoleAssumer = function (stsOptions) {
    if (stsOptions === void 0) { stsOptions = {}; }
    return StsGetDefaultRoleAssumer(stsOptions, STSClient);
};
/**
 * The default role assumer that used by credential providers when sts:AssumeRoleWithWebIdentity API is needed.
 */
export var getDefaultRoleAssumerWithWebIdentity = function (stsOptions) {
    if (stsOptions === void 0) { stsOptions = {}; }
    return StsGetDefaultRoleAssumerWithWebIdentity(stsOptions, STSClient);
};
/**
 * The default credential providers depend STS client to assume role with desired API: sts:assumeRole,
 * sts:assumeRoleWithWebIdentity, etc. This function decorates the default credential provider with role assumers which
 * encapsulates the process of calling STS commands. This can only be imported by AWS client packages to avoid circular
 * dependencies.
 *
 * @internal
 */
export var decorateDefaultCredentialProvider = function (provider) {
    return function (input) {
        return provider(__assign({ roleAssumer: getDefaultRoleAssumer(input), roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input) }, input));
    };
};
//# sourceMappingURL=defaultRoleAssumers.js.map