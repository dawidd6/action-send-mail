"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendBulkTemplatedEmailCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class SendBulkTemplatedEmailCommand extends smithy_client_1.Command {
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
        const commandName = "SendBulkTemplatedEmailCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SendBulkTemplatedEmailRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SendBulkTemplatedEmailResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySendBulkTemplatedEmailCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySendBulkTemplatedEmailCommand(output, context);
    }
}
exports.SendBulkTemplatedEmailCommand = SendBulkTemplatedEmailCommand;
//# sourceMappingURL=SendBulkTemplatedEmailCommand.js.map