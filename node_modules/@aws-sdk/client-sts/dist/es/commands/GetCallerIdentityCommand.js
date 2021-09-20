import { __extends } from "tslib";
import { GetCallerIdentityRequest, GetCallerIdentityResponse } from "../models/models_0";
import { deserializeAws_queryGetCallerIdentityCommand, serializeAws_queryGetCallerIdentityCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { getAwsAuthPlugin } from "@aws-sdk/middleware-signing";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var GetCallerIdentityCommand = /** @class */ (function (_super) {
    __extends(GetCallerIdentityCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetCallerIdentityCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    GetCallerIdentityCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getAwsAuthPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "STSClient";
        var commandName = "GetCallerIdentityCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetCallerIdentityRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetCallerIdentityResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetCallerIdentityCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetCallerIdentityCommand(input, context);
    };
    GetCallerIdentityCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetCallerIdentityCommand(output, context);
    };
    return GetCallerIdentityCommand;
}($Command));
export { GetCallerIdentityCommand };
//# sourceMappingURL=GetCallerIdentityCommand.js.map