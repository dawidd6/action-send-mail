"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutConfigurationSetDeliveryOptionsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Adds or updates the delivery options for a configuration set.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, PutConfigurationSetDeliveryOptionsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, PutConfigurationSetDeliveryOptionsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new PutConfigurationSetDeliveryOptionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PutConfigurationSetDeliveryOptionsCommandInput} for command's `input` shape.
 * @see {@link PutConfigurationSetDeliveryOptionsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class PutConfigurationSetDeliveryOptionsCommand extends smithy_client_1.Command {
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
        const commandName = "PutConfigurationSetDeliveryOptionsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutConfigurationSetDeliveryOptionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.PutConfigurationSetDeliveryOptionsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryPutConfigurationSetDeliveryOptionsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryPutConfigurationSetDeliveryOptionsCommand(output, context);
    }
}
exports.PutConfigurationSetDeliveryOptionsCommand = PutConfigurationSetDeliveryOptionsCommand;
//# sourceMappingURL=PutConfigurationSetDeliveryOptionsCommand.js.map