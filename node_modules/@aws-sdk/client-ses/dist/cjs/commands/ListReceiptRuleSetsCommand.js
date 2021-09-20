"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListReceiptRuleSetsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Lists the receipt rule sets that exist under your AWS account in the current AWS
 *             Region. If there are additional receipt rule sets to be retrieved, you will receive a
 *                 <code>NextToken</code> that you can provide to the next call to
 *                 <code>ListReceiptRuleSets</code> to retrieve the additional entries.</p>
 *         <p>For information about managing receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rule-sets.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListReceiptRuleSetsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListReceiptRuleSetsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListReceiptRuleSetsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListReceiptRuleSetsCommandInput} for command's `input` shape.
 * @see {@link ListReceiptRuleSetsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class ListReceiptRuleSetsCommand extends smithy_client_1.Command {
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
        const commandName = "ListReceiptRuleSetsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListReceiptRuleSetsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListReceiptRuleSetsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryListReceiptRuleSetsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryListReceiptRuleSetsCommand(output, context);
    }
}
exports.ListReceiptRuleSetsCommand = ListReceiptRuleSetsCommand;
//# sourceMappingURL=ListReceiptRuleSetsCommand.js.map