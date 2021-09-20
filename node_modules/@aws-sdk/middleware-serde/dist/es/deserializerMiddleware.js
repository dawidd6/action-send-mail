import { __awaiter, __generator } from "tslib";
export var deserializerMiddleware = function (options, deserializer) {
    return function (next, context) {
        return function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var response, parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, next(args)];
                    case 1:
                        response = (_a.sent()).response;
                        return [4 /*yield*/, deserializer(response, options)];
                    case 2:
                        parsed = _a.sent();
                        return [2 /*return*/, {
                                response: response,
                                output: parsed,
                            }];
                }
            });
        }); };
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzZXJpYWxpemVyTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXNlcmlhbGl6ZXJNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFTQSxNQUFNLENBQUMsSUFBTSxzQkFBc0IsR0FDakMsVUFDRSxPQUFxQixFQUNyQixZQUEwRDtJQUU1RCxPQUFBLFVBQUMsSUFBdUMsRUFBRSxPQUFnQztRQUMxRSxPQUFBLFVBQU8sSUFBd0M7Ozs7NEJBQ3hCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTdCLFFBQVEsR0FBSyxDQUFBLFNBQWdCLENBQUEsU0FBckI7d0JBQ0QscUJBQU0sWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQTlDLE1BQU0sR0FBRyxTQUFxQzt3QkFDcEQsc0JBQU87Z0NBQ0wsUUFBUSxVQUFBO2dDQUNSLE1BQU0sRUFBRSxNQUFnQjs2QkFDekIsRUFBQzs7O2FBQ0g7SUFQRCxDQU9DO0FBUkQsQ0FRQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGVzZXJpYWxpemVIYW5kbGVyLFxuICBEZXNlcmlhbGl6ZUhhbmRsZXJBcmd1bWVudHMsXG4gIERlc2VyaWFsaXplSGFuZGxlck91dHB1dCxcbiAgRGVzZXJpYWxpemVNaWRkbGV3YXJlLFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgUmVzcG9uc2VEZXNlcmlhbGl6ZXIsXG59IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgZGVzZXJpYWxpemVyTWlkZGxld2FyZSA9XG4gIDxJbnB1dCBleHRlbmRzIG9iamVjdCwgT3V0cHV0IGV4dGVuZHMgb2JqZWN0LCBSdW50aW1lVXRpbHMgPSBhbnk+KFxuICAgIG9wdGlvbnM6IFJ1bnRpbWVVdGlscyxcbiAgICBkZXNlcmlhbGl6ZXI6IFJlc3BvbnNlRGVzZXJpYWxpemVyPGFueSwgYW55LCBSdW50aW1lVXRpbHM+XG4gICk6IERlc2VyaWFsaXplTWlkZGxld2FyZTxJbnB1dCwgT3V0cHV0PiA9PlxuICAobmV4dDogRGVzZXJpYWxpemVIYW5kbGVyPElucHV0LCBPdXRwdXQ+LCBjb250ZXh0OiBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCk6IERlc2VyaWFsaXplSGFuZGxlcjxJbnB1dCwgT3V0cHV0PiA9PlxuICBhc3luYyAoYXJnczogRGVzZXJpYWxpemVIYW5kbGVyQXJndW1lbnRzPElucHV0Pik6IFByb21pc2U8RGVzZXJpYWxpemVIYW5kbGVyT3V0cHV0PE91dHB1dD4+ID0+IHtcbiAgICBjb25zdCB7IHJlc3BvbnNlIH0gPSBhd2FpdCBuZXh0KGFyZ3MpO1xuICAgIGNvbnN0IHBhcnNlZCA9IGF3YWl0IGRlc2VyaWFsaXplcihyZXNwb25zZSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3BvbnNlLFxuICAgICAgb3V0cHV0OiBwYXJzZWQgYXMgT3V0cHV0LFxuICAgIH07XG4gIH07XG4iXX0=