"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailIdentityCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Adds an email address to the list of identities for your Amazon SES account in the current
 *             AWS region and attempts to verify it. As a result of executing this operation, a
 *             verification email is sent to the specified address.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, VerifyEmailIdentityCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, VerifyEmailIdentityCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new VerifyEmailIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link VerifyEmailIdentityCommandInput} for command's `input` shape.
 * @see {@link VerifyEmailIdentityCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class VerifyEmailIdentityCommand extends smithy_client_1.Command {
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
        const commandName = "VerifyEmailIdentityCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.VerifyEmailIdentityRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.VerifyEmailIdentityResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryVerifyEmailIdentityCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryVerifyEmailIdentityCommand(output, context);
    }
}
exports.VerifyEmailIdentityCommand = VerifyEmailIdentityCommand;
//# sourceMappingURL=VerifyEmailIdentityCommand.js.map