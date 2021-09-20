import { __extends } from "tslib";
import { DeleteIdentityPolicyRequest, DeleteIdentityPolicyResponse } from "../models/models_0";
import { deserializeAws_queryDeleteIdentityPolicyCommand, serializeAws_queryDeleteIdentityPolicyCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified sending authorization policy for the given identity (an email
 *             address or a domain). This API returns successfully even if a policy with the specified
 *             name does not exist.</p>
 *         <note>
 *             <p>This API is for the identity owner only. If you have not verified the identity,
 *                 this API will return an error.</p>
 *         </note>
 *         <p>Sending authorization is a feature that enables an identity owner to authorize other
 *             senders to use its identities. For information about using sending authorization, see
 *             the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sending-authorization.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteIdentityPolicyCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteIdentityPolicyCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteIdentityPolicyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteIdentityPolicyCommandInput} for command's `input` shape.
 * @see {@link DeleteIdentityPolicyCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteIdentityPolicyCommand = /** @class */ (function (_super) {
    __extends(DeleteIdentityPolicyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteIdentityPolicyCommand(input) {
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
    DeleteIdentityPolicyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteIdentityPolicyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteIdentityPolicyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteIdentityPolicyResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteIdentityPolicyCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteIdentityPolicyCommand(input, context);
    };
    DeleteIdentityPolicyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteIdentityPolicyCommand(output, context);
    };
    return DeleteIdentityPolicyCommand;
}($Command));
export { DeleteIdentityPolicyCommand };
//# sourceMappingURL=DeleteIdentityPolicyCommand.js.map