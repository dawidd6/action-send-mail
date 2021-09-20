import { __extends } from "tslib";
import { DeleteConfigurationSetRequest, DeleteConfigurationSetResponse } from "../models/models_0";
import { deserializeAws_queryDeleteConfigurationSetCommand, serializeAws_queryDeleteConfigurationSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes a configuration set. Configuration sets enable you to publish email sending
 *             events. For information about using configuration sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteConfigurationSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteConfigurationSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteConfigurationSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteConfigurationSetCommandInput} for command's `input` shape.
 * @see {@link DeleteConfigurationSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteConfigurationSetCommand = /** @class */ (function (_super) {
    __extends(DeleteConfigurationSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteConfigurationSetCommand(input) {
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
    DeleteConfigurationSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteConfigurationSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteConfigurationSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteConfigurationSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteConfigurationSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteConfigurationSetCommand(input, context);
    };
    DeleteConfigurationSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteConfigurationSetCommand(output, context);
    };
    return DeleteConfigurationSetCommand;
}($Command));
export { DeleteConfigurationSetCommand };
//# sourceMappingURL=DeleteConfigurationSetCommand.js.map