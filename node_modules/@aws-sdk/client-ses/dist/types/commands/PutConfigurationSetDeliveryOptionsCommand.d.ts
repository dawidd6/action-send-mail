import { SESClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SESClient";
import { PutConfigurationSetDeliveryOptionsRequest, PutConfigurationSetDeliveryOptionsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface PutConfigurationSetDeliveryOptionsCommandInput extends PutConfigurationSetDeliveryOptionsRequest {
}
export interface PutConfigurationSetDeliveryOptionsCommandOutput extends PutConfigurationSetDeliveryOptionsResponse, __MetadataBearer {
}
/**
 * <p>Adds or updates the delivery options for a configuration set.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, PutConfigurationSetDeliveryOptionsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, PutConfigurationSetDeliveryOptionsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new PutConfigurationSetDeliveryOptionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PutConfigurationSetDeliveryOptionsCommandInput} for command's `input` shape.
 * @see {@link PutConfigurationSetDeliveryOptionsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class PutConfigurationSetDeliveryOptionsCommand extends $Command<PutConfigurationSetDeliveryOptionsCommandInput, PutConfigurationSetDeliveryOptionsCommandOutput, SESClientResolvedConfig> {
    readonly input: PutConfigurationSetDeliveryOptionsCommandInput;
    constructor(input: PutConfigurationSetDeliveryOptionsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: SESClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutConfigurationSetDeliveryOptionsCommandInput, PutConfigurationSetDeliveryOptionsCommandOutput>;
    private serialize;
    private deserialize;
}
