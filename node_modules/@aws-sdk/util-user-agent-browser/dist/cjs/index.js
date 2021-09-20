"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUserAgent = void 0;
const tslib_1 = require("tslib");
const bowser_1 = tslib_1.__importDefault(require("bowser"));
/**
 * Default provider to the user agent in browsers. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and version
 */
const defaultUserAgent = ({ serviceId, clientVersion }) => async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const parsedUA = typeof window !== "undefined" && ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent)
        ? bowser_1.default.parse(window.navigator.userAgent)
        : undefined;
    const sections = [
        // sdk-metadata
        ["aws-sdk-js", clientVersion],
        // os-metadata
        [`os/${((_b = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _b === void 0 ? void 0 : _b.name) || "other"}`, (_c = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _c === void 0 ? void 0 : _c.version],
        // language-metadata
        // ECMAScript edition doesn't matter in JS.
        ["lang/js"],
        // browser vendor and version.
        ["md/browser", `${(_e = (_d = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "unknown"}_${(_g = (_f = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _f === void 0 ? void 0 : _f.version) !== null && _g !== void 0 ? _g : "unknown"}`],
    ];
    if (serviceId) {
        // api-metadata
        // service Id may not appear in non-AWS clients
        sections.push([`api/${serviceId}`, clientVersion]);
    }
    return sections;
};
exports.defaultUserAgent = defaultUserAgent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDREQUE0QjtBQUk1Qjs7O0dBR0c7QUFDSSxNQUFNLGdCQUFnQixHQUMzQixDQUFDLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBMkIsRUFBdUIsRUFBRSxDQUMvRSxLQUFLLElBQUksRUFBRTs7SUFDVCxNQUFNLFFBQVEsR0FDWixPQUFPLE1BQU0sS0FBSyxXQUFXLEtBQUksTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsU0FBUywwQ0FBRSxTQUFTLENBQUE7UUFDM0QsQ0FBQyxDQUFDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDaEIsTUFBTSxRQUFRLEdBQWM7UUFDMUIsZUFBZTtRQUNmLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztRQUM3QixjQUFjO1FBQ2QsQ0FBQyxNQUFNLENBQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsRUFBRSwwQ0FBRSxJQUFJLEtBQUksT0FBTyxFQUFFLEVBQUUsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsRUFBRSwwQ0FBRSxPQUFPLENBQUM7UUFDOUQsb0JBQW9CO1FBQ3BCLDJDQUEyQztRQUMzQyxDQUFDLFNBQVMsQ0FBQztRQUNYLDhCQUE4QjtRQUM5QixDQUFDLFlBQVksRUFBRSxHQUFHLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxJQUFJLG1DQUFJLFNBQVMsSUFBSSxNQUFBLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sMENBQUUsT0FBTyxtQ0FBSSxTQUFTLEVBQUUsQ0FBQztLQUNyRyxDQUFDO0lBRUYsSUFBSSxTQUFTLEVBQUU7UUFDYixlQUFlO1FBQ2YsK0NBQStDO1FBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLFNBQVMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7S0FDcEQ7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUExQlMsUUFBQSxnQkFBZ0Isb0JBMEJ6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyLCBVc2VyQWdlbnQgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCBib3dzZXIgZnJvbSBcImJvd3NlclwiO1xuXG5pbXBvcnQgeyBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb25zXCI7XG5cbi8qKlxuICogRGVmYXVsdCBwcm92aWRlciB0byB0aGUgdXNlciBhZ2VudCBpbiBicm93c2Vycy4gSXQncyBhIGJlc3QgZWZmb3J0IHRvIGluZmVyXG4gKiB0aGUgZGV2aWNlIGluZm9ybWF0aW9uLiBJdCB1c2VzIGJvd3NlciBsaWJyYXJ5IHRvIGRldGVjdCB0aGUgYnJvd3NlciBhbmQgdmVyc2lvblxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFVzZXJBZ2VudCA9XG4gICh7IHNlcnZpY2VJZCwgY2xpZW50VmVyc2lvbiB9OiBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyk6IFByb3ZpZGVyPFVzZXJBZ2VudD4gPT5cbiAgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFVBID1cbiAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Py5uYXZpZ2F0b3I/LnVzZXJBZ2VudFxuICAgICAgICA/IGJvd3Nlci5wYXJzZSh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc2VjdGlvbnM6IFVzZXJBZ2VudCA9IFtcbiAgICAgIC8vIHNkay1tZXRhZGF0YVxuICAgICAgW1wiYXdzLXNkay1qc1wiLCBjbGllbnRWZXJzaW9uXSxcbiAgICAgIC8vIG9zLW1ldGFkYXRhXG4gICAgICBbYG9zLyR7cGFyc2VkVUE/Lm9zPy5uYW1lIHx8IFwib3RoZXJcIn1gLCBwYXJzZWRVQT8ub3M/LnZlcnNpb25dLFxuICAgICAgLy8gbGFuZ3VhZ2UtbWV0YWRhdGFcbiAgICAgIC8vIEVDTUFTY3JpcHQgZWRpdGlvbiBkb2Vzbid0IG1hdHRlciBpbiBKUy5cbiAgICAgIFtcImxhbmcvanNcIl0sXG4gICAgICAvLyBicm93c2VyIHZlbmRvciBhbmQgdmVyc2lvbi5cbiAgICAgIFtcIm1kL2Jyb3dzZXJcIiwgYCR7cGFyc2VkVUE/LmJyb3dzZXI/Lm5hbWUgPz8gXCJ1bmtub3duXCJ9XyR7cGFyc2VkVUE/LmJyb3dzZXI/LnZlcnNpb24gPz8gXCJ1bmtub3duXCJ9YF0sXG4gICAgXTtcblxuICAgIGlmIChzZXJ2aWNlSWQpIHtcbiAgICAgIC8vIGFwaS1tZXRhZGF0YVxuICAgICAgLy8gc2VydmljZSBJZCBtYXkgbm90IGFwcGVhciBpbiBub24tQVdTIGNsaWVudHNcbiAgICAgIHNlY3Rpb25zLnB1c2goW2BhcGkvJHtzZXJ2aWNlSWR9YCwgY2xpZW50VmVyc2lvbl0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWN0aW9ucztcbiAgfTtcbiJdfQ==