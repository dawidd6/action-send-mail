import { __extends } from "tslib";
import { UpdateAccountSendingEnabledRequest } from "../models/models_0";
import { deserializeAws_queryUpdateAccountSendingEnabledCommand, serializeAws_queryUpdateAccountSendingEnabledCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Enables or disables email sending across your entire Amazon SES account in the current
 *             AWS Region. You can use this operation in conjunction with Amazon CloudWatch alarms to
 *             temporarily pause email sending across your Amazon SES account in a given AWS Region when
 *             reputation metrics (such as your bounce or complaint rates) reach certain
 *             thresholds.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateAccountSendingEnabledCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateAccountSendingEnabledCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateAccountSendingEnabledCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateAccountSendingEnabledCommandInput} for command's `input` shape.
 * @see {@link UpdateAccountSendingEnabledCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UpdateAccountSendingEnabledCommand = /** @class */ (function (_super) {
    __extends(UpdateAccountSendingEnabledCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateAccountSendingEnabledCommand(input) {
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
    UpdateAccountSendingEnabledCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "UpdateAccountSendingEnabledCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateAccountSendingEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateAccountSendingEnabledCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryUpdateAccountSendingEnabledCommand(input, context);
    };
    UpdateAccountSendingEnabledCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryUpdateAccountSendingEnabledCommand(output, context);
    };
    return UpdateAccountSendingEnabledCommand;
}($Command));
export { UpdateAccountSendingEnabledCommand };
//# sourceMappingURL=UpdateAccountSendingEnabledCommand.js.map