import { __extends } from "tslib";
import { ListAccountsRequest, ListAccountsResponse } from "../models/models_0";
import { deserializeAws_restJson1ListAccountsCommand, serializeAws_restJson1ListAccountsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists all AWS accounts assigned to the user. These AWS accounts are assigned by the
 *       administrator of the account. For more information, see <a href="https://docs.aws.amazon.com/singlesignon/latest/userguide/useraccess.html#assignusers">Assign User Access</a> in the <i>AWS SSO User Guide</i>. This operation
 *       returns a paginated response.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SSOClient, ListAccountsCommand } from "@aws-sdk/client-sso"; // ES Modules import
 * // const { SSOClient, ListAccountsCommand } = require("@aws-sdk/client-sso"); // CommonJS import
 * const client = new SSOClient(config);
 * const command = new ListAccountsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListAccountsCommandInput} for command's `input` shape.
 * @see {@link ListAccountsCommandOutput} for command's `response` shape.
 * @see {@link SSOClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListAccountsCommand = /** @class */ (function (_super) {
    __extends(ListAccountsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListAccountsCommand(input) {
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
    ListAccountsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SSOClient";
        var commandName = "ListAccountsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListAccountsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListAccountsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListAccountsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListAccountsCommand(input, context);
    };
    ListAccountsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListAccountsCommand(output, context);
    };
    return ListAccountsCommand;
}($Command));
export { ListAccountsCommand };
//# sourceMappingURL=ListAccountsCommand.js.map