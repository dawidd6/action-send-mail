import { __extends } from "tslib";
import { UpdateCustomVerificationEmailTemplateRequest } from "../models/models_0";
import { deserializeAws_queryUpdateCustomVerificationEmailTemplateCommand, serializeAws_queryUpdateCustomVerificationEmailTemplateCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Updates an existing custom verification email template.</p>
 *         <p>For more information about custom verification email templates, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/custom-verification-emails.html">Using Custom Verification Email Templates</a> in the <i>Amazon SES Developer
 *                 Guide</i>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateCustomVerificationEmailTemplateCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateCustomVerificationEmailTemplateCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateCustomVerificationEmailTemplateCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateCustomVerificationEmailTemplateCommandInput} for command's `input` shape.
 * @see {@link UpdateCustomVerificationEmailTemplateCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UpdateCustomVerificationEmailTemplateCommand = /** @class */ (function (_super) {
    __extends(UpdateCustomVerificationEmailTemplateCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateCustomVerificationEmailTemplateCommand(input) {
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
    UpdateCustomVerificationEmailTemplateCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "UpdateCustomVerificationEmailTemplateCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateCustomVerificationEmailTemplateRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateCustomVerificationEmailTemplateCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryUpdateCustomVerificationEmailTemplateCommand(input, context);
    };
    UpdateCustomVerificationEmailTemplateCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryUpdateCustomVerificationEmailTemplateCommand(output, context);
    };
    return UpdateCustomVerificationEmailTemplateCommand;
}($Command));
export { UpdateCustomVerificationEmailTemplateCommand };
//# sourceMappingURL=UpdateCustomVerificationEmailTemplateCommand.js.map