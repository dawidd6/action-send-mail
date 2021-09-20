import { __extends } from "tslib";
import { SetIdentityNotificationTopicRequest, SetIdentityNotificationTopicResponse } from "../models/models_0";
import { deserializeAws_querySetIdentityNotificationTopicCommand, serializeAws_querySetIdentityNotificationTopicCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var SetIdentityNotificationTopicCommand = /** @class */ (function (_super) {
    __extends(SetIdentityNotificationTopicCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SetIdentityNotificationTopicCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    SetIdentityNotificationTopicCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SetIdentityNotificationTopicCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetIdentityNotificationTopicRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SetIdentityNotificationTopicResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetIdentityNotificationTopicCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySetIdentityNotificationTopicCommand(input, context);
    };
    SetIdentityNotificationTopicCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySetIdentityNotificationTopicCommand(output, context);
    };
    return SetIdentityNotificationTopicCommand;
}($Command));
export { SetIdentityNotificationTopicCommand };
//# sourceMappingURL=SetIdentityNotificationTopicCommand.js.map