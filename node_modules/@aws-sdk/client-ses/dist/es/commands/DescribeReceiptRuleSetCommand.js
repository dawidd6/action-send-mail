import { __extends } from "tslib";
import { DescribeReceiptRuleSetRequest, DescribeReceiptRuleSetResponse } from "../models/models_0";
import { deserializeAws_queryDescribeReceiptRuleSetCommand, serializeAws_queryDescribeReceiptRuleSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the details of the specified receipt rule set.</p>
 *         <p>For information about managing receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rule-sets.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DescribeReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DescribeReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DescribeReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DescribeReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link DescribeReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DescribeReceiptRuleSetCommand = /** @class */ (function (_super) {
    __extends(DescribeReceiptRuleSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeReceiptRuleSetCommand(input) {
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
    DescribeReceiptRuleSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DescribeReceiptRuleSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeReceiptRuleSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeReceiptRuleSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDescribeReceiptRuleSetCommand(input, context);
    };
    DescribeReceiptRuleSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDescribeReceiptRuleSetCommand(output, context);
    };
    return DescribeReceiptRuleSetCommand;
}($Command));
export { DescribeReceiptRuleSetCommand };
//# sourceMappingURL=DescribeReceiptRuleSetCommand.js.map