import { __extends } from "tslib";
import { SetIdentityDkimEnabledRequest, SetIdentityDkimEnabledResponse } from "../models/models_0";
import { deserializeAws_querySetIdentityDkimEnabledCommand, serializeAws_querySetIdentityDkimEnabledCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Enables or disables Easy DKIM signing of email sent from an identity. If Easy DKIM
 *             signing is enabled for a domain, then Amazon SES uses DKIM to sign all email that it sends
 *             from addresses on that domain. If Easy DKIM signing is enabled for an email address,
 *             then Amazon SES uses DKIM to sign all email it sends from that address.</p>
 *         <note>
 *             <p>For email addresses (for example, <code>user@example.com</code>), you can only
 *                 enable DKIM signing if the corresponding domain (in this case,
 *                     <code>example.com</code>) has been set up to use Easy DKIM.</p>
 *         </note>
 *         <p>You can enable DKIM signing for an identity at any time after you start the
 *             verification process for the identity, even if the verification process isn't complete. </p>
 *         <p>You can execute this operation no more than once per second.</p>
 *         <p>For more information about Easy DKIM signing, go to the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html">Amazon SES Developer Guide</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SetIdentityDkimEnabledCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SetIdentityDkimEnabledCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SetIdentityDkimEnabledCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetIdentityDkimEnabledCommandInput} for command's `input` shape.
 * @see {@link SetIdentityDkimEnabledCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SetIdentityDkimEnabledCommand = /** @class */ (function (_super) {
    __extends(SetIdentityDkimEnabledCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SetIdentityDkimEnabledCommand(input) {
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
    SetIdentityDkimEnabledCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SetIdentityDkimEnabledCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetIdentityDkimEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SetIdentityDkimEnabledResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetIdentityDkimEnabledCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySetIdentityDkimEnabledCommand(input, context);
    };
    SetIdentityDkimEnabledCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySetIdentityDkimEnabledCommand(output, context);
    };
    return SetIdentityDkimEnabledCommand;
}($Command));
export { SetIdentityDkimEnabledCommand };
//# sourceMappingURL=SetIdentityDkimEnabledCommand.js.map