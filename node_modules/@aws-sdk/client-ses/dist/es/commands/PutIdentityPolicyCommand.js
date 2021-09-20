import { __extends } from "tslib";
import { PutIdentityPolicyRequest, PutIdentityPolicyResponse } from "../models/models_0";
import { deserializeAws_queryPutIdentityPolicyCommand, serializeAws_queryPutIdentityPolicyCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Adds or updates a sending authorization policy for the specified identity (an email
 *             address or a domain).</p>
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
 * import { SESClient, PutIdentityPolicyCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, PutIdentityPolicyCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new PutIdentityPolicyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PutIdentityPolicyCommandInput} for command's `input` shape.
 * @see {@link PutIdentityPolicyCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var PutIdentityPolicyCommand = /** @class */ (function (_super) {
    __extends(PutIdentityPolicyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutIdentityPolicyCommand(input) {
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
    PutIdentityPolicyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "PutIdentityPolicyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutIdentityPolicyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: PutIdentityPolicyResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutIdentityPolicyCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryPutIdentityPolicyCommand(input, context);
    };
    PutIdentityPolicyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryPutIdentityPolicyCommand(output, context);
    };
    return PutIdentityPolicyCommand;
}($Command));
export { PutIdentityPolicyCommand };
//# sourceMappingURL=PutIdentityPolicyCommand.js.map