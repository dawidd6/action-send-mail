"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendBounceCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Generates and sends a bounce message to the sender of an email you received through
 *             Amazon SES. You can only use this API on an email up to 24 hours after you receive it.</p>
 *         <note>
 *             <p>You cannot use this API to send generic bounces for mail that was not received by
 *                 Amazon SES.</p>
 *         </note>
 *         <p>For information about receiving email through Amazon SES, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SendBounceCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SendBounceCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SendBounceCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendBounceCommandInput} for command's `input` shape.
 * @see {@link SendBounceCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class SendBounceCommand extends smithy_client_1.Command {
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
        const commandName = "SendBounceCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SendBounceRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SendBounceResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_querySendBounceCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_querySendBounceCommand(output, context);
    }
}
exports.SendBounceCommand = SendBounceCommand;
//# sourceMappingURL=SendBounceCommand.js.map