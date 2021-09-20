"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutRequest = exports.ListAccountsResponse = exports.ListAccountsRequest = exports.ListAccountRolesResponse = exports.RoleInfo = exports.ListAccountRolesRequest = exports.UnauthorizedException = exports.TooManyRequestsException = exports.ResourceNotFoundException = exports.InvalidRequestException = exports.GetRoleCredentialsResponse = exports.RoleCredentials = exports.GetRoleCredentialsRequest = exports.AccountInfo = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
var AccountInfo;
(function (AccountInfo) {
    /**
     * @internal
     */
    AccountInfo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccountInfo = exports.AccountInfo || (exports.AccountInfo = {}));
var GetRoleCredentialsRequest;
(function (GetRoleCredentialsRequest) {
    /**
     * @internal
     */
    GetRoleCredentialsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.accessToken && { accessToken: smithy_client_1.SENSITIVE_STRING }),
    });
})(GetRoleCredentialsRequest = exports.GetRoleCredentialsRequest || (exports.GetRoleCredentialsRequest = {}));
var RoleCredentials;
(function (RoleCredentials) {
    /**
     * @internal
     */
    RoleCredentials.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.secretAccessKey && { secretAccessKey: smithy_client_1.SENSITIVE_STRING }),
        ...(obj.sessionToken && { sessionToken: smithy_client_1.SENSITIVE_STRING }),
    });
})(RoleCredentials = exports.RoleCredentials || (exports.RoleCredentials = {}));
var GetRoleCredentialsResponse;
(function (GetRoleCredentialsResponse) {
    /**
     * @internal
     */
    GetRoleCredentialsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.roleCredentials && { roleCredentials: RoleCredentials.filterSensitiveLog(obj.roleCredentials) }),
    });
})(GetRoleCredentialsResponse = exports.GetRoleCredentialsResponse || (exports.GetRoleCredentialsResponse = {}));
var InvalidRequestException;
(function (InvalidRequestException) {
    /**
     * @internal
     */
    InvalidRequestException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidRequestException = exports.InvalidRequestException || (exports.InvalidRequestException = {}));
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    /**
     * @internal
     */
    ResourceNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotFoundException = exports.ResourceNotFoundException || (exports.ResourceNotFoundException = {}));
var TooManyRequestsException;
(function (TooManyRequestsException) {
    /**
     * @internal
     */
    TooManyRequestsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TooManyRequestsException = exports.TooManyRequestsException || (exports.TooManyRequestsException = {}));
var UnauthorizedException;
(function (UnauthorizedException) {
    /**
     * @internal
     */
    UnauthorizedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnauthorizedException = exports.UnauthorizedException || (exports.UnauthorizedException = {}));
var ListAccountRolesRequest;
(function (ListAccountRolesRequest) {
    /**
     * @internal
     */
    ListAccountRolesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.accessToken && { accessToken: smithy_client_1.SENSITIVE_STRING }),
    });
})(ListAccountRolesRequest = exports.ListAccountRolesRequest || (exports.ListAccountRolesRequest = {}));
var RoleInfo;
(function (RoleInfo) {
    /**
     * @internal
     */
    RoleInfo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RoleInfo = exports.RoleInfo || (exports.RoleInfo = {}));
var ListAccountRolesResponse;
(function (ListAccountRolesResponse) {
    /**
     * @internal
     */
    ListAccountRolesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListAccountRolesResponse = exports.ListAccountRolesResponse || (exports.ListAccountRolesResponse = {}));
var ListAccountsRequest;
(function (ListAccountsRequest) {
    /**
     * @internal
     */
    ListAccountsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.accessToken && { accessToken: smithy_client_1.SENSITIVE_STRING }),
    });
})(ListAccountsRequest = exports.ListAccountsRequest || (exports.ListAccountsRequest = {}));
var ListAccountsResponse;
(function (ListAccountsResponse) {
    /**
     * @internal
     */
    ListAccountsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListAccountsResponse = exports.ListAccountsResponse || (exports.ListAccountsResponse = {}));
var LogoutRequest;
(function (LogoutRequest) {
    /**
     * @internal
     */
    LogoutRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.accessToken && { accessToken: smithy_client_1.SENSITIVE_STRING }),
    });
})(LogoutRequest = exports.LogoutRequest || (exports.LogoutRequest = {}));
//# sourceMappingURL=models_0.js.map