import { __extends } from "tslib";
import { CloneReceiptRuleSetRequest, CloneReceiptRuleSetResponse } from "../models/models_0";
import { deserializeAws_queryCloneReceiptRuleSetCommand, serializeAws_queryCloneReceiptRuleSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a receipt rule set by cloning an existing one. All receipt rules and
 *             configurations are copied to the new receipt rule set and are completely independent of
 *             the source rule set.</p>
 *         <p>For information about setting up rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-receipt-rule-set.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, CloneReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, CloneReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new CloneReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CloneReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link CloneReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CloneReceiptRuleSetCommand = /** @class */ (function (_super) {
    __extends(CloneReceiptRuleSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CloneReceiptRuleSetCommand(input) {
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
    CloneReceiptRuleSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "CloneReceiptRuleSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CloneReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CloneReceiptRuleSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CloneReceiptRuleSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryCloneReceiptRuleSetCommand(input, context);
    };
    CloneReceiptRuleSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryCloneReceiptRuleSetCommand(output, context);
    };
    return CloneReceiptRuleSetCommand;
}($Command));
export { CloneReceiptRuleSetCommand };
//# sourceMappingURL=CloneReceiptRuleSetCommand.js.map