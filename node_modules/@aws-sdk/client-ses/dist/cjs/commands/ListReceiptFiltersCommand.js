"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListReceiptFiltersCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Lists the IP address filters associated with your AWS account in the current AWS
 *             Region.</p>
 *         <p>For information about managing IP address filters, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-ip-filters.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListReceiptFiltersCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListReceiptFiltersCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListReceiptFiltersCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListReceiptFiltersCommandInput} for command's `input` shape.
 * @see {@link ListReceiptFiltersCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class ListReceiptFiltersCommand extends smithy_client_1.Command {
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
        const commandName = "ListReceiptFiltersCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListReceiptFiltersRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListReceiptFiltersResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryListReceiptFiltersCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryListReceiptFiltersCommand(output, context);
    }
}
exports.ListReceiptFiltersCommand = ListReceiptFiltersCommand;
//# sourceMappingURL=ListReceiptFiltersCommand.js.map