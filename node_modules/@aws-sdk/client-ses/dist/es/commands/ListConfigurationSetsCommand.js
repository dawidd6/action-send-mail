import { __extends } from "tslib";
import { ListConfigurationSetsRequest, ListConfigurationSetsResponse } from "../models/models_0";
import { deserializeAws_queryListConfigurationSetsCommand, serializeAws_queryListConfigurationSetsCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Provides a list of the configuration sets associated with your Amazon SES account in the
 *             current AWS Region. For information about using configuration sets, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Monitoring Your Amazon SES Sending Activity</a> in the <i>Amazon SES Developer
 *                 Guide.</i>
 *          </p>
 *         <p>You can execute this operation no more than once per second. This operation will
 *             return up to 1,000 configuration sets each time it is run. If your Amazon SES account has
 *             more than 1,000 configuration sets, this operation will also return a NextToken element.
 *             You can then execute the <code>ListConfigurationSets</code> operation again, passing the
 *                 <code>NextToken</code> parameter and the value of the NextToken element to retrieve
 *             additional results.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListConfigurationSetsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListConfigurationSetsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListConfigurationSetsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListConfigurationSetsCommandInput} for command's `input` shape.
 * @see {@link ListConfigurationSetsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListConfigurationSetsCommand = /** @class */ (function (_super) {
    __extends(ListConfigurationSetsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListConfigurationSetsCommand(input) {
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
    ListConfigurationSetsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ListConfigurationSetsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListConfigurationSetsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListConfigurationSetsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListConfigurationSetsCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListConfigurationSetsCommand(input, context);
    };
    ListConfigurationSetsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListConfigurationSetsCommand(output, context);
    };
    return ListConfigurationSetsCommand;
}($Command));
export { ListConfigurationSetsCommand };
//# sourceMappingURL=ListConfigurationSetsCommand.js.map