"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Please do not touch this file. It's generated from template in:
// https://github.com/aws/aws-sdk-js-v3/blob/main/codegen/smithy-aws-typescript-codegen/src/main/resources/software/amazon/smithy/aws/typescript/codegen/sts-client-defaultRoleAssumers.spec.ts
const protocol_http_1 = require("@aws-sdk/protocol-http");
const stream_1 = require("stream");
const mockHandle = jest.fn().mockResolvedValue({
    response: new protocol_http_1.HttpResponse({
        statusCode: 200,
        body: stream_1.Readable.from([""]),
    }),
});
jest.mock("@aws-sdk/node-http-handler", () => ({
    NodeHttpHandler: jest.fn().mockImplementation(() => ({
        destroy: () => { },
        handle: mockHandle,
    })),
    streamCollector: jest.fn(),
}));
const defaultRoleAssumers_1 = require("./defaultRoleAssumers");
const node_http_handler_1 = require("@aws-sdk/node-http-handler");
const mockConstructorInput = jest.fn();
jest.mock("./STSClient", () => ({
    STSClient: function (params) {
        mockConstructorInput(params);
        //@ts-ignore
        return new (jest.requireActual("./STSClient").STSClient)(params);
    },
}));
describe("getDefaultRoleAssumer", () => {
    const assumeRoleResponse = `<AssumeRoleResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
<AssumeRoleResult>
  <AssumedRoleUser>
    <AssumedRoleId>AROAZOX2IL27GNRBJHWC2:session</AssumedRoleId>
    <Arn>arn:aws:sts::123:assumed-role/assume-role-test/session</Arn>
  </AssumedRoleUser>
  <Credentials>
    <AccessKeyId>key</AccessKeyId>
    <SecretAccessKey>secrete</SecretAccessKey>
    <SessionToken>session-token</SessionToken>
    <Expiration>2021-05-05T23:22:08Z</Expiration>
  </Credentials>
</AssumeRoleResult>
<ResponseMetadata>
  <RequestId>12345678id</RequestId>
</ResponseMetadata>
</AssumeRoleResponse>`;
    beforeAll(() => {
        node_http_handler_1.streamCollector.mockImplementation(async () => Buffer.from(assumeRoleResponse));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should use supplied source credentials", async () => {
        var _a, _b;
        const roleAssumer = defaultRoleAssumers_1.getDefaultRoleAssumer();
        const params = {
            RoleArn: "arn:aws:foo",
            RoleSessionName: "session",
        };
        const sourceCred1 = { accessKeyId: "key1", secretAccessKey: "secrete1" };
        await roleAssumer(sourceCred1, params);
        expect(mockHandle).toBeCalledTimes(1);
        // Validate request is signed by sourceCred1
        expect((_a = mockHandle.mock.calls[0][0].headers) === null || _a === void 0 ? void 0 : _a.authorization).toEqual(expect.stringContaining("AWS4-HMAC-SHA256 Credential=key1/"));
        const sourceCred2 = { accessKeyId: "key2", secretAccessKey: "secrete1" };
        await roleAssumer(sourceCred2, params);
        // Validate request is signed by sourceCred2
        expect(mockHandle).toBeCalledTimes(2);
        expect((_b = mockHandle.mock.calls[1][0].headers) === null || _b === void 0 ? void 0 : _b.authorization).toEqual(expect.stringContaining("AWS4-HMAC-SHA256 Credential=key2/"));
    });
    it("should use the STS client config", async () => {
        const logger = console;
        const region = "some-region";
        const handler = new node_http_handler_1.NodeHttpHandler();
        const roleAssumer = defaultRoleAssumers_1.getDefaultRoleAssumer({
            region,
            logger,
            requestHandler: handler,
        });
        const params = {
            RoleArn: "arn:aws:foo",
            RoleSessionName: "session",
        };
        const sourceCred = { accessKeyId: "key", secretAccessKey: "secrete" };
        await roleAssumer(sourceCred, params);
        expect(mockConstructorInput).toHaveBeenCalledTimes(1);
        expect(mockConstructorInput.mock.calls[0][0]).toMatchObject({
            logger,
            requestHandler: handler,
            region,
        });
    });
});
describe("getDefaultRoleAssumerWithWebIdentity", () => {
    const assumeRoleResponse = `<Response xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
  <AssumeRoleWithWebIdentityResult>
    <Credentials>
      <AccessKeyId>key</AccessKeyId>
      <SecretAccessKey>secrete</SecretAccessKey>
      <SessionToken>session-token</SessionToken>
      <Expiration>2021-05-05T23:22:08Z</Expiration>
    </Credentials>
  </AssumeRoleWithWebIdentityResult>
  </Response>`;
    beforeAll(() => {
        node_http_handler_1.streamCollector.mockImplementation(async () => Buffer.from(assumeRoleResponse));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should use the STS client config", async () => {
        const logger = console;
        const region = "some-region";
        const handler = new node_http_handler_1.NodeHttpHandler();
        const roleAssumerWithWebIdentity = defaultRoleAssumers_1.getDefaultRoleAssumerWithWebIdentity({
            region,
            logger,
            requestHandler: handler,
        });
        const params = {
            RoleArn: "arn:aws:foo",
            RoleSessionName: "session",
            WebIdentityToken: "token",
        };
        await roleAssumerWithWebIdentity(params);
        expect(mockConstructorInput).toHaveBeenCalledTimes(1);
        expect(mockConstructorInput.mock.calls[0][0]).toMatchObject({
            logger,
            requestHandler: handler,
            region,
        });
    });
});
//# sourceMappingURL=defaultRoleAssumers.spec.js.map