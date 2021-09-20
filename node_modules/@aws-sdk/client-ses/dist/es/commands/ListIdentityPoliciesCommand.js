import { __extends } from "tslib";
import { ListIdentityPoliciesRequest, ListIdentityPoliciesResponse } from "../models/models_0";
import { deserializeAws_queryListIdentityPoliciesCommand, serializeAws_queryListIdentityPoliciesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns a list of sending authorization policies that are attached to the given
 *             identity (an email address or a domain). This API returns only a list. If you want the
 *             actual policy content, you can use <code>GetIdentityPolicies</code>.</p>
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
 * import { SESClient, ListIdentityPoliciesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListIdentityPoliciesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListIdentityPoliciesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListIdentityPoliciesCommandInput} for command's `input` shape.
 * @see {@link ListIdentityPoliciesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListIdentityPoliciesCommand = /** @class */ (function (_super) {
    __extends(ListIdentityPoliciesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListIdentityPoliciesCommand(input) {
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
    ListIdentityPoliciesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ListIdentityPoliciesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListIdentityPoliciesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListIdentityPoliciesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListIdentityPoliciesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListIdentityPoliciesCommand(input, context);
    };
    ListIdentityPoliciesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListIdentityPoliciesCommand(output, context);
    };
    return ListIdentityPoliciesCommand;
}($Command));
export { ListIdentityPoliciesCommand };
//# sourceMappingURL=ListIdentityPoliciesCommand.js.map