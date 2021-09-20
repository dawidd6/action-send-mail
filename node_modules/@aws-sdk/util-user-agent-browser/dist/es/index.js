import { __awaiter, __generator } from "tslib";
import bowser from "bowser";
/**
 * Default provider to the user agent in browsers. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and version
 */
export var defaultUserAgent = function (_a) {
    var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var parsedUA, sections;
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            parsedUA = typeof window !== "undefined" && ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent)
                ? bowser.parse(window.navigator.userAgent)
                : undefined;
            sections = [
                // sdk-metadata
                ["aws-sdk-js", clientVersion],
                // os-metadata
                ["os/" + (((_b = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _b === void 0 ? void 0 : _b.name) || "other"), (_c = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _c === void 0 ? void 0 : _c.version],
                // language-metadata
                // ECMAScript edition doesn't matter in JS.
                ["lang/js"],
                // browser vendor and version.
                ["md/browser", ((_e = (_d = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "unknown") + "_" + ((_g = (_f = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _f === void 0 ? void 0 : _f.version) !== null && _g !== void 0 ? _g : "unknown")],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUk1Qjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FDM0IsVUFBQyxFQUFxRDtRQUFuRCxTQUFTLGVBQUEsRUFBRSxhQUFhLG1CQUFBO0lBQzNCLE9BQUE7Ozs7WUFDUSxRQUFRLEdBQ1osT0FBTyxNQUFNLEtBQUssV0FBVyxLQUFJLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFNBQVMsMENBQUUsU0FBUyxDQUFBO2dCQUMzRCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNWLFFBQVEsR0FBYztnQkFDMUIsZUFBZTtnQkFDZixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7Z0JBQzdCLGNBQWM7Z0JBQ2QsQ0FBQyxTQUFNLENBQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsRUFBRSwwQ0FBRSxJQUFJLEtBQUksT0FBTyxDQUFFLEVBQUUsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsRUFBRSwwQ0FBRSxPQUFPLENBQUM7Z0JBQzlELG9CQUFvQjtnQkFDcEIsMkNBQTJDO2dCQUMzQyxDQUFDLFNBQVMsQ0FBQztnQkFDWCw4QkFBOEI7Z0JBQzlCLENBQUMsWUFBWSxFQUFFLENBQUcsTUFBQSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLDBDQUFFLElBQUksbUNBQUksU0FBUyxXQUFJLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxPQUFPLG1DQUFJLFNBQVMsQ0FBRSxDQUFDO2FBQ3JHLENBQUM7WUFFRixJQUFJLFNBQVMsRUFBRTtnQkFDYixlQUFlO2dCQUNmLCtDQUErQztnQkFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQU8sU0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7WUFFRCxzQkFBTyxRQUFRLEVBQUM7O1NBQ2pCO0FBeEJELENBd0JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciwgVXNlckFnZW50IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgYm93c2VyIGZyb20gXCJib3dzZXJcIjtcblxuaW1wb3J0IHsgRGVmYXVsdFVzZXJBZ2VudE9wdGlvbnMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uc1wiO1xuXG4vKipcbiAqIERlZmF1bHQgcHJvdmlkZXIgdG8gdGhlIHVzZXIgYWdlbnQgaW4gYnJvd3NlcnMuIEl0J3MgYSBiZXN0IGVmZm9ydCB0byBpbmZlclxuICogdGhlIGRldmljZSBpbmZvcm1hdGlvbi4gSXQgdXNlcyBib3dzZXIgbGlicmFyeSB0byBkZXRlY3QgdGhlIGJyb3dzZXIgYW5kIHZlcnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRVc2VyQWdlbnQgPVxuICAoeyBzZXJ2aWNlSWQsIGNsaWVudFZlcnNpb24gfTogRGVmYXVsdFVzZXJBZ2VudE9wdGlvbnMpOiBQcm92aWRlcjxVc2VyQWdlbnQ+ID0+XG4gIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwYXJzZWRVQSA9XG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdz8ubmF2aWdhdG9yPy51c2VyQWdlbnRcbiAgICAgICAgPyBib3dzZXIucGFyc2Uod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHNlY3Rpb25zOiBVc2VyQWdlbnQgPSBbXG4gICAgICAvLyBzZGstbWV0YWRhdGFcbiAgICAgIFtcImF3cy1zZGstanNcIiwgY2xpZW50VmVyc2lvbl0sXG4gICAgICAvLyBvcy1tZXRhZGF0YVxuICAgICAgW2Bvcy8ke3BhcnNlZFVBPy5vcz8ubmFtZSB8fCBcIm90aGVyXCJ9YCwgcGFyc2VkVUE/Lm9zPy52ZXJzaW9uXSxcbiAgICAgIC8vIGxhbmd1YWdlLW1ldGFkYXRhXG4gICAgICAvLyBFQ01BU2NyaXB0IGVkaXRpb24gZG9lc24ndCBtYXR0ZXIgaW4gSlMuXG4gICAgICBbXCJsYW5nL2pzXCJdLFxuICAgICAgLy8gYnJvd3NlciB2ZW5kb3IgYW5kIHZlcnNpb24uXG4gICAgICBbXCJtZC9icm93c2VyXCIsIGAke3BhcnNlZFVBPy5icm93c2VyPy5uYW1lID8/IFwidW5rbm93blwifV8ke3BhcnNlZFVBPy5icm93c2VyPy52ZXJzaW9uID8/IFwidW5rbm93blwifWBdLFxuICAgIF07XG5cbiAgICBpZiAoc2VydmljZUlkKSB7XG4gICAgICAvLyBhcGktbWV0YWRhdGFcbiAgICAgIC8vIHNlcnZpY2UgSWQgbWF5IG5vdCBhcHBlYXIgaW4gbm9uLUFXUyBjbGllbnRzXG4gICAgICBzZWN0aW9ucy5wdXNoKFtgYXBpLyR7c2VydmljZUlkfWAsIGNsaWVudFZlcnNpb25dKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VjdGlvbnM7XG4gIH07XG4iXX0=