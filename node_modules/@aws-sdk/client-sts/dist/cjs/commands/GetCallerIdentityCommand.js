"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCallerIdentityCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const middleware_signing_1 = require("@aws-sdk/middleware-signing");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Returns details about the IAM user or role whose credentials are used to call the
 *             operation.</p>
 *         <note>
 *             <p>No permissions are required to perform this operation. If an administrator adds a
 *                 policy to your IAM user or role that explicitly denies access to the
 *                     <code>sts:GetCallerIdentity</code> action, you can still perform this operation.
 *                 Permissions are not required because the same information is returned when an IAM
 *                 user or role is denied access. To view an example response, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_access-denied-delete-mfa">I Am Not Authorized to Perform: iam:DeleteVirtualMFADevice</a> in the
 *                     <i>IAM User Guide</i>.</p>
 *         </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts"; // ES Modules import
 * // const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts"); // CommonJS import
 * const client = new STSClient(config);
 * const command = new GetCallerIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetCallerIdentityCommandInput} for command's `input` shape.
 * @see {@link GetCallerIdentityCommandOutput} for command's `response` shape.
 * @see {@link STSClientResolvedConfig | config} for command's `input` shape.
 *
 */
class GetCallerIdentityCommand extends smithy_client_1.Command {
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
        this.middlewareStack.use(middleware_signing_1.getAwsAuthPlugin(configuration));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "STSClient";
        const commandName = "GetCallerIdentityCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetCallerIdentityRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetCallerIdentityResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryGetCallerIdentityCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryGetCallerIdentityCommand(output, context);
    }
}
exports.GetCallerIdentityCommand = GetCallerIdentityCommand;
//# sourceMappingURL=GetCallerIdentityCommand.js.map