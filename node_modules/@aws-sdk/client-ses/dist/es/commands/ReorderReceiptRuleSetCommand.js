import { __extends } from "tslib";
import { ReorderReceiptRuleSetRequest, ReorderReceiptRuleSetResponse } from "../models/models_0";
import { deserializeAws_queryReorderReceiptRuleSetCommand, serializeAws_queryReorderReceiptRuleSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Reorders the receipt rules within a receipt rule set.</p>
 *         <note>
 *             <p>All of the rules in the rule set must be represented in this request. That is,
 *                 this API will return an error if the reorder request doesn't explicitly position all
 *                 of the rules.</p>
 *         </note>
 *         <p>For information about managing receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rule-sets.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ReorderReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ReorderReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ReorderReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ReorderReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link ReorderReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ReorderReceiptRuleSetCommand = /** @class */ (function (_super) {
    __extends(ReorderReceiptRuleSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ReorderReceiptRuleSetCommand(input) {
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
    ReorderReceiptRuleSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ReorderReceiptRuleSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ReorderReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ReorderReceiptRuleSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ReorderReceiptRuleSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryReorderReceiptRuleSetCommand(input, context);
    };
    ReorderReceiptRuleSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryReorderReceiptRuleSetCommand(output, context);
    };
    return ReorderReceiptRuleSetCommand;
}($Command));
export { ReorderReceiptRuleSetCommand };
//# sourceMappingURL=ReorderReceiptRuleSetCommand.js.map