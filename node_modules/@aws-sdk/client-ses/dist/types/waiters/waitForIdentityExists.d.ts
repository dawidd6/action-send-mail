import { SESClient } from "../SESClient";
import { GetIdentityVerificationAttributesCommandInput } from "../commands/GetIdentityVerificationAttributesCommand";
import { WaiterConfiguration, WaiterResult } from "@aws-sdk/util-waiter";
/**
 *
 *  @deprecated Use waitUntilIdentityExists instead. waitForIdentityExists does not throw error in non-success cases.
 */
export declare const waitForIdentityExists: (params: WaiterConfiguration<SESClient>, input: GetIdentityVerificationAttributesCommandInput) => Promise<WaiterResult>;
/**
 *
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetIdentityVerificationAttributesCommand for polling.
 */
export declare const waitUntilIdentityExists: (params: WaiterConfiguration<SESClient>, input: GetIdentityVerificationAttributesCommandInput) => Promise<WaiterResult>;
