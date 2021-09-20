import { __assign, __awaiter, __generator } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
var CONTENT_LENGTH_HEADER = "content-length";
export function contentLengthMiddleware(bodyLengthChecker) {
    var _this = this;
    return function (next) {
        return function (args) { return __awaiter(_this, void 0, void 0, function () {
            var request, body, headers, length;
            var _a;
            return __generator(this, function (_b) {
                request = args.request;
                if (HttpRequest.isInstance(request)) {
                    body = request.body, headers = request.headers;
                    if (body &&
                        Object.keys(headers)
                            .map(function (str) { return str.toLowerCase(); })
                            .indexOf(CONTENT_LENGTH_HEADER) === -1) {
                        length = bodyLengthChecker(body);
                        if (length !== undefined) {
                            request.headers = __assign(__assign({}, request.headers), (_a = {}, _a[CONTENT_LENGTH_HEADER] = String(length), _a));
                        }
                    }
                }
                return [2 /*return*/, next(__assign(__assign({}, args), { request: request }))];
            });
        }); };
    };
}
export var contentLengthMiddlewareOptions = {
    step: "build",
    tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
    name: "contentLengthMiddleware",
    override: true,
};
export var getContentLengthPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVlyRCxJQUFNLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDO0FBRS9DLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxpQkFBdUM7SUFBL0UsaUJBMkJDO0lBMUJDLE9BQU8sVUFBZ0MsSUFBK0I7UUFDcEUsT0FBQSxVQUFPLElBQWdDOzs7O2dCQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDN0IsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMzQixJQUFJLEdBQWMsT0FBTyxLQUFyQixFQUFFLE9BQU8sR0FBSyxPQUFPLFFBQVosQ0FBYTtvQkFDbEMsSUFDRSxJQUFJO3dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzZCQUNqQixHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUM7NkJBQy9CLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUN4Qzt3QkFDTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3ZDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTs0QkFDeEIsT0FBTyxDQUFDLE9BQU8seUJBQ1YsT0FBTyxDQUFDLE9BQU8sZ0JBQ2pCLHFCQUFxQixJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFDeEMsQ0FBQzt5QkFDSDtxQkFDRjtpQkFDRjtnQkFFRCxzQkFBTyxJQUFJLHVCQUNOLElBQUksS0FDUCxPQUFPLFNBQUEsSUFDUCxFQUFDOzthQUNKO0lBeEJELENBd0JDLENBQUM7QUFDTixDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sOEJBQThCLEdBQXdCO0lBQ2pFLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUM7SUFDOUMsSUFBSSxFQUFFLHlCQUF5QjtJQUMvQixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxzQkFBc0IsR0FBRyxVQUFDLE9BQW9ELElBQTBCLE9BQUEsQ0FBQztJQUNwSCxZQUFZLEVBQUUsVUFBQyxXQUFXO1FBQ3hCLFdBQVcsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsOEJBQThCLENBQUMsQ0FBQztJQUN0RyxDQUFDO0NBQ0YsQ0FBQyxFQUptSCxDQUluSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFJlcXVlc3QgfSBmcm9tIFwiQGF3cy1zZGsvcHJvdG9jb2wtaHR0cFwiO1xuaW1wb3J0IHtcbiAgQm9keUxlbmd0aENhbGN1bGF0b3IsXG4gIEJ1aWxkSGFuZGxlcixcbiAgQnVpbGRIYW5kbGVyQXJndW1lbnRzLFxuICBCdWlsZEhhbmRsZXJPcHRpb25zLFxuICBCdWlsZEhhbmRsZXJPdXRwdXQsXG4gIEJ1aWxkTWlkZGxld2FyZSxcbiAgTWV0YWRhdGFCZWFyZXIsXG4gIFBsdWdnYWJsZSxcbn0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmNvbnN0IENPTlRFTlRfTEVOR1RIX0hFQURFUiA9IFwiY29udGVudC1sZW5ndGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnRMZW5ndGhNaWRkbGV3YXJlKGJvZHlMZW5ndGhDaGVja2VyOiBCb2R5TGVuZ3RoQ2FsY3VsYXRvcik6IEJ1aWxkTWlkZGxld2FyZTxhbnksIGFueT4ge1xuICByZXR1cm4gPE91dHB1dCBleHRlbmRzIE1ldGFkYXRhQmVhcmVyPihuZXh0OiBCdWlsZEhhbmRsZXI8YW55LCBPdXRwdXQ+KTogQnVpbGRIYW5kbGVyPGFueSwgT3V0cHV0PiA9PlxuICAgIGFzeW5jIChhcmdzOiBCdWlsZEhhbmRsZXJBcmd1bWVudHM8YW55Pik6IFByb21pc2U8QnVpbGRIYW5kbGVyT3V0cHV0PE91dHB1dD4+ID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBhcmdzLnJlcXVlc3Q7XG4gICAgICBpZiAoSHR0cFJlcXVlc3QuaXNJbnN0YW5jZShyZXF1ZXN0KSkge1xuICAgICAgICBjb25zdCB7IGJvZHksIGhlYWRlcnMgfSA9IHJlcXVlc3Q7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBib2R5ICYmXG4gICAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycylcbiAgICAgICAgICAgIC5tYXAoKHN0cikgPT4gc3RyLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICAuaW5kZXhPZihDT05URU5UX0xFTkdUSF9IRUFERVIpID09PSAtMVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSBib2R5TGVuZ3RoQ2hlY2tlcihib2R5KTtcbiAgICAgICAgICBpZiAobGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycyA9IHtcbiAgICAgICAgICAgICAgLi4ucmVxdWVzdC5oZWFkZXJzLFxuICAgICAgICAgICAgICBbQ09OVEVOVF9MRU5HVEhfSEVBREVSXTogU3RyaW5nKGxlbmd0aCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV4dCh7XG4gICAgICAgIC4uLmFyZ3MsXG4gICAgICAgIHJlcXVlc3QsXG4gICAgICB9KTtcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgY29udGVudExlbmd0aE1pZGRsZXdhcmVPcHRpb25zOiBCdWlsZEhhbmRsZXJPcHRpb25zID0ge1xuICBzdGVwOiBcImJ1aWxkXCIsXG4gIHRhZ3M6IFtcIlNFVF9DT05URU5UX0xFTkdUSFwiLCBcIkNPTlRFTlRfTEVOR1RIXCJdLFxuICBuYW1lOiBcImNvbnRlbnRMZW5ndGhNaWRkbGV3YXJlXCIsXG4gIG92ZXJyaWRlOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IGdldENvbnRlbnRMZW5ndGhQbHVnaW4gPSAob3B0aW9uczogeyBib2R5TGVuZ3RoQ2hlY2tlcjogQm9keUxlbmd0aENhbGN1bGF0b3IgfSk6IFBsdWdnYWJsZTxhbnksIGFueT4gPT4gKHtcbiAgYXBwbHlUb1N0YWNrOiAoY2xpZW50U3RhY2spID0+IHtcbiAgICBjbGllbnRTdGFjay5hZGQoY29udGVudExlbmd0aE1pZGRsZXdhcmUob3B0aW9ucy5ib2R5TGVuZ3RoQ2hlY2tlciksIGNvbnRlbnRMZW5ndGhNaWRkbGV3YXJlT3B0aW9ucyk7XG4gIH0sXG59KTtcbiJdfQ==