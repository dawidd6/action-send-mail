import { __assign, __read, __rest, __spreadArray } from "tslib";
/**
 * @internal
 */
export function cloneRequest(_a) {
    var headers = _a.headers, query = _a.query, rest = __rest(_a, ["headers", "query"]);
    return __assign(__assign({}, rest), { headers: __assign({}, headers), query: query ? cloneQuery(query) : undefined });
}
function cloneQuery(query) {
    return Object.keys(query).reduce(function (carry, paramName) {
        var _a;
        var param = query[paramName];
        return __assign(__assign({}, carry), (_a = {}, _a[paramName] = Array.isArray(param) ? __spreadArray([], __read(param)) : param, _a));
    }, {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvbmVSZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Nsb25lUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7O0dBRUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLEVBQXdDO0lBQXRDLElBQUEsT0FBTyxhQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUssSUFBSSxjQUF6QixvQkFBMkIsQ0FBRjtJQUNwRCw2QkFDSyxJQUFJLEtBQ1AsT0FBTyxlQUFPLE9BQU8sR0FDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQzVDO0FBQ0osQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQXdCO0lBQzFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUF3QixFQUFFLFNBQWlCOztRQUMzRSxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsNkJBQ0ssS0FBSyxnQkFDUCxTQUFTLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDBCQUFLLEtBQUssR0FBRSxDQUFDLENBQUMsS0FBSyxPQUN0RDtJQUNKLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCwgUXVlcnlQYXJhbWV0ZXJCYWcgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb25lUmVxdWVzdCh7IGhlYWRlcnMsIHF1ZXJ5LCAuLi5yZXN0IH06IEh0dHBSZXF1ZXN0KTogSHR0cFJlcXVlc3Qge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3QsXG4gICAgaGVhZGVyczogeyAuLi5oZWFkZXJzIH0sXG4gICAgcXVlcnk6IHF1ZXJ5ID8gY2xvbmVRdWVyeShxdWVyeSkgOiB1bmRlZmluZWQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsb25lUXVlcnkocXVlcnk6IFF1ZXJ5UGFyYW1ldGVyQmFnKTogUXVlcnlQYXJhbWV0ZXJCYWcge1xuICByZXR1cm4gT2JqZWN0LmtleXMocXVlcnkpLnJlZHVjZSgoY2Fycnk6IFF1ZXJ5UGFyYW1ldGVyQmFnLCBwYXJhbU5hbWU6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHBhcmFtID0gcXVlcnlbcGFyYW1OYW1lXTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uY2FycnksXG4gICAgICBbcGFyYW1OYW1lXTogQXJyYXkuaXNBcnJheShwYXJhbSkgPyBbLi4ucGFyYW1dIDogcGFyYW0sXG4gICAgfTtcbiAgfSwge30pO1xufVxuIl19