"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha256 = void 0;
var isEmptyData_1 = require("./isEmptyData");
var constants_1 = require("./constants");
var util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
var util_locate_window_1 = require("@aws-sdk/util-locate-window");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        if (secret) {
            this.operation = getKeyPromise(secret).then(function (keyData) {
                return util_locate_window_1.locateWindow().msCrypto.subtle.sign(constants_1.SHA_256_HMAC_ALGO, keyData);
            });
            this.operation.catch(function () { });
        }
        else {
            this.operation = Promise.resolve(util_locate_window_1.locateWindow().msCrypto.subtle.digest("SHA-256"));
        }
    }
    Sha256.prototype.update = function (toHash) {
        var _this = this;
        if (isEmptyData_1.isEmptyData(toHash)) {
            return;
        }
        this.operation = this.operation.then(function (operation) {
            operation.onerror = function () {
                _this.operation = Promise.reject(new Error("Error encountered updating hash"));
            };
            operation.process(toArrayBufferView(toHash));
            return operation;
        });
        this.operation.catch(function () { });
    };
    Sha256.prototype.digest = function () {
        return this.operation.then(function (operation) {
            return new Promise(function (resolve, reject) {
                operation.onerror = function () {
                    reject("Error encountered finalizing hash");
                };
                operation.oncomplete = function () {
                    if (operation.result) {
                        resolve(new Uint8Array(operation.result));
                    }
                    reject("Error encountered finalizing hash");
                };
                operation.finish();
            });
        });
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
function getKeyPromise(secret) {
    return new Promise(function (resolve, reject) {
        var keyOperation = util_locate_window_1.locateWindow().msCrypto.subtle.importKey("raw", toArrayBufferView(secret), constants_1.SHA_256_HMAC_ALGO, false, ["sign"]);
        keyOperation.oncomplete = function () {
            if (keyOperation.result) {
                resolve(keyOperation.result);
            }
            reject("ImportKey completed without importing key.");
        };
        keyOperation.onerror = function () {
            reject("ImportKey failed to import key.");
        };
    });
}
function toArrayBufferView(data) {
    if (typeof data === "string") {
        return util_utf8_browser_1.fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}
//# sourceMappingURL=ie11Sha256.js.map