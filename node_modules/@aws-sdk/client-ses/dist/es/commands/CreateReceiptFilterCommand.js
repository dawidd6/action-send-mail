import { __extends } from "tslib";
import { CreateReceiptFilterRequest, CreateReceiptFilterResponse } from "../models/models_0";
import { deserializeAws_queryCreateReceiptFilterCommand, serializeAws_queryCreateReceiptFilterCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a new IP address filter.</p>
 *         <p>For information about setting up IP address filters, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-ip-filters.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, CreateReceiptFilterCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, CreateReceiptFilterCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new CreateReceiptFilterCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateReceiptFilterCommandInput} for command's `input` shape.
 * @see {@link CreateReceiptFilterCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CreateReceiptFilterCommand = /** @class */ (function (_super) {
    __extends(CreateReceiptFilterCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateReceiptFilterCommand(input) {
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
    CreateReceiptFilterCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "CreateReceiptFilterCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateReceiptFilterRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateReceiptFilterResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateReceiptFilterCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryCreateReceiptFilterCommand(input, context);
    };
    CreateReceiptFilterCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryCreateReceiptFilterCommand(output, context);
    };
    return CreateReceiptFilterCommand;
}($Command));
export { CreateReceiptFilterCommand };
//# sourceMappingURL=CreateReceiptFilterCommand.js.map