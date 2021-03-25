import { __awaiter, __generator } from "tslib";
import { GetRoleCredentialsCommand, SSOClient } from "@aws-sdk/client-sso";
import { getMasterProfileName, parseKnownFiles } from "@aws-sdk/credential-provider-ini";
import { ProviderError } from "@aws-sdk/property-provider";
import { getHomeDir } from "@aws-sdk/shared-ini-file-loader";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
/**
 * The time window (15 mins) that SDK will treat the SSO token expires in before the defined expiration date in token.
 * This is needed because server side may have invalidated the token before the defined expiration date.
 *
 * @internal
 */
export var EXPIRE_WINDOW_MS = 15 * 60 * 1000;
var SHOULD_FAIL_CREDENTIAL_CHAIN = false;
/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
export var fromSSO = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var profiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseKnownFiles(init)];
                case 1:
                    profiles = _a.sent();
                    return [2 /*return*/, resolveSSOCredentials(getMasterProfileName(init), profiles, init)];
            }
        });
    }); };
};
var resolveSSOCredentials = function (profileName, profiles, options) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, startUrl, accountId, region, roleName, hasher, cacheName, tokenFile, token, accessToken, sso, ssoResp, e_1, _a, _b, accessKeyId, secretAccessKey, sessionToken, expiration;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                profile = profiles[profileName];
                if (!profile) {
                    throw new ProviderError("Profile " + profileName + " could not be found in shared credentials file.");
                }
                startUrl = profile.sso_start_url, accountId = profile.sso_account_id, region = profile.sso_region, roleName = profile.sso_role_name;
                if (!startUrl && !accountId && !region && !roleName) {
                    throw new ProviderError("Profile " + profileName + " is not configured with SSO credentials.");
                }
                if (!startUrl || !accountId || !region || !roleName) {
                    throw new ProviderError("Profile " + profileName + " does not have valid SSO credentials. Required parameters \"sso_account_id\", \"sso_region\", " +
                        "\"sso_role_name\", \"sso_start_url\". Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html", SHOULD_FAIL_CREDENTIAL_CHAIN);
                }
                hasher = createHash("sha1");
                cacheName = hasher.update(startUrl).digest("hex");
                tokenFile = join(getHomeDir(), ".aws", "sso", "cache", cacheName + ".json");
                try {
                    token = JSON.parse(readFileSync(tokenFile, { encoding: "utf-8" }));
                    if (new Date(token.expiresAt).getTime() - Date.now() <= EXPIRE_WINDOW_MS) {
                        throw new Error("SSO token is expired.");
                    }
                }
                catch (e) {
                    throw new ProviderError("The SSO session associated with this profile has expired or is otherwise invalid. To refresh this SSO session " +
                        "run aws sso login with the corresponding profile.", SHOULD_FAIL_CREDENTIAL_CHAIN);
                }
                accessToken = token.accessToken;
                sso = options.ssoClient || new SSOClient({ region: region });
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, sso.send(new GetRoleCredentialsCommand({
                        accountId: accountId,
                        roleName: roleName,
                        accessToken: accessToken,
                    }))];
            case 2:
                ssoResp = _c.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _c.sent();
                throw ProviderError.from(e_1, SHOULD_FAIL_CREDENTIAL_CHAIN);
            case 4:
                _a = ssoResp.roleCredentials, _b = _a === void 0 ? {} : _a, accessKeyId = _b.accessKeyId, secretAccessKey = _b.secretAccessKey, sessionToken = _b.sessionToken, expiration = _b.expiration;
                if (!accessKeyId || !secretAccessKey || !sessionToken || !expiration) {
                    throw new ProviderError("SSO returns an invalid temporary credential.", SHOULD_FAIL_CREDENTIAL_CHAIN);
                }
                return [2 /*return*/, { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, sessionToken: sessionToken, expiration: new Date(expiration) }];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSx5QkFBeUIsRUFBbUMsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDNUcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBcUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDbEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU1Qjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxJQUFNLGdCQUFnQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBRS9DLElBQU0sNEJBQTRCLEdBQUcsS0FBSyxDQUFDO0FBa0IzQzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsVUFBQyxJQUFzQjtJQUF0QixxQkFBQSxFQUFBLFNBQXNCO0lBQXlCLE9BQUE7Ozs7d0JBQ3BELHFCQUFNLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQTs7b0JBQXRDLFFBQVEsR0FBRyxTQUEyQjtvQkFDNUMsc0JBQU8scUJBQXFCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFDOzs7U0FDMUU7QUFIc0UsQ0FHdEUsQ0FBQztBQUVGLElBQU0scUJBQXFCLEdBQUcsVUFDNUIsV0FBbUIsRUFDbkIsUUFBdUIsRUFDdkIsT0FBb0I7Ozs7O2dCQUVkLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RD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b2xlQ3JlZGVudGlhbHNDb21tYW5kLCBHZXRSb2xlQ3JlZGVudGlhbHNDb21tYW5kT3V0cHV0LCBTU09DbGllbnQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LXNzb1wiO1xuaW1wb3J0IHsgZ2V0TWFzdGVyUHJvZmlsZU5hbWUsIHBhcnNlS25vd25GaWxlcywgU291cmNlUHJvZmlsZUluaXQgfSBmcm9tIFwiQGF3cy1zZGsvY3JlZGVudGlhbC1wcm92aWRlci1pbmlcIjtcbmltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvcHJvcGVydHktcHJvdmlkZXJcIjtcbmltcG9ydCB7IGdldEhvbWVEaXIsIFBhcnNlZEluaURhdGEgfSBmcm9tIFwiQGF3cy1zZGsvc2hhcmVkLWluaS1maWxlLWxvYWRlclwiO1xuaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyLCBDcmVkZW50aWFscyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCJjcnlwdG9cIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5cbi8qKlxuICogVGhlIHRpbWUgd2luZG93ICgxNSBtaW5zKSB0aGF0IFNESyB3aWxsIHRyZWF0IHRoZSBTU08gdG9rZW4gZXhwaXJlcyBpbiBiZWZvcmUgdGhlIGRlZmluZWQgZXhwaXJhdGlvbiBkYXRlIGluIHRva2VuLlxuICogVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzZXJ2ZXIgc2lkZSBtYXkgaGF2ZSBpbnZhbGlkYXRlZCB0aGUgdG9rZW4gYmVmb3JlIHRoZSBkZWZpbmVkIGV4cGlyYXRpb24gZGF0ZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEVYUElSRV9XSU5ET1dfTVMgPSAxNSAqIDYwICogMTAwMDtcblxuY29uc3QgU0hPVUxEX0ZBSUxfQ1JFREVOVElBTF9DSEFJTiA9IGZhbHNlO1xuXG4vKipcbiAqIENhY2hlZCBTU08gdG9rZW4gcmV0cmlldmVkIGZyb20gU1NPIGxvZ2luIGZsb3cuXG4gKi9cbmludGVyZmFjZSBTU09Ub2tlbiB7XG4gIC8vIEEgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHJldHVybmVkIGJ5IHRoZSBzc28tb2lkYyBzZXJ2aWNlLlxuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xuICAvLyBSRkMzMzM5IGZvcm1hdCB0aW1lc3RhbXBcbiAgZXhwaXJlc0F0OiBzdHJpbmc7XG4gIHJlZ2lvbj86IHN0cmluZztcbiAgc3RhcnRVcmw/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbVNTT0luaXQgZXh0ZW5kcyBTb3VyY2VQcm9maWxlSW5pdCB7XG4gIHNzb0NsaWVudD86IFNTT0NsaWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY3JlZGVudGlhbCBwcm92aWRlciB0aGF0IHdpbGwgcmVhZCBmcm9tIGEgY3JlZGVudGlhbF9wcm9jZXNzIHNwZWNpZmllZFxuICogaW4gaW5pIGZpbGVzLlxuICovXG5leHBvcnQgY29uc3QgZnJvbVNTTyA9IChpbml0OiBGcm9tU1NPSW5pdCA9IHt9KTogQ3JlZGVudGlhbFByb3ZpZGVyID0+IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcHJvZmlsZXMgPSBhd2FpdCBwYXJzZUtub3duRmlsZXMoaW5pdCk7XG4gIHJldHVybiByZXNvbHZlU1NPQ3JlZGVudGlhbHMoZ2V0TWFzdGVyUHJvZmlsZU5hbWUoaW5pdCksIHByb2ZpbGVzLCBpbml0KTtcbn07XG5cbmNvbnN0IHJlc29sdmVTU09DcmVkZW50aWFscyA9IGFzeW5jIChcbiAgcHJvZmlsZU5hbWU6IHN0cmluZyxcbiAgcHJvZmlsZXM6IFBhcnNlZEluaURhdGEsXG4gIG9wdGlvbnM6IEZyb21TU09Jbml0XG4pOiBQcm9taXNlPENyZWRlbnRpYWxzPiA9PiB7XG4gIGNvbnN0IHByb2ZpbGUgPSBwcm9maWxlc1twcm9maWxlTmFtZV07XG4gIGlmICghcHJvZmlsZSkge1xuICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKGBQcm9maWxlICR7cHJvZmlsZU5hbWV9IGNvdWxkIG5vdCBiZSBmb3VuZCBpbiBzaGFyZWQgY3JlZGVudGlhbHMgZmlsZS5gKTtcbiAgfVxuICBjb25zdCB7IHNzb19zdGFydF91cmw6IHN0YXJ0VXJsLCBzc29fYWNjb3VudF9pZDogYWNjb3VudElkLCBzc29fcmVnaW9uOiByZWdpb24sIHNzb19yb2xlX25hbWU6IHJvbGVOYW1lIH0gPSBwcm9maWxlO1xuICBpZiAoIXN0YXJ0VXJsICYmICFhY2NvdW50SWQgJiYgIXJlZ2lvbiAmJiAhcm9sZU5hbWUpIHtcbiAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBpcyBub3QgY29uZmlndXJlZCB3aXRoIFNTTyBjcmVkZW50aWFscy5gKTtcbiAgfVxuICBpZiAoIXN0YXJ0VXJsIHx8ICFhY2NvdW50SWQgfHwgIXJlZ2lvbiB8fCAhcm9sZU5hbWUpIHtcbiAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgIGBQcm9maWxlICR7cHJvZmlsZU5hbWV9IGRvZXMgbm90IGhhdmUgdmFsaWQgU1NPIGNyZWRlbnRpYWxzLiBSZXF1aXJlZCBwYXJhbWV0ZXJzIFwic3NvX2FjY291bnRfaWRcIiwgXCJzc29fcmVnaW9uXCIsIGAgK1xuICAgICAgICBgXCJzc29fcm9sZV9uYW1lXCIsIFwic3NvX3N0YXJ0X3VybFwiLiBSZWZlcmVuY2U6IGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9jbGkvbGF0ZXN0L3VzZXJndWlkZS9jbGktY29uZmlndXJlLXNzby5odG1sYCxcbiAgICAgIFNIT1VMRF9GQUlMX0NSRURFTlRJQUxfQ0hBSU5cbiAgICApO1xuICB9XG4gIGNvbnN0IGhhc2hlciA9IGNyZWF0ZUhhc2goXCJzaGExXCIpO1xuICBjb25zdCBjYWNoZU5hbWUgPSBoYXNoZXIudXBkYXRlKHN0YXJ0VXJsKS5kaWdlc3QoXCJoZXhcIik7XG4gIGNvbnN0IHRva2VuRmlsZSA9IGpvaW4oZ2V0SG9tZURpcigpLCBcIi5hd3NcIiwgXCJzc29cIiwgXCJjYWNoZVwiLCBgJHtjYWNoZU5hbWV9Lmpzb25gKTtcbiAgbGV0IHRva2VuOiBTU09Ub2tlbjtcbiAgdHJ5IHtcbiAgICB0b2tlbiA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKHRva2VuRmlsZSwgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0pKTtcbiAgICBpZiAobmV3IERhdGUodG9rZW4uZXhwaXJlc0F0KS5nZXRUaW1lKCkgLSBEYXRlLm5vdygpIDw9IEVYUElSRV9XSU5ET1dfTVMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNTTyB0b2tlbiBpcyBleHBpcmVkLlwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgIGBUaGUgU1NPIHNlc3Npb24gYXNzb2NpYXRlZCB3aXRoIHRoaXMgcHJvZmlsZSBoYXMgZXhwaXJlZCBvciBpcyBvdGhlcndpc2UgaW52YWxpZC4gVG8gcmVmcmVzaCB0aGlzIFNTTyBzZXNzaW9uIGAgK1xuICAgICAgICBgcnVuIGF3cyBzc28gbG9naW4gd2l0aCB0aGUgY29ycmVzcG9uZGluZyBwcm9maWxlLmAsXG4gICAgICBTSE9VTERfRkFJTF9DUkVERU5USUFMX0NIQUlOXG4gICAgKTtcbiAgfVxuICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSB0b2tlbjtcbiAgY29uc3Qgc3NvID0gb3B0aW9ucy5zc29DbGllbnQgfHwgbmV3IFNTT0NsaWVudCh7IHJlZ2lvbiB9KTtcbiAgbGV0IHNzb1Jlc3A6IEdldFJvbGVDcmVkZW50aWFsc0NvbW1hbmRPdXRwdXQ7XG4gIHRyeSB7XG4gICAgc3NvUmVzcCA9IGF3YWl0IHNzby5zZW5kKFxuICAgICAgbmV3IEdldFJvbGVDcmVkZW50aWFsc0NvbW1hbmQoe1xuICAgICAgICBhY2NvdW50SWQsXG4gICAgICAgIHJvbGVOYW1lLFxuICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IFByb3ZpZGVyRXJyb3IuZnJvbShlLCBTSE9VTERfRkFJTF9DUkVERU5USUFMX0NIQUlOKTtcbiAgfVxuICBjb25zdCB7IHJvbGVDcmVkZW50aWFsczogeyBhY2Nlc3NLZXlJZCwgc2VjcmV0QWNjZXNzS2V5LCBzZXNzaW9uVG9rZW4sIGV4cGlyYXRpb24gfSA9IHt9IH0gPSBzc29SZXNwO1xuICBpZiAoIWFjY2Vzc0tleUlkIHx8ICFzZWNyZXRBY2Nlc3NLZXkgfHwgIXNlc3Npb25Ub2tlbiB8fCAhZXhwaXJhdGlvbikge1xuICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFwiU1NPIHJldHVybnMgYW4gaW52YWxpZCB0ZW1wb3JhcnkgY3JlZGVudGlhbC5cIiwgU0hPVUxEX0ZBSUxfQ1JFREVOVElBTF9DSEFJTik7XG4gIH1cbiAgcmV0dXJuIHsgYWNjZXNzS2V5SWQsIHNlY3JldEFjY2Vzc0tleSwgc2Vzc2lvblRva2VuLCBleHBpcmF0aW9uOiBuZXcgRGF0ZShleHBpcmF0aW9uKSB9O1xufTtcbiJdfQ==