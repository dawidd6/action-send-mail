import { __awaiter, __generator, __rest } from "tslib";
export var loggerMiddleware = function () {
    return function (next, context) {
        return function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var clientName, commandName, inputFilterSensitiveLog, logger, outputFilterSensitiveLog, response, _a, $metadata, outputWithoutMetadata;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        clientName = context.clientName, commandName = context.commandName, inputFilterSensitiveLog = context.inputFilterSensitiveLog, logger = context.logger, outputFilterSensitiveLog = context.outputFilterSensitiveLog;
                        return [4 /*yield*/, next(args)];
                    case 1:
                        response = _b.sent();
                        if (!logger) {
                            return [2 /*return*/, response];
                        }
                        if (typeof logger.info === "function") {
                            _a = response.output, $metadata = _a.$metadata, outputWithoutMetadata = __rest(_a, ["$metadata"]);
                            logger.info({
                                clientName: clientName,
                                commandName: commandName,
                                input: inputFilterSensitiveLog(args.input),
                                output: outputFilterSensitiveLog(outputWithoutMetadata),
                                metadata: $metadata,
                            });
                        }
                        return [2 /*return*/, response];
                }
            });
        }); };
    };
};
export var loggerMiddlewareOptions = {
    name: "loggerMiddleware",
    tags: ["LOGGER"],
    step: "initialize",
    override: true,
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getLoggerPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXJNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFZQSxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FDM0I7SUFDQSxPQUFBLFVBQ0UsSUFBb0MsRUFDcEMsT0FBZ0M7UUFFbEMsT0FBQSxVQUFPLElBQXFDOzs7Ozt3QkFDbEMsVUFBVSxHQUE2RSxPQUFPLFdBQXBGLEVBQUUsV0FBVyxHQUFnRSxPQUFPLFlBQXZFLEVBQUUsdUJBQXVCLEdBQXVDLE9BQU8sd0JBQTlDLEVBQUUsTUFBTSxHQUErQixPQUFPLE9BQXRDLEVBQUUsd0JBQXdCLEdBQUssT0FBTyx5QkFBWixDQUFhO3dCQUV0RixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUEzQixRQUFRLEdBQUcsU0FBZ0I7d0JBRWpDLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1gsc0JBQU8sUUFBUSxFQUFDO3lCQUNqQjt3QkFFRCxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7NEJBQy9CLEtBQTBDLFFBQVEsQ0FBQyxNQUFNLEVBQXZELFNBQVMsZUFBQSxFQUFLLHFCQUFxQixjQUFyQyxhQUF1QyxDQUFGLENBQXFCOzRCQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDO2dDQUNWLFVBQVUsWUFBQTtnQ0FDVixXQUFXLGFBQUE7Z0NBQ1gsS0FBSyxFQUFFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0NBQzFDLE1BQU0sRUFBRSx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQztnQ0FDdkQsUUFBUSxFQUFFLFNBQVM7NkJBQ3BCLENBQUMsQ0FBQzt5QkFDSjt3QkFFRCxzQkFBTyxRQUFRLEVBQUM7OzthQUNqQjtJQXJCRCxDQXFCQztBQXpCRCxDQXlCQyxDQUFDO0FBRUosTUFBTSxDQUFDLElBQU0sdUJBQXVCLEdBQWdEO0lBQ2xGLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ2hCLElBQUksRUFBRSxZQUFZO0lBQ2xCLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQztBQUVGLDZEQUE2RDtBQUM3RCxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsVUFBQyxPQUFZLElBQTBCLE9BQUEsQ0FBQztJQUNyRSxZQUFZLEVBQUUsVUFBQyxXQUFXO1FBQ3hCLFdBQVcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRixDQUFDLEVBSm9FLENBSXBFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGF3cy1zZGsvcHJvdG9jb2wtaHR0cFwiO1xuaW1wb3J0IHtcbiAgQWJzb2x1dGVMb2NhdGlvbixcbiAgSGFuZGxlckV4ZWN1dGlvbkNvbnRleHQsXG4gIEluaXRpYWxpemVIYW5kbGVyLFxuICBJbml0aWFsaXplSGFuZGxlckFyZ3VtZW50cyxcbiAgSW5pdGlhbGl6ZUhhbmRsZXJPcHRpb25zLFxuICBJbml0aWFsaXplSGFuZGxlck91dHB1dCxcbiAgTWV0YWRhdGFCZWFyZXIsXG4gIFBsdWdnYWJsZSxcbn0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBsb2dnZXJNaWRkbGV3YXJlID1cbiAgKCkgPT5cbiAgPE91dHB1dCBleHRlbmRzIE1ldGFkYXRhQmVhcmVyID0gTWV0YWRhdGFCZWFyZXI+KFxuICAgIG5leHQ6IEluaXRpYWxpemVIYW5kbGVyPGFueSwgT3V0cHV0PixcbiAgICBjb250ZXh0OiBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dFxuICApOiBJbml0aWFsaXplSGFuZGxlcjxhbnksIE91dHB1dD4gPT5cbiAgYXN5bmMgKGFyZ3M6IEluaXRpYWxpemVIYW5kbGVyQXJndW1lbnRzPGFueT4pOiBQcm9taXNlPEluaXRpYWxpemVIYW5kbGVyT3V0cHV0PE91dHB1dD4+ID0+IHtcbiAgICBjb25zdCB7IGNsaWVudE5hbWUsIGNvbW1hbmROYW1lLCBpbnB1dEZpbHRlclNlbnNpdGl2ZUxvZywgbG9nZ2VyLCBvdXRwdXRGaWx0ZXJTZW5zaXRpdmVMb2cgfSA9IGNvbnRleHQ7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG5leHQoYXJncyk7XG5cbiAgICBpZiAoIWxvZ2dlcikge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbG9nZ2VyLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3QgeyAkbWV0YWRhdGEsIC4uLm91dHB1dFdpdGhvdXRNZXRhZGF0YSB9ID0gcmVzcG9uc2Uub3V0cHV0O1xuICAgICAgbG9nZ2VyLmluZm8oe1xuICAgICAgICBjbGllbnROYW1lLFxuICAgICAgICBjb21tYW5kTmFtZSxcbiAgICAgICAgaW5wdXQ6IGlucHV0RmlsdGVyU2Vuc2l0aXZlTG9nKGFyZ3MuaW5wdXQpLFxuICAgICAgICBvdXRwdXQ6IG91dHB1dEZpbHRlclNlbnNpdGl2ZUxvZyhvdXRwdXRXaXRob3V0TWV0YWRhdGEpLFxuICAgICAgICBtZXRhZGF0YTogJG1ldGFkYXRhLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9O1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyTWlkZGxld2FyZU9wdGlvbnM6IEluaXRpYWxpemVIYW5kbGVyT3B0aW9ucyAmIEFic29sdXRlTG9jYXRpb24gPSB7XG4gIG5hbWU6IFwibG9nZ2VyTWlkZGxld2FyZVwiLFxuICB0YWdzOiBbXCJMT0dHRVJcIl0sXG4gIHN0ZXA6IFwiaW5pdGlhbGl6ZVwiLFxuICBvdmVycmlkZTogdHJ1ZSxcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmV4cG9ydCBjb25zdCBnZXRMb2dnZXJQbHVnaW4gPSAob3B0aW9uczogYW55KTogUGx1Z2dhYmxlPGFueSwgYW55PiA9PiAoe1xuICBhcHBseVRvU3RhY2s6IChjbGllbnRTdGFjaykgPT4ge1xuICAgIGNsaWVudFN0YWNrLmFkZChsb2dnZXJNaWRkbGV3YXJlKCksIGxvZ2dlck1pZGRsZXdhcmVPcHRpb25zKTtcbiAgfSxcbn0pO1xuIl19