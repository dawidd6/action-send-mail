"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha256 = void 0;
var ie11Sha256_1 = require("./ie11Sha256");
var webCryptoSha256_1 = require("./webCryptoSha256");
var sha256_js_1 = require("@aws-crypto/sha256-js");
var supports_web_crypto_1 = require("@aws-crypto/supports-web-crypto");
var ie11_detection_1 = require("@aws-crypto/ie11-detection");
var util_locate_window_1 = require("@aws-sdk/util-locate-window");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        if (supports_web_crypto_1.supportsWebCrypto(util_locate_window_1.locateWindow())) {
            this.hash = new webCryptoSha256_1.Sha256(secret);
        }
        else if (ie11_detection_1.isMsWindow(util_locate_window_1.locateWindow())) {
            this.hash = new ie11Sha256_1.Sha256(secret);
        }
        else {
            this.hash = new sha256_js_1.Sha256(secret);
        }
    }
    Sha256.prototype.update = function (data, encoding) {
        this.hash.update(data, encoding);
    };
    Sha256.prototype.digest = function () {
        return this.hash.digest();
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
//# sourceMappingURL=crossPlatformSha256.js.map