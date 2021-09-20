import { __extends } from "tslib";
import { DeleteReceiptFilterRequest, DeleteReceiptFilterResponse } from "../models/models_0";
import { deserializeAws_queryDeleteReceiptFilterCommand, serializeAws_queryDeleteReceiptFilterCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified IP address filter.</p>
 *         <p>For information about managing IP address filters, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-ip-filters.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteReceiptFilterCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteReceiptFilterCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteReceiptFilterCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteReceiptFilterCommandInput} for command's `input` shape.
 * @see {@link DeleteReceiptFilterCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteReceiptFilterCommand = /** @class */ (function (_super) {
    __extends(DeleteReceiptFilterCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteReceiptFilterCommand(input) {
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
    DeleteReceiptFilterCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteReceiptFilterCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteReceiptFilterRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteReceiptFilterResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteReceiptFilterCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteReceiptFilterCommand(input, context);
    };
    DeleteReceiptFilterCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteReceiptFilterCommand(output, context);
    };
    return DeleteReceiptFilterCommand;
}($Command));
export { DeleteReceiptFilterCommand };
//# sourceMappingURL=DeleteReceiptFilterCommand.js.map