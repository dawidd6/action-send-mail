import { __extends } from "tslib";
import { ListCustomVerificationEmailTemplatesRequest, ListCustomVerificationEmailTemplatesResponse, } from "../models/models_0";
import { deserializeAws_queryListCustomVerificationEmailTemplatesCommand, serializeAws_queryListCustomVerificationEmailTemplatesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the existing custom verification email templates for your account in the current
 *             AWS Region.</p>
 *         <p>For more information about custom verification email templates, see <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/custom-verification-emails.html">Using Custom Verification Email Templates</a> in the <i>Amazon SES Developer
 *                 Guide</i>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListCustomVerificationEmailTemplatesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListCustomVerificationEmailTemplatesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListCustomVerificationEmailTemplatesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListCustomVerificationEmailTemplatesCommandInput} for command's `input` shape.
 * @see {@link ListCustomVerificationEmailTemplatesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListCustomVerificationEmailTemplatesCommand = /** @class */ (function (_super) {
    __extends(ListCustomVerificationEmailTemplatesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListCustomVerificationEmailTemplatesCommand(input) {
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
    ListCustomVerificationEmailTemplatesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ListCustomVerificationEmailTemplatesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListCustomVerificationEmailTemplatesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListCustomVerificationEmailTemplatesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListCustomVerificationEmailTemplatesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListCustomVerificationEmailTemplatesCommand(input, context);
    };
    ListCustomVerificationEmailTemplatesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListCustomVerificationEmailTemplatesCommand(output, context);
    };
    return ListCustomVerificationEmailTemplatesCommand;
}($Command));
export { ListCustomVerificationEmailTemplatesCommand };
//# sourceMappingURL=ListCustomVerificationEmailTemplatesCommand.js.map