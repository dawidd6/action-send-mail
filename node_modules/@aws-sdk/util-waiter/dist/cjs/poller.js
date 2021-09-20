"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPolling = void 0;
const sleep_1 = require("./utils/sleep");
const waiter_1 = require("./waiter");
/**
 * Reference: https://awslabs.github.io/smithy/1.0/spec/waiters.html#waiter-retries
 */
const exponentialBackoffWithJitter = (minDelay, maxDelay, attemptCeiling, attempt) => {
    if (attempt > attemptCeiling)
        return maxDelay;
    const delay = minDelay * 2 ** (attempt - 1);
    return randomInRange(minDelay, delay);
};
const randomInRange = (min, max) => min + Math.random() * (max - min);
/**
 * Function that runs polling as part of waiters. This will make one inital attempt and then
 * subsequent attempts with an increasing delay.
 * @param params options passed to the waiter.
 * @param client AWS SDK Client
 * @param input client input
 * @param stateChecker function that checks the acceptor states on each poll.
 */
const runPolling = async ({ minDelay, maxDelay, maxWaitTime, abortController, client, abortSignal }, input, acceptorChecks) => {
    var _a;
    const { state } = await acceptorChecks(client, input);
    if (state !== waiter_1.WaiterState.RETRY) {
        return { state };
    }
    let currentAttempt = 1;
    const waitUntil = Date.now() + maxWaitTime * 1000;
    // The max attempt number that the derived delay time tend to increase.
    // Pre-compute this number to avoid Number type overflow.
    const attemptCeiling = Math.log(maxDelay / minDelay) / Math.log(2) + 1;
    while (true) {
        if (((_a = abortController === null || abortController === void 0 ? void 0 : abortController.signal) === null || _a === void 0 ? void 0 : _a.aborted) || (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted)) {
            return { state: waiter_1.WaiterState.ABORTED };
        }
        const delay = exponentialBackoffWithJitter(minDelay, maxDelay, attemptCeiling, currentAttempt);
        // Resolve the promise explicitly at timeout or aborted. Otherwise this while loop will keep making API call until
        // `acceptorCheck` returns non-retry status, even with the Promise.race() outside.
        if (Date.now() + delay * 1000 > waitUntil) {
            return { state: waiter_1.WaiterState.TIMEOUT };
        }
        await sleep_1.sleep(delay);
        const { state } = await acceptorChecks(client, input);
        if (state !== waiter_1.WaiterState.RETRY) {
            return { state };
        }
        currentAttempt += 1;
    }
};
exports.runPolling = runPolling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBc0M7QUFDdEMscUNBQW9FO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxjQUFzQixFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQ25ILElBQUksT0FBTyxHQUFHLGNBQWM7UUFBRSxPQUFPLFFBQVEsQ0FBQztJQUM5QyxNQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sYUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFFdEY7Ozs7Ozs7R0FPRztBQUNJLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFDN0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBeUIsRUFDaEcsS0FBWSxFQUNaLGNBQXVFLEVBQ2hELEVBQUU7O0lBQ3pCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEQsSUFBSSxLQUFLLEtBQUssb0JBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDL0IsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQ2xCO0lBRUQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ2xELHVFQUF1RTtJQUN2RSx5REFBeUQ7SUFDekQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkUsT0FBTyxJQUFJLEVBQUU7UUFDWCxJQUFJLENBQUEsTUFBQSxlQUFlLGFBQWYsZUFBZSx1QkFBZixlQUFlLENBQUUsTUFBTSwwQ0FBRSxPQUFPLE1BQUksV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLE9BQU8sQ0FBQSxFQUFFO1lBQzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QztRQUNELE1BQU0sS0FBSyxHQUFHLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQy9GLGtIQUFrSDtRQUNsSCxrRkFBa0Y7UUFDbEYsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEVBQUU7WUFDekMsT0FBTyxFQUFFLEtBQUssRUFBRSxvQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsTUFBTSxhQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLEtBQUssS0FBSyxvQkFBVyxDQUFDLEtBQUssRUFBRTtZQUMvQixPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDbEI7UUFFRCxjQUFjLElBQUksQ0FBQyxDQUFDO0tBQ3JCO0FBQ0gsQ0FBQyxDQUFDO0FBakNXLFFBQUEsVUFBVSxjQWlDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzbGVlcCB9IGZyb20gXCIuL3V0aWxzL3NsZWVwXCI7XG5pbXBvcnQgeyBXYWl0ZXJPcHRpb25zLCBXYWl0ZXJSZXN1bHQsIFdhaXRlclN0YXRlIH0gZnJvbSBcIi4vd2FpdGVyXCI7XG5cbi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL2F3c2xhYnMuZ2l0aHViLmlvL3NtaXRoeS8xLjAvc3BlYy93YWl0ZXJzLmh0bWwjd2FpdGVyLXJldHJpZXNcbiAqL1xuY29uc3QgZXhwb25lbnRpYWxCYWNrb2ZmV2l0aEppdHRlciA9IChtaW5EZWxheTogbnVtYmVyLCBtYXhEZWxheTogbnVtYmVyLCBhdHRlbXB0Q2VpbGluZzogbnVtYmVyLCBhdHRlbXB0OiBudW1iZXIpID0+IHtcbiAgaWYgKGF0dGVtcHQgPiBhdHRlbXB0Q2VpbGluZykgcmV0dXJuIG1heERlbGF5O1xuICBjb25zdCBkZWxheSA9IG1pbkRlbGF5ICogMiAqKiAoYXR0ZW1wdCAtIDEpO1xuICByZXR1cm4gcmFuZG9tSW5SYW5nZShtaW5EZWxheSwgZGVsYXkpO1xufTtcblxuY29uc3QgcmFuZG9tSW5SYW5nZSA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IHJ1bnMgcG9sbGluZyBhcyBwYXJ0IG9mIHdhaXRlcnMuIFRoaXMgd2lsbCBtYWtlIG9uZSBpbml0YWwgYXR0ZW1wdCBhbmQgdGhlblxuICogc3Vic2VxdWVudCBhdHRlbXB0cyB3aXRoIGFuIGluY3JlYXNpbmcgZGVsYXkuXG4gKiBAcGFyYW0gcGFyYW1zIG9wdGlvbnMgcGFzc2VkIHRvIHRoZSB3YWl0ZXIuXG4gKiBAcGFyYW0gY2xpZW50IEFXUyBTREsgQ2xpZW50XG4gKiBAcGFyYW0gaW5wdXQgY2xpZW50IGlucHV0XG4gKiBAcGFyYW0gc3RhdGVDaGVja2VyIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIHRoZSBhY2NlcHRvciBzdGF0ZXMgb24gZWFjaCBwb2xsLlxuICovXG5leHBvcnQgY29uc3QgcnVuUG9sbGluZyA9IGFzeW5jIDxDbGllbnQsIElucHV0PihcbiAgeyBtaW5EZWxheSwgbWF4RGVsYXksIG1heFdhaXRUaW1lLCBhYm9ydENvbnRyb2xsZXIsIGNsaWVudCwgYWJvcnRTaWduYWwgfTogV2FpdGVyT3B0aW9uczxDbGllbnQ+LFxuICBpbnB1dDogSW5wdXQsXG4gIGFjY2VwdG9yQ2hlY2tzOiAoY2xpZW50OiBDbGllbnQsIGlucHV0OiBJbnB1dCkgPT4gUHJvbWlzZTxXYWl0ZXJSZXN1bHQ+XG4pOiBQcm9taXNlPFdhaXRlclJlc3VsdD4gPT4ge1xuICBjb25zdCB7IHN0YXRlIH0gPSBhd2FpdCBhY2NlcHRvckNoZWNrcyhjbGllbnQsIGlucHV0KTtcbiAgaWYgKHN0YXRlICE9PSBXYWl0ZXJTdGF0ZS5SRVRSWSkge1xuICAgIHJldHVybiB7IHN0YXRlIH07XG4gIH1cblxuICBsZXQgY3VycmVudEF0dGVtcHQgPSAxO1xuICBjb25zdCB3YWl0VW50aWwgPSBEYXRlLm5vdygpICsgbWF4V2FpdFRpbWUgKiAxMDAwO1xuICAvLyBUaGUgbWF4IGF0dGVtcHQgbnVtYmVyIHRoYXQgdGhlIGRlcml2ZWQgZGVsYXkgdGltZSB0ZW5kIHRvIGluY3JlYXNlLlxuICAvLyBQcmUtY29tcHV0ZSB0aGlzIG51bWJlciB0byBhdm9pZCBOdW1iZXIgdHlwZSBvdmVyZmxvdy5cbiAgY29uc3QgYXR0ZW1wdENlaWxpbmcgPSBNYXRoLmxvZyhtYXhEZWxheSAvIG1pbkRlbGF5KSAvIE1hdGgubG9nKDIpICsgMTtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBpZiAoYWJvcnRDb250cm9sbGVyPy5zaWduYWw/LmFib3J0ZWQgfHwgYWJvcnRTaWduYWw/LmFib3J0ZWQpIHtcbiAgICAgIHJldHVybiB7IHN0YXRlOiBXYWl0ZXJTdGF0ZS5BQk9SVEVEIH07XG4gICAgfVxuICAgIGNvbnN0IGRlbGF5ID0gZXhwb25lbnRpYWxCYWNrb2ZmV2l0aEppdHRlcihtaW5EZWxheSwgbWF4RGVsYXksIGF0dGVtcHRDZWlsaW5nLCBjdXJyZW50QXR0ZW1wdCk7XG4gICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZSBleHBsaWNpdGx5IGF0IHRpbWVvdXQgb3IgYWJvcnRlZC4gT3RoZXJ3aXNlIHRoaXMgd2hpbGUgbG9vcCB3aWxsIGtlZXAgbWFraW5nIEFQSSBjYWxsIHVudGlsXG4gICAgLy8gYGFjY2VwdG9yQ2hlY2tgIHJldHVybnMgbm9uLXJldHJ5IHN0YXR1cywgZXZlbiB3aXRoIHRoZSBQcm9taXNlLnJhY2UoKSBvdXRzaWRlLlxuICAgIGlmIChEYXRlLm5vdygpICsgZGVsYXkgKiAxMDAwID4gd2FpdFVudGlsKSB7XG4gICAgICByZXR1cm4geyBzdGF0ZTogV2FpdGVyU3RhdGUuVElNRU9VVCB9O1xuICAgIH1cbiAgICBhd2FpdCBzbGVlcChkZWxheSk7XG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gYXdhaXQgYWNjZXB0b3JDaGVja3MoY2xpZW50LCBpbnB1dCk7XG4gICAgaWYgKHN0YXRlICE9PSBXYWl0ZXJTdGF0ZS5SRVRSWSkge1xuICAgICAgcmV0dXJuIHsgc3RhdGUgfTtcbiAgICB9XG5cbiAgICBjdXJyZW50QXR0ZW1wdCArPSAxO1xuICB9XG59O1xuIl19