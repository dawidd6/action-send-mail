"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderReceiptRuleSetCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Reorders the receipt rules within a receipt rule set.</p>
 *         <note>
 *             <p>All of the rules in the rule set must be represented in this request. That is,
 *                 this API will return an error if the reorder request doesn't explicitly position all
 *                 of the rules.</p>
 *         </note>
 *         <p>For information about managing receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rule-sets.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ReorderReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ReorderReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ReorderReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ReorderReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link ReorderReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class ReorderReceiptRuleSetCommand extends smithy_client_1.Command {
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
        const commandName = "ReorderReceiptRuleSetCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ReorderReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ReorderReceiptRuleSetResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryReorderReceiptRuleSetCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryReorderReceiptRuleSetCommand(output, context);
    }
}
exports.ReorderReceiptRuleSetCommand = ReorderReceiptRuleSetCommand;
//# sourceMappingURL=ReorderReceiptRuleSetCommand.js.map