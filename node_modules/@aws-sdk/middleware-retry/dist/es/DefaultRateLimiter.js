import { __awaiter, __generator } from "tslib";
import { isThrottlingError } from "@aws-sdk/service-error-classification";
var DefaultRateLimiter = /** @class */ (function () {
    function DefaultRateLimiter(options) {
        var _a, _b, _c, _d, _e;
        // Pre-set state variables
        this.currentCapacity = 0;
        this.enabled = false;
        this.lastMaxRate = 0;
        this.measuredTxRate = 0;
        this.requestCount = 0;
        this.lastTimestamp = 0;
        this.timeWindow = 0;
        this.beta = (_a = options === null || options === void 0 ? void 0 : options.beta) !== null && _a !== void 0 ? _a : 0.7;
        this.minCapacity = (_b = options === null || options === void 0 ? void 0 : options.minCapacity) !== null && _b !== void 0 ? _b : 1;
        this.minFillRate = (_c = options === null || options === void 0 ? void 0 : options.minFillRate) !== null && _c !== void 0 ? _c : 0.5;
        this.scaleConstant = (_d = options === null || options === void 0 ? void 0 : options.scaleConstant) !== null && _d !== void 0 ? _d : 0.4;
        this.smooth = (_e = options === null || options === void 0 ? void 0 : options.smooth) !== null && _e !== void 0 ? _e : 0.8;
        var currentTimeInSeconds = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = currentTimeInSeconds;
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
    }
    DefaultRateLimiter.prototype.getCurrentTimeInSeconds = function () {
        return Date.now() / 1000;
    };
    DefaultRateLimiter.prototype.getSendToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.acquireTokenBucket(1)];
            });
        });
    };
    DefaultRateLimiter.prototype.acquireTokenBucket = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var delay_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Client side throttling is not enabled until we see a throttling error.
                        if (!this.enabled) {
                            return [2 /*return*/];
                        }
                        this.refillTokenBucket();
                        if (!(amount > this.currentCapacity)) return [3 /*break*/, 2];
                        delay_1 = ((amount - this.currentCapacity) / this.fillRate) * 1000;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.currentCapacity = this.currentCapacity - amount;
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultRateLimiter.prototype.refillTokenBucket = function () {
        var timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
            return;
        }
        var fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
        this.lastTimestamp = timestamp;
    };
    DefaultRateLimiter.prototype.updateClientSendingRate = function (response) {
        var calculatedRate;
        this.updateMeasuredRate();
        if (isThrottlingError(response)) {
            var rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
            this.lastMaxRate = rateToUse;
            this.calculateTimeWindow();
            this.lastThrottleTime = this.getCurrentTimeInSeconds();
            calculatedRate = this.cubicThrottle(rateToUse);
            this.enableTokenBucket();
        }
        else {
            this.calculateTimeWindow();
            calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        var newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
    };
    DefaultRateLimiter.prototype.calculateTimeWindow = function () {
        this.timeWindow = this.getPrecise(Math.pow((this.lastMaxRate * (1 - this.beta)) / this.scaleConstant, 1 / 3));
    };
    DefaultRateLimiter.prototype.cubicThrottle = function (rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
    };
    DefaultRateLimiter.prototype.cubicSuccess = function (timestamp) {
        return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
    };
    DefaultRateLimiter.prototype.enableTokenBucket = function () {
        this.enabled = true;
    };
    DefaultRateLimiter.prototype.updateTokenBucketRate = function (newRate) {
        // Refill based on our current rate before we update to the new fill rate.
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        // When we scale down we can't have a current capacity that exceeds our maxCapacity.
        this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
    };
    DefaultRateLimiter.prototype.updateMeasuredRate = function () {
        var t = this.getCurrentTimeInSeconds();
        var timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
            var currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
            this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
            this.requestCount = 0;
            this.lastTxRateBucket = timeBucket;
        }
    };
    DefaultRateLimiter.prototype.getPrecise = function (num) {
        return parseFloat(num.toFixed(8));
    };
    return DefaultRateLimiter;
}());
export { DefaultRateLimiter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmYXVsdFJhdGVMaW1pdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RlZmF1bHRSYXRlTGltaXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFZMUU7SUF1QkUsNEJBQVksT0FBbUM7O1FBZi9DLDBCQUEwQjtRQUNsQixvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBS2pCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBR2xCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFHckIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLG1DQUFJLEdBQUcsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsbUNBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxtQ0FBSSxHQUFHLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxhQUFhLG1DQUFJLEdBQUcsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sbUNBQUksR0FBRyxDQUFDO1FBRXJDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLG9CQUFvQixD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SSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZELG9GQUFvRjtRQUNwRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVPLCtDQUFrQixHQUExQjtRQUNFLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ3pDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3RDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDM0csSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFTyx1Q0FBVSxHQUFsQixVQUFtQixHQUFXO1FBQzVCLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBeklELElBeUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNUaHJvdHRsaW5nRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvc2VydmljZS1lcnJvci1jbGFzc2lmaWNhdGlvblwiO1xuXG5pbXBvcnQgeyBSYXRlTGltaXRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVmYXVsdFJhdGVMaW1pdGVyT3B0aW9ucyB7XG4gIGJldGE/OiBudW1iZXI7XG4gIG1pbkNhcGFjaXR5PzogbnVtYmVyO1xuICBtaW5GaWxsUmF0ZT86IG51bWJlcjtcbiAgc2NhbGVDb25zdGFudD86IG51bWJlcjtcbiAgc21vb3RoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJhdGVMaW1pdGVyIGltcGxlbWVudHMgUmF0ZUxpbWl0ZXIge1xuICAvLyBVc2VyIGNvbmZpZ3VyYWJsZSBjb25zdGFudHNcbiAgcHJpdmF0ZSBiZXRhOiBudW1iZXI7XG4gIHByaXZhdGUgbWluQ2FwYWNpdHk6IG51bWJlcjtcbiAgcHJpdmF0ZSBtaW5GaWxsUmF0ZTogbnVtYmVyO1xuICBwcml2YXRlIHNjYWxlQ29uc3RhbnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBzbW9vdGg6IG51bWJlcjtcblxuICAvLyBQcmUtc2V0IHN0YXRlIHZhcmlhYmxlc1xuICBwcml2YXRlIGN1cnJlbnRDYXBhY2l0eSA9IDA7XG4gIHByaXZhdGUgZW5hYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIGxhc3RNYXhSYXRlID0gMDtcbiAgcHJpdmF0ZSBtZWFzdXJlZFR4UmF0ZSA9IDA7XG4gIHByaXZhdGUgcmVxdWVzdENvdW50ID0gMDtcblxuICAvLyBPdGhlciBzdGF0ZSB2YXJpYWJsZXNcbiAgcHJpdmF0ZSBmaWxsUmF0ZTogbnVtYmVyO1xuICBwcml2YXRlIGxhc3RUaHJvdHRsZVRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBsYXN0VGltZXN0YW1wID0gMDtcbiAgcHJpdmF0ZSBsYXN0VHhSYXRlQnVja2V0OiBudW1iZXI7XG4gIHByaXZhdGUgbWF4Q2FwYWNpdHk6IG51bWJlcjtcbiAgcHJpdmF0ZSB0aW1lV2luZG93ID0gMDtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogRGVmYXVsdFJhdGVMaW1pdGVyT3B0aW9ucykge1xuICAgIHRoaXMuYmV0YSA9IG9wdGlvbnM/LmJldGEgPz8gMC43O1xuICAgIHRoaXMubWluQ2FwYWNpdHkgPSBvcHRpb25zPy5taW5DYXBhY2l0eSA/PyAxO1xuICAgIHRoaXMubWluRmlsbFJhdGUgPSBvcHRpb25zPy5taW5GaWxsUmF0ZSA/PyAwLjU7XG4gICAgdGhpcy5zY2FsZUNvbnN0YW50ID0gb3B0aW9ucz8uc2NhbGVDb25zdGFudCA/PyAwLjQ7XG4gICAgdGhpcy5zbW9vdGggPSBvcHRpb25zPy5zbW9vdGggPz8gMC44O1xuXG4gICAgY29uc3QgY3VycmVudFRpbWVJblNlY29uZHMgPSB0aGlzLmdldEN1cnJlbnRUaW1lSW5TZWNvbmRzKCk7XG4gICAgdGhpcy5sYXN0VGhyb3R0bGVUaW1lID0gY3VycmVudFRpbWVJblNlY29uZHM7XG4gICAgdGhpcy5sYXN0VHhSYXRlQnVja2V0ID0gTWF0aC5mbG9vcih0aGlzLmdldEN1cnJlbnRUaW1lSW5TZWNvbmRzKCkpO1xuXG4gICAgdGhpcy5maWxsUmF0ZSA9IHRoaXMubWluRmlsbFJhdGU7XG4gICAgdGhpcy5tYXhDYXBhY2l0eSA9IHRoaXMubWluQ2FwYWNpdHk7XG4gIH1cblxuICBwcml2YXRlIGdldEN1cnJlbnRUaW1lSW5TZWNvbmRzKCkge1xuICAgIHJldHVybiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRTZW5kVG9rZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNxdWlyZVRva2VuQnVja2V0KDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhY3F1aXJlVG9rZW5CdWNrZXQoYW1vdW50OiBudW1iZXIpIHtcbiAgICAvLyBDbGllbnQgc2lkZSB0aHJvdHRsaW5nIGlzIG5vdCBlbmFibGVkIHVudGlsIHdlIHNlZSBhIHRocm90dGxpbmcgZXJyb3IuXG4gICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnJlZmlsbFRva2VuQnVja2V0KCk7XG4gICAgaWYgKGFtb3VudCA+IHRoaXMuY3VycmVudENhcGFjaXR5KSB7XG4gICAgICBjb25zdCBkZWxheSA9ICgoYW1vdW50IC0gdGhpcy5jdXJyZW50Q2FwYWNpdHkpIC8gdGhpcy5maWxsUmF0ZSkgKiAxMDAwO1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXkpKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50Q2FwYWNpdHkgPSB0aGlzLmN1cnJlbnRDYXBhY2l0eSAtIGFtb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgcmVmaWxsVG9rZW5CdWNrZXQoKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gdGhpcy5nZXRDdXJyZW50VGltZUluU2Vjb25kcygpO1xuICAgIGlmICghdGhpcy5sYXN0VGltZXN0YW1wKSB7XG4gICAgICB0aGlzLmxhc3RUaW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlsbEFtb3VudCA9ICh0aW1lc3RhbXAgLSB0aGlzLmxhc3RUaW1lc3RhbXApICogdGhpcy5maWxsUmF0ZTtcbiAgICB0aGlzLmN1cnJlbnRDYXBhY2l0eSA9IE1hdGgubWluKHRoaXMubWF4Q2FwYWNpdHksIHRoaXMuY3VycmVudENhcGFjaXR5ICsgZmlsbEFtb3VudCk7XG4gICAgdGhpcy5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNsaWVudFNlbmRpbmdSYXRlKHJlc3BvbnNlOiBhbnkpIHtcbiAgICBsZXQgY2FsY3VsYXRlZFJhdGU6IG51bWJlcjtcbiAgICB0aGlzLnVwZGF0ZU1lYXN1cmVkUmF0ZSgpO1xuXG4gICAgaWYgKGlzVGhyb3R0bGluZ0Vycm9yKHJlc3BvbnNlKSkge1xuICAgICAgY29uc3QgcmF0ZVRvVXNlID0gIXRoaXMuZW5hYmxlZCA/IHRoaXMubWVhc3VyZWRUeFJhdGUgOiBNYXRoLm1pbih0aGlzLm1lYXN1cmVkVHhSYXRlLCB0aGlzLmZpbGxSYXRlKTtcbiAgICAgIHRoaXMubGFzdE1heFJhdGUgPSByYXRlVG9Vc2U7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVRpbWVXaW5kb3coKTtcbiAgICAgIHRoaXMubGFzdFRocm90dGxlVGltZSA9IHRoaXMuZ2V0Q3VycmVudFRpbWVJblNlY29uZHMoKTtcbiAgICAgIGNhbGN1bGF0ZWRSYXRlID0gdGhpcy5jdWJpY1Rocm90dGxlKHJhdGVUb1VzZSk7XG4gICAgICB0aGlzLmVuYWJsZVRva2VuQnVja2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlVGltZVdpbmRvdygpO1xuICAgICAgY2FsY3VsYXRlZFJhdGUgPSB0aGlzLmN1YmljU3VjY2Vzcyh0aGlzLmdldEN1cnJlbnRUaW1lSW5TZWNvbmRzKCkpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1JhdGUgPSBNYXRoLm1pbihjYWxjdWxhdGVkUmF0ZSwgMiAqIHRoaXMubWVhc3VyZWRUeFJhdGUpO1xuICAgIHRoaXMudXBkYXRlVG9rZW5CdWNrZXRSYXRlKG5ld1JhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVUaW1lV2luZG93KCkge1xuICAgIHRoaXMudGltZVdpbmRvdyA9IHRoaXMuZ2V0UHJlY2lzZShNYXRoLnBvdygodGhpcy5sYXN0TWF4UmF0ZSAqICgxIC0gdGhpcy5iZXRhKSkgLyB0aGlzLnNjYWxlQ29uc3RhbnQsIDEgLyAzKSk7XG4gIH1cblxuICBwcml2YXRlIGN1YmljVGhyb3R0bGUocmF0ZVRvVXNlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQcmVjaXNlKHJhdGVUb1VzZSAqIHRoaXMuYmV0YSk7XG4gIH1cblxuICBwcml2YXRlIGN1YmljU3VjY2Vzcyh0aW1lc3RhbXA6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmdldFByZWNpc2UoXG4gICAgICB0aGlzLnNjYWxlQ29uc3RhbnQgKiBNYXRoLnBvdyh0aW1lc3RhbXAgLSB0aGlzLmxhc3RUaHJvdHRsZVRpbWUgLSB0aGlzLnRpbWVXaW5kb3csIDMpICsgdGhpcy5sYXN0TWF4UmF0ZVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZVRva2VuQnVja2V0KCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRva2VuQnVja2V0UmF0ZShuZXdSYXRlOiBudW1iZXIpIHtcbiAgICAvLyBSZWZpbGwgYmFzZWQgb24gb3VyIGN1cnJlbnQgcmF0ZSBiZWZvcmUgd2UgdXBkYXRlIHRvIHRoZSBuZXcgZmlsbCByYXRlLlxuICAgIHRoaXMucmVmaWxsVG9rZW5CdWNrZXQoKTtcblxuICAgIHRoaXMuZmlsbFJhdGUgPSBNYXRoLm1heChuZXdSYXRlLCB0aGlzLm1pbkZpbGxSYXRlKTtcbiAgICB0aGlzLm1heENhcGFjaXR5ID0gTWF0aC5tYXgobmV3UmF0ZSwgdGhpcy5taW5DYXBhY2l0eSk7XG5cbiAgICAvLyBXaGVuIHdlIHNjYWxlIGRvd24gd2UgY2FuJ3QgaGF2ZSBhIGN1cnJlbnQgY2FwYWNpdHkgdGhhdCBleGNlZWRzIG91ciBtYXhDYXBhY2l0eS5cbiAgICB0aGlzLmN1cnJlbnRDYXBhY2l0eSA9IE1hdGgubWluKHRoaXMuY3VycmVudENhcGFjaXR5LCB0aGlzLm1heENhcGFjaXR5KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTWVhc3VyZWRSYXRlKCkge1xuICAgIGNvbnN0IHQgPSB0aGlzLmdldEN1cnJlbnRUaW1lSW5TZWNvbmRzKCk7XG4gICAgY29uc3QgdGltZUJ1Y2tldCA9IE1hdGguZmxvb3IodCAqIDIpIC8gMjtcbiAgICB0aGlzLnJlcXVlc3RDb3VudCsrO1xuXG4gICAgaWYgKHRpbWVCdWNrZXQgPiB0aGlzLmxhc3RUeFJhdGVCdWNrZXQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSYXRlID0gdGhpcy5yZXF1ZXN0Q291bnQgLyAodGltZUJ1Y2tldCAtIHRoaXMubGFzdFR4UmF0ZUJ1Y2tldCk7XG4gICAgICB0aGlzLm1lYXN1cmVkVHhSYXRlID0gdGhpcy5nZXRQcmVjaXNlKGN1cnJlbnRSYXRlICogdGhpcy5zbW9vdGggKyB0aGlzLm1lYXN1cmVkVHhSYXRlICogKDEgLSB0aGlzLnNtb290aCkpO1xuICAgICAgdGhpcy5yZXF1ZXN0Q291bnQgPSAwO1xuICAgICAgdGhpcy5sYXN0VHhSYXRlQnVja2V0ID0gdGltZUJ1Y2tldDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFByZWNpc2UobnVtOiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChudW0udG9GaXhlZCg4KSk7XG4gIH1cbn1cbiJdfQ==