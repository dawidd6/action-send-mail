"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccountSendingEnabledCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Returns the email sending status of the Amazon SES account for the current region.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetAccountSendingEnabledCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetAccountSendingEnabledCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetAccountSendingEnabledCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetAccountSendingEnabledCommandInput} for command's `input` shape.
 * @see {@link GetAccountSendingEnabledCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class GetAccountSendingEnabledCommand extends smithy_client_1.Command {
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
        const commandName = "GetAccountSendingEnabledCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: (input) => input,
            outputFilterSensitiveLog: models_0_1.GetAccountSendingEnabledResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryGetAccountSendingEnabledCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryGetAccountSendingEnabledCommand(output, context);
    }
}
exports.GetAccountSendingEnabledCommand = GetAccountSendingEnabledCommand;
//# sourceMappingURL=GetAccountSendingEnabledCommand.js.map