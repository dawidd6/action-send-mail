import { __extends } from "tslib";
import { UpdateTemplateRequest, UpdateTemplateResponse } from "../models/models_0";
import { deserializeAws_queryUpdateTemplateCommand, serializeAws_queryUpdateTemplateCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Updates an email template. Email templates enable you to send personalized email to
 *             one or more destinations in a single API operation. For more information, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-personalized-email-api.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateTemplateCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateTemplateCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateTemplateCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateTemplateCommandInput} for command's `input` shape.
 * @see {@link UpdateTemplateCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UpdateTemplateCommand = /** @class */ (function (_super) {
    __extends(UpdateTemplateCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateTemplateCommand(input) {
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
    UpdateTemplateCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "UpdateTemplateCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateTemplateRequest.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateTemplateResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateTemplateCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryUpdateTemplateCommand(input, context);
    };
    UpdateTemplateCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryUpdateTemplateCommand(output, context);
    };
    return UpdateTemplateCommand;
}($Command));
export { UpdateTemplateCommand };
//# sourceMappingURL=UpdateTemplateCommand.js.map