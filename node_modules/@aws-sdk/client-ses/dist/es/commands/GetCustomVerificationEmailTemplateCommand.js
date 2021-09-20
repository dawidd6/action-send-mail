import { __extends } from "tslib";
import { GetCustomVerificationEmailTemplateRequest, GetCustomVerificationEmailTemplateResponse, } from "../models/models_0";
import { deserializeAws_queryGetCustomVerificationEmailTemplateCommand, serializeAws_queryGetCustomVerificationEmailTemplateCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the custom email verification template for the template name you
 *             specify.</p>
 *         <p>For more information about custom verification email templates, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/custom-verification-emails.html">Using Custom Verification Email Templates</a> in the <i>Amazon SES Developer
 *                 Guide</i>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetCustomVerificationEmailTemplateCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetCustomVerificationEmailTemplateCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetCustomVerificationEmailTemplateCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetCustomVerificationEmailTemplateCommandInput} for command's `input` shape.
 * @see {@link GetCustomVerificationEmailTemplateCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetCustomVerificationEmailTemplateCommand = /** @class */ (function (_super) {
    __extends(GetCustomVerificationEmailTemplateCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetCustomVerificationEmailTemplateCommand(input) {
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
    GetCustomVerificationEmailTemplateCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetCustomVerificationEmailTemplateCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetCustomVerificationEmailTemplateRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetCustomVerificationEmailTemplateResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetCustomVerificationEmailTemplateCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetCustomVerificationEmailTemplateCommand(input, context);
    };
    GetCustomVerificationEmailTemplateCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetCustomVerificationEmailTemplateCommand(output, context);
    };
    return GetCustomVerificationEmailTemplateCommand;
}($Command));
export { GetCustomVerificationEmailTemplateCommand };
//# sourceMappingURL=GetCustomVerificationEmailTemplateCommand.js.map