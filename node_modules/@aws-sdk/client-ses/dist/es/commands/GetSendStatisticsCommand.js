import { __extends } from "tslib";
import { GetSendStatisticsResponse } from "../models/models_0";
import { deserializeAws_queryGetSendStatisticsCommand, serializeAws_queryGetSendStatisticsCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Provides sending statistics for the current AWS Region. The result is a list of data
 *             points, representing the last two weeks of sending activity. Each data point in the list
 *             contains statistics for a 15-minute period of time.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetSendStatisticsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetSendStatisticsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetSendStatisticsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetSendStatisticsCommandInput} for command's `input` shape.
 * @see {@link GetSendStatisticsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetSendStatisticsCommand = /** @class */ (function (_super) {
    __extends(GetSendStatisticsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetSendStatisticsCommand(input) {
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
    GetSendStatisticsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetSendStatisticsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: function (input) { return input; },
            outputFilterSensitiveLog: GetSendStatisticsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetSendStatisticsCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetSendStatisticsCommand(input, context);
    };
    GetSendStatisticsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetSendStatisticsCommand(output, context);
    };
    return GetSendStatisticsCommand;
}($Command));
export { GetSendStatisticsCommand };
//# sourceMappingURL=GetSendStatisticsCommand.js.map