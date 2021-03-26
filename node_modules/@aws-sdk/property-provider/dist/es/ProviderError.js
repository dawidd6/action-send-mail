import { __extends } from "tslib";
/**
 * An error representing a failure of an individual credential provider.
 *
 * This error class has special meaning to the {@link chain} method. If a
 * provider in the chain is rejected with an error, the chain will only proceed
 * to the next provider if the value of the `tryNextLink` property on the error
 * is truthy. This allows individual providers to halt the chain and also
 * ensures the chain will stop if an entirely unexpected error is encountered.
 */
var ProviderError = /** @class */ (function (_super) {
    __extends(ProviderError, _super);
    function ProviderError(message, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        var _this = _super.call(this, message) || this;
        _this.tryNextLink = tryNextLink;
        return _this;
    }
    ProviderError.from = function (error, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        Object.defineProperty(error, "tryNextLink", {
            value: tryNextLink,
            configurable: false,
            enumerable: false,
            writable: false,
        });
        return error;
    };
    return ProviderError;
}(Error));
export { ProviderError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm92aWRlckVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7R0FRRztBQUNIO0lBQW1DLGlDQUFLO0lBQ3RDLHVCQUFZLE9BQWUsRUFBa0IsV0FBMkI7UUFBM0IsNEJBQUEsRUFBQSxrQkFBMkI7UUFBeEUsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FDZjtRQUY0QyxpQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7O0lBRXhFLENBQUM7SUFDTSxrQkFBSSxHQUFYLFVBQVksS0FBWSxFQUFFLFdBQWtCO1FBQWxCLDRCQUFBLEVBQUEsa0JBQWtCO1FBQzFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRTtZQUMxQyxLQUFLLEVBQUUsV0FBVztZQUNsQixZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFDSCxPQUFPLEtBQXNCLENBQUM7SUFDaEMsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQWJELENBQW1DLEtBQUssR0FhdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGVycm9yIHJlcHJlc2VudGluZyBhIGZhaWx1cmUgb2YgYW4gaW5kaXZpZHVhbCBjcmVkZW50aWFsIHByb3ZpZGVyLlxuICpcbiAqIFRoaXMgZXJyb3IgY2xhc3MgaGFzIHNwZWNpYWwgbWVhbmluZyB0byB0aGUge0BsaW5rIGNoYWlufSBtZXRob2QuIElmIGFcbiAqIHByb3ZpZGVyIGluIHRoZSBjaGFpbiBpcyByZWplY3RlZCB3aXRoIGFuIGVycm9yLCB0aGUgY2hhaW4gd2lsbCBvbmx5IHByb2NlZWRcbiAqIHRvIHRoZSBuZXh0IHByb3ZpZGVyIGlmIHRoZSB2YWx1ZSBvZiB0aGUgYHRyeU5leHRMaW5rYCBwcm9wZXJ0eSBvbiB0aGUgZXJyb3JcbiAqIGlzIHRydXRoeS4gVGhpcyBhbGxvd3MgaW5kaXZpZHVhbCBwcm92aWRlcnMgdG8gaGFsdCB0aGUgY2hhaW4gYW5kIGFsc29cbiAqIGVuc3VyZXMgdGhlIGNoYWluIHdpbGwgc3RvcCBpZiBhbiBlbnRpcmVseSB1bmV4cGVjdGVkIGVycm9yIGlzIGVuY291bnRlcmVkLlxuICovXG5leHBvcnQgY2xhc3MgUHJvdmlkZXJFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBwdWJsaWMgcmVhZG9ubHkgdHJ5TmV4dExpbms6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gIH1cbiAgc3RhdGljIGZyb20oZXJyb3I6IEVycm9yLCB0cnlOZXh0TGluayA9IHRydWUpOiBQcm92aWRlckVycm9yIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyb3IsIFwidHJ5TmV4dExpbmtcIiwge1xuICAgICAgdmFsdWU6IHRyeU5leHRMaW5rLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIHJldHVybiBlcnJvciBhcyBQcm92aWRlckVycm9yO1xuICB9XG59XG4iXX0=