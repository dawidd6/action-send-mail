import { __extends } from "tslib";
import { DeleteReceiptRuleSetRequest, DeleteReceiptRuleSetResponse } from "../models/models_0";
import { deserializeAws_queryDeleteReceiptRuleSetCommand, serializeAws_queryDeleteReceiptRuleSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified receipt rule set and all of the receipt rules it
 *             contains.</p>
 *         <note>
 *             <p>The currently active rule set cannot be deleted.</p>
 *         </note>
 *         <p>For information about managing receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rule-sets.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link DeleteReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteReceiptRuleSetCommand = /** @class */ (function (_super) {
    __extends(DeleteReceiptRuleSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteReceiptRuleSetCommand(input) {
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
    DeleteReceiptRuleSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteReceiptRuleSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteReceiptRuleSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteReceiptRuleSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteReceiptRuleSetCommand(input, context);
    };
    DeleteReceiptRuleSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteReceiptRuleSetCommand(output, context);
    };
    return DeleteReceiptRuleSetCommand;
}($Command));
export { DeleteReceiptRuleSetCommand };
//# sourceMappingURL=DeleteReceiptRuleSetCommand.js.map