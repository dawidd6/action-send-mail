import { __extends } from "tslib";
import { ListTemplatesRequest, ListTemplatesResponse } from "../models/models_0";
import { deserializeAws_queryListTemplatesCommand, serializeAws_queryListTemplatesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the email templates present in your Amazon SES account in the current AWS
 *             Region.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListTemplatesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListTemplatesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListTemplatesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListTemplatesCommandInput} for command's `input` shape.
 * @see {@link ListTemplatesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListTemplatesCommand = /** @class */ (function (_super) {
    __extends(ListTemplatesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListTemplatesCommand(input) {
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
    ListTemplatesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ListTemplatesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListTemplatesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListTemplatesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListTemplatesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListTemplatesCommand(input, context);
    };
    ListTemplatesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListTemplatesCommand(output, context);
    };
    return ListTemplatesCommand;
}($Command));
export { ListTemplatesCommand };
//# sourceMappingURL=ListTemplatesCommand.js.map