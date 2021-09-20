"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAgentPlugin = exports.getUserAgentMiddlewareOptions = exports.userAgentMiddleware = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const constants_1 = require("./constants");
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
const userAgentMiddleware = (options) => (next, context) => async (args) => {
    var _a, _b;
    const { request } = args;
    if (!protocol_http_1.HttpRequest.isInstance(request))
        return next(args);
    const { headers } = request;
    const userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
    const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
    const customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
    // Set value to AWS-specific user agent header
    const sdkUserAgentValue = [...defaultUserAgent, ...userAgent, ...customUserAgent].join(constants_1.SPACE);
    // Get value to be sent with non-AWS-specific user agent header.
    const normalUAValue = [
        ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent,
    ].join(constants_1.SPACE);
    if (options.runtime !== "browser") {
        if (normalUAValue) {
            headers[constants_1.X_AMZ_USER_AGENT] = headers[constants_1.X_AMZ_USER_AGENT]
                ? `${headers[constants_1.USER_AGENT]} ${normalUAValue}`
                : normalUAValue;
        }
        headers[constants_1.USER_AGENT] = sdkUserAgentValue;
    }
    else {
        headers[constants_1.X_AMZ_USER_AGENT] = sdkUserAgentValue;
    }
    return next({
        ...args,
        request,
    });
};
exports.userAgentMiddleware = userAgentMiddleware;
/**
 * Escape the each pair according to https://tools.ietf.org/html/rfc5234 and join the pair with pattern `name/version`.
 * User agent name may include prefix like `md/`, `api/`, `os/` etc., we should not escape the `/` after the prefix.
 * @private
 */
