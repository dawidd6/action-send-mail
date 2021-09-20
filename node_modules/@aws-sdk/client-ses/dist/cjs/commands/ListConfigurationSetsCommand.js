"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListConfigurationSetsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Provides a list of the configuration sets associated with your Amazon SES account in the
 *             current AWS Region. For information about using configuration sets, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Monitoring Your Amazon SES Sending Activity</a> in the <i>Amazon SES Developer
 *                 Guide.</i>
 *          </p>
 *         <p>You can execute this operation no more than once per second. This operation will
 *             return up to 1,000 configuration sets each time it is run. If your Amazon SES account has
 *             more than 1,000 configuration sets, this operation will also return a NextToken element.
 *             You can then execute the <code>ListConfigurationSets</code> operation again, passing the
 *                 <code>NextToken</code> parameter and the value of the NextToken element to retrieve
 *             additional results.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListConfigurationSetsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListConfigurationSetsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListConfigurationSetsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListConfigurationSetsCommandInput} for command's `input` shape.
 * @see {@link ListConfigurationSetsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class ListConfigurationSetsCommand extends smithy_client_1.Command {
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
        const commandName = "ListConfigurationSetsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListConfigurationSetsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListConfigurationSetsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryListConfigurationSetsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryListConfigurationSetsCommand(output, context);
    }
}
exports.ListConfigurationSetsCommand = ListConfigurationSetsCommand;
//# sourceMappingURL=ListConfigurationSetsCommand.js.map