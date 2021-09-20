"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomVerificationEmailTemplateCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Updates an existing custom verification email template.</p>
 *         <p>For more information about custom verification email templates, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/custom-verification-emails.html">Using Custom Verification Email Templates</a> in the <i>Amazon SES Developer
 *                 Guide</i>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateCustomVerificationEmailTemplateCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateCustomVerificationEmailTemplateCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateCustomVerificationEmailTemplateCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateCustomVerificationEmailTemplateCommandInput} for command's `input` shape.
 * @see {@link UpdateCustomVerificationEmailTemplateCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class UpdateCustomVerificationEmailTemplateCommand extends smithy_client_1.Command {
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
        const commandName = "UpdateCustomVerificationEmailTemplateCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.UpdateCustomVerificationEmailTemplateRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryUpdateCustomVerificationEmailTemplateCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryUpdateCustomVerificationEmailTemplateCommand(output, context);
    }
}
exports.UpdateCustomVerificationEmailTemplateCommand = UpdateCustomVerificationEmailTemplateCommand;
//# sourceMappingURL=UpdateCustomVerificationEmailTemplateCommand.js.map