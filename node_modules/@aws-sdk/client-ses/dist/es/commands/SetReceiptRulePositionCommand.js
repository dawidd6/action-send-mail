import { __extends } from "tslib";
import { SetReceiptRulePositionRequest, SetReceiptRulePositionResponse } from "../models/models_0";
import { deserializeAws_querySetReceiptRulePositionCommand, serializeAws_querySetReceiptRulePositionCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Sets the position of the specified receipt rule in the receipt rule set.</p>
 *         <p>For information about managing receipt rules, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rules.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SetReceiptRulePositionCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SetReceiptRulePositionCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SetReceiptRulePositionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetReceiptRulePositionCommandInput} for command's `input` shape.
 * @see {@link SetReceiptRulePositionCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SetReceiptRulePositionCommand = /** @class */ (function (_super) {
    __extends(SetReceiptRulePositionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SetReceiptRulePositionCommand(input) {
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
    SetReceiptRulePositionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SetReceiptRulePositionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetReceiptRulePositionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SetReceiptRulePositionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetReceiptRulePositionCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySetReceiptRulePositionCommand(input, context);
    };
    SetReceiptRulePositionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySetReceiptRulePositionCommand(output, context);
    };
    return SetReceiptRulePositionCommand;
}($Command));
export { SetReceiptRulePositionCommand };
//# sourceMappingURL=SetReceiptRulePositionCommand.js.map