import { __awaiter, __generator } from "tslib";
/**
 * Default provider to the user agent in ReactNative. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and virsion
 */
export var defaultUserAgent = function (_a) {
    var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var sections;
        return __generator(this, function (_a) {
            sections = [
                // sdk-metadata
                ["aws-sdk-js", clientVersion],
                // os-metadata
                ["os/other"],
                // language-metadata
                // ECMAScript edition doesn't matter in JS.
                ["lang/js"],
                ["md/rn"],
            ];
            if (serviceId) {
                // api-metadata
                // service Id may not appear in non-AWS clients
                sections.push(["api/" + serviceId, clientVersion]);
            }
            return [2 /*return*/, sections];
        });
    }); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubmF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luZGV4Lm5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUE7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQzNCLFVBQUMsRUFBcUQ7UUFBbkQsU0FBUyxlQUFBLEVBQUUsYUFBYSxtQkFBQTtJQUMzQixPQUFBOzs7WUFDUSxRQUFRLEdBQWM7Z0JBQzFCLGVBQWU7Z0JBQ2YsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDO2dCQUM3QixjQUFjO2dCQUNkLENBQUMsVUFBVSxDQUFDO2dCQUNaLG9CQUFvQjtnQkFDcEIsMkNBQTJDO2dCQUMzQyxDQUFDLFNBQVMsQ0FBQztnQkFDWCxDQUFDLE9BQU8sQ0FBQzthQUNWLENBQUM7WUFFRixJQUFJLFNBQVMsRUFBRTtnQkFDYixlQUFlO2dCQUNmLCtDQUErQztnQkFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQU8sU0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7WUFFRCxzQkFBTyxRQUFRLEVBQUM7O1NBQ2pCO0FBbkJELENBbUJDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciwgVXNlckFnZW50IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmltcG9ydCB7IERlZmF1bHRVc2VyQWdlbnRPcHRpb25zIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbnNcIjtcblxuLyoqXG4gKiBEZWZhdWx0IHByb3ZpZGVyIHRvIHRoZSB1c2VyIGFnZW50IGluIFJlYWN0TmF0aXZlLiBJdCdzIGEgYmVzdCBlZmZvcnQgdG8gaW5mZXJcbiAqIHRoZSBkZXZpY2UgaW5mb3JtYXRpb24uIEl0IHVzZXMgYm93c2VyIGxpYnJhcnkgdG8gZGV0ZWN0IHRoZSBicm93c2VyIGFuZCB2aXJzaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0VXNlckFnZW50ID1cbiAgKHsgc2VydmljZUlkLCBjbGllbnRWZXJzaW9uIH06IERlZmF1bHRVc2VyQWdlbnRPcHRpb25zKTogUHJvdmlkZXI8VXNlckFnZW50PiA9PlxuICBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc2VjdGlvbnM6IFVzZXJBZ2VudCA9IFtcbiAgICAgIC8vIHNkay1tZXRhZGF0YVxuICAgICAgW1wiYXdzLXNkay1qc1wiLCBjbGllbnRWZXJzaW9uXSxcbiAgICAgIC8vIG9zLW1ldGFkYXRhXG4gICAgICBbXCJvcy9vdGhlclwiXSxcbiAgICAgIC8vIGxhbmd1YWdlLW1ldGFkYXRhXG4gICAgICAvLyBFQ01BU2NyaXB0IGVkaXRpb24gZG9lc24ndCBtYXR0ZXIgaW4gSlMuXG4gICAgICBbXCJsYW5nL2pzXCJdLFxuICAgICAgW1wibWQvcm5cIl0sXG4gICAgXTtcblxuICAgIGlmIChzZXJ2aWNlSWQpIHtcbiAgICAgIC8vIGFwaS1tZXRhZGF0YVxuICAgICAgLy8gc2VydmljZSBJZCBtYXkgbm90IGFwcGVhciBpbiBub24tQVdTIGNsaWVudHNcbiAgICAgIHNlY3Rpb25zLnB1c2goW2BhcGkvJHtzZXJ2aWNlSWR9YCwgY2xpZW50VmVyc2lvbl0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWN0aW9ucztcbiAgfTtcbiJdfQ==