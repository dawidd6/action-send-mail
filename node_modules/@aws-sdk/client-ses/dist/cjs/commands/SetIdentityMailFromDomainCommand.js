"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetIdentityMailFromDomainCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class SetIdentityMailFromDomainCommand extends smithy_client_1.Command {
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
        const commandName = "SetIdentityMailFromDomainCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SetIdentityMailFromDomainRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SetIdentityMailFromDomainResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySetIdentityMailFromDomainCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySetIdentityMailFromDomainCommand(output, context);
    }
}
exports.SetIdentityMailFromDomainCommand = SetIdentityMailFromDomainCommand;
//# sourceMappingURL=SetIdentityMailFromDomainCommand.js.map