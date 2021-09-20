import { __awaiter, __generator, __read, __spreadArray } from "tslib";
import { loadConfig } from "@aws-sdk/node-config-provider";
import { platform, release } from "os";
import { env, versions } from "process";
export var UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
export var UA_APP_ID_INI_NAME = "sdk-ua-app-id";
/**
 * Collect metrics from runtime to put into user agent.
 */
export var defaultUserAgent = function (_a) {
    var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
    var sections = [
        // sdk-metadata
        ["aws-sdk-js", clientVersion],
        // os-metadata
        ["os/" + platform(), release()],
        // language-metadata
        // ECMAScript edition doesn't matter in JS, so no version needed.
        ["lang/js"],
        ["md/nodejs", "" + versions.node],
    ];
    if (serviceId) {
        // api-metadata
        // service Id may not appear in non-AWS clients
        sections.push(["api/" + serviceId, clientVersion]);
    }
    if (env.AWS_EXECUTION_ENV) {
        // env-metadata
        sections.push(["exec-env/" + env.AWS_EXECUTION_ENV]);
    }
    var appIdPromise = loadConfig({
        environmentVariableSelector: function (env) { return env[UA_APP_ID_ENV_NAME]; },
        configFileSelector: function (profile) { return profile[UA_APP_ID_INI_NAME]; },
        default: undefined,
    })();
    var resolvedUserAgent = undefined;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var appId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!resolvedUserAgent) return [3 /*break*/, 2];
                    return [4 /*yield*/, appIdPromise];
                case 1:
                    appId = _a.sent();
                    resolvedUserAgent = appId ? __spreadArray(__spreadArray([], __read(sections)), [["app/" + appId]]) : __spreadArray([], __read(sections));
                    _a.label = 2;
                case 2: return [2 /*return*/, resolvedUserAgent];
            }
        });
    }); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV4QyxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztBQUN0RCxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyxlQUFlLENBQUM7QUFPbEQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEVBQXFEO1FBQW5ELFNBQVMsZUFBQSxFQUFFLGFBQWEsbUJBQUE7SUFDekQsSUFBTSxRQUFRLEdBQWM7UUFDMUIsZUFBZTtRQUNmLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztRQUM3QixjQUFjO1FBQ2QsQ0FBQyxRQUFNLFFBQVEsRUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQy9CLG9CQUFvQjtRQUNwQixpRUFBaUU7UUFDakUsQ0FBQyxTQUFTLENBQUM7UUFDWCxDQUFDLFdBQVcsRUFBRSxLQUFHLFFBQVEsQ0FBQyxJQUFNLENBQUM7S0FDbEMsQ0FBQztJQUVGLElBQUksU0FBUyxFQUFFO1FBQ2IsZUFBZTtRQUNmLCtDQUErQztRQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBTyxTQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUVELElBQUksR0FBRyxDQUFDLGlCQUFpQixFQUFFO1FBQ3pCLGVBQWU7UUFDZixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBWSxHQUFHLENBQUMsaUJBQW1CLENBQUMsQ0FBQyxDQUFDO0tBQ3REO0lBRUQsSUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFxQjtRQUNsRCwyQkFBMkIsRUFBRSxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUF2QixDQUF1QjtRQUM3RCxrQkFBa0IsRUFBRSxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUEzQixDQUEyQjtRQUM1RCxPQUFPLEVBQUUsU0FBUztLQUNuQixDQUFDLEVBQUUsQ0FBQztJQUVMLElBQUksaUJBQWlCLEdBQTBCLFNBQVMsQ0FBQztJQUN6RCxPQUFPOzs7Ozt5QkFDRCxDQUFDLGlCQUFpQixFQUFsQix3QkFBa0I7b0JBQ04scUJBQU0sWUFBWSxFQUFBOztvQkFBMUIsS0FBSyxHQUFHLFNBQWtCO29CQUNoQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsQ0FBQyx3Q0FBSyxRQUFRLEtBQUUsQ0FBQyxTQUFPLEtBQU8sQ0FBQyxHQUFFLENBQUMsMEJBQUssUUFBUSxFQUFDLENBQUM7O3dCQUU5RSxzQkFBTyxpQkFBaUIsRUFBQzs7O1NBQzFCLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2FkQ29uZmlnIH0gZnJvbSBcIkBhd3Mtc2RrL25vZGUtY29uZmlnLXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBQcm92aWRlciwgVXNlckFnZW50IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBwbGF0Zm9ybSwgcmVsZWFzZSB9IGZyb20gXCJvc1wiO1xuaW1wb3J0IHsgZW52LCB2ZXJzaW9ucyB9IGZyb20gXCJwcm9jZXNzXCI7XG5cbmV4cG9ydCBjb25zdCBVQV9BUFBfSURfRU5WX05BTUUgPSBcIkFXU19TREtfVUFfQVBQX0lEXCI7XG5leHBvcnQgY29uc3QgVUFfQVBQX0lEX0lOSV9OQU1FID0gXCJzZGstdWEtYXBwLWlkXCI7XG5cbmludGVyZmFjZSBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyB7XG4gIHNlcnZpY2VJZD86IHN0cmluZztcbiAgY2xpZW50VmVyc2lvbjogc3RyaW5nO1xufVxuXG4vKipcbiAqIENvbGxlY3QgbWV0cmljcyBmcm9tIHJ1bnRpbWUgdG8gcHV0IGludG8gdXNlciBhZ2VudC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRVc2VyQWdlbnQgPSAoeyBzZXJ2aWNlSWQsIGNsaWVudFZlcnNpb24gfTogRGVmYXVsdFVzZXJBZ2VudE9wdGlvbnMpOiBQcm92aWRlcjxVc2VyQWdlbnQ+ID0+IHtcbiAgY29uc3Qgc2VjdGlvbnM6IFVzZXJBZ2VudCA9IFtcbiAgICAvLyBzZGstbWV0YWRhdGFcbiAgICBbXCJhd3Mtc2RrLWpzXCIsIGNsaWVudFZlcnNpb25dLFxuICAgIC8vIG9zLW1ldGFkYXRhXG4gICAgW2Bvcy8ke3BsYXRmb3JtKCl9YCwgcmVsZWFzZSgpXSxcbiAgICAvLyBsYW5ndWFnZS1tZXRhZGF0YVxuICAgIC8vIEVDTUFTY3JpcHQgZWRpdGlvbiBkb2Vzbid0IG1hdHRlciBpbiBKUywgc28gbm8gdmVyc2lvbiBuZWVkZWQuXG4gICAgW1wibGFuZy9qc1wiXSxcbiAgICBbXCJtZC9ub2RlanNcIiwgYCR7dmVyc2lvbnMubm9kZX1gXSxcbiAgXTtcblxuICBpZiAoc2VydmljZUlkKSB7XG4gICAgLy8gYXBpLW1ldGFkYXRhXG4gICAgLy8gc2VydmljZSBJZCBtYXkgbm90IGFwcGVhciBpbiBub24tQVdTIGNsaWVudHNcbiAgICBzZWN0aW9ucy5wdXNoKFtgYXBpLyR7c2VydmljZUlkfWAsIGNsaWVudFZlcnNpb25dKTtcbiAgfVxuXG4gIGlmIChlbnYuQVdTX0VYRUNVVElPTl9FTlYpIHtcbiAgICAvLyBlbnYtbWV0YWRhdGFcbiAgICBzZWN0aW9ucy5wdXNoKFtgZXhlYy1lbnYvJHtlbnYuQVdTX0VYRUNVVElPTl9FTlZ9YF0pO1xuICB9XG5cbiAgY29uc3QgYXBwSWRQcm9taXNlID0gbG9hZENvbmZpZzxzdHJpbmcgfCB1bmRlZmluZWQ+KHtcbiAgICBlbnZpcm9ubWVudFZhcmlhYmxlU2VsZWN0b3I6IChlbnYpID0+IGVudltVQV9BUFBfSURfRU5WX05BTUVdLFxuICAgIGNvbmZpZ0ZpbGVTZWxlY3RvcjogKHByb2ZpbGUpID0+IHByb2ZpbGVbVUFfQVBQX0lEX0lOSV9OQU1FXSxcbiAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gIH0pKCk7XG5cbiAgbGV0IHJlc29sdmVkVXNlckFnZW50OiBVc2VyQWdlbnQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHJldHVybiBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFyZXNvbHZlZFVzZXJBZ2VudCkge1xuICAgICAgY29uc3QgYXBwSWQgPSBhd2FpdCBhcHBJZFByb21pc2U7XG4gICAgICByZXNvbHZlZFVzZXJBZ2VudCA9IGFwcElkID8gWy4uLnNlY3Rpb25zLCBbYGFwcC8ke2FwcElkfWBdXSA6IFsuLi5zZWN0aW9uc107XG4gICAgfVxuICAgIHJldHVybiByZXNvbHZlZFVzZXJBZ2VudDtcbiAgfTtcbn07XG4iXX0=