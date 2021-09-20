import { __awaiter, __generator, __read, __spreadArray } from "tslib";
export var retryMiddleware = function (options) {
    return function (next, context) {
        return function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var retryStrategy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, options.retryStrategy()];
                    case 1:
                        retryStrategy = _a.sent();
                        if (retryStrategy === null || retryStrategy === void 0 ? void 0 : retryStrategy.mode)
                            context.userAgent = __spreadArray(__spreadArray([], __read((context.userAgent || []))), [["cfg/retry-mode", retryStrategy.mode]]);
                        return [2 /*return*/, retryStrategy.retry(next, args)];
                }
            });
        }); };
    };
};
export var retryMiddlewareOptions = {
    name: "retryMiddleware",
    tags: ["RETRY"],
    step: "finalizeRequest",
    priority: "high",
    override: true,
};
export var getRetryPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnlNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JldHJ5TWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBYUEsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUMxQixVQUFDLE9BQTRCO0lBQzdCLE9BQUEsVUFDRSxJQUFrQyxFQUNsQyxPQUFnQztRQUVsQyxPQUFBLFVBQU8sSUFBbUM7Ozs7NEJBQ2xCLHFCQUFNLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQTdDLGFBQWEsR0FBRyxTQUE2Qjt3QkFDbkQsSUFBSSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsSUFBSTs0QkFBRSxPQUFPLENBQUMsU0FBUywwQ0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEtBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQzt3QkFDcEgsc0JBQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUM7OzthQUN4QztJQUpELENBSUM7QUFSRCxDQVFDLENBQUM7QUFFSixNQUFNLENBQUMsSUFBTSxzQkFBc0IsR0FBcUQ7SUFDdEYsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDZixJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRyxVQUFDLE9BQTRCLElBQTBCLE9BQUEsQ0FBQztJQUNwRixZQUFZLEVBQUUsVUFBQyxXQUFXO1FBQ3hCLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNGLENBQUMsRUFKbUYsQ0FJbkYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFic29sdXRlTG9jYXRpb24sXG4gIEZpbmFsaXplSGFuZGxlcixcbiAgRmluYWxpemVIYW5kbGVyQXJndW1lbnRzLFxuICBGaW5hbGl6ZUhhbmRsZXJPdXRwdXQsXG4gIEZpbmFsaXplUmVxdWVzdEhhbmRsZXJPcHRpb25zLFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgTWV0YWRhdGFCZWFyZXIsXG4gIFBsdWdnYWJsZSxcbn0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmltcG9ydCB7IFJldHJ5UmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uc1wiO1xuXG5leHBvcnQgY29uc3QgcmV0cnlNaWRkbGV3YXJlID1cbiAgKG9wdGlvbnM6IFJldHJ5UmVzb2x2ZWRDb25maWcpID0+XG4gIDxPdXRwdXQgZXh0ZW5kcyBNZXRhZGF0YUJlYXJlciA9IE1ldGFkYXRhQmVhcmVyPihcbiAgICBuZXh0OiBGaW5hbGl6ZUhhbmRsZXI8YW55LCBPdXRwdXQ+LFxuICAgIGNvbnRleHQ6IEhhbmRsZXJFeGVjdXRpb25Db250ZXh0XG4gICk6IEZpbmFsaXplSGFuZGxlcjxhbnksIE91dHB1dD4gPT5cbiAgYXN5bmMgKGFyZ3M6IEZpbmFsaXplSGFuZGxlckFyZ3VtZW50czxhbnk+KTogUHJvbWlzZTxGaW5hbGl6ZUhhbmRsZXJPdXRwdXQ8T3V0cHV0Pj4gPT4ge1xuICAgIGNvbnN0IHJldHJ5U3RyYXRlZ3kgPSBhd2FpdCBvcHRpb25zLnJldHJ5U3RyYXRlZ3koKTtcbiAgICBpZiAocmV0cnlTdHJhdGVneT8ubW9kZSkgY29udGV4dC51c2VyQWdlbnQgPSBbLi4uKGNvbnRleHQudXNlckFnZW50IHx8IFtdKSwgW1wiY2ZnL3JldHJ5LW1vZGVcIiwgcmV0cnlTdHJhdGVneS5tb2RlXV07XG4gICAgcmV0dXJuIHJldHJ5U3RyYXRlZ3kucmV0cnkobmV4dCwgYXJncyk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZXRyeU1pZGRsZXdhcmVPcHRpb25zOiBGaW5hbGl6ZVJlcXVlc3RIYW5kbGVyT3B0aW9ucyAmIEFic29sdXRlTG9jYXRpb24gPSB7XG4gIG5hbWU6IFwicmV0cnlNaWRkbGV3YXJlXCIsXG4gIHRhZ3M6IFtcIlJFVFJZXCJdLFxuICBzdGVwOiBcImZpbmFsaXplUmVxdWVzdFwiLFxuICBwcmlvcml0eTogXCJoaWdoXCIsXG4gIG92ZXJyaWRlOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IGdldFJldHJ5UGx1Z2luID0gKG9wdGlvbnM6IFJldHJ5UmVzb2x2ZWRDb25maWcpOiBQbHVnZ2FibGU8YW55LCBhbnk+ID0+ICh7XG4gIGFwcGx5VG9TdGFjazogKGNsaWVudFN0YWNrKSA9PiB7XG4gICAgY2xpZW50U3RhY2suYWRkKHJldHJ5TWlkZGxld2FyZShvcHRpb25zKSwgcmV0cnlNaWRkbGV3YXJlT3B0aW9ucyk7XG4gIH0sXG59KTtcbiJdfQ==