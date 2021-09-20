import { __extends } from "tslib";
import { GetSendQuotaResponse } from "../models/models_0";
import { deserializeAws_queryGetSendQuotaCommand, serializeAws_queryGetSendQuotaCommand } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Provides the sending limits for the Amazon SES account. </p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetSendQuotaCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetSendQuotaCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetSendQuotaCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetSendQuotaCommandInput} for command's `input` shape.
 * @see {@link GetSendQuotaCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetSendQuotaCommand = /** @class */ (function (_super) {
    __extends(GetSendQuotaCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetSendQuotaCommand(input) {
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
    GetSendQuotaCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetSendQuotaCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: function (input) { return input; },
            outputFilterSensitiveLog: GetSendQuotaResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetSendQuotaCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetSendQuotaCommand(input, context);
    };
    GetSendQuotaCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetSendQuotaCommand(output, context);
    };
    return GetSendQuotaCommand;
}($Command));
export { GetSendQuotaCommand };
//# sourceMappingURL=GetSendQuotaCommand.js.map