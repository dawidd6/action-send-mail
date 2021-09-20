import { __extends } from "tslib";
import { GetIdentityPoliciesRequest, GetIdentityPoliciesResponse } from "../models/models_0";
import { deserializeAws_queryGetIdentityPoliciesCommand, serializeAws_queryGetIdentityPoliciesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the requested sending authorization policies for the given identity (an email
 *             address or a domain). The policies are returned as a map of policy names to policy
 *             contents. You can retrieve a maximum of 20 policies at a time.</p>
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
 * import { SESClient, GetIdentityPoliciesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetIdentityPoliciesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetIdentityPoliciesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetIdentityPoliciesCommandInput} for command's `input` shape.
 * @see {@link GetIdentityPoliciesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetIdentityPoliciesCommand = /** @class */ (function (_super) {
    __extends(GetIdentityPoliciesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetIdentityPoliciesCommand(input) {
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
    GetIdentityPoliciesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetIdentityPoliciesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityPoliciesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityPoliciesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityPoliciesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetIdentityPoliciesCommand(input, context);
    };
    GetIdentityPoliciesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetIdentityPoliciesCommand(output, context);
    };
    return GetIdentityPoliciesCommand;
}($Command));
export { GetIdentityPoliciesCommand };
//# sourceMappingURL=GetIdentityPoliciesCommand.js.map