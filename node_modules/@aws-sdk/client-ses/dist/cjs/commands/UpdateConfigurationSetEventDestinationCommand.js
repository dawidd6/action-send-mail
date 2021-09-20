"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfigurationSetEventDestinationCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Updates the event destination of a configuration set. Event destinations are
 *             associated with configuration sets, which enable you to publish email sending events to
 *             Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS). For information about using configuration sets,
 *             see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Monitoring Your Amazon SES
 *                 Sending Activity</a> in the <i>Amazon SES Developer Guide.</i>
 *          </p>
 *         <note>
 *             <p>When you create or update an event destination, you must provide one, and only
 *                 one, destination. The destination can be Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service
 *                 (Amazon SNS).</p>
 *         </note>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateConfigurationSetEventDestinationCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateConfigurationSetEventDestinationCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateConfigurationSetEventDestinationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateConfigurationSetEventDestinationCommandInput} for command's `input` shape.
 * @see {@link UpdateConfigurationSetEventDestinationCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class UpdateConfigurationSetEventDestinationCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "SESClient";
        const commandName = "UpdateConfigurationSetEventDestinationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.UpdateConfigurationSetEventDestinationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.UpdateConfigurationSetEventDestinationResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryUpdateConfigurationSetEventDestinationCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryUpdateConfigurationSetEventDestinationCommand(output, context);
    }
}
exports.UpdateConfigurationSetEventDestinationCommand = UpdateConfigurationSetEventDestinationCommand;
//# sourceMappingURL=UpdateConfigurationSetEventDestinationCommand.js.map