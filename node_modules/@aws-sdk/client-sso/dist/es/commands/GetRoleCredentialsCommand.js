import { __extends } from "tslib";
import { GetRoleCredentialsRequest, GetRoleCredentialsResponse } from "../models/models_0";
import { deserializeAws_restJson1GetRoleCredentialsCommand, serializeAws_restJson1GetRoleCredentialsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the STS short-term credentials for a given role name that is assigned to the
 *       user.</p>
 */
var GetRoleCredentialsCommand = /** @class */ (function (_super) {
    __extends(GetRoleCredentialsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetRoleCredentialsCommand(input) {
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
    GetRoleCredentialsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SSOClient";
        var commandName = "GetRoleCredentialsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetRoleCredentialsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetRoleCredentialsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetRoleCredentialsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetRoleCredentialsCommand(input, context);
    };
    GetRoleCredentialsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetRoleCredentialsCommand(output, context);
    };
    return GetRoleCredentialsCommand;
}($Command));
export { GetRoleCredentialsCommand };
//# sourceMappingURL=GetRoleCredentialsCommand.js.map