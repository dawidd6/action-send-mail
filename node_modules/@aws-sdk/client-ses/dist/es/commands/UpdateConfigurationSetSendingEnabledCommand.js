import { __extends } from "tslib";
import { UpdateConfigurationSetSendingEnabledRequest } from "../models/models_0";
import { deserializeAws_queryUpdateConfigurationSetSendingEnabledCommand, serializeAws_queryUpdateConfigurationSetSendingEnabledCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Enables or disables email sending for messages sent using a specific configuration set
 *             in a given AWS Region. You can use this operation in conjunction with Amazon CloudWatch alarms
 *             to temporarily pause email sending for a configuration set when the reputation metrics
 *             for that configuration set (such as your bounce on complaint rate) exceed certain
 *             thresholds.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateConfigurationSetSendingEnabledCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateConfigurationSetSendingEnabledCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateConfigurationSetSendingEnabledCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateConfigurationSetSendingEnabledCommandInput} for command's `input` shape.
 * @see {@link UpdateConfigurationSetSendingEnabledCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UpdateConfigurationSetSendingEnabledCommand = /** @class */ (function (_super) {
    __extends(UpdateConfigurationSetSendingEnabledCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateConfigurationSetSendingEnabledCommand(input) {
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
    UpdateConfigurationSetSendingEnabledCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "UpdateConfigurationSetSendingEnabledCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateConfigurationSetSendingEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateConfigurationSetSendingEnabledCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryUpdateConfigurationSetSendingEnabledCommand(input, context);
    };
    UpdateConfigurationSetSendingEnabledCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryUpdateConfigurationSetSendingEnabledCommand(output, context);
    };
    return UpdateConfigurationSetSendingEnabledCommand;
}($Command));
export { UpdateConfigurationSetSendingEnabledCommand };
//# sourceMappingURL=UpdateConfigurationSetSendingEnabledCommand.js.map