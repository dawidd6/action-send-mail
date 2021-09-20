"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetIdentityDkimEnabledCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class SetIdentityDkimEnabledCommand extends smithy_client_1.Command {
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
        const commandName = "SetIdentityDkimEnabledCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SetIdentityDkimEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SetIdentityDkimEnabledResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySetIdentityDkimEnabledCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySetIdentityDkimEnabledCommand(output, context);
    }
}
exports.SetIdentityDkimEnabledCommand = SetIdentityDkimEnabledCommand;
//# sourceMappingURL=SetIdentityDkimEnabledCommand.js.map