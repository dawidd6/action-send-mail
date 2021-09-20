import { __extends } from "tslib";
import { UpdateConfigurationSetTrackingOptionsRequest, UpdateConfigurationSetTrackingOptionsResponse, } from "../models/models_0";
import { deserializeAws_queryUpdateConfigurationSetTrackingOptionsCommand, serializeAws_queryUpdateConfigurationSetTrackingOptionsCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Modifies an association between a configuration set and a custom domain for open and
 *             click event tracking. </p>
 *         <p>By default, images and links used for tracking open and click events are hosted on
 *             domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 *             events. For information about using custom domains, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-custom-open-click-domains.html">Amazon SES Developer Guide</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, UpdateConfigurationSetTrackingOptionsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, UpdateConfigurationSetTrackingOptionsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new UpdateConfigurationSetTrackingOptionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateConfigurationSetTrackingOptionsCommandInput} for command's `input` shape.
 * @see {@link UpdateConfigurationSetTrackingOptionsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UpdateConfigurationSetTrackingOptionsCommand = /** @class */ (function (_super) {
    __extends(UpdateConfigurationSetTrackingOptionsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateConfigurationSetTrackingOptionsCommand(input) {
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
    UpdateConfigurationSetTrackingOptionsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "UpdateConfigurationSetTrackingOptionsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateConfigurationSetTrackingOptionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateConfigurationSetTrackingOptionsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateConfigurationSetTrackingOptionsCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryUpdateConfigurationSetTrackingOptionsCommand(input, context);
    };
    UpdateConfigurationSetTrackingOptionsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryUpdateConfigurationSetTrackingOptionsCommand(output, context);
    };
    return UpdateConfigurationSetTrackingOptionsCommand;
}($Command));
export { UpdateConfigurationSetTrackingOptionsCommand };
//# sourceMappingURL=UpdateConfigurationSetTrackingOptionsCommand.js.map