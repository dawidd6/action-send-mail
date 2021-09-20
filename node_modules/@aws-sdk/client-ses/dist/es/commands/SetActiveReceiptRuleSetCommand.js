import { __extends } from "tslib";
import { SetActiveReceiptRuleSetRequest, SetActiveReceiptRuleSetResponse } from "../models/models_0";
import { deserializeAws_querySetActiveReceiptRuleSetCommand, serializeAws_querySetActiveReceiptRuleSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Sets the specified receipt rule set as the active receipt rule set.</p>
 *         <note>
 *             <p>To disable your email-receiving through Amazon SES completely, you can call this API
 *                 with RuleSetName set to null.</p>
 *         </note>
 *         <p>For information about managing receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rule-sets.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SetActiveReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SetActiveReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SetActiveReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetActiveReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link SetActiveReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SetActiveReceiptRuleSetCommand = /** @class */ (function (_super) {
    __extends(SetActiveReceiptRuleSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SetActiveReceiptRuleSetCommand(input) {
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
    SetActiveReceiptRuleSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SetActiveReceiptRuleSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetActiveReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SetActiveReceiptRuleSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetActiveReceiptRuleSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySetActiveReceiptRuleSetCommand(input, context);
    };
    SetActiveReceiptRuleSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySetActiveReceiptRuleSetCommand(output, context);
    };
    return SetActiveReceiptRuleSetCommand;
}($Command));
export { SetActiveReceiptRuleSetCommand };
//# sourceMappingURL=SetActiveReceiptRuleSetCommand.js.map