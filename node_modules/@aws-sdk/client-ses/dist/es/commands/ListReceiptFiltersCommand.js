import { __extends } from "tslib";
import { ListReceiptFiltersRequest, ListReceiptFiltersResponse } from "../models/models_0";
import { deserializeAws_queryListReceiptFiltersCommand, serializeAws_queryListReceiptFiltersCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the IP address filters associated with your AWS account in the current AWS
 *             Region.</p>
 *         <p>For information about managing IP address filters, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-ip-filters.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListReceiptFiltersCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListReceiptFiltersCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListReceiptFiltersCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListReceiptFiltersCommandInput} for command's `input` shape.
 * @see {@link ListReceiptFiltersCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListReceiptFiltersCommand = /** @class */ (function (_super) {
    __extends(ListReceiptFiltersCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListReceiptFiltersCommand(input) {
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
    ListReceiptFiltersCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ListReceiptFiltersCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListReceiptFiltersRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListReceiptFiltersResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListReceiptFiltersCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListReceiptFiltersCommand(input, context);
    };
    ListReceiptFiltersCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListReceiptFiltersCommand(output, context);
    };
    return ListReceiptFiltersCommand;
}($Command));
export { ListReceiptFiltersCommand };
//# sourceMappingURL=ListReceiptFiltersCommand.js.map