import { __awaiter, __generator } from "tslib";
import { fromBase64 } from "@aws-sdk/util-base64-browser";
//reference: https://snack.expo.io/r1JCSWRGU
export var streamCollector = function (stream) {
    if (typeof Blob === "function" && stream instanceof Blob) {
        return collectBlob(stream);
    }
    return collectStream(stream);
};
function collectBlob(blob) {
    return __awaiter(this, void 0, void 0, function () {
        var base64, arrayBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readToBase64(blob)];
                case 1:
                    base64 = _a.sent();
                    arrayBuffer = fromBase64(base64);
                    return [2 /*return*/, new Uint8Array(arrayBuffer)];
            }
        });
    });
}
function collectStream(stream) {
    return __awaiter(this, void 0, void 0, function () {
        var res, reader, isDone, _a, done, value, prior;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = new Uint8Array(0);
                    reader = stream.getReader();
                    isDone = false;
                    _b.label = 1;
                case 1:
                    if (!!isDone) return [3 /*break*/, 3];
                    return [4 /*yield*/, reader.read()];
                case 2:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (value) {
                        prior = res;
                        res = new Uint8Array(prior.length + value.length);
                        res.set(prior);
                        res.set(value, prior.length);
                    }
                    isDone = done;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, res];
            }
        });
    });
}
function readToBase64(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function () {
            var _a;
            // reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
            // response from readAsDataURL is always prepended with "data:*/*;base64,"
            if (reader.readyState !== 2) {
                return reject(new Error("Reader aborted too early"));
            }
            var result = ((_a = reader.result) !== null && _a !== void 0 ? _a : "");
            // Response can include only 'data:' for empty blob, return empty string in this case.
            // Otherwise, return the string after ','
            var commaIndex = result.indexOf(",");
            var dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
            resolve(result.substring(dataOffset));
        };
        reader.onabort = function () { return reject(new Error("Read aborted")); };
        reader.onerror = function () { return reject(reader.error); };
        // reader.readAsArrayBuffer is not always available
        reader.readAsDataURL(blob);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLWNvbGxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJlYW0tY29sbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsNENBQTRDO0FBQzVDLE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBb0IsVUFBQyxNQUE2QjtJQUM1RSxJQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVUsSUFBSSxNQUFNLFlBQVksSUFBSSxFQUFFO1FBQ3hELE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVCO0lBRUQsT0FBTyxhQUFhLENBQUMsTUFBd0IsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQztBQUVGLFNBQWUsV0FBVyxDQUFDLElBQVU7Ozs7O3dCQUNwQixxQkFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUFqQyxNQUFNLEdBQUcsU0FBd0I7b0JBQ2pDLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZDLHNCQUFPLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFDOzs7O0NBQ3BDO0FBRUQsU0FBZSxhQUFhLENBQUMsTUFBc0I7Ozs7OztvQkFDN0MsR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM5QixNQUFNLEdBQUcsS0FBSyxDQUFDOzs7eUJBQ1osQ0FBQyxNQUFNO29CQUNZLHFCQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQTs7b0JBQXJDLEtBQWtCLFNBQW1CLEVBQW5DLElBQUksVUFBQSxFQUFFLEtBQUssV0FBQTtvQkFDbkIsSUFBSSxLQUFLLEVBQUU7d0JBQ0gsS0FBSyxHQUFHLEdBQUcsQ0FBQzt3QkFDbEIsR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNsRCxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDOUI7b0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQzs7d0JBRWhCLHNCQUFPLEdBQUcsRUFBQzs7OztDQUNaO0FBRUQsU0FBUyxZQUFZLENBQUMsSUFBVTtJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsU0FBUyxHQUFHOztZQUNqQix1RkFBdUY7WUFDdkYsMEVBQTBFO1lBQzFFLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQzthQUN0RDtZQUNELElBQU0sTUFBTSxHQUFHLENBQUMsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQVcsQ0FBQztZQUMvQyxzRkFBc0Y7WUFDdEYseUNBQXlDO1lBQ3pDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBTSxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFNLE9BQUEsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQWpDLENBQWlDLENBQUM7UUFDekQsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFNLE9BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQztRQUM1QyxtREFBbUQ7UUFDbkQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHJlYW1Db2xsZWN0b3IgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IGZyb21CYXNlNjQgfSBmcm9tIFwiQGF3cy1zZGsvdXRpbC1iYXNlNjQtYnJvd3NlclwiO1xuXG4vL3JlZmVyZW5jZTogaHR0cHM6Ly9zbmFjay5leHBvLmlvL3IxSkNTV1JHVVxuZXhwb3J0IGNvbnN0IHN0cmVhbUNvbGxlY3RvcjogU3RyZWFtQ29sbGVjdG9yID0gKHN0cmVhbTogQmxvYiB8IFJlYWRhYmxlU3RyZWFtKTogUHJvbWlzZTxVaW50OEFycmF5PiA9PiB7XG4gIGlmICh0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmIHN0cmVhbSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICByZXR1cm4gY29sbGVjdEJsb2Ioc3RyZWFtKTtcbiAgfVxuXG4gIHJldHVybiBjb2xsZWN0U3RyZWFtKHN0cmVhbSBhcyBSZWFkYWJsZVN0cmVhbSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBjb2xsZWN0QmxvYihibG9iOiBCbG9iKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gIGNvbnN0IGJhc2U2NCA9IGF3YWl0IHJlYWRUb0Jhc2U2NChibG9iKTtcbiAgY29uc3QgYXJyYXlCdWZmZXIgPSBmcm9tQmFzZTY0KGJhc2U2NCk7XG4gIHJldHVybiBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbGxlY3RTdHJlYW0oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbSk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICBsZXQgcmVzID0gbmV3IFVpbnQ4QXJyYXkoMCk7XG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgbGV0IGlzRG9uZSA9IGZhbHNlO1xuICB3aGlsZSAoIWlzRG9uZSkge1xuICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBwcmlvciA9IHJlcztcbiAgICAgIHJlcyA9IG5ldyBVaW50OEFycmF5KHByaW9yLmxlbmd0aCArIHZhbHVlLmxlbmd0aCk7XG4gICAgICByZXMuc2V0KHByaW9yKTtcbiAgICAgIHJlcy5zZXQodmFsdWUsIHByaW9yLmxlbmd0aCk7XG4gICAgfVxuICAgIGlzRG9uZSA9IGRvbmU7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gcmVhZFRvQmFzZTY0KGJsb2I6IEJsb2IpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIC8vIHJlZmVyZW5jZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZpbGVSZWFkZXIvcmVhZEFzRGF0YVVSTFxuICAgICAgLy8gcmVzcG9uc2UgZnJvbSByZWFkQXNEYXRhVVJMIGlzIGFsd2F5cyBwcmVwZW5kZWQgd2l0aCBcImRhdGE6Ki8qO2Jhc2U2NCxcIlxuICAgICAgaWYgKHJlYWRlci5yZWFkeVN0YXRlICE9PSAyKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKFwiUmVhZGVyIGFib3J0ZWQgdG9vIGVhcmx5XCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IChyZWFkZXIucmVzdWx0ID8/IFwiXCIpIGFzIHN0cmluZztcbiAgICAgIC8vIFJlc3BvbnNlIGNhbiBpbmNsdWRlIG9ubHkgJ2RhdGE6JyBmb3IgZW1wdHkgYmxvYiwgcmV0dXJuIGVtcHR5IHN0cmluZyBpbiB0aGlzIGNhc2UuXG4gICAgICAvLyBPdGhlcndpc2UsIHJldHVybiB0aGUgc3RyaW5nIGFmdGVyICcsJ1xuICAgICAgY29uc3QgY29tbWFJbmRleCA9IHJlc3VsdC5pbmRleE9mKFwiLFwiKTtcbiAgICAgIGNvbnN0IGRhdGFPZmZzZXQgPSBjb21tYUluZGV4ID4gLTEgPyBjb21tYUluZGV4ICsgMSA6IHJlc3VsdC5sZW5ndGg7XG4gICAgICByZXNvbHZlKHJlc3VsdC5zdWJzdHJpbmcoZGF0YU9mZnNldCkpO1xuICAgIH07XG4gICAgcmVhZGVyLm9uYWJvcnQgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKFwiUmVhZCBhYm9ydGVkXCIpKTtcbiAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHJlamVjdChyZWFkZXIuZXJyb3IpO1xuICAgIC8vIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlciBpcyBub3QgYWx3YXlzIGF2YWlsYWJsZVxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICB9KTtcbn1cbiJdfQ==