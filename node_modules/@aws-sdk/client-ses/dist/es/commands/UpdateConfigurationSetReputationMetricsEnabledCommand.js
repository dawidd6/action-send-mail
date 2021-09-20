import { __extends } from "tslib";
import { UpdateConfigurationSetReputationMetricsEnabledRequest } from "../models/models_0";
import { deserializeAws_queryUpdateConfigurationSetReputationMetricsEnabledCommand, serializeAws_queryUpdateConfigurationSetReputationMetricsEnabledCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Enables or disables the publishing of reputation metrics for emails sent using a
 *             specific configuration set in a given AWS Region. Reputation metrics include bounce
 *             and complaint rates. These metrics are published to Amazon CloudWatch. By using CloudWatch, you can
 *             create alarms when bounce or complaint rates exceed certain thresholds.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateConfigurationSetReputationMetricsEnabledCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateConfigurationSetReputationMetricsEnabledCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateConfigurationSetReputationMetricsEnabledCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateConfigurationSetReputationMetricsEnabledCommandInput} for command's `input` shape.
 * @see {@link UpdateConfigurationSetReputationMetricsEnabledCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UpdateConfigurationSetReputationMetricsEnabledCommand = /** @class */ (function (_super) {
    __extends(UpdateConfigurationSetReputationMetricsEnabledCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateConfigurationSetReputationMetricsEnabledCommand(input) {
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
    UpdateConfigurationSetReputationMetricsEnabledCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "UpdateConfigurationSetReputationMetricsEnabledCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateConfigurationSetReputationMetricsEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateConfigurationSetReputationMetricsEnabledCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryUpdateConfigurationSetReputationMetricsEnabledCommand(input, context);
    };
    UpdateConfigurationSetReputationMetricsEnabledCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryUpdateConfigurationSetReputationMetricsEnabledCommand(output, context);
    };
    return UpdateConfigurationSetReputationMetricsEnabledCommand;
}($Command));
export { UpdateConfigurationSetReputationMetricsEnabledCommand };
//# sourceMappingURL=UpdateConfigurationSetReputationMetricsEnabledCommand.js.map