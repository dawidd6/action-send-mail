import { __awaiter, __generator } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
export function resolveHostHeaderConfig(input) {
    return input;
}
export var hostHeaderMiddleware = function (options) {
    return function (next) {
        return function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var request, _a, handlerProtocol;
            return __generator(this, function (_b) {
                if (!HttpRequest.isInstance(args.request))
                    return [2 /*return*/, next(args)];
                request = args.request;
                _a = (options.requestHandler.metadata || {}).handlerProtocol, handlerProtocol = _a === void 0 ? "" : _a;
                //For H2 request, remove 'host' header and use ':authority' header instead
                //reference: https://nodejs.org/dist/latest-v13.x/docs/api/errors.html#ERR_HTTP2_INVALID_CONNECTION_HEADERS
                if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
                    delete request.headers["host"];
                    request.headers[":authority"] = "";
                    //non-H2 request and 'host' header is not set, set the 'host' header to request's hostname.
                }
                else if (!request.headers["host"]) {
                    request.headers["host"] = request.hostname;
                }
                return [2 /*return*/, next(args)];
            });
        }); };
    };
};
export var hostHeaderMiddlewareOptions = {
    name: "hostHeaderMiddleware",
    step: "build",
    priority: "low",
    tags: ["HOST"],
    override: true,
};
export var getHostHeaderPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWFyRCxNQUFNLFVBQVUsdUJBQXVCLENBQ3JDLEtBQXFEO0lBRXJELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUMvQixVQUE4QyxPQUFpQztJQUMvRSxPQUFBLFVBQUMsSUFBSTtRQUNMLE9BQUEsVUFBTyxJQUFJOzs7Z0JBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFBRSxzQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQ3JELE9BQU8sR0FBSyxJQUFJLFFBQVQsQ0FBVTtnQkFDakIsS0FBeUIsQ0FBQSxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUEsZ0JBQTFDLEVBQXBCLGVBQWUsbUJBQUcsRUFBRSxLQUFBLENBQTJDO2dCQUN2RSwwRUFBMEU7Z0JBQzFFLDJHQUEyRztnQkFDM0csSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQ3hFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDL0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ25DLDJGQUEyRjtpQkFDNUY7cUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztpQkFDNUM7Z0JBQ0Qsc0JBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDOzthQUNuQjtJQWRELENBY0M7QUFmRCxDQWVDLENBQUM7QUFFSixNQUFNLENBQUMsSUFBTSwyQkFBMkIsR0FBMkM7SUFDakYsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixJQUFJLEVBQUUsT0FBTztJQUNiLFFBQVEsRUFBRSxLQUFLO0lBQ2YsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2QsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sbUJBQW1CLEdBQUcsVUFBQyxPQUFpQyxJQUEwQixPQUFBLENBQUM7SUFDOUYsWUFBWSxFQUFFLFVBQUMsV0FBVztRQUN4QixXQUFXLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxFQUFFLDJCQUEyQixDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNGLENBQUMsRUFKNkYsQ0FJN0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3RvY29sLWh0dHBcIjtcbmltcG9ydCB7IEFic29sdXRlTG9jYXRpb24sIEJ1aWxkSGFuZGxlck9wdGlvbnMsIEJ1aWxkTWlkZGxld2FyZSwgUGx1Z2dhYmxlLCBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhvc3RIZWFkZXJJbnB1dENvbmZpZyB7fVxuaW50ZXJmYWNlIFByZXZpb3VzbHlSZXNvbHZlZCB7XG4gIHJlcXVlc3RIYW5kbGVyOiBSZXF1ZXN0SGFuZGxlcjxhbnksIGFueT47XG59XG5leHBvcnQgaW50ZXJmYWNlIEhvc3RIZWFkZXJSZXNvbHZlZENvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgSFRUUCBoYW5kbGVyIHRvIHVzZS4gRmV0Y2ggaW4gYnJvd3NlciBhbmQgSHR0cHMgaW4gTm9kZWpzLlxuICAgKi9cbiAgcmVxdWVzdEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyPGFueSwgYW55Pjtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlSG9zdEhlYWRlckNvbmZpZzxUPihcbiAgaW5wdXQ6IFQgJiBQcmV2aW91c2x5UmVzb2x2ZWQgJiBIb3N0SGVhZGVySW5wdXRDb25maWdcbik6IFQgJiBIb3N0SGVhZGVyUmVzb2x2ZWRDb25maWcge1xuICByZXR1cm4gaW5wdXQ7XG59XG5cbmV4cG9ydCBjb25zdCBob3N0SGVhZGVyTWlkZGxld2FyZSA9XG4gIDxJbnB1dCBleHRlbmRzIG9iamVjdCwgT3V0cHV0IGV4dGVuZHMgb2JqZWN0PihvcHRpb25zOiBIb3N0SGVhZGVyUmVzb2x2ZWRDb25maWcpOiBCdWlsZE1pZGRsZXdhcmU8SW5wdXQsIE91dHB1dD4gPT5cbiAgKG5leHQpID0+XG4gIGFzeW5jIChhcmdzKSA9PiB7XG4gICAgaWYgKCFIdHRwUmVxdWVzdC5pc0luc3RhbmNlKGFyZ3MucmVxdWVzdCkpIHJldHVybiBuZXh0KGFyZ3MpO1xuICAgIGNvbnN0IHsgcmVxdWVzdCB9ID0gYXJncztcbiAgICBjb25zdCB7IGhhbmRsZXJQcm90b2NvbCA9IFwiXCIgfSA9IG9wdGlvbnMucmVxdWVzdEhhbmRsZXIubWV0YWRhdGEgfHwge307XG4gICAgLy9Gb3IgSDIgcmVxdWVzdCwgcmVtb3ZlICdob3N0JyBoZWFkZXIgYW5kIHVzZSAnOmF1dGhvcml0eScgaGVhZGVyIGluc3RlYWRcbiAgICAvL3JlZmVyZW5jZTogaHR0cHM6Ly9ub2RlanMub3JnL2Rpc3QvbGF0ZXN0LXYxMy54L2RvY3MvYXBpL2Vycm9ycy5odG1sI0VSUl9IVFRQMl9JTlZBTElEX0NPTk5FQ1RJT05fSEVBREVSU1xuICAgIGlmIChoYW5kbGVyUHJvdG9jb2wuaW5kZXhPZihcImgyXCIpID49IDAgJiYgIXJlcXVlc3QuaGVhZGVyc1tcIjphdXRob3JpdHlcIl0pIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0LmhlYWRlcnNbXCJob3N0XCJdO1xuICAgICAgcmVxdWVzdC5oZWFkZXJzW1wiOmF1dGhvcml0eVwiXSA9IFwiXCI7XG4gICAgICAvL25vbi1IMiByZXF1ZXN0IGFuZCAnaG9zdCcgaGVhZGVyIGlzIG5vdCBzZXQsIHNldCB0aGUgJ2hvc3QnIGhlYWRlciB0byByZXF1ZXN0J3MgaG9zdG5hbWUuXG4gICAgfSBlbHNlIGlmICghcmVxdWVzdC5oZWFkZXJzW1wiaG9zdFwiXSkge1xuICAgICAgcmVxdWVzdC5oZWFkZXJzW1wiaG9zdFwiXSA9IHJlcXVlc3QuaG9zdG5hbWU7XG4gICAgfVxuICAgIHJldHVybiBuZXh0KGFyZ3MpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgaG9zdEhlYWRlck1pZGRsZXdhcmVPcHRpb25zOiBCdWlsZEhhbmRsZXJPcHRpb25zICYgQWJzb2x1dGVMb2NhdGlvbiA9IHtcbiAgbmFtZTogXCJob3N0SGVhZGVyTWlkZGxld2FyZVwiLFxuICBzdGVwOiBcImJ1aWxkXCIsXG4gIHByaW9yaXR5OiBcImxvd1wiLFxuICB0YWdzOiBbXCJIT1NUXCJdLFxuICBvdmVycmlkZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRIb3N0SGVhZGVyUGx1Z2luID0gKG9wdGlvbnM6IEhvc3RIZWFkZXJSZXNvbHZlZENvbmZpZyk6IFBsdWdnYWJsZTxhbnksIGFueT4gPT4gKHtcbiAgYXBwbHlUb1N0YWNrOiAoY2xpZW50U3RhY2spID0+IHtcbiAgICBjbGllbnRTdGFjay5hZGQoaG9zdEhlYWRlck1pZGRsZXdhcmUob3B0aW9ucyksIGhvc3RIZWFkZXJNaWRkbGV3YXJlT3B0aW9ucyk7XG4gIH0sXG59KTtcbiJdfQ==