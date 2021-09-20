"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateDefaultCredentialProvider = exports.getDefaultRoleAssumerWithWebIdentity = exports.getDefaultRoleAssumer = void 0;
// Please do not touch this file. It's generated from template in:
// https://github.com/aws/aws-sdk-js-v3/blob/main/codegen/smithy-aws-typescript-codegen/src/main/resources/software/amazon/smithy/aws/typescript/codegen/sts-client-defaultRoleAssumers.ts
const defaultStsRoleAssumers_1 = require("./defaultStsRoleAssumers");
const STSClient_1 = require("./STSClient");
/**
 * The default role assumer that used by credential providers when sts:AssumeRole API is needed.
 */
const getDefaultRoleAssumer = (stsOptions = {}) => defaultStsRoleAssumers_1.getDefaultRoleAssumer(stsOptions, STSClient_1.STSClient);
exports.getDefaultRoleAssumer = getDefaultRoleAssumer;
/**
 * The default role assumer that used by credential providers when sts:AssumeRoleWithWebIdentity API is needed.
 */
const getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}) => defaultStsRoleAssumers_1.getDefaultRoleAssumerWithWebIdentity(stsOptions, STSClient_1.STSClient);
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
    roleAssumer: exports.getDefaultRoleAssumer(input),
    roleAssumerWithWebIdentity: exports.getDefaultRoleAssumerWithWebIdentity(input),
    ...input,
});
exports.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;
//# sourceMappingURL=defaultRoleAssumers.js.map