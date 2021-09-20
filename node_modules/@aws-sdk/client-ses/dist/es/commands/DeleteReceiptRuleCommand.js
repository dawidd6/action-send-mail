import { __extends } from "tslib";
import { DeleteReceiptRuleRequest, DeleteReceiptRuleResponse } from "../models/models_0";
import { deserializeAws_queryDeleteReceiptRuleCommand, serializeAws_queryDeleteReceiptRuleCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified receipt rule.</p>
 *         <p>For information about managing receipt rules, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rules.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteReceiptRuleCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteReceiptRuleCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteReceiptRuleCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteReceiptRuleCommandInput} for command's `input` shape.
 * @see {@link DeleteReceiptRuleCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteReceiptRuleCommand = /** @class */ (function (_super) {
    __extends(DeleteReceiptRuleCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteReceiptRuleCommand(input) {
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
    DeleteReceiptRuleCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteReceiptRuleCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteReceiptRuleRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteReceiptRuleResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteReceiptRuleCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteReceiptRuleCommand(input, context);
    };
    DeleteReceiptRuleCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteReceiptRuleCommand(output, context);
    };
    return DeleteReceiptRuleCommand;
}($Command));
export { DeleteReceiptRuleCommand };
//# sourceMappingURL=DeleteReceiptRuleCommand.js.map