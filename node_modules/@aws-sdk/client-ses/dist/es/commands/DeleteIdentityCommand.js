import { __extends } from "tslib";
import { DeleteIdentityRequest, DeleteIdentityResponse } from "../models/models_0";
import { deserializeAws_queryDeleteIdentityCommand, serializeAws_queryDeleteIdentityCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified identity (an email address or a domain) from the list of
 *             verified identities.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteIdentityCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteIdentityCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteIdentityCommandInput} for command's `input` shape.
 * @see {@link DeleteIdentityCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteIdentityCommand = /** @class */ (function (_super) {
    __extends(DeleteIdentityCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteIdentityCommand(input) {
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
    DeleteIdentityCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteIdentityCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteIdentityRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteIdentityResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteIdentityCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteIdentityCommand(input, context);
    };
    DeleteIdentityCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteIdentityCommand(output, context);
    };
    return DeleteIdentityCommand;
}($Command));
export { DeleteIdentityCommand };
//# sourceMappingURL=DeleteIdentityCommand.js.map