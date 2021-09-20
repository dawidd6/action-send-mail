import { __extends } from "tslib";
import { SetIdentityFeedbackForwardingEnabledRequest, SetIdentityFeedbackForwardingEnabledResponse, } from "../models/models_0";
import { deserializeAws_querySetIdentityFeedbackForwardingEnabledCommand, serializeAws_querySetIdentityFeedbackForwardingEnabledCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var SetIdentityFeedbackForwardingEnabledCommand = /** @class */ (function (_super) {
    __extends(SetIdentityFeedbackForwardingEnabledCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SetIdentityFeedbackForwardingEnabledCommand(input) {
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
    SetIdentityFeedbackForwardingEnabledCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SetIdentityFeedbackForwardingEnabledCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetIdentityFeedbackForwardingEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SetIdentityFeedbackForwardingEnabledResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetIdentityFeedbackForwardingEnabledCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySetIdentityFeedbackForwardingEnabledCommand(input, context);
    };
    SetIdentityFeedbackForwardingEnabledCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySetIdentityFeedbackForwardingEnabledCommand(output, context);
    };
    return SetIdentityFeedbackForwardingEnabledCommand;
}($Command));
export { SetIdentityFeedbackForwardingEnabledCommand };
//# sourceMappingURL=SetIdentityFeedbackForwardingEnabledCommand.js.map