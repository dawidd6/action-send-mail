"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUserAgent = void 0;
/**
 * Default provider to the user agent in ReactNative. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and virsion
 */
const defaultUserAgent = ({ serviceId, clientVersion }) => async () => {
    const sections = [
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
        sections.push([`api/${serviceId}`, clientVersion]);
    }
    return sections;
};
exports.defaultUserAgent = defaultUserAgent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubmF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luZGV4Lm5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQTs7O0dBR0c7QUFDSSxNQUFNLGdCQUFnQixHQUMzQixDQUFDLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBMkIsRUFBdUIsRUFBRSxDQUMvRSxLQUFLLElBQUksRUFBRTtJQUNULE1BQU0sUUFBUSxHQUFjO1FBQzFCLGVBQWU7UUFDZixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7UUFDN0IsY0FBYztRQUNkLENBQUMsVUFBVSxDQUFDO1FBQ1osb0JBQW9CO1FBQ3BCLDJDQUEyQztRQUMzQyxDQUFDLFNBQVMsQ0FBQztRQUNYLENBQUMsT0FBTyxDQUFDO0tBQ1YsQ0FBQztJQUVGLElBQUksU0FBUyxFQUFFO1FBQ2IsZUFBZTtRQUNmLCtDQUErQztRQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxTQUFTLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBckJTLFFBQUEsZ0JBQWdCLG9CQXFCekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciwgVXNlckFnZW50IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmltcG9ydCB7IERlZmF1bHRVc2VyQWdlbnRPcHRpb25zIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbnNcIjtcblxuLyoqXG4gKiBEZWZhdWx0IHByb3ZpZGVyIHRvIHRoZSB1c2VyIGFnZW50IGluIFJlYWN0TmF0aXZlLiBJdCdzIGEgYmVzdCBlZmZvcnQgdG8gaW5mZXJcbiAqIHRoZSBkZXZpY2UgaW5mb3JtYXRpb24uIEl0IHVzZXMgYm93c2VyIGxpYnJhcnkgdG8gZGV0ZWN0IHRoZSBicm93c2VyIGFuZCB2aXJzaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0VXNlckFnZW50ID1cbiAgKHsgc2VydmljZUlkLCBjbGllbnRWZXJzaW9uIH06IERlZmF1bHRVc2VyQWdlbnRPcHRpb25zKTogUHJvdmlkZXI8VXNlckFnZW50PiA9PlxuICBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc2VjdGlvbnM6IFVzZXJBZ2VudCA9IFtcbiAgICAgIC8vIHNkay1tZXRhZGF0YVxuICAgICAgW1wiYXdzLXNkay1qc1wiLCBjbGllbnRWZXJzaW9uXSxcbiAgICAgIC8vIG9zLW1ldGFkYXRhXG4gICAgICBbXCJvcy9vdGhlclwiXSxcbiAgICAgIC8vIGxhbmd1YWdlLW1ldGFkYXRhXG4gICAgICAvLyBFQ01BU2NyaXB0IGVkaXRpb24gZG9lc24ndCBtYXR0ZXIgaW4gSlMuXG4gICAgICBbXCJsYW5nL2pzXCJdLFxuICAgICAgW1wibWQvcm5cIl0sXG4gICAgXTtcblxuICAgIGlmIChzZXJ2aWNlSWQpIHtcbiAgICAgIC8vIGFwaS1tZXRhZGF0YVxuICAgICAgLy8gc2VydmljZSBJZCBtYXkgbm90IGFwcGVhciBpbiBub24tQVdTIGNsaWVudHNcbiAgICAgIHNlY3Rpb25zLnB1c2goW2BhcGkvJHtzZXJ2aWNlSWR9YCwgY2xpZW50VmVyc2lvbl0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWN0aW9ucztcbiAgfTtcbiJdfQ==