import { __extends } from "tslib";
import { ListReceiptRuleSetsRequest, ListReceiptRuleSetsResponse } from "../models/models_0";
import { deserializeAws_queryListReceiptRuleSetsCommand, serializeAws_queryListReceiptRuleSetsCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the receipt rule sets that exist under your AWS account in the current AWS
 *             Region. If there are additional receipt rule sets to be retrieved, you will receive a
 *                 <code>NextToken</code> that you can provide to the next call to
 *                 <code>ListReceiptRuleSets</code> to retrieve the additional entries.</p>
 *         <p>For information about managing receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rule-sets.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListReceiptRuleSetsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListReceiptRuleSetsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListReceiptRuleSetsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListReceiptRuleSetsCommandInput} for command's `input` shape.
 * @see {@link ListReceiptRuleSetsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListReceiptRuleSetsCommand = /** @class */ (function (_super) {
    __extends(ListReceiptRuleSetsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListReceiptRuleSetsCommand(input) {
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
    ListReceiptRuleSetsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ListReceiptRuleSetsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListReceiptRuleSetsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListReceiptRuleSetsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListReceiptRuleSetsCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListReceiptRuleSetsCommand(input, context);
    };
    ListReceiptRuleSetsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListReceiptRuleSetsCommand(output, context);
    };
    return ListReceiptRuleSetsCommand;
}($Command));
export { ListReceiptRuleSetsCommand };
//# sourceMappingURL=ListReceiptRuleSetsCommand.js.map