import { __extends } from "tslib";
import { DescribeConfigurationSetRequest, DescribeConfigurationSetResponse } from "../models/models_0";
import { deserializeAws_queryDescribeConfigurationSetCommand, serializeAws_queryDescribeConfigurationSetCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the details of the specified configuration set. For information about using
 *             configuration sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DescribeConfigurationSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DescribeConfigurationSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DescribeConfigurationSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DescribeConfigurationSetCommandInput} for command's `input` shape.
 * @see {@link DescribeConfigurationSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DescribeConfigurationSetCommand = /** @class */ (function (_super) {
    __extends(DescribeConfigurationSetCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeConfigurationSetCommand(input) {
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
    DescribeConfigurationSetCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DescribeConfigurationSetCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeConfigurationSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeConfigurationSetResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeConfigurationSetCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDescribeConfigurationSetCommand(input, context);
    };
    DescribeConfigurationSetCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDescribeConfigurationSetCommand(output, context);
    };
    return DescribeConfigurationSetCommand;
}($Command));
export { DescribeConfigurationSetCommand };
//# sourceMappingURL=DescribeConfigurationSetCommand.js.map