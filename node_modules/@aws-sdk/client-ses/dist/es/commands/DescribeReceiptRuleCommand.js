import { __extends } from "tslib";
import { DescribeReceiptRuleRequest, DescribeReceiptRuleResponse } from "../models/models_0";
import { deserializeAws_queryDescribeReceiptRuleCommand, serializeAws_queryDescribeReceiptRuleCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the details of the specified receipt rule.</p>
 *         <p>For information about setting up receipt rules, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-receipt-rules.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DescribeReceiptRuleCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DescribeReceiptRuleCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DescribeReceiptRuleCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DescribeReceiptRuleCommandInput} for command's `input` shape.
 * @see {@link DescribeReceiptRuleCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DescribeReceiptRuleCommand = /** @class */ (function (_super) {
    __extends(DescribeReceiptRuleCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeReceiptRuleCommand(input) {
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
    DescribeReceiptRuleCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DescribeReceiptRuleCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeReceiptRuleRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeReceiptRuleResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeReceiptRuleCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDescribeReceiptRuleCommand(input, context);
    };
    DescribeReceiptRuleCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDescribeReceiptRuleCommand(output, context);
    };
    return DescribeReceiptRuleCommand;
}($Command));
export { DescribeReceiptRuleCommand };
//# sourceMappingURL=DescribeReceiptRuleCommand.js.map