import { __assign, __awaiter, __generator } from "tslib";
export var serializerMiddleware = function (options, serializer) {
    return function (next, context) {
        return function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, serializer(args.input, options)];
                    case 1:
                        request = _a.sent();
                        return [2 /*return*/, next(__assign(__assign({}, args), { request: request }))];
                }
            });
        }); };
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplck1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VyaWFsaXplck1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVVBLE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUMvQixVQUNFLE9BQXFCLEVBQ3JCLFVBQWdEO0lBRWxELE9BQUEsVUFBQyxJQUFxQyxFQUFFLE9BQWdDO1FBQ3hFLE9BQUEsVUFBTyxJQUFzQzs7Ozs0QkFDM0IscUJBQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUE7O3dCQUEvQyxPQUFPLEdBQUcsU0FBcUM7d0JBQ3JELHNCQUFPLElBQUksdUJBQ04sSUFBSSxLQUNQLE9BQU8sU0FBQSxJQUNQLEVBQUM7OzthQUNKO0lBTkQsQ0FNQztBQVBELENBT0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVuZHBvaW50QmVhcmVyLFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgUmVxdWVzdFNlcmlhbGl6ZXIsXG4gIFNlcmlhbGl6ZUhhbmRsZXIsXG4gIFNlcmlhbGl6ZUhhbmRsZXJBcmd1bWVudHMsXG4gIFNlcmlhbGl6ZUhhbmRsZXJPdXRwdXQsXG4gIFNlcmlhbGl6ZU1pZGRsZXdhcmUsXG59IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgY29uc3Qgc2VyaWFsaXplck1pZGRsZXdhcmUgPVxuICA8SW5wdXQgZXh0ZW5kcyBvYmplY3QsIE91dHB1dCBleHRlbmRzIG9iamVjdCwgUnVudGltZVV0aWxzIGV4dGVuZHMgRW5kcG9pbnRCZWFyZXI+KFxuICAgIG9wdGlvbnM6IFJ1bnRpbWVVdGlscyxcbiAgICBzZXJpYWxpemVyOiBSZXF1ZXN0U2VyaWFsaXplcjxhbnksIFJ1bnRpbWVVdGlscz5cbiAgKTogU2VyaWFsaXplTWlkZGxld2FyZTxJbnB1dCwgT3V0cHV0PiA9PlxuICAobmV4dDogU2VyaWFsaXplSGFuZGxlcjxJbnB1dCwgT3V0cHV0PiwgY29udGV4dDogSGFuZGxlckV4ZWN1dGlvbkNvbnRleHQpOiBTZXJpYWxpemVIYW5kbGVyPElucHV0LCBPdXRwdXQ+ID0+XG4gIGFzeW5jIChhcmdzOiBTZXJpYWxpemVIYW5kbGVyQXJndW1lbnRzPElucHV0Pik6IFByb21pc2U8U2VyaWFsaXplSGFuZGxlck91dHB1dDxPdXRwdXQ+PiA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHNlcmlhbGl6ZXIoYXJncy5pbnB1dCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG5leHQoe1xuICAgICAgLi4uYXJncyxcbiAgICAgIHJlcXVlc3QsXG4gICAgfSk7XG4gIH07XG4iXX0=