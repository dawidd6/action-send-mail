import { __extends } from "tslib";
import { DescribeActiveReceiptRuleSetRequest, DescribeActiveReceiptRuleSetResponse } from "../models/models_0";
import { deserializeAws_queryDescribeActiveReceiptRuleSetCommand, serializeAws_queryDescribeActiveReceiptRuleSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the metadata and receipt rules for the receipt rule set that is currently
 *             active.</p>
 *         <p>For information about setting up receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-receipt-rule-set.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DescribeActiveReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DescribeActiveReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DescribeActiveReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DescribeActiveReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link DescribeActiveReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DescribeActiveReceiptRuleSetCommand = /** @class */ (function (_super) {
    __extends(DescribeActiveReceiptRuleSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeActiveReceiptRuleSetCommand(input) {
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
    DescribeActiveReceiptRuleSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DescribeActiveReceiptRuleSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeActiveReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeActiveReceiptRuleSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeActiveReceiptRuleSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDescribeActiveReceiptRuleSetCommand(input, context);
    };
    DescribeActiveReceiptRuleSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDescribeActiveReceiptRuleSetCommand(output, context);
    };
    return DescribeActiveReceiptRuleSetCommand;
}($Command));
export { DescribeActiveReceiptRuleSetCommand };
//# sourceMappingURL=DescribeActiveReceiptRuleSetCommand.js.map