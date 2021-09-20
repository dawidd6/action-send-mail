"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class SendEmailCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "SESClient";
        const commandName = "SendEmailCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SendEmailRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SendEmailResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySendEmailCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySendEmailCommand(output, context);
    }
}
exports.SendEmailCommand = SendEmailCommand;
//# sourceMappingURL=SendEmailCommand.js.map