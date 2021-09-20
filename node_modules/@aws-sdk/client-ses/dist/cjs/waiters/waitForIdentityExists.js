"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilIdentityExists = exports.waitForIdentityExists = void 0;
const GetIdentityVerificationAttributesCommand_1 = require("../commands/GetIdentityVerificationAttributesCommand");
const util_waiter_1 = require("@aws-sdk/util-waiter");
const checkState = async (client, input) => {
    let reason;
    try {
        let result = await client.send(new GetIdentityVerificationAttributesCommand_1.GetIdentityVerificationAttributesCommand(input));
        reason = result;
        try {
            let returnComparator = () => {
                let objectProjection_2 = Object.values(result.VerificationAttributes).map((element_1) => {
                    return element_1.VerificationStatus;
                });
                return objectProjection_2;
            };
            let allStringEq_4 = returnComparator().length > 0;
            for (let element_3 of returnComparator()) {
                allStringEq_4 = allStringEq_4 && element_3 == "Success";
            }
            if (allStringEq_4) {
                return { state: util_waiter_1.WaiterState.SUCCESS, reason };
            }
        }
        catch (e) { }
    }
    catch (exception) {
        reason = exception;
    }
    return { state: util_waiter_1.WaiterState.RETRY, reason };
};
/**
 *
 *  @deprecated Use waitUntilIdentityExists instead. waitForIdentityExists does not throw error in non-success cases.
 */
const waitForIdentityExists = async (params, input) => {
    const serviceDefaults = { minDelay: 3, maxDelay: 120 };
    return util_waiter_1.createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
exports.waitForIdentityExists = waitForIdentityExists;
/**
 *
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetIdentityVerificationAttributesCommand for polling.
 */
const waitUntilIdentityExists = async (params, input) => {
    const serviceDefaults = { minDelay: 3, maxDelay: 120 };
    const result = await util_waiter_1.createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return util_waiter_1.checkExceptions(result);
};
exports.waitUntilIdentityExists = waitUntilIdentityExists;
//# sourceMappingURL=waitForIdentityExists.js.map