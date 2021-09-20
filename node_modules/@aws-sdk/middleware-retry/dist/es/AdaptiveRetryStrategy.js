import { __awaiter, __extends, __generator, __rest } from "tslib";
import { RETRY_MODES } from "./config";
import { DefaultRateLimiter } from "./DefaultRateLimiter";
import { StandardRetryStrategy } from "./StandardRetryStrategy";
var AdaptiveRetryStrategy = /** @class */ (function (_super) {
    __extends(AdaptiveRetryStrategy, _super);
    function AdaptiveRetryStrategy(maxAttemptsProvider, options) {
        var _this = this;
        var _a = options !== null && options !== void 0 ? options : {}, rateLimiter = _a.rateLimiter, superOptions = __rest(_a, ["rateLimiter"]);
        _this = _super.call(this, maxAttemptsProvider, superOptions) || this;
        _this.rateLimiter = rateLimiter !== null && rateLimiter !== void 0 ? rateLimiter : new DefaultRateLimiter();
        _this.mode = RETRY_MODES.ADAPTIVE;
        return _this;
    }
    AdaptiveRetryStrategy.prototype.retry = function (next, args) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.retry.call(this, next, args, {
                        beforeRequest: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, this.rateLimiter.getSendToken()];
                            });
                        }); },
                        afterRequest: function (response) {
                            _this.rateLimiter.updateClientSendingRate(response);
                        },
                    })];
            });
        });
    };
    return AdaptiveRetryStrategy;
}(StandardRetryStrategy));
export { AdaptiveRetryStrategy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRhcHRpdmVSZXRyeVN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FkYXB0aXZlUmV0cnlTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQWdDLE1BQU0seUJBQXlCLENBQUM7QUFVOUY7SUFBMkMseUNBQXFCO0lBRzlELCtCQUFZLG1CQUFxQyxFQUFFLE9BQXNDO1FBQXpGLGlCQUtDO1FBSkMsSUFBTSxLQUFtQyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxFQUFFLEVBQTlDLFdBQVcsaUJBQUEsRUFBSyxZQUFZLGNBQTlCLGVBQWdDLENBQWdCLENBQUM7UUFDdkQsUUFBQSxrQkFBTSxtQkFBbUIsRUFBRSxZQUFZLENBQUMsU0FBQztRQUN6QyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsYUFBWCxXQUFXLGNBQVgsV0FBVyxHQUFJLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUMzRCxLQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7O0lBQ25DLENBQUM7SUFFSyxxQ0FBSyxHQUFYLFVBQ0UsSUFBbUMsRUFDbkMsSUFBcUM7Ozs7Z0JBRXJDLHNCQUFPLGlCQUFNLEtBQUssWUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO3dCQUM3QixhQUFhLEVBQUU7O2dDQUNiLHNCQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUM7OzZCQUN4Qzt3QkFDRCxZQUFZLEVBQUUsVUFBQyxRQUFhOzRCQUMxQixLQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNyRCxDQUFDO3FCQUNGLENBQUMsRUFBQzs7O0tBQ0o7SUFDSCw0QkFBQztBQUFELENBQUMsQUF2QkQsQ0FBMkMscUJBQXFCLEdBdUIvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbmFsaXplSGFuZGxlciwgRmluYWxpemVIYW5kbGVyQXJndW1lbnRzLCBNZXRhZGF0YUJlYXJlciwgUHJvdmlkZXIgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuaW1wb3J0IHsgUkVUUllfTU9ERVMgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IERlZmF1bHRSYXRlTGltaXRlciB9IGZyb20gXCIuL0RlZmF1bHRSYXRlTGltaXRlclwiO1xuaW1wb3J0IHsgU3RhbmRhcmRSZXRyeVN0cmF0ZWd5LCBTdGFuZGFyZFJldHJ5U3RyYXRlZ3lPcHRpb25zIH0gZnJvbSBcIi4vU3RhbmRhcmRSZXRyeVN0cmF0ZWd5XCI7XG5pbXBvcnQgeyBSYXRlTGltaXRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICogU3RyYXRlZ3kgb3B0aW9ucyB0byBiZSBwYXNzZWQgdG8gQWRhcHRpdmVSZXRyeVN0cmF0ZWd5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWRhcHRpdmVSZXRyeVN0cmF0ZWd5T3B0aW9ucyBleHRlbmRzIFN0YW5kYXJkUmV0cnlTdHJhdGVneU9wdGlvbnMge1xuICByYXRlTGltaXRlcj86IFJhdGVMaW1pdGVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRhcHRpdmVSZXRyeVN0cmF0ZWd5IGV4dGVuZHMgU3RhbmRhcmRSZXRyeVN0cmF0ZWd5IHtcbiAgcHJpdmF0ZSByYXRlTGltaXRlcjogUmF0ZUxpbWl0ZXI7XG5cbiAgY29uc3RydWN0b3IobWF4QXR0ZW1wdHNQcm92aWRlcjogUHJvdmlkZXI8bnVtYmVyPiwgb3B0aW9ucz86IEFkYXB0aXZlUmV0cnlTdHJhdGVneU9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHJhdGVMaW1pdGVyLCAuLi5zdXBlck9wdGlvbnMgfSA9IG9wdGlvbnMgPz8ge307XG4gICAgc3VwZXIobWF4QXR0ZW1wdHNQcm92aWRlciwgc3VwZXJPcHRpb25zKTtcbiAgICB0aGlzLnJhdGVMaW1pdGVyID0gcmF0ZUxpbWl0ZXIgPz8gbmV3IERlZmF1bHRSYXRlTGltaXRlcigpO1xuICAgIHRoaXMubW9kZSA9IFJFVFJZX01PREVTLkFEQVBUSVZFO1xuICB9XG5cbiAgYXN5bmMgcmV0cnk8SW5wdXQgZXh0ZW5kcyBvYmplY3QsIE91cHV0IGV4dGVuZHMgTWV0YWRhdGFCZWFyZXI+KFxuICAgIG5leHQ6IEZpbmFsaXplSGFuZGxlcjxJbnB1dCwgT3VwdXQ+LFxuICAgIGFyZ3M6IEZpbmFsaXplSGFuZGxlckFyZ3VtZW50czxJbnB1dD5cbiAgKSB7XG4gICAgcmV0dXJuIHN1cGVyLnJldHJ5KG5leHQsIGFyZ3MsIHtcbiAgICAgIGJlZm9yZVJlcXVlc3Q6IGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF0ZUxpbWl0ZXIuZ2V0U2VuZFRva2VuKCk7XG4gICAgICB9LFxuICAgICAgYWZ0ZXJSZXF1ZXN0OiAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnJhdGVMaW1pdGVyLnVwZGF0ZUNsaWVudFNlbmRpbmdSYXRlKHJlc3BvbnNlKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==