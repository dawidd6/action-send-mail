import { SESClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SESClient";
import { DeleteConfigurationSetEventDestinationRequest, DeleteConfigurationSetEventDestinationResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface DeleteConfigurationSetEventDestinationCommandInput extends DeleteConfigurationSetEventDestinationRequest {
}
export interface DeleteConfigurationSetEventDestinationCommandOutput extends DeleteConfigurationSetEventDestinationResponse, __MetadataBearer {
}
/**
 * <p>Deletes a configuration set event destination. Configuration set event destinations
 *             are associated with configuration sets, which enable you to publish email sending
 *             events. For information about using configuration sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteConfigurationSetEventDestinationCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteConfigurationSetEventDestinationCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteConfigurationSetEventDestinationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteConfigurationSetEventDestinationCommandInput} for command's `input` shape.
 * @see {@link DeleteConfigurationSetEventDestinationCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class DeleteConfigurationSetEventDestinationCommand extends $Command<DeleteConfigurationSetEventDestinationCommandInput, DeleteConfigurationSetEventDestinationCommandOutput, SESClientResolvedConfig> {
    readonly input: DeleteConfigurationSetEventDestinationCommandInput;
    constructor(input: DeleteConfigurationSetEventDestinationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: SESClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteConfigurationSetEventDestinationCommandInput, DeleteConfigurationSetEventDestinationCommandOutput>;
    private serialize;
    private deserialize;
}