const escapeUserAgent = ([name, version]) => {
    const prefixSeparatorIndex = name.indexOf("/");
    const prefix = name.substring(0, prefixSeparatorIndex); // If no prefix, prefix is just ""
    let uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter((item) => item && item.length > 0)
        .map((item) => item === null || item === void 0 ? void 0 : item.replace(constants_1.UA_ESCAPE_REGEX, "_"))
        .join("/");
};
exports.getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
const getUserAgentPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.add(exports.userAgentMiddleware(config), exports.getUserAgentMiddlewareOptions);
    },
});
exports.getUserAgentPlugin = getUserAgentPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXItYWdlbnQtbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBcUQ7QUFjckQsMkNBQW1GO0FBRW5GOzs7Ozs7Ozs7OztHQVdHO0FBQ0ksTUFBTSxtQkFBbUIsR0FDOUIsQ0FBQyxPQUFnQyxFQUFFLEVBQUUsQ0FDckMsQ0FDRSxJQUE0QixFQUM1QixPQUFnQyxFQUNSLEVBQUUsQ0FDNUIsS0FBSyxFQUFFLElBQWdDLEVBQXVDLEVBQUU7O0lBQzlFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDekIsSUFBSSxDQUFDLDJCQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDNUIsTUFBTSxTQUFTLEdBQUcsQ0FBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxTQUFTLDBDQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSSxFQUFFLENBQUM7SUFDakUsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDekYsTUFBTSxlQUFlLEdBQUcsQ0FBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxlQUFlLDBDQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSSxFQUFFLENBQUM7SUFFN0UsOENBQThDO0lBQzlDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLEdBQUcsU0FBUyxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFLLENBQUMsQ0FBQztJQUM5RixnRUFBZ0U7SUFDaEUsTUFBTSxhQUFhLEdBQUc7UUFDcEIsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsR0FBRyxlQUFlO0tBQ25CLENBQUMsSUFBSSxDQUFDLGlCQUFLLENBQUMsQ0FBQztJQUVkLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDakMsSUFBSSxhQUFhLEVBQUU7WUFDakIsT0FBTyxDQUFDLDRCQUFnQixDQUFDLEdBQUcsT0FBTyxDQUFDLDRCQUFnQixDQUFDO2dCQUNuRCxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsc0JBQVUsQ0FBQyxJQUFJLGFBQWEsRUFBRTtnQkFDM0MsQ0FBQyxDQUFDLGFBQWEsQ0FBQztTQUNuQjtRQUNELE9BQU8sQ0FBQyxzQkFBVSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7S0FDekM7U0FBTTtRQUNMLE9BQU8sQ0FBQyw0QkFBZ0IsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO0tBQy9DO0lBRUQsT0FBTyxJQUFJLENBQUM7UUFDVixHQUFHLElBQUk7UUFDUCxPQUFPO0tBQ1IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBckNTLFFBQUEsbUJBQW1CLHVCQXFDNUI7QUFFSjs7OztHQUlHO0FBQ0gsTUFBTSxlQUFlLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQWdCLEVBQVUsRUFBRTtJQUNqRSxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLGtDQUFrQztJQUMxRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RELElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtRQUNwQixNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO1NBQzdCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sQ0FBQywyQkFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVXLFFBQUEsNkJBQTZCLEdBQTJDO0lBQ25GLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsSUFBSSxFQUFFLE9BQU87SUFDYixRQUFRLEVBQUUsS0FBSztJQUNmLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQztJQUN0QyxRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFSyxNQUFNLGtCQUFrQixHQUFHLENBQUMsTUFBK0IsRUFBdUIsRUFBRSxDQUFDLENBQUM7SUFDM0YsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDNUIsV0FBVyxDQUFDLEdBQUcsQ0FBQywyQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxxQ0FBNkIsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRixDQUFDLENBQUM7QUFKVSxRQUFBLGtCQUFrQixzQkFJNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay9wcm90b2NvbC1odHRwXCI7XG5pbXBvcnQge1xuICBBYnNvbHV0ZUxvY2F0aW9uLFxuICBCdWlsZEhhbmRsZXIsXG4gIEJ1aWxkSGFuZGxlckFyZ3VtZW50cyxcbiAgQnVpbGRIYW5kbGVyT3B0aW9ucyxcbiAgQnVpbGRIYW5kbGVyT3V0cHV0LFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgTWV0YWRhdGFCZWFyZXIsXG4gIFBsdWdnYWJsZSxcbiAgVXNlckFnZW50UGFpcixcbn0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmltcG9ydCB7IFVzZXJBZ2VudFJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbnNcIjtcbmltcG9ydCB7IFNQQUNFLCBVQV9FU0NBUEVfUkVHRVgsIFVTRVJfQUdFTlQsIFhfQU1aX1VTRVJfQUdFTlQgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBCdWlsZCB1c2VyIGFnZW50IGhlYWRlciBzZWN0aW9ucyBmcm9tOlxuICogMS4gcnVudGltZS1zcGVjaWZpYyBkZWZhdWx0IHVzZXIgYWdlbnQgcHJvdmlkZXI7XG4gKiAyLiBjdXN0b20gdXNlciBhZ2VudCBmcm9tIGBjdXN0b21Vc2VyQWdlbnRgIGNsaWVudCBjb25maWc7XG4gKiAzLiBoYW5kbGVyIGV4ZWN1dGlvbiBjb250ZXh0IHNldCBieSBpbnRlcm5hbCBTREsgY29tcG9uZW50cztcbiAqIFRoZSBidWlsdCB1c2VyIGFnZW50IHdpbGwgYmUgc2V0IHRvIGB4LWFtei11c2VyLWFnZW50YCBoZWFkZXIgZm9yIEFMTCB0aGVcbiAqIHJ1bnRpbWVzLlxuICogUGxlYXNlIG5vdGUgdGhhdCBhbnkgb3ZlcnJpZGUgdG8gdGhlIGB1c2VyLWFnZW50YCBvciBgeC1hbXotdXNlci1hZ2VudGAgaGVhZGVyXG4gKiBpbiB0aGUgSFRUUCByZXF1ZXN0IGlzIGRpc2NvdXJhZ2VkLiBQbGVhc2UgdXNlIGBjdXN0b21Vc2VyQWdlbnRgIGNsaWVudFxuICogY29uZmlnIG9yIG1pZGRsZXdhcmUgc2V0dGluZyB0aGUgYHVzZXJBZ2VudGAgY29udGV4dCB0byBnZW5lcmF0ZSBkZXNpcmVkIHVzZXJcbiAqIGFnZW50LlxuICovXG5leHBvcnQgY29uc3QgdXNlckFnZW50TWlkZGxld2FyZSA9XG4gIChvcHRpb25zOiBVc2VyQWdlbnRSZXNvbHZlZENvbmZpZykgPT5cbiAgPE91dHB1dCBleHRlbmRzIE1ldGFkYXRhQmVhcmVyPihcbiAgICBuZXh0OiBCdWlsZEhhbmRsZXI8YW55LCBhbnk+LFxuICAgIGNvbnRleHQ6IEhhbmRsZXJFeGVjdXRpb25Db250ZXh0XG4gICk6IEJ1aWxkSGFuZGxlcjxhbnksIGFueT4gPT5cbiAgYXN5bmMgKGFyZ3M6IEJ1aWxkSGFuZGxlckFyZ3VtZW50czxhbnk+KTogUHJvbWlzZTxCdWlsZEhhbmRsZXJPdXRwdXQ8T3V0cHV0Pj4gPT4ge1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gYXJncztcbiAgICBpZiAoIUh0dHBSZXF1ZXN0LmlzSW5zdGFuY2UocmVxdWVzdCkpIHJldHVybiBuZXh0KGFyZ3MpO1xuICAgIGNvbnN0IHsgaGVhZGVycyB9ID0gcmVxdWVzdDtcbiAgICBjb25zdCB1c2VyQWdlbnQgPSBjb250ZXh0Py51c2VyQWdlbnQ/Lm1hcChlc2NhcGVVc2VyQWdlbnQpIHx8IFtdO1xuICAgIGNvbnN0IGRlZmF1bHRVc2VyQWdlbnQgPSAoYXdhaXQgb3B0aW9ucy5kZWZhdWx0VXNlckFnZW50UHJvdmlkZXIoKSkubWFwKGVzY2FwZVVzZXJBZ2VudCk7XG4gICAgY29uc3QgY3VzdG9tVXNlckFnZW50ID0gb3B0aW9ucz8uY3VzdG9tVXNlckFnZW50Py5tYXAoZXNjYXBlVXNlckFnZW50KSB8fCBbXTtcblxuICAgIC8vIFNldCB2YWx1ZSB0byBBV1Mtc3BlY2lmaWMgdXNlciBhZ2VudCBoZWFkZXJcbiAgICBjb25zdCBzZGtVc2VyQWdlbnRWYWx1ZSA9IFsuLi5kZWZhdWx0VXNlckFnZW50LCAuLi51c2VyQWdlbnQsIC4uLmN1c3RvbVVzZXJBZ2VudF0uam9pbihTUEFDRSk7XG4gICAgLy8gR2V0IHZhbHVlIHRvIGJlIHNlbnQgd2l0aCBub24tQVdTLXNwZWNpZmljIHVzZXIgYWdlbnQgaGVhZGVyLlxuICAgIGNvbnN0IG5vcm1hbFVBVmFsdWUgPSBbXG4gICAgICAuLi5kZWZhdWx0VXNlckFnZW50LmZpbHRlcigoc2VjdGlvbikgPT4gc2VjdGlvbi5zdGFydHNXaXRoKFwiYXdzLXNkay1cIikpLFxuICAgICAgLi4uY3VzdG9tVXNlckFnZW50LFxuICAgIF0uam9pbihTUEFDRSk7XG5cbiAgICBpZiAob3B0aW9ucy5ydW50aW1lICE9PSBcImJyb3dzZXJcIikge1xuICAgICAgaWYgKG5vcm1hbFVBVmFsdWUpIHtcbiAgICAgICAgaGVhZGVyc1tYX0FNWl9VU0VSX0FHRU5UXSA9IGhlYWRlcnNbWF9BTVpfVVNFUl9BR0VOVF1cbiAgICAgICAgICA/IGAke2hlYWRlcnNbVVNFUl9BR0VOVF19ICR7bm9ybWFsVUFWYWx1ZX1gXG4gICAgICAgICAgOiBub3JtYWxVQVZhbHVlO1xuICAgICAgfVxuICAgICAgaGVhZGVyc1tVU0VSX0FHRU5UXSA9IHNka1VzZXJBZ2VudFZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXJzW1hfQU1aX1VTRVJfQUdFTlRdID0gc2RrVXNlckFnZW50VmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoe1xuICAgICAgLi4uYXJncyxcbiAgICAgIHJlcXVlc3QsXG4gICAgfSk7XG4gIH07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBlYWNoIHBhaXIgYWNjb3JkaW5nIHRvIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MjM0IGFuZCBqb2luIHRoZSBwYWlyIHdpdGggcGF0dGVybiBgbmFtZS92ZXJzaW9uYC5cbiAqIFVzZXIgYWdlbnQgbmFtZSBtYXkgaW5jbHVkZSBwcmVmaXggbGlrZSBgbWQvYCwgYGFwaS9gLCBgb3MvYCBldGMuLCB3ZSBzaG91bGQgbm90IGVzY2FwZSB0aGUgYC9gIGFmdGVyIHRoZSBwcmVmaXguXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBlc2NhcGVVc2VyQWdlbnQgPSAoW25hbWUsIHZlcnNpb25dOiBVc2VyQWdlbnRQYWlyKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcHJlZml4U2VwYXJhdG9ySW5kZXggPSBuYW1lLmluZGV4T2YoXCIvXCIpO1xuICBjb25zdCBwcmVmaXggPSBuYW1lLnN1YnN0cmluZygwLCBwcmVmaXhTZXBhcmF0b3JJbmRleCk7IC8vIElmIG5vIHByZWZpeCwgcHJlZml4IGlzIGp1c3QgXCJcIlxuICBsZXQgdWFOYW1lID0gbmFtZS5zdWJzdHJpbmcocHJlZml4U2VwYXJhdG9ySW5kZXggKyAxKTtcbiAgaWYgKHByZWZpeCA9PT0gXCJhcGlcIikge1xuICAgIHVhTmFtZSA9IHVhTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9XG4gIHJldHVybiBbcHJlZml4LCB1YU5hbWUsIHZlcnNpb25dXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAmJiBpdGVtLmxlbmd0aCA+IDApXG4gICAgLm1hcCgoaXRlbSkgPT4gaXRlbT8ucmVwbGFjZShVQV9FU0NBUEVfUkVHRVgsIFwiX1wiKSlcbiAgICAuam9pbihcIi9cIik7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckFnZW50TWlkZGxld2FyZU9wdGlvbnM6IEJ1aWxkSGFuZGxlck9wdGlvbnMgJiBBYnNvbHV0ZUxvY2F0aW9uID0ge1xuICBuYW1lOiBcImdldFVzZXJBZ2VudE1pZGRsZXdhcmVcIixcbiAgc3RlcDogXCJidWlsZFwiLFxuICBwcmlvcml0eTogXCJsb3dcIixcbiAgdGFnczogW1wiU0VUX1VTRVJfQUdFTlRcIiwgXCJVU0VSX0FHRU5UXCJdLFxuICBvdmVycmlkZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQWdlbnRQbHVnaW4gPSAoY29uZmlnOiBVc2VyQWdlbnRSZXNvbHZlZENvbmZpZyk6IFBsdWdnYWJsZTxhbnksIGFueT4gPT4gKHtcbiAgYXBwbHlUb1N0YWNrOiAoY2xpZW50U3RhY2spID0+IHtcbiAgICBjbGllbnRTdGFjay5hZGQodXNlckFnZW50TWlkZGxld2FyZShjb25maWcpLCBnZXRVc2VyQWdlbnRNaWRkbGV3YXJlT3B0aW9ucyk7XG4gIH0sXG59KTtcbiJdfQ==