"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIdentityPolicyCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes the specified sending authorization policy for the given identity (an email
 *             address or a domain). This API returns successfully even if a policy with the specified
 *             name does not exist.</p>
 *         <note>
 *             <p>This API is for the identity owner only. If you have not verified the identity,
 *                 this API will return an error.</p>
 *         </note>
 *         <p>Sending authorization is a feature that enables an identity owner to authorize other
 *             senders to use its identities. For information about using sending authorization, see
 *             the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sending-authorization.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteIdentityPolicyCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteIdentityPolicyCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteIdentityPolicyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteIdentityPolicyCommandInput} for command's `input` shape.
 * @see {@link DeleteIdentityPolicyCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class DeleteIdentityPolicyCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteIdentityPolicyCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteIdentityPolicyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteIdentityPolicyResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryDeleteIdentityPolicyCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryDeleteIdentityPolicyCommand(output, context);
    }
}
exports.DeleteIdentityPolicyCommand = DeleteIdentityPolicyCommand;
//# sourceMappingURL=DeleteIdentityPolicyCommand.js.map