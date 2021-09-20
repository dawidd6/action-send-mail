"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRawEmailCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Composes an email message and immediately queues it for sending.</p>
 *
 *         <p>This operation is more flexible than the <code>SendEmail</code> API operation. When
 *             you use the <code>SendRawEmail</code> operation, you can specify the headers of the
 *             message as well as its content. This flexibility is useful, for example, when you want
 *             to send a multipart MIME email (such a message that contains both a text and an HTML
 *             version). You can also use this operation to send messages that include
 *             attachments.</p>
 *         <p>The <code>SendRawEmail</code> operation has the following requirements:</p>
 *         <ul>
 *             <li>
 *                 <p>You can only send email from <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html">verified email addresses or domains</a>. If you try
 *                     to send email from an address that isn't verified, the operation results in an
 *                     "Email address not verified" error.</p>
 *             </li>
 *             <li>
 *                 <p>If your account is still in the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html">Amazon SES sandbox</a>, you can only send email to other
 *                     verified addresses in your account, or to addresses that are associated with the
 *                         <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/mailbox-simulator.html">Amazon SES mailbox simulator</a>.</p>
 *             </li>
 *             <li>
 *                 <p>The maximum message size, including attachments, is 10 MB.</p>
 *             </li>
 *             <li>
 *                 <p>Each message has to include at least one recipient address. A recipient
 *                     address includes any address on the To:, CC:, or BCC: lines.</p>
 *             </li>
 *             <li>
 *                 <p>If you send a single message to more than one recipient address, and one of
 *                     the recipient addresses isn't in a valid format (that is, it's not in the format
 *                         <i>UserName@[SubDomain.]Domain.TopLevelDomain</i>), Amazon SES
 *                     rejects the entire message, even if the other addresses are valid.</p>
 *             </li>
 *             <li>
 *                 <p>Each message can include up to 50 recipient addresses across the To:, CC:, or
 *                     BCC: lines. If you need to send a single message to more than 50 recipients, you
 *                     have to split the list of recipient addresses into groups of less than 50
 *                     recipients, and send separate messages to each group.</p>
 *             </li>
 *             <li>
 *                 <p>Amazon SES allows you to specify 8-bit Content-Transfer-Encoding for MIME message
 *                     parts. However, if Amazon SES has to modify the contents of your message (for
 *                     example, if you use open and click tracking), 8-bit content isn't preserved. For
 *                     this reason, we highly recommend that you encode all content that isn't 7-bit
 *                     ASCII. For more information, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-raw.html#send-email-mime-encoding">MIME Encoding</a> in the <i>Amazon SES Developer
 *                         Guide</i>.</p>
 *             </li>
 *          </ul>
 *
 *
 *
 *         <p>Additionally, keep the following considerations in mind when using the
 *                 <code>SendRawEmail</code> operation:</p>
 *
 *         <ul>
 *             <li>
 *                 <p>Although you can customize the message headers when using the
 *                         <code>SendRawEmail</code> operation, Amazon SES will automatically apply its own
 *                         <code>Message-ID</code> and <code>Date</code> headers; if you passed these
 *                     headers when creating the message, they will be overwritten by the values that
 *                     Amazon SES provides.</p>
 *             </li>
 *             <li>
 *                 <p>If you are using sending authorization to send on behalf of another user,
 *                         <code>SendRawEmail</code> enables you to specify the cross-account identity
 *                     for the email's Source, From, and Return-Path parameters in one of two ways: you
 *                     can pass optional parameters <code>SourceArn</code>, <code>FromArn</code>,
 *                     and/or <code>ReturnPathArn</code> to the API, or you can include the following
 *                     X-headers in the header of your raw email:</p>
 *                 <ul>
 *                   <li>
 *                         <p>
 *                             <code>X-SES-SOURCE-ARN</code>
 *                         </p>
 *                     </li>
 *                   <li>
 *                         <p>
 *                             <code>X-SES-FROM-ARN</code>
 *                         </p>
 *                     </li>
 *                   <li>
 *                         <p>
 *                             <code>X-SES-RETURN-PATH-ARN</code>
 *                         </p>
 *                     </li>
 *                </ul>
 *                 <important>
 *                     <p>Don't include these X-headers in the DKIM signature. Amazon SES removes these
 *                         before it sends the email.</p>
 *                 </important>
 *                 <p>If you only specify the <code>SourceIdentityArn</code> parameter, Amazon SES sets
 *                     the From and Return-Path addresses to the same identity that you
 *                     specified.</p>
 *                 <p>For more information about sending authorization, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sending-authorization.html">Using Sending
 *                         Authorization with Amazon SES</a> in the <i>Amazon SES Developer
 *                         Guide.</i>
 *                </p>
 *             </li>
 *             <li>
 *                 <p>For every message that you send, the total number of recipients (including
 *                     each recipient in the To:, CC: and BCC: fields) is counted against the maximum
 *                     number of emails you can send in a 24-hour period (your <i>sending
 *                         quota</i>). For more information about sending quotas in Amazon SES, see
 *                         <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/manage-sending-limits.html">Managing Your
 *                         Amazon SES Sending Limits</a> in the <i>Amazon SES Developer
 *                         Guide.</i>
 *                </p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SendRawEmailCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SendRawEmailCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendRawEmailCommandInput} for command's `input` shape.
 * @see {@link SendRawEmailCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class SendRawEmailCommand extends smithy_client_1.Command {
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
        const commandName = "SendRawEmailCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SendRawEmailRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SendRawEmailResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySendRawEmailCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySendRawEmailCommand(output, context);
    }
}
exports.SendRawEmailCommand = SendRawEmailCommand;
//# sourceMappingURL=SendRawEmailCommand.js.map