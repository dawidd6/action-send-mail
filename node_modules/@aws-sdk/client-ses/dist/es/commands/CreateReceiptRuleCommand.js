import { __extends } from "tslib";
import { CreateReceiptRuleRequest, CreateReceiptRuleResponse } from "../models/models_0";
import { deserializeAws_queryCreateReceiptRuleCommand, serializeAws_queryCreateReceiptRuleCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a receipt rule.</p>
 *         <p>For information about setting up receipt rules, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-receipt-rules.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, CreateReceiptRuleCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, CreateReceiptRuleCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new CreateReceiptRuleCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateReceiptRuleCommandInput} for command's `input` shape.
 * @see {@link CreateReceiptRuleCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CreateReceiptRuleCommand = /** @class */ (function (_super) {
    __extends(CreateReceiptRuleCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateReceiptRuleCommand(input) {
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
    CreateReceiptRuleCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "CreateReceiptRuleCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateReceiptRuleRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateReceiptRuleResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateReceiptRuleCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryCreateReceiptRuleCommand(input, context);
    };
    CreateReceiptRuleCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryCreateReceiptRuleCommand(output, context);
    };
    return CreateReceiptRuleCommand;
}($Command));
export { CreateReceiptRuleCommand };
//# sourceMappingURL=CreateReceiptRuleCommand.js.map