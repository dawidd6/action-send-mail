"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha256 = void 0;
var util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
var isEmptyData_1 = require("./isEmptyData");
var constants_1 = require("./constants");
var util_locate_window_1 = require("@aws-sdk/util-locate-window");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        this.toHash = new Uint8Array(0);
        if (secret !== void 0) {
            this.key = new Promise(function (resolve, reject) {
                util_locate_window_1.locateWindow()
                    .crypto.subtle.importKey("raw", convertToBuffer(secret), constants_1.SHA_256_HMAC_ALGO, false, ["sign"])
                    .then(resolve, reject);
            });
            this.key.catch(function () { });
        }
    }
    Sha256.prototype.update = function (data) {
        if (isEmptyData_1.isEmptyData(data)) {
            return;
        }
        var update = convertToBuffer(data);
        var typedArray = new Uint8Array(this.toHash.byteLength + update.byteLength);
        typedArray.set(this.toHash, 0);
        typedArray.set(update, this.toHash.byteLength);
        this.toHash = typedArray;
    };
    Sha256.prototype.digest = function () {
        var _this = this;
        if (this.key) {
            return this.key.then(function (key) {
                return util_locate_window_1.locateWindow()
                    .crypto.subtle.sign(constants_1.SHA_256_HMAC_ALGO, key, _this.toHash)
                    .then(function (data) { return new Uint8Array(data); });
            });
        }
        if (isEmptyData_1.isEmptyData(this.toHash)) {
            return Promise.resolve(constants_1.EMPTY_DATA_SHA_256);
        }
        return Promise.resolve()
            .then(function () {
            return util_locate_window_1.locateWindow().crypto.subtle.digest(constants_1.SHA_256_HASH, _this.toHash);
        })
            .then(function (data) { return Promise.resolve(new Uint8Array(data)); });
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
function convertToBuffer(data) {
    if (typeof data === "string") {
        return util_utf8_browser_1.fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}
//# sourceMappingURL=webCryptoSha256.js.map