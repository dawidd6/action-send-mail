import { __extends } from "tslib";
import { SendBulkTemplatedEmailRequest, SendBulkTemplatedEmailResponse } from "../models/models_0";
import { deserializeAws_querySendBulkTemplatedEmailCommand, serializeAws_querySendBulkTemplatedEmailCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Composes an email message to multiple destinations. The message body is created using
 *             an email template.</p>
 *         <p>In order to send email using the <code>SendBulkTemplatedEmail</code> operation, your
 *             call to the API must meet the following requirements:</p>
 *         <ul>
 *             <li>
 *                 <p>The call must refer to an existing email template. You can create email
 *                     templates using the <a>CreateTemplate</a> operation.</p>
 *             </li>
 *             <li>
 *                 <p>The message must be sent from a verified email address or domain.</p>
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
 *                 <p>Each <code>Destination</code> parameter must include at least one recipient
 *                     email address. The recipient address can be a To: address, a CC: address, or a
 *                     BCC: address. If a recipient email address is invalid (that is, it is not in the
 *                     format <i>UserName@[SubDomain.]Domain.TopLevelDomain</i>), the
 *                     entire message will be rejected, even if the message contains other recipients
 *                     that are valid.</p>
 *             </li>
 *             <li>
 *                 <p>The message may not include more than 50 recipients, across the To:, CC: and
 *                     BCC: fields. If you need to send an email message to a larger audience, you can
 *                     divide your recipient list into groups of 50 or fewer, and then call the
 *                         <code>SendBulkTemplatedEmail</code> operation several times to send the
 *                     message to each group.</p>
 *             </li>
 *             <li>
 *                 <p>The number of destinations you can contact in a single call to the API may be
 *                     limited by your account's maximum sending rate.</p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SendBulkTemplatedEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SendBulkTemplatedEmailCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SendBulkTemplatedEmailCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendBulkTemplatedEmailCommandInput} for command's `input` shape.
 * @see {@link SendBulkTemplatedEmailCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SendBulkTemplatedEmailCommand = /** @class */ (function (_super) {
    __extends(SendBulkTemplatedEmailCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SendBulkTemplatedEmailCommand(input) {
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
    SendBulkTemplatedEmailCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SendBulkTemplatedEmailCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SendBulkTemplatedEmailRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SendBulkTemplatedEmailResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SendBulkTemplatedEmailCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySendBulkTemplatedEmailCommand(input, context);
    };
    SendBulkTemplatedEmailCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySendBulkTemplatedEmailCommand(output, context);
    };
    return SendBulkTemplatedEmailCommand;
}($Command));
export { SendBulkTemplatedEmailCommand };
//# sourceMappingURL=SendBulkTemplatedEmailCommand.js.map