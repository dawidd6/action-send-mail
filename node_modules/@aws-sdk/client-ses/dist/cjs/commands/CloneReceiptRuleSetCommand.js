"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloneReceiptRuleSetCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates a receipt rule set by cloning an existing one. All receipt rules and
 *             configurations are copied to the new receipt rule set and are completely independent of
 *             the source rule set.</p>
 *         <p>For information about setting up rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-receipt-rule-set.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, CloneReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, CloneReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new CloneReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CloneReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link CloneReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class CloneReceiptRuleSetCommand extends smithy_client_1.Command {
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
        const commandName = "CloneReceiptRuleSetCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CloneReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CloneReceiptRuleSetResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryCloneReceiptRuleSetCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryCloneReceiptRuleSetCommand(output, context);
    }
}
exports.CloneReceiptRuleSetCommand = CloneReceiptRuleSetCommand;
//# sourceMappingURL=CloneReceiptRuleSetCommand.js.map