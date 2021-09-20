import { __extends } from "tslib";
import { PutConfigurationSetDeliveryOptionsRequest, PutConfigurationSetDeliveryOptionsResponse, } from "../models/models_0";
import { deserializeAws_queryPutConfigurationSetDeliveryOptionsCommand, serializeAws_queryPutConfigurationSetDeliveryOptionsCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Adds or updates the delivery options for a configuration set.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, PutConfigurationSetDeliveryOptionsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, PutConfigurationSetDeliveryOptionsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new PutConfigurationSetDeliveryOptionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PutConfigurationSetDeliveryOptionsCommandInput} for command's `input` shape.
 * @see {@link PutConfigurationSetDeliveryOptionsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var PutConfigurationSetDeliveryOptionsCommand = /** @class */ (function (_super) {
    __extends(PutConfigurationSetDeliveryOptionsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutConfigurationSetDeliveryOptionsCommand(input) {
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
    PutConfigurationSetDeliveryOptionsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "PutConfigurationSetDeliveryOptionsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutConfigurationSetDeliveryOptionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: PutConfigurationSetDeliveryOptionsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutConfigurationSetDeliveryOptionsCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryPutConfigurationSetDeliveryOptionsCommand(input, context);
    };
    PutConfigurationSetDeliveryOptionsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryPutConfigurationSetDeliveryOptionsCommand(output, context);
    };
    return PutConfigurationSetDeliveryOptionsCommand;
}($Command));
export { PutConfigurationSetDeliveryOptionsCommand };
//# sourceMappingURL=PutConfigurationSetDeliveryOptionsCommand.js.map