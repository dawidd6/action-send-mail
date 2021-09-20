"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteConfigurationSetTrackingOptionsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes an association between a configuration set and a custom domain for open and
 *             click event tracking.</p>
 *         <p>By default, images and links used for tracking open and click events are hosted on
 *             domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 *             events. For information about using custom domains, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-custom-open-click-domains.html">Amazon SES Developer Guide</a>.</p>
 *         <note>
 *             <p>Deleting this kind of association will result in emails sent using the specified
 *                 configuration set to capture open and click events using the standard,
 *                 Amazon SES-operated domains.</p>
 *         </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteConfigurationSetTrackingOptionsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteConfigurationSetTrackingOptionsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteConfigurationSetTrackingOptionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteConfigurationSetTrackingOptionsCommandInput} for command's `input` shape.
 * @see {@link DeleteConfigurationSetTrackingOptionsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class DeleteConfigurationSetTrackingOptionsCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteConfigurationSetTrackingOptionsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteConfigurationSetTrackingOptionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteConfigurationSetTrackingOptionsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryDeleteConfigurationSetTrackingOptionsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryDeleteConfigurationSetTrackingOptionsCommand(output, context);
    }
}
exports.DeleteConfigurationSetTrackingOptionsCommand = DeleteConfigurationSetTrackingOptionsCommand;
//# sourceMappingURL=DeleteConfigurationSetTrackingOptionsCommand.js.map