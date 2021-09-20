"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfigurationSetReputationMetricsEnabledCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Enables or disables the publishing of reputation metrics for emails sent using a
 *             specific configuration set in a given AWS Region. Reputation metrics include bounce
 *             and complaint rates. These metrics are published to Amazon CloudWatch. By using CloudWatch, you can
 *             create alarms when bounce or complaint rates exceed certain thresholds.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateConfigurationSetReputationMetricsEnabledCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateConfigurationSetReputationMetricsEnabledCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateConfigurationSetReputationMetricsEnabledCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateConfigurationSetReputationMetricsEnabledCommandInput} for command's `input` shape.
 * @see {@link UpdateConfigurationSetReputationMetricsEnabledCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class UpdateConfigurationSetReputationMetricsEnabledCommand extends smithy_client_1.Command {
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
        const commandName = "UpdateConfigurationSetReputationMetricsEnabledCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.UpdateConfigurationSetReputationMetricsEnabledRequest.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryUpdateConfigurationSetReputationMetricsEnabledCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryUpdateConfigurationSetReputationMetricsEnabledCommand(output, context);
    }
}
exports.UpdateConfigurationSetReputationMetricsEnabledCommand = UpdateConfigurationSetReputationMetricsEnabledCommand;
//# sourceMappingURL=UpdateConfigurationSetReputationMetricsEnabledCommand.js.map