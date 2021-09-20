import { __extends } from "tslib";
import { SetIdentityHeadersInNotificationsEnabledRequest, SetIdentityHeadersInNotificationsEnabledResponse, } from "../models/models_0";
import { deserializeAws_querySetIdentityHeadersInNotificationsEnabledCommand, serializeAws_querySetIdentityHeadersInNotificationsEnabledCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Given an identity (an email address or a domain), sets whether Amazon SES includes the
 *             original email headers in the Amazon Simple Notification Service (Amazon SNS) notifications of a specified
 *             type.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 *         <p>For more information about using notifications with Amazon SES, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/notifications.html">Amazon SES
 *                 Developer Guide</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SetIdentityHeadersInNotificationsEnabledCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SetIdentityHeadersInNotificationsEnabledCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SetIdentityHeadersInNotificationsEnabledCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetIdentityHeadersInNotificationsEnabledCommandInput} for command's `input` shape.
 * @see {@link SetIdentityHeadersInNotificationsEnabledCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SetIdentityHeadersInNotificationsEnabledCommand = /** @class */ (function (_super) {
    __extends(SetIdentityHeadersInNotificationsEnabledCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SetIdentityHeadersInNotificationsEnabledCommand(input) {
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
    SetIdentityHeadersInNotificationsEnabledCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SetIdentityHeadersInNotificationsEnabledCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetIdentityHeadersInNotificationsEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SetIdentityHeadersInNotificationsEnabledResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetIdentityHeadersInNotificationsEnabledCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySetIdentityHeadersInNotificationsEnabledCommand(input, context);
    };
    SetIdentityHeadersInNotificationsEnabledCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySetIdentityHeadersInNotificationsEnabledCommand(output, context);
    };
    return SetIdentityHeadersInNotificationsEnabledCommand;
}($Command));
export { SetIdentityHeadersInNotificationsEnabledCommand };
//# sourceMappingURL=SetIdentityHeadersInNotificationsEnabledCommand.js.map