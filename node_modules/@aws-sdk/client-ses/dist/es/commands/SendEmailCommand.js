import { __extends } from "tslib";
import { SendEmailRequest, SendEmailResponse } from "../models/models_0";
import { deserializeAws_querySendEmailCommand, serializeAws_querySendEmailCommand } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Composes an email message and immediately queues it for sending. In order to send
 *             email using the <code>SendEmail</code> operation, your message must meet the following
 *             requirements:</p>
 *
 *         <ul>
 *             <li>
 *                 <p>The message must be sent from a verified email address or domain. If you
 *                     attempt to send email using a non-verified address or domain, the operation will
 *                     result in an "Email address not verified" error. </p>
 *             </li>
 *             <li>
 *                 <p>If your account is still in the Amazon SES sandbox, you may only send to verified
 *                     addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 *                     Simulator. For more information, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html">Verifying
 *                         Email Addresses and Domains</a> in the <i>Amazon SES Developer
 *                         Guide.</i>
 *                </p>
 *             </li>
 *             <li>
 *                 <p>The maximum message size is 10 MB.</p>
 *             </li>
 *             <li>
 *                 <p>The message must include at least one recipient email address. The recipient
 *                     address can be a To: address, a CC: address, or a BCC: address. If a recipient
 *                     email address is invalid (that is, it is not in the format
 *                         <i>UserName@[SubDomain.]Domain.TopLevelDomain</i>), the entire
 *                     message will be rejected, even if the message contains other recipients that are
 *                     valid.</p>
 *             </li>
 *             <li>
 *                 <p>The message may not include more than 50 recipients, across the To:, CC: and
 *                     BCC: fields. If you need to send an email message to a larger audience, you can
 *                     divide your recipient list into groups of 50 or fewer, and then call the
 *                         <code>SendEmail</code> operation several times to send the message to each
 *                     group.</p>
 *             </li>
 *          </ul>
 *         <important>
 *             <p>For every message that you send, the total number of recipients (including each
 *                 recipient in the To:, CC: and BCC: fields) is counted against the maximum number of
 *                 emails you can send in a 24-hour period (your <i>sending quota</i>).
 *                 For more information about sending quotas in Amazon SES, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/manage-sending-limits.html">Managing Your Amazon SES
 *                     Sending Limits</a> in the <i>Amazon SES Developer Guide.</i>
 *             </p>
 *         </important>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SendEmailCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendEmailCommandInput} for command's `input` shape.
 * @see {@link SendEmailCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SendEmailCommand = /** @class */ (function (_super) {
    __extends(SendEmailCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SendEmailCommand(input) {
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
    SendEmailCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SendEmailCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SendEmailRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SendEmailResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SendEmailCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySendEmailCommand(input, context);
    };
    SendEmailCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySendEmailCommand(output, context);
    };
    return SendEmailCommand;
}($Command));
export { SendEmailCommand };
//# sourceMappingURL=SendEmailCommand.js.map