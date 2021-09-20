"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetIdentityNotificationTopicCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Sets an Amazon Simple Notification Service (Amazon SNS) topic to use when delivering notifications. When you use
 *             this operation, you specify a verified identity, such as an email address or domain.
 *             When you send an email that uses the chosen identity in the Source field, Amazon SES sends
 *             notifications to the topic you specified. You can send bounce, complaint, or delivery
 *             notifications (or any combination of the three) to the Amazon SNS topic that you
 *             specify.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 *         <p>For more information about feedback notification, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/notifications.html">Amazon SES Developer
 *             Guide</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SetIdentityNotificationTopicCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SetIdentityNotificationTopicCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SetIdentityNotificationTopicCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetIdentityNotificationTopicCommandInput} for command's `input` shape.
 * @see {@link SetIdentityNotificationTopicCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class SetIdentityNotificationTopicCommand extends smithy_client_1.Command {
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
        const commandName = "SetIdentityNotificationTopicCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SetIdentityNotificationTopicRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SetIdentityNotificationTopicResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySetIdentityNotificationTopicCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySetIdentityNotificationTopicCommand(output, context);
    }
}
exports.SetIdentityNotificationTopicCommand = SetIdentityNotificationTopicCommand;
//# sourceMappingURL=SetIdentityNotificationTopicCommand.js.map