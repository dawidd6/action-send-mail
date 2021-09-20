import { __extends } from "tslib";
import { DeleteVerifiedEmailAddressRequest } from "../models/models_0";
import { deserializeAws_queryDeleteVerifiedEmailAddressCommand, serializeAws_queryDeleteVerifiedEmailAddressCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deprecated. Use the <code>DeleteIdentity</code> operation to delete email addresses
 *             and domains.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteVerifiedEmailAddressCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteVerifiedEmailAddressCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteVerifiedEmailAddressCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteVerifiedEmailAddressCommandInput} for command's `input` shape.
 * @see {@link DeleteVerifiedEmailAddressCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteVerifiedEmailAddressCommand = /** @class */ (function (_super) {
    __extends(DeleteVerifiedEmailAddressCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteVerifiedEmailAddressCommand(input) {
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
    DeleteVerifiedEmailAddressCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteVerifiedEmailAddressCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteVerifiedEmailAddressRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteVerifiedEmailAddressCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteVerifiedEmailAddressCommand(input, context);
    };
    DeleteVerifiedEmailAddressCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteVerifiedEmailAddressCommand(output, context);
    };
    return DeleteVerifiedEmailAddressCommand;
}($Command));
export { DeleteVerifiedEmailAddressCommand };
//# sourceMappingURL=DeleteVerifiedEmailAddressCommand.js.map