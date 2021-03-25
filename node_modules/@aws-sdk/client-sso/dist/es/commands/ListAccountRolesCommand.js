import { __extends } from "tslib";
import { ListAccountRolesRequest, ListAccountRolesResponse } from "../models/models_0";
import { deserializeAws_restJson1ListAccountRolesCommand, serializeAws_restJson1ListAccountRolesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists all roles that are assigned to the user for a given AWS account.</p>
 */
var ListAccountRolesCommand = /** @class */ (function (_super) {
    __extends(ListAccountRolesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListAccountRolesCommand(input) {
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
    ListAccountRolesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SSOClient";
        var commandName = "ListAccountRolesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListAccountRolesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListAccountRolesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListAccountRolesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListAccountRolesCommand(input, context);
    };
    ListAccountRolesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListAccountRolesCommand(output, context);
    };
    return ListAccountRolesCommand;
}($Command));
export { ListAccountRolesCommand };
//# sourceMappingURL=ListAccountRolesCommand.js.map