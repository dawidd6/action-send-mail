import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { SPACE, UA_ESCAPE_REGEX, USER_AGENT, X_AMZ_USER_AGENT } from "./constants";
/**
 * Build user agent header sections from:
 * 1. runtime-specific default user agent provider;
 * 2. custom user agent from `customUserAgent` client config;
 * 3. handler execution context set by internal SDK components;
 * The built user agent will be set to `x-amz-user-agent` header for ALL the
 * runtimes.
 * Please note that any override to the `user-agent` or `x-amz-user-agent` header
 * in the HTTP request is discouraged. Please use `customUserAgent` client
 * config or middleware setting the `userAgent` context to generate desired user
 * agent.
 */
export var userAgentMiddleware = function (options) {
    return function (next, context) {
        return function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var request, headers, userAgent, defaultUserAgent, customUserAgent, sdkUserAgentValue, normalUAValue;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        request = args.request;
                        if (!HttpRequest.isInstance(request))
                            return [2 /*return*/, next(args)];
                        headers = request.headers;
                        userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
                        return [4 /*yield*/, options.defaultUserAgentProvider()];
                    case 1:
                        defaultUserAgent = (_c.sent()).map(escapeUserAgent);
                        customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
                        sdkUserAgentValue = __spreadArray(__spreadArray(__spreadArray([], __read(defaultUserAgent)), __read(userAgent)), __read(customUserAgent)).join(SPACE);
                        normalUAValue = __spreadArray(__spreadArray([], __read(defaultUserAgent.filter(function (section) { return section.startsWith("aws-sdk-"); }))), __read(customUserAgent)).join(SPACE);
                        if (options.runtime !== "browser") {
                            if (normalUAValue) {
                                headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT]
                                    ? headers[USER_AGENT] + " " + normalUAValue
                                    : normalUAValue;
                            }
                            headers[USER_AGENT] = sdkUserAgentValue;
                        }
                        else {
                            headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
                        }
                        return [2 /*return*/, next(__assign(__assign({}, args), { request: request }))];
                }
            });
        }); };
    };
};
/**
 * Escape the each pair according to https://tools.ietf.org/html/rfc5234 and join the pair with pattern `name/version`.
 * User agent name may include prefix like `md/`, `api/`, `os/` etc., we should not escape the `/` after the prefix.
 * @private
 */
var escapeUserAgent = function (_a) {
    var _b = __read(_a, 2), name = _b[0], version = _b[1];
    var prefixSeparatorIndex = name.indexOf("/");
    var prefix = name.substring(0, prefixSeparatorIndex); // If no prefix, prefix is just ""
    var uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter(function (item) { return item && item.length > 0; })
        .map(function (item) { return item === null || item === void 0 ? void 0 : item.replace(UA_ESCAPE_REGEX, "_"); })
        .join("/");
};
export var getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
export var getUserAgentPlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXItYWdlbnQtbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBY3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuRjs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUM5QixVQUFDLE9BQWdDO0lBQ2pDLE9BQUEsVUFDRSxJQUE0QixFQUM1QixPQUFnQztRQUVsQyxPQUFBLFVBQU8sSUFBZ0M7Ozs7Ozt3QkFDN0IsT0FBTyxHQUFLLElBQUksUUFBVCxDQUFVO3dCQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7NEJBQUUsc0JBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO3dCQUNoRCxPQUFPLEdBQUssT0FBTyxRQUFaLENBQWE7d0JBQ3RCLFNBQVMsR0FBRyxDQUFBLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFNBQVMsMENBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFJLEVBQUUsQ0FBQzt3QkFDdkMscUJBQU0sT0FBTyxDQUFDLHdCQUF3QixFQUFFLEVBQUE7O3dCQUE1RCxnQkFBZ0IsR0FBRyxDQUFDLFNBQXdDLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO3dCQUNsRixlQUFlLEdBQUcsQ0FBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxlQUFlLDBDQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSSxFQUFFLENBQUM7d0JBR3ZFLGlCQUFpQixHQUFHLHFEQUFJLGdCQUFnQixXQUFLLFNBQVMsV0FBSyxlQUFlLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUV4RixhQUFhLEdBQUcsdUNBQ2pCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQTlCLENBQThCLENBQUMsV0FDcEUsZUFBZSxHQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRWQsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTs0QkFDakMsSUFBSSxhQUFhLEVBQUU7Z0NBQ2pCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztvQ0FDbkQsQ0FBQyxDQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBSSxhQUFlO29DQUMzQyxDQUFDLENBQUMsYUFBYSxDQUFDOzZCQUNuQjs0QkFDRCxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7eUJBQ3pDOzZCQUFNOzRCQUNMLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO3lCQUMvQzt3QkFFRCxzQkFBTyxJQUFJLHVCQUNOLElBQUksS0FDUCxPQUFPLFNBQUEsSUFDUCxFQUFDOzs7YUFDSjtJQS9CRCxDQStCQztBQW5DRCxDQW1DQyxDQUFDO0FBRUo7Ozs7R0FJRztBQUNILElBQU0sZUFBZSxHQUFHLFVBQUMsRUFBOEI7UUFBOUIsS0FBQSxhQUE4QixFQUE3QixJQUFJLFFBQUEsRUFBRSxPQUFPLFFBQUE7SUFDckMsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7SUFDMUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0RCxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDcEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMvQjtJQUNELE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztTQUM3QixNQUFNLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQXZCLENBQXVCLENBQUM7U0FDekMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLEVBQW5DLENBQW1DLENBQUM7U0FDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sNkJBQTZCLEdBQTJDO0lBQ25GLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsSUFBSSxFQUFFLE9BQU87SUFDYixRQUFRLEVBQUUsS0FBSztJQUNmLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQztJQUN0QyxRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLE1BQStCLElBQTBCLE9BQUEsQ0FBQztJQUMzRixZQUFZLEVBQUUsVUFBQyxXQUFXO1FBQ3hCLFdBQVcsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBQ0YsQ0FBQyxFQUowRixDQUkxRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFJlcXVlc3QgfSBmcm9tIFwiQGF3cy1zZGsvcHJvdG9jb2wtaHR0cFwiO1xuaW1wb3J0IHtcbiAgQWJzb2x1dGVMb2NhdGlvbixcbiAgQnVpbGRIYW5kbGVyLFxuICBCdWlsZEhhbmRsZXJBcmd1bWVudHMsXG4gIEJ1aWxkSGFuZGxlck9wdGlvbnMsXG4gIEJ1aWxkSGFuZGxlck91dHB1dCxcbiAgSGFuZGxlckV4ZWN1dGlvbkNvbnRleHQsXG4gIE1ldGFkYXRhQmVhcmVyLFxuICBQbHVnZ2FibGUsXG4gIFVzZXJBZ2VudFBhaXIsXG59IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBVc2VyQWdlbnRSZXNvbHZlZENvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb25zXCI7XG5pbXBvcnQgeyBTUEFDRSwgVUFfRVNDQVBFX1JFR0VYLCBVU0VSX0FHRU5ULCBYX0FNWl9VU0VSX0FHRU5UIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQnVpbGQgdXNlciBhZ2VudCBoZWFkZXIgc2VjdGlvbnMgZnJvbTpcbiAqIDEuIHJ1bnRpbWUtc3BlY2lmaWMgZGVmYXVsdCB1c2VyIGFnZW50IHByb3ZpZGVyO1xuICogMi4gY3VzdG9tIHVzZXIgYWdlbnQgZnJvbSBgY3VzdG9tVXNlckFnZW50YCBjbGllbnQgY29uZmlnO1xuICogMy4gaGFuZGxlciBleGVjdXRpb24gY29udGV4dCBzZXQgYnkgaW50ZXJuYWwgU0RLIGNvbXBvbmVudHM7XG4gKiBUaGUgYnVpbHQgdXNlciBhZ2VudCB3aWxsIGJlIHNldCB0byBgeC1hbXotdXNlci1hZ2VudGAgaGVhZGVyIGZvciBBTEwgdGhlXG4gKiBydW50aW1lcy5cbiAqIFBsZWFzZSBub3RlIHRoYXQgYW55IG92ZXJyaWRlIHRvIHRoZSBgdXNlci1hZ2VudGAgb3IgYHgtYW16LXVzZXItYWdlbnRgIGhlYWRlclxuICogaW4gdGhlIEhUVFAgcmVxdWVzdCBpcyBkaXNjb3VyYWdlZC4gUGxlYXNlIHVzZSBgY3VzdG9tVXNlckFnZW50YCBjbGllbnRcbiAqIGNvbmZpZyBvciBtaWRkbGV3YXJlIHNldHRpbmcgdGhlIGB1c2VyQWdlbnRgIGNvbnRleHQgdG8gZ2VuZXJhdGUgZGVzaXJlZCB1c2VyXG4gKiBhZ2VudC5cbiAqL1xuZXhwb3J0IGNvbnN0IHVzZXJBZ2VudE1pZGRsZXdhcmUgPVxuICAob3B0aW9uczogVXNlckFnZW50UmVzb2x2ZWRDb25maWcpID0+XG4gIDxPdXRwdXQgZXh0ZW5kcyBNZXRhZGF0YUJlYXJlcj4oXG4gICAgbmV4dDogQnVpbGRIYW5kbGVyPGFueSwgYW55PixcbiAgICBjb250ZXh0OiBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dFxuICApOiBCdWlsZEhhbmRsZXI8YW55LCBhbnk+ID0+XG4gIGFzeW5jIChhcmdzOiBCdWlsZEhhbmRsZXJBcmd1bWVudHM8YW55Pik6IFByb21pc2U8QnVpbGRIYW5kbGVyT3V0cHV0PE91dHB1dD4+ID0+IHtcbiAgICBjb25zdCB7IHJlcXVlc3QgfSA9IGFyZ3M7XG4gICAgaWYgKCFIdHRwUmVxdWVzdC5pc0luc3RhbmNlKHJlcXVlc3QpKSByZXR1cm4gbmV4dChhcmdzKTtcbiAgICBjb25zdCB7IGhlYWRlcnMgfSA9IHJlcXVlc3Q7XG4gICAgY29uc3QgdXNlckFnZW50ID0gY29udGV4dD8udXNlckFnZW50Py5tYXAoZXNjYXBlVXNlckFnZW50KSB8fCBbXTtcbiAgICBjb25zdCBkZWZhdWx0VXNlckFnZW50ID0gKGF3YWl0IG9wdGlvbnMuZGVmYXVsdFVzZXJBZ2VudFByb3ZpZGVyKCkpLm1hcChlc2NhcGVVc2VyQWdlbnQpO1xuICAgIGNvbnN0IGN1c3RvbVVzZXJBZ2VudCA9IG9wdGlvbnM/LmN1c3RvbVVzZXJBZ2VudD8ubWFwKGVzY2FwZVVzZXJBZ2VudCkgfHwgW107XG5cbiAgICAvLyBTZXQgdmFsdWUgdG8gQVdTLXNwZWNpZmljIHVzZXIgYWdlbnQgaGVhZGVyXG4gICAgY29uc3Qgc2RrVXNlckFnZW50VmFsdWUgPSBbLi4uZGVmYXVsdFVzZXJBZ2VudCwgLi4udXNlckFnZW50LCAuLi5jdXN0b21Vc2VyQWdlbnRdLmpvaW4oU1BBQ0UpO1xuICAgIC8vIEdldCB2YWx1ZSB0byBiZSBzZW50IHdpdGggbm9uLUFXUy1zcGVjaWZpYyB1c2VyIGFnZW50IGhlYWRlci5cbiAgICBjb25zdCBub3JtYWxVQVZhbHVlID0gW1xuICAgICAgLi4uZGVmYXVsdFVzZXJBZ2VudC5maWx0ZXIoKHNlY3Rpb24pID0+IHNlY3Rpb24uc3RhcnRzV2l0aChcImF3cy1zZGstXCIpKSxcbiAgICAgIC4uLmN1c3RvbVVzZXJBZ2VudCxcbiAgICBdLmpvaW4oU1BBQ0UpO1xuXG4gICAgaWYgKG9wdGlvbnMucnVudGltZSAhPT0gXCJicm93c2VyXCIpIHtcbiAgICAgIGlmIChub3JtYWxVQVZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnNbWF9BTVpfVVNFUl9BR0VOVF0gPSBoZWFkZXJzW1hfQU1aX1VTRVJfQUdFTlRdXG4gICAgICAgICAgPyBgJHtoZWFkZXJzW1VTRVJfQUdFTlRdfSAke25vcm1hbFVBVmFsdWV9YFxuICAgICAgICAgIDogbm9ybWFsVUFWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGhlYWRlcnNbVVNFUl9BR0VOVF0gPSBzZGtVc2VyQWdlbnRWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyc1tYX0FNWl9VU0VSX0FHRU5UXSA9IHNka1VzZXJBZ2VudFZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0KHtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICByZXF1ZXN0LFxuICAgIH0pO1xuICB9O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZWFjaCBwYWlyIGFjY29yZGluZyB0byBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTIzNCBhbmQgam9pbiB0aGUgcGFpciB3aXRoIHBhdHRlcm4gYG5hbWUvdmVyc2lvbmAuXG4gKiBVc2VyIGFnZW50IG5hbWUgbWF5IGluY2x1ZGUgcHJlZml4IGxpa2UgYG1kL2AsIGBhcGkvYCwgYG9zL2AgZXRjLiwgd2Ugc2hvdWxkIG5vdCBlc2NhcGUgdGhlIGAvYCBhZnRlciB0aGUgcHJlZml4LlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZXNjYXBlVXNlckFnZW50ID0gKFtuYW1lLCB2ZXJzaW9uXTogVXNlckFnZW50UGFpcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHByZWZpeFNlcGFyYXRvckluZGV4ID0gbmFtZS5pbmRleE9mKFwiL1wiKTtcbiAgY29uc3QgcHJlZml4ID0gbmFtZS5zdWJzdHJpbmcoMCwgcHJlZml4U2VwYXJhdG9ySW5kZXgpOyAvLyBJZiBubyBwcmVmaXgsIHByZWZpeCBpcyBqdXN0IFwiXCJcbiAgbGV0IHVhTmFtZSA9IG5hbWUuc3Vic3RyaW5nKHByZWZpeFNlcGFyYXRvckluZGV4ICsgMSk7XG4gIGlmIChwcmVmaXggPT09IFwiYXBpXCIpIHtcbiAgICB1YU5hbWUgPSB1YU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfVxuICByZXR1cm4gW3ByZWZpeCwgdWFOYW1lLCB2ZXJzaW9uXVxuICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gJiYgaXRlbS5sZW5ndGggPiAwKVxuICAgIC5tYXAoKGl0ZW0pID0+IGl0ZW0/LnJlcGxhY2UoVUFfRVNDQVBFX1JFR0VYLCBcIl9cIikpXG4gICAgLmpvaW4oXCIvXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJBZ2VudE1pZGRsZXdhcmVPcHRpb25zOiBCdWlsZEhhbmRsZXJPcHRpb25zICYgQWJzb2x1dGVMb2NhdGlvbiA9IHtcbiAgbmFtZTogXCJnZXRVc2VyQWdlbnRNaWRkbGV3YXJlXCIsXG4gIHN0ZXA6IFwiYnVpbGRcIixcbiAgcHJpb3JpdHk6IFwibG93XCIsXG4gIHRhZ3M6IFtcIlNFVF9VU0VSX0FHRU5UXCIsIFwiVVNFUl9BR0VOVFwiXSxcbiAgb3ZlcnJpZGU6IHRydWUsXG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckFnZW50UGx1Z2luID0gKGNvbmZpZzogVXNlckFnZW50UmVzb2x2ZWRDb25maWcpOiBQbHVnZ2FibGU8YW55LCBhbnk+ID0+ICh7XG4gIGFwcGx5VG9TdGFjazogKGNsaWVudFN0YWNrKSA9PiB7XG4gICAgY2xpZW50U3RhY2suYWRkKHVzZXJBZ2VudE1pZGRsZXdhcmUoY29uZmlnKSwgZ2V0VXNlckFnZW50TWlkZGxld2FyZU9wdGlvbnMpO1xuICB9LFxufSk7XG4iXX0=