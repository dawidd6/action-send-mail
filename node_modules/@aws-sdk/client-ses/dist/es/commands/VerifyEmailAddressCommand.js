import { __extends } from "tslib";
import { VerifyEmailAddressRequest } from "../models/models_0";
import { deserializeAws_queryVerifyEmailAddressCommand, serializeAws_queryVerifyEmailAddressCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deprecated. Use the <code>VerifyEmailIdentity</code> operation to verify a new email
 *             address.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, VerifyEmailAddressCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, VerifyEmailAddressCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new VerifyEmailAddressCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link VerifyEmailAddressCommandInput} for command's `input` shape.
 * @see {@link VerifyEmailAddressCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var VerifyEmailAddressCommand = /** @class */ (function (_super) {
    __extends(VerifyEmailAddressCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function VerifyEmailAddressCommand(input) {
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
    VerifyEmailAddressCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "VerifyEmailAddressCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: VerifyEmailAddressRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    VerifyEmailAddressCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryVerifyEmailAddressCommand(input, context);
    };
    VerifyEmailAddressCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryVerifyEmailAddressCommand(output, context);
    };
    return VerifyEmailAddressCommand;
}($Command));
export { VerifyEmailAddressCommand };
//# sourceMappingURL=VerifyEmailAddressCommand.js.map