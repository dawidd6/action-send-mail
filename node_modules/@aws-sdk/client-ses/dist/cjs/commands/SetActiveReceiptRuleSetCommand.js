"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetActiveReceiptRuleSetCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Sets the specified receipt rule set as the active receipt rule set.</p>
 *         <note>
 *             <p>To disable your email-receiving through Amazon SES completely, you can call this API
 *                 with RuleSetName set to null.</p>
 *         </note>
 *         <p>For information about managing receipt rule sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-managing-receipt-rule-sets.html">Amazon SES Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SetActiveReceiptRuleSetCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SetActiveReceiptRuleSetCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SetActiveReceiptRuleSetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetActiveReceiptRuleSetCommandInput} for command's `input` shape.
 * @see {@link SetActiveReceiptRuleSetCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class SetActiveReceiptRuleSetCommand extends smithy_client_1.Command {
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
        const commandName = "SetActiveReceiptRuleSetCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SetActiveReceiptRuleSetRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SetActiveReceiptRuleSetResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySetActiveReceiptRuleSetCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySetActiveReceiptRuleSetCommand(output, context);
    }
}
exports.SetActiveReceiptRuleSetCommand = SetActiveReceiptRuleSetCommand;
//# sourceMappingURL=SetActiveReceiptRuleSetCommand.js.map