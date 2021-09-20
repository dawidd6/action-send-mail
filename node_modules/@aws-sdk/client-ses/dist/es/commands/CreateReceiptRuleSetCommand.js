import { __extends } from "tslib";
import { CreateReceiptRuleSetRequest, CreateReceiptRuleSetResponse } from "../models/models_0";
import { deserializeAws_queryCreateReceiptRuleSetCommand, serializeAws_queryCreateReceiptRuleSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates an empty receipt rule set.</p>
 *         <p>For information about setting up receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-receipt-rule-set.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, CreateReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, CreateReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new CreateReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link CreateReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CreateReceiptRuleSetCommand = /** @class */ (function (_super) {
    __extends(CreateReceiptRuleSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateReceiptRuleSetCommand(input) {
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
    CreateReceiptRuleSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "CreateReceiptRuleSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateReceiptRuleSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateReceiptRuleSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryCreateReceiptRuleSetCommand(input, context);
    };
    CreateReceiptRuleSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryCreateReceiptRuleSetCommand(output, context);
    };
    return CreateReceiptRuleSetCommand;
}($Command));
export { CreateReceiptRuleSetCommand };
//# sourceMappingURL=CreateReceiptRuleSetCommand.js.map