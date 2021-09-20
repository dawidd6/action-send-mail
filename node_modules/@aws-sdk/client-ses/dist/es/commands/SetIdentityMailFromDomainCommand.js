import { __extends } from "tslib";
import { SetIdentityMailFromDomainRequest, SetIdentityMailFromDomainResponse } from "../models/models_0";
import { deserializeAws_querySetIdentityMailFromDomainCommand, serializeAws_querySetIdentityMailFromDomainCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Enables or disables the custom MAIL FROM domain setup for a verified identity (an
 *             email address or a domain).</p>
 *         <important>
 *             <p>To send emails using the specified MAIL FROM domain, you must add an MX record to
 *                 your MAIL FROM domain's DNS settings. If you want your emails to pass Sender Policy
 *                 Framework (SPF) checks, you must also add or update an SPF record. For more
 *                 information, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/mail-from-set.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         </important>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SetIdentityMailFromDomainCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SetIdentityMailFromDomainCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SetIdentityMailFromDomainCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetIdentityMailFromDomainCommandInput} for command's `input` shape.
 * @see {@link SetIdentityMailFromDomainCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SetIdentityMailFromDomainCommand = /** @class */ (function (_super) {
    __extends(SetIdentityMailFromDomainCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SetIdentityMailFromDomainCommand(input) {
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
    SetIdentityMailFromDomainCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SetIdentityMailFromDomainCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetIdentityMailFromDomainRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SetIdentityMailFromDomainResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetIdentityMailFromDomainCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySetIdentityMailFromDomainCommand(input, context);
    };
    SetIdentityMailFromDomainCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySetIdentityMailFromDomainCommand(output, context);
    };
    return SetIdentityMailFromDomainCommand;
}($Command));
export { SetIdentityMailFromDomainCommand };
//# sourceMappingURL=SetIdentityMailFromDomainCommand.js.map