import { __assign } from "tslib";
import { SENSITIVE_STRING } from "@aws-sdk/smithy-client";
export var AccountInfo;
(function (AccountInfo) {
    AccountInfo.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AccountInfo || (AccountInfo = {}));
export var GetRoleCredentialsRequest;
(function (GetRoleCredentialsRequest) {
    GetRoleCredentialsRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.accessToken && { accessToken: SENSITIVE_STRING }))); };
})(GetRoleCredentialsRequest || (GetRoleCredentialsRequest = {}));
export var RoleCredentials;
(function (RoleCredentials) {
    RoleCredentials.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.secretAccessKey && { secretAccessKey: SENSITIVE_STRING })), (obj.sessionToken && { sessionToken: SENSITIVE_STRING }))); };
})(RoleCredentials || (RoleCredentials = {}));
export var GetRoleCredentialsResponse;
(function (GetRoleCredentialsResponse) {
    GetRoleCredentialsResponse.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.roleCredentials && { roleCredentials: RoleCredentials.filterSensitiveLog(obj.roleCredentials) }))); };
})(GetRoleCredentialsResponse || (GetRoleCredentialsResponse = {}));
export var InvalidRequestException;
(function (InvalidRequestException) {
    InvalidRequestException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidRequestException || (InvalidRequestException = {}));
export var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResourceNotFoundException || (ResourceNotFoundException = {}));
export var TooManyRequestsException;
(function (TooManyRequestsException) {
    TooManyRequestsException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TooManyRequestsException || (TooManyRequestsException = {}));
export var UnauthorizedException;
(function (UnauthorizedException) {
    UnauthorizedException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnauthorizedException || (UnauthorizedException = {}));
export var ListAccountRolesRequest;
(function (ListAccountRolesRequest) {
    ListAccountRolesRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.accessToken && { accessToken: SENSITIVE_STRING }))); };
})(ListAccountRolesRequest || (ListAccountRolesRequest = {}));
export var RoleInfo;
(function (RoleInfo) {
    RoleInfo.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RoleInfo || (RoleInfo = {}));
export var ListAccountRolesResponse;
(function (ListAccountRolesResponse) {
    ListAccountRolesResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListAccountRolesResponse || (ListAccountRolesResponse = {}));
export var ListAccountsRequest;
(function (ListAccountsRequest) {
    ListAccountsRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.accessToken && { accessToken: SENSITIVE_STRING }))); };
})(ListAccountsRequest || (ListAccountsRequest = {}));
export var ListAccountsResponse;
(function (ListAccountsResponse) {
    ListAccountsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListAccountsResponse || (ListAccountsResponse = {}));
export var LogoutRequest;
(function (LogoutRequest) {
    LogoutRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.accessToken && { accessToken: SENSITIVE_STRING }))); };
})(LogoutRequest || (LogoutRequest = {}));
//# sourceMappingURL=models_0.js.map