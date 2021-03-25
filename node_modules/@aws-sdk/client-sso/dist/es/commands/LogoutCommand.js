import { __extends } from "tslib";
import { LogoutRequest } from "../models/models_0";
import { deserializeAws_restJson1LogoutCommand, serializeAws_restJson1LogoutCommand } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Removes the client- and server-side session that is associated with the user.</p>
 */
var LogoutCommand = /** @class */ (function (_super) {
    __extends(LogoutCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function LogoutCommand(input) {
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
    LogoutCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SSOClient";
        var commandName = "LogoutCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: LogoutRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    LogoutCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1LogoutCommand(input, context);
    };
    LogoutCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1LogoutCommand(output, context);
    };
    return LogoutCommand;
}($Command));
export { LogoutCommand };
//# sourceMappingURL=LogoutCommand.js.map