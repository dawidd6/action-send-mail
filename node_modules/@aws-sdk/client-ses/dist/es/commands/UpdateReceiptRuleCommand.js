import { __extends } from "tslib";
import { UpdateReceiptRuleRequest, UpdateReceiptRuleResponse } from "../models/models_0";
import { deserializeAws_queryUpdateReceiptRuleCommand, serializeAws_queryUpdateReceiptRuleCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Updates a receipt rule.</p>
 *         <p>For information about managing receipt rules, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rules.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateReceiptRuleCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateReceiptRuleCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateReceiptRuleCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateReceiptRuleCommandInput} for command's `input` shape.
 * @see {@link UpdateReceiptRuleCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UpdateReceiptRuleCommand = /** @class */ (function (_super) {
    __extends(UpdateReceiptRuleCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateReceiptRuleCommand(input) {
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
    UpdateReceiptRuleCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "UpdateReceiptRuleCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateReceiptRuleRequest.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateReceiptRuleResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateReceiptRuleCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryUpdateReceiptRuleCommand(input, context);
    };
    UpdateReceiptRuleCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryUpdateReceiptRuleCommand(output, context);
    };
    return UpdateReceiptRuleCommand;
}($Command));
export { UpdateReceiptRuleCommand };
//# sourceMappingURL=UpdateReceiptRuleCommand.js.map