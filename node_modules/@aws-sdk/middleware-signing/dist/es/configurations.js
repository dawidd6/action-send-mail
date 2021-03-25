import { __assign, __awaiter, __generator, __read } from "tslib";
import { memoize } from "@aws-sdk/property-provider";
import { SignatureV4 } from "@aws-sdk/signature-v4";
// 5 minutes buffer time the refresh the credential before it really expires
var CREDENTIAL_EXPIRE_WINDOW = 300000;
export var resolveAwsAuthConfig = function (input) {
    var normalizedCreds = input.credentials
        ? normalizeCredentialProvider(input.credentials)
        : input.credentialDefaultProvider(input);
    var _a = input.signingEscapePath, signingEscapePath = _a === void 0 ? true : _a, _b = input.systemClockOffset, systemClockOffset = _b === void 0 ? input.systemClockOffset || 0 : _b, sha256 = input.sha256;
    var signer;
    if (input.signer) {
        //if signer is supplied by user, normalize it to a function returning a promise for signer.
        signer = normalizeProvider(input.signer);
    }
    else {
        //construct a provider inferring signing from region.
        signer = function () {
            return normalizeProvider(input.region)()
                .then(function (region) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, input.regionInfoProvider(region)];
                    case 1: return [2 /*return*/, [(_a.sent()) || {}, region]];
                }
            }); }); })
                .then(function (_a) {
                var _b = __read(_a, 2), regionInfo = _b[0], region = _b[1];
                var signingRegion = regionInfo.signingRegion, signingService = regionInfo.signingService;
                //update client's singing region and signing service config if they are resolved.
                //signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
                input.signingRegion = input.signingRegion || signingRegion || region;
                //signing name resolving order:
                //user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
                input.signingName = input.signingName || signingService || input.serviceId;
                return new SignatureV4({
                    credentials: normalizedCreds,
                    region: input.signingRegion,
                    service: input.signingName,
                    sha256: sha256,
                    uriEscapePath: signingEscapePath,
                });
            });
        };
    }
    return __assign(__assign({}, input), { systemClockOffset: systemClockOffset,
        signingEscapePath: signingEscapePath, credentials: normalizedCreds, signer: signer });
};
var normalizeProvider = function (input) {
    if (typeof input === "object") {
        var promisified_1 = Promise.resolve(input);
        return function () { return promisified_1; };
    }
    return input;
};
var normalizeCredentialProvider = function (credentials) {
    if (typeof credentials === "function") {
        return memoize(credentials, function (credentials) {
            return credentials.expiration !== undefined &&
                credentials.expiration.getTime() - Date.now() < CREDENTIAL_EXPIRE_WINDOW;
        }, function (credentials) { return credentials.expiration !== undefined; });
    }
    return normalizeProvider(credentials);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlndXJhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHcEQsNEVBQTRFO0FBQzVFLElBQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDO0FBNEN4QyxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxVQUNsQyxLQUFrRDtJQUVsRCxJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsV0FBVztRQUN2QyxDQUFDLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNoRCxDQUFDLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLEtBQVksQ0FBQyxDQUFDO0lBQzFDLElBQUEsS0FBdUYsS0FBSyxrQkFBcEUsRUFBeEIsaUJBQWlCLG1CQUFHLElBQUksS0FBQSxFQUFFLEtBQTZELEtBQUssa0JBQWxCLEVBQWhELGlCQUFpQixtQkFBRyxLQUFLLENBQUMsaUJBQWlCLElBQUksQ0FBQyxLQUFBLEVBQUUsTUFBTSxHQUFLLEtBQUssT0FBVixDQUFXO0lBQ3JHLElBQUksTUFBK0IsQ0FBQztJQUNwQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDaEIsMkZBQTJGO1FBQzNGLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUM7U0FBTTtRQUNMLHFEQUFxRDtRQUNyRCxNQUFNLEdBQUc7WUFDUCxPQUFBLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtpQkFDOUIsSUFBSSxDQUFDLFVBQU8sTUFBTTs7NEJBQU8scUJBQU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFBOzRCQUF4QyxzQkFBQSxDQUFDLENBQUMsU0FBc0MsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQXlCLEVBQUE7O3FCQUFBLENBQUM7aUJBQ3hHLElBQUksQ0FBQyxVQUFDLEVBQW9CO29CQUFwQixLQUFBLGFBQW9CLEVBQW5CLFVBQVUsUUFBQSxFQUFFLE1BQU0sUUFBQTtnQkFDaEIsSUFBQSxhQUFhLEdBQXFCLFVBQVUsY0FBL0IsRUFBRSxjQUFjLEdBQUssVUFBVSxlQUFmLENBQWdCO2dCQUNyRCxpRkFBaUY7Z0JBQ2pGLGdIQUFnSDtnQkFDaEgsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxJQUFJLGFBQWEsSUFBSSxNQUFNLENBQUM7Z0JBQ3JFLCtCQUErQjtnQkFDL0IsbUhBQW1IO2dCQUNuSCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLElBQUksY0FBYyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUM7Z0JBRTNFLE9BQU8sSUFBSSxXQUFXLENBQUM7b0JBQ3JCLFdBQVcsRUFBRSxlQUFlO29CQUM1QixNQUFNLEVBQUUsS0FBSyxDQUFDLGFBQWE7b0JBQzNCLE9BQU8sRUFBRSxLQUFLLENBQUMsV0FBVztvQkFDMUIsTUFBTSxRQUFBO29CQUNOLGFBQWEsRUFBRSxpQkFBaUI7aUJBQ2pDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztRQWxCSixDQWtCSSxDQUFDO0tBQ1I7SUFFRCw2QkFDSyxLQUFLLEtBQ1IsaUJBQWlCLG1CQUFBO1FBQ2pCLGlCQUFpQixtQkFBQSxFQUNqQixXQUFXLEVBQUUsZUFBZSxFQUM1QixNQUFNLFFBQUEsSUFDTjtBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0saUJBQWlCLEdBQUcsVUFBSSxLQUFzQjtJQUNsRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QixJQUFNLGFBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE9BQU8sY0FBTSxPQUFBLGFBQVcsRUFBWCxDQUFXLENBQUM7S0FDMUI7SUFDRCxPQUFPLEtBQW9CLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsSUFBTSwyQkFBMkIsR0FBRyxVQUFDLFdBQWdEO0lBQ25GLElBQUksT0FBTyxXQUFXLEtBQUssVUFBVSxFQUFFO1FBQ3JDLE9BQU8sT0FBTyxDQUNaLFdBQVcsRUFDWCxVQUFDLFdBQVc7WUFDVixPQUFBLFdBQVcsQ0FBQyxVQUFVLEtBQUssU0FBUztnQkFDcEMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsd0JBQXdCO1FBRHhFLENBQ3dFLEVBQzFFLFVBQUMsV0FBVyxJQUFLLE9BQUEsV0FBVyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQXBDLENBQW9DLENBQ3RELENBQUM7S0FDSDtJQUNELE9BQU8saUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWVtb2l6ZSB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHsgU2lnbmF0dXJlVjQgfSBmcm9tIFwiQGF3cy1zZGsvc2lnbmF0dXJlLXY0XCI7XG5pbXBvcnQgeyBDcmVkZW50aWFscywgSGFzaENvbnN0cnVjdG9yLCBQcm92aWRlciwgUmVnaW9uSW5mbywgUmVnaW9uSW5mb1Byb3ZpZGVyLCBSZXF1ZXN0U2lnbmVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbi8vIDUgbWludXRlcyBidWZmZXIgdGltZSB0aGUgcmVmcmVzaCB0aGUgY3JlZGVudGlhbCBiZWZvcmUgaXQgcmVhbGx5IGV4cGlyZXNcbmNvbnN0IENSRURFTlRJQUxfRVhQSVJFX1dJTkRPVyA9IDMwMDAwMDtcblxuZXhwb3J0IGludGVyZmFjZSBBd3NBdXRoSW5wdXRDb25maWcge1xuICAvKipcbiAgICogVGhlIGNyZWRlbnRpYWxzIHVzZWQgdG8gc2lnbiByZXF1ZXN0cy5cbiAgICovXG4gIGNyZWRlbnRpYWxzPzogQ3JlZGVudGlhbHMgfCBQcm92aWRlcjxDcmVkZW50aWFscz47XG5cbiAgLyoqXG4gICAqIFRoZSBzaWduZXIgdG8gdXNlIHdoZW4gc2lnbmluZyByZXF1ZXN0cy5cbiAgICovXG4gIHNpZ25lcj86IFJlcXVlc3RTaWduZXIgfCBQcm92aWRlcjxSZXF1ZXN0U2lnbmVyPjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBlc2NhcGUgcmVxdWVzdCBwYXRoIHdoZW4gc2lnbmluZyB0aGUgcmVxdWVzdC5cbiAgICovXG4gIHNpZ25pbmdFc2NhcGVQYXRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gb2Zmc2V0IHZhbHVlIGluIG1pbGxpc2Vjb25kcyB0byBhcHBseSB0byBhbGwgc2lnbmluZyB0aW1lcy5cbiAgICovXG4gIHN5c3RlbUNsb2NrT2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVnaW9uIHdoZXJlIHlvdSB3YW50IHRvIHNpZ24geW91ciByZXF1ZXN0IGFnYWluc3QuIFRoaXNcbiAgICogY2FuIGJlIGRpZmZlcmVudCB0byB0aGUgcmVnaW9uIGluIHRoZSBlbmRwb2ludC5cbiAgICovXG4gIHNpZ25pbmdSZWdpb24/OiBzdHJpbmc7XG59XG5pbnRlcmZhY2UgUHJldmlvdXNseVJlc29sdmVkIHtcbiAgY3JlZGVudGlhbERlZmF1bHRQcm92aWRlcjogKGlucHV0OiBhbnkpID0+IFByb3ZpZGVyPENyZWRlbnRpYWxzPjtcbiAgcmVnaW9uOiBzdHJpbmcgfCBQcm92aWRlcjxzdHJpbmc+O1xuICByZWdpb25JbmZvUHJvdmlkZXI6IFJlZ2lvbkluZm9Qcm92aWRlcjtcbiAgc2lnbmluZ05hbWU/OiBzdHJpbmc7XG4gIHNlcnZpY2VJZDogc3RyaW5nO1xuICBzaGEyNTY6IEhhc2hDb25zdHJ1Y3Rvcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQXdzQXV0aFJlc29sdmVkQ29uZmlnIHtcbiAgY3JlZGVudGlhbHM6IFByb3ZpZGVyPENyZWRlbnRpYWxzPjtcbiAgc2lnbmVyOiBQcm92aWRlcjxSZXF1ZXN0U2lnbmVyPjtcbiAgc2lnbmluZ0VzY2FwZVBhdGg6IGJvb2xlYW47XG4gIHN5c3RlbUNsb2NrT2Zmc2V0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlQXdzQXV0aENvbmZpZyA9IDxUPihcbiAgaW5wdXQ6IFQgJiBBd3NBdXRoSW5wdXRDb25maWcgJiBQcmV2aW91c2x5UmVzb2x2ZWRcbik6IFQgJiBBd3NBdXRoUmVzb2x2ZWRDb25maWcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ3JlZHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgID8gbm9ybWFsaXplQ3JlZGVudGlhbFByb3ZpZGVyKGlucHV0LmNyZWRlbnRpYWxzKVxuICAgIDogaW5wdXQuY3JlZGVudGlhbERlZmF1bHRQcm92aWRlcihpbnB1dCBhcyBhbnkpO1xuICBjb25zdCB7IHNpZ25pbmdFc2NhcGVQYXRoID0gdHJ1ZSwgc3lzdGVtQ2xvY2tPZmZzZXQgPSBpbnB1dC5zeXN0ZW1DbG9ja09mZnNldCB8fCAwLCBzaGEyNTYgfSA9IGlucHV0O1xuICBsZXQgc2lnbmVyOiBQcm92aWRlcjxSZXF1ZXN0U2lnbmVyPjtcbiAgaWYgKGlucHV0LnNpZ25lcikge1xuICAgIC8vaWYgc2lnbmVyIGlzIHN1cHBsaWVkIGJ5IHVzZXIsIG5vcm1hbGl6ZSBpdCB0byBhIGZ1bmN0aW9uIHJldHVybmluZyBhIHByb21pc2UgZm9yIHNpZ25lci5cbiAgICBzaWduZXIgPSBub3JtYWxpemVQcm92aWRlcihpbnB1dC5zaWduZXIpO1xuICB9IGVsc2Uge1xuICAgIC8vY29uc3RydWN0IGEgcHJvdmlkZXIgaW5mZXJyaW5nIHNpZ25pbmcgZnJvbSByZWdpb24uXG4gICAgc2lnbmVyID0gKCkgPT5cbiAgICAgIG5vcm1hbGl6ZVByb3ZpZGVyKGlucHV0LnJlZ2lvbikoKVxuICAgICAgICAudGhlbihhc3luYyAocmVnaW9uKSA9PiBbKGF3YWl0IGlucHV0LnJlZ2lvbkluZm9Qcm92aWRlcihyZWdpb24pKSB8fCB7fSwgcmVnaW9uXSBhcyBbUmVnaW9uSW5mbywgc3RyaW5nXSlcbiAgICAgICAgLnRoZW4oKFtyZWdpb25JbmZvLCByZWdpb25dKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBzaWduaW5nUmVnaW9uLCBzaWduaW5nU2VydmljZSB9ID0gcmVnaW9uSW5mbztcbiAgICAgICAgICAvL3VwZGF0ZSBjbGllbnQncyBzaW5naW5nIHJlZ2lvbiBhbmQgc2lnbmluZyBzZXJ2aWNlIGNvbmZpZyBpZiB0aGV5IGFyZSByZXNvbHZlZC5cbiAgICAgICAgICAvL3NpZ25pbmcgcmVnaW9uIHJlc29sdmluZyBvcmRlcjogdXNlciBzdXBwbGllZCBzaWduaW5nUmVnaW9uIC0+IGVuZHBvaW50cy5qc29uIGluZmVycmVkIHJlZ2lvbiAtPiBjbGllbnQgcmVnaW9uXG4gICAgICAgICAgaW5wdXQuc2lnbmluZ1JlZ2lvbiA9IGlucHV0LnNpZ25pbmdSZWdpb24gfHwgc2lnbmluZ1JlZ2lvbiB8fCByZWdpb247XG4gICAgICAgICAgLy9zaWduaW5nIG5hbWUgcmVzb2x2aW5nIG9yZGVyOlxuICAgICAgICAgIC8vdXNlciBzdXBwbGllZCBzaWduaW5nTmFtZSAtPiBlbmRwb2ludHMuanNvbiBpbmZlcnJlZCAoY3JlZGVudGlhbCBzY29wZSAtPiBtb2RlbCBhcm5OYW1lc3BhY2UpIC0+IG1vZGVsIHNlcnZpY2UgaWRcbiAgICAgICAgICBpbnB1dC5zaWduaW5nTmFtZSA9IGlucHV0LnNpZ25pbmdOYW1lIHx8IHNpZ25pbmdTZXJ2aWNlIHx8IGlucHV0LnNlcnZpY2VJZDtcblxuICAgICAgICAgIHJldHVybiBuZXcgU2lnbmF0dXJlVjQoe1xuICAgICAgICAgICAgY3JlZGVudGlhbHM6IG5vcm1hbGl6ZWRDcmVkcyxcbiAgICAgICAgICAgIHJlZ2lvbjogaW5wdXQuc2lnbmluZ1JlZ2lvbixcbiAgICAgICAgICAgIHNlcnZpY2U6IGlucHV0LnNpZ25pbmdOYW1lLFxuICAgICAgICAgICAgc2hhMjU2LFxuICAgICAgICAgICAgdXJpRXNjYXBlUGF0aDogc2lnbmluZ0VzY2FwZVBhdGgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pbnB1dCxcbiAgICBzeXN0ZW1DbG9ja09mZnNldCxcbiAgICBzaWduaW5nRXNjYXBlUGF0aCxcbiAgICBjcmVkZW50aWFsczogbm9ybWFsaXplZENyZWRzLFxuICAgIHNpZ25lcixcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVByb3ZpZGVyID0gPFQ+KGlucHV0OiBUIHwgUHJvdmlkZXI8VD4pOiBQcm92aWRlcjxUPiA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCBwcm9taXNpZmllZCA9IFByb21pc2UucmVzb2x2ZShpbnB1dCk7XG4gICAgcmV0dXJuICgpID0+IHByb21pc2lmaWVkO1xuICB9XG4gIHJldHVybiBpbnB1dCBhcyBQcm92aWRlcjxUPjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUNyZWRlbnRpYWxQcm92aWRlciA9IChjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgfCBQcm92aWRlcjxDcmVkZW50aWFscz4pOiBQcm92aWRlcjxDcmVkZW50aWFscz4gPT4ge1xuICBpZiAodHlwZW9mIGNyZWRlbnRpYWxzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gbWVtb2l6ZShcbiAgICAgIGNyZWRlbnRpYWxzLFxuICAgICAgKGNyZWRlbnRpYWxzKSA9PlxuICAgICAgICBjcmVkZW50aWFscy5leHBpcmF0aW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgY3JlZGVudGlhbHMuZXhwaXJhdGlvbi5nZXRUaW1lKCkgLSBEYXRlLm5vdygpIDwgQ1JFREVOVElBTF9FWFBJUkVfV0lORE9XLFxuICAgICAgKGNyZWRlbnRpYWxzKSA9PiBjcmVkZW50aWFscy5leHBpcmF0aW9uICE9PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG4gIHJldHVybiBub3JtYWxpemVQcm92aWRlcihjcmVkZW50aWFscyk7XG59O1xuIl19