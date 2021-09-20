/**
 * Lazy String holder for JSON typed contents.
 */
import { __extends, __read, __spreadArray } from "tslib";
/**
 * Because of https://github.com/microsoft/tslib/issues/95,
 * TS 'extends' shim doesn't support extending native types like String.
 * So here we create StringWrapper that duplicate everything from String
 * class including its prototype chain. So we can extend from here.
 */
// @ts-ignore StringWrapper implementation is not a simple constructor
export var StringWrapper = function () {
    //@ts-ignore 'this' cannot be assigned to any, but Object.getPrototypeOf accepts any
    var Class = Object.getPrototypeOf(this).constructor;
    var Constructor = Function.bind.apply(String, __spreadArray([null], __read(arguments)));
    //@ts-ignore Call wrapped String constructor directly, don't bother typing it.
    var instance = new Constructor();
    Object.setPrototypeOf(instance, Class.prototype);
    return instance;
};
StringWrapper.prototype = Object.create(String.prototype, {
    constructor: {
        value: StringWrapper,
        enumerable: false,
        writable: true,
        configurable: true,
    },
});
Object.setPrototypeOf(StringWrapper, String);
var LazyJsonString = /** @class */ (function (_super) {
    __extends(LazyJsonString, _super);
    function LazyJsonString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyJsonString.prototype.deserializeJSON = function () {
        return JSON.parse(_super.prototype.toString.call(this));
    };
    LazyJsonString.prototype.toJSON = function () {
        return _super.prototype.toString.call(this);
    };
    LazyJsonString.fromObject = function (object) {
        if (object instanceof LazyJsonString) {
            return object;
        }
        else if (object instanceof String || typeof object === "string") {
            return new LazyJsonString(object);
        }
        return new LazyJsonString(JSON.stringify(object));
    };
    return LazyJsonString;
}(StringWrapper));
export { LazyJsonString };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1qc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xhenktanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFNSDs7Ozs7R0FLRztBQUNILHNFQUFzRTtBQUN0RSxNQUFNLENBQUMsSUFBTSxhQUFhLEdBQWtCO0lBQzFDLG9GQUFvRjtJQUNwRixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUN0RCxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLGlCQUFHLElBQVcsVUFBSyxTQUFTLEdBQUUsQ0FBQztJQUM3RSw4RUFBOEU7SUFDOUUsSUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUNuQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsT0FBTyxRQUFrQixDQUFDO0FBQzVCLENBQUMsQ0FBQztBQUNGLGFBQWEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO0lBQ3hELFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsWUFBWSxFQUFFLElBQUk7S0FDbkI7Q0FDRixDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUU3QztJQUFvQyxrQ0FBYTtJQUFqRDs7SUFpQkEsQ0FBQztJQWhCQyx3Q0FBZSxHQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFNLFFBQVEsV0FBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxPQUFPLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSx5QkFBVSxHQUFqQixVQUFrQixNQUFXO1FBQzNCLElBQUksTUFBTSxZQUFZLGNBQWMsRUFBRTtZQUNwQyxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBSSxNQUFNLFlBQVksTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUNqRSxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUFvQyxhQUFhLEdBaUJoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGF6eSBTdHJpbmcgaG9sZGVyIGZvciBKU09OIHR5cGVkIGNvbnRlbnRzLlxuICovXG5cbmludGVyZmFjZSBTdHJpbmdXcmFwcGVyIHtcbiAgbmV3IChhcmc6IGFueSk6IFN0cmluZztcbn1cblxuLyoqXG4gKiBCZWNhdXNlIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvdHNsaWIvaXNzdWVzLzk1LFxuICogVFMgJ2V4dGVuZHMnIHNoaW0gZG9lc24ndCBzdXBwb3J0IGV4dGVuZGluZyBuYXRpdmUgdHlwZXMgbGlrZSBTdHJpbmcuXG4gKiBTbyBoZXJlIHdlIGNyZWF0ZSBTdHJpbmdXcmFwcGVyIHRoYXQgZHVwbGljYXRlIGV2ZXJ5dGhpbmcgZnJvbSBTdHJpbmdcbiAqIGNsYXNzIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlIGNoYWluLiBTbyB3ZSBjYW4gZXh0ZW5kIGZyb20gaGVyZS5cbiAqL1xuLy8gQHRzLWlnbm9yZSBTdHJpbmdXcmFwcGVyIGltcGxlbWVudGF0aW9uIGlzIG5vdCBhIHNpbXBsZSBjb25zdHJ1Y3RvclxuZXhwb3J0IGNvbnN0IFN0cmluZ1dyYXBwZXI6IFN0cmluZ1dyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8vQHRzLWlnbm9yZSAndGhpcycgY2Fubm90IGJlIGFzc2lnbmVkIHRvIGFueSwgYnV0IE9iamVjdC5nZXRQcm90b3R5cGVPZiBhY2NlcHRzIGFueVxuICBjb25zdCBDbGFzcyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjtcbiAgY29uc3QgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFN0cmluZywgW251bGwgYXMgYW55LCAuLi5hcmd1bWVudHNdKTtcbiAgLy9AdHMtaWdub3JlIENhbGwgd3JhcHBlZCBTdHJpbmcgY29uc3RydWN0b3IgZGlyZWN0bHksIGRvbid0IGJvdGhlciB0eXBpbmcgaXQuXG4gIGNvbnN0IGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKCk7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTtcbiAgcmV0dXJuIGluc3RhbmNlIGFzIFN0cmluZztcbn07XG5TdHJpbmdXcmFwcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3RyaW5nLnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3Rvcjoge1xuICAgIHZhbHVlOiBTdHJpbmdXcmFwcGVyLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSxcbn0pO1xuT2JqZWN0LnNldFByb3RvdHlwZU9mKFN0cmluZ1dyYXBwZXIsIFN0cmluZyk7XG5cbmV4cG9ydCBjbGFzcyBMYXp5SnNvblN0cmluZyBleHRlbmRzIFN0cmluZ1dyYXBwZXIge1xuICBkZXNlcmlhbGl6ZUpTT04oKTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzdXBlci50b1N0cmluZygpKTtcbiAgfVxuXG4gIHRvSlNPTigpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdXBlci50b1N0cmluZygpO1xuICB9XG5cbiAgc3RhdGljIGZyb21PYmplY3Qob2JqZWN0OiBhbnkpOiBMYXp5SnNvblN0cmluZyB7XG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIExhenlKc29uU3RyaW5nKSB7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgU3RyaW5nIHx8IHR5cGVvZiBvYmplY3QgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBuZXcgTGF6eUpzb25TdHJpbmcob2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMYXp5SnNvblN0cmluZyhKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiAgfVxufVxuIl19