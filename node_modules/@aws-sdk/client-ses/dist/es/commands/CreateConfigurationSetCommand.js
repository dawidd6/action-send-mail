import { __extends } from "tslib";
import { CreateConfigurationSetRequest, CreateConfigurationSetResponse } from "../models/models_0";
import { deserializeAws_queryCreateConfigurationSetCommand, serializeAws_queryCreateConfigurationSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a configuration set.</p>
 *         <p>Configuration sets enable you to publish email sending events. For information about
 *             using configuration sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, CreateConfigurationSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, CreateConfigurationSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new CreateConfigurationSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateConfigurationSetCommandInput} for command's `input` shape.
 * @see {@link CreateConfigurationSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CreateConfigurationSetCommand = /** @class */ (function (_super) {
    __extends(CreateConfigurationSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateConfigurationSetCommand(input) {
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
    CreateConfigurationSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "CreateConfigurationSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateConfigurationSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateConfigurationSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateConfigurationSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryCreateConfigurationSetCommand(input, context);
    };
    CreateConfigurationSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryCreateConfigurationSetCommand(output, context);
    };
    return CreateConfigurationSetCommand;
}($Command));
export { CreateConfigurationSetCommand };
//# sourceMappingURL=CreateConfigurationSetCommand.js.map