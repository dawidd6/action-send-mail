import { __awaiter, __generator } from "tslib";
// Please do not touch this file. It's generated from template in:
// https://github.com/aws/aws-sdk-js-v3/blob/main/codegen/smithy-aws-typescript-codegen/src/main/resources/software/amazon/smithy/aws/typescript/codegen/sts-client-defaultRoleAssumers.spec.ts
import { HttpResponse } from "@aws-sdk/protocol-http";
import { Readable } from "stream";
var mockHandle = jest.fn().mockResolvedValue({
    response: new HttpResponse({
        statusCode: 200,
        body: Readable.from([""]),
    }),
});
jest.mock("@aws-sdk/node-http-handler", function () { return ({
    NodeHttpHandler: jest.fn().mockImplementation(function () { return ({
        destroy: function () { },
        handle: mockHandle,
    }); }),
    streamCollector: jest.fn(),
}); });
import { getDefaultRoleAssumer, getDefaultRoleAssumerWithWebIdentity } from "./defaultRoleAssumers";
import { NodeHttpHandler, streamCollector } from "@aws-sdk/node-http-handler";
var mockConstructorInput = jest.fn();
jest.mock("./STSClient", function () { return ({
    STSClient: function (params) {
        mockConstructorInput(params);
        //@ts-ignore
        return new (jest.requireActual("./STSClient").STSClient)(params);
    },
}); });
describe("getDefaultRoleAssumer", function () {
    var assumeRoleResponse = "<AssumeRoleResponse xmlns=\"https://sts.amazonaws.com/doc/2011-06-15/\">\n<AssumeRoleResult>\n  <AssumedRoleUser>\n    <AssumedRoleId>AROAZOX2IL27GNRBJHWC2:session</AssumedRoleId>\n    <Arn>arn:aws:sts::123:assumed-role/assume-role-test/session</Arn>\n  </AssumedRoleUser>\n  <Credentials>\n    <AccessKeyId>key</AccessKeyId>\n    <SecretAccessKey>secrete</SecretAccessKey>\n    <SessionToken>session-token</SessionToken>\n    <Expiration>2021-05-05T23:22:08Z</Expiration>\n  </Credentials>\n</AssumeRoleResult>\n<ResponseMetadata>\n  <RequestId>12345678id</RequestId>\n</ResponseMetadata>\n</AssumeRoleResponse>";
    beforeAll(function () {
        streamCollector.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, Buffer.from(assumeRoleResponse)];
        }); }); });
    });
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it("should use supplied source credentials", function () { return __awaiter(void 0, void 0, void 0, function () {
        var roleAssumer, params, sourceCred1, sourceCred2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    roleAssumer = getDefaultRoleAssumer();
                    params = {
                        RoleArn: "arn:aws:foo",
                        RoleSessionName: "session",
                    };
                    sourceCred1 = { accessKeyId: "key1", secretAccessKey: "secrete1" };
                    return [4 /*yield*/, roleAssumer(sourceCred1, params)];
                case 1:
                    _c.sent();
                    expect(mockHandle).toBeCalledTimes(1);
                    // Validate request is signed by sourceCred1
                    expect((_a = mockHandle.mock.calls[0][0].headers) === null || _a === void 0 ? void 0 : _a.authorization).toEqual(expect.stringContaining("AWS4-HMAC-SHA256 Credential=key1/"));
                    sourceCred2 = { accessKeyId: "key2", secretAccessKey: "secrete1" };
                    return [4 /*yield*/, roleAssumer(sourceCred2, params)];
                case 2:
                    _c.sent();
                    // Validate request is signed by sourceCred2
                    expect(mockHandle).toBeCalledTimes(2);
                    expect((_b = mockHandle.mock.calls[1][0].headers) === null || _b === void 0 ? void 0 : _b.authorization).toEqual(expect.stringContaining("AWS4-HMAC-SHA256 Credential=key2/"));
                    return [2 /*return*/];
            }
        });
    }); });
    it("should use the STS client config", function () { return __awaiter(void 0, void 0, void 0, function () {
        var logger, region, handler, roleAssumer, params, sourceCred;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = console;
                    region = "some-region";
                    handler = new NodeHttpHandler();
                    roleAssumer = getDefaultRoleAssumer({
                        region: region,
                        logger: logger,
                        requestHandler: handler,
                    });
                    params = {
                        RoleArn: "arn:aws:foo",
                        RoleSessionName: "session",
                    };
                    sourceCred = { accessKeyId: "key", secretAccessKey: "secrete" };
                    return [4 /*yield*/, roleAssumer(sourceCred, params)];
                case 1:
                    _a.sent();
                    expect(mockConstructorInput).toHaveBeenCalledTimes(1);
                    expect(mockConstructorInput.mock.calls[0][0]).toMatchObject({
                        logger: logger,
                        requestHandler: handler,
                        region: region,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("getDefaultRoleAssumerWithWebIdentity", function () {
    var assumeRoleResponse = "<Response xmlns=\"https://sts.amazonaws.com/doc/2011-06-15/\">\n  <AssumeRoleWithWebIdentityResult>\n    <Credentials>\n      <AccessKeyId>key</AccessKeyId>\n      <SecretAccessKey>secrete</SecretAccessKey>\n      <SessionToken>session-token</SessionToken>\n      <Expiration>2021-05-05T23:22:08Z</Expiration>\n    </Credentials>\n  </AssumeRoleWithWebIdentityResult>\n  </Response>";
    beforeAll(function () {
        streamCollector.mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, Buffer.from(assumeRoleResponse)];
        }); }); });
    });
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it("should use the STS client config", function () { return __awaiter(void 0, void 0, void 0, function () {
        var logger, region, handler, roleAssumerWithWebIdentity, params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = console;
                    region = "some-region";
                    handler = new NodeHttpHandler();
                    roleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity({
                        region: region,
                        logger: logger,
                        requestHandler: handler,
                    });
                    params = {
                        RoleArn: "arn:aws:foo",
                        RoleSessionName: "session",
                        WebIdentityToken: "token",
                    };
                    return [4 /*yield*/, roleAssumerWithWebIdentity(params)];
                case 1:
                    _a.sent();
                    expect(mockConstructorInput).toHaveBeenCalledTimes(1);
                    expect(mockConstructorInput.mock.calls[0][0]).toMatchObject({
                        logger: logger,
                        requestHandler: handler,
                        region: region,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=defaultRoleAssumers.spec.js.map