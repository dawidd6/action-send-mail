"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetIdentityFeedbackForwardingEnabledCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Given an identity (an email address or a domain), enables or disables whether Amazon SES
 *             forwards bounce and complaint notifications as email. Feedback forwarding can only be
 *             disabled when Amazon Simple Notification Service (Amazon SNS) topics are specified for both bounces and
 *             complaints.</p>
 *         <note>
 *             <p>Feedback forwarding does not apply to delivery notifications. Delivery
 *                 notifications are only available through Amazon SNS.</p>
 *         </note>
 *         <p>You can execute this operation no more than once per second.</p>
 *         <p>For more information about using notifications with Amazon SES, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/notifications.html">Amazon SES
 *                 Developer Guide</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SetIdentityFeedbackForwardingEnabledCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SetIdentityFeedbackForwardingEnabledCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SetIdentityFeedbackForwardingEnabledCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetIdentityFeedbackForwardingEnabledCommandInput} for command's `input` shape.
 * @see {@link SetIdentityFeedbackForwardingEnabledCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class SetIdentityFeedbackForwardingEnabledCommand extends smithy_client_1.Command {
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
        const commandName = "SetIdentityFeedbackForwardingEnabledCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SetIdentityFeedbackForwardingEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SetIdentityFeedbackForwardingEnabledResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySetIdentityFeedbackForwardingEnabledCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySetIdentityFeedbackForwardingEnabledCommand(output, context);
    }
}
exports.SetIdentityFeedbackForwardingEnabledCommand = SetIdentityFeedbackForwardingEnabledCommand;
//# sourceMappingURL=SetIdentityFeedbackForwardingEnabledCommand.js.map