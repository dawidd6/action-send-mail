import { __extends } from "tslib";
import { DeleteConfigurationSetEventDestinationRequest, DeleteConfigurationSetEventDestinationResponse, } from "../models/models_0";
import { deserializeAws_queryDeleteConfigurationSetEventDestinationCommand, serializeAws_queryDeleteConfigurationSetEventDestinationCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes a configuration set event destination. Configuration set event destinations
 *             are associated with configuration sets, which enable you to publish email sending
 *             events. For information about using configuration sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteConfigurationSetEventDestinationCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteConfigurationSetEventDestinationCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteConfigurationSetEventDestinationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteConfigurationSetEventDestinationCommandInput} for command's `input` shape.
 * @see {@link DeleteConfigurationSetEventDestinationCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteConfigurationSetEventDestinationCommand = /** @class */ (function (_super) {
    __extends(DeleteConfigurationSetEventDestinationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteConfigurationSetEventDestinationCommand(input) {
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
    DeleteConfigurationSetEventDestinationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteConfigurationSetEventDestinationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteConfigurationSetEventDestinationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteConfigurationSetEventDestinationResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteConfigurationSetEventDestinationCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteConfigurationSetEventDestinationCommand(input, context);
    };
    DeleteConfigurationSetEventDestinationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteConfigurationSetEventDestinationCommand(output, context);
    };
    return DeleteConfigurationSetEventDestinationCommand;
}($Command));
export { DeleteConfigurationSetEventDestinationCommand };
//# sourceMappingURL=DeleteConfigurationSetEventDestinationCommand.js.map