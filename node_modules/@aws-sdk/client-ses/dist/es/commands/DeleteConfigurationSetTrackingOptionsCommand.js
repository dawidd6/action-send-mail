import { __extends } from "tslib";
import { DeleteConfigurationSetTrackingOptionsRequest, DeleteConfigurationSetTrackingOptionsResponse, } from "../models/models_0";
import { deserializeAws_queryDeleteConfigurationSetTrackingOptionsCommand, serializeAws_queryDeleteConfigurationSetTrackingOptionsCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes an association between a configuration set and a custom domain for open and
 *             click event tracking.</p>
 *         <p>By default, images and links used for tracking open and click events are hosted on
 *             domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 *             events. For information about using custom domains, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-custom-open-click-domains.html">Amazon SES Developer Guide</a>.</p>
 *         <note>
 *             <p>Deleting this kind of association will result in emails sent using the specified
 *                 configuration set to capture open and click events using the standard,
 *                 Amazon SES-operated domains.</p>
 *         </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, DeleteConfigurationSetTrackingOptionsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, DeleteConfigurationSetTrackingOptionsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new DeleteConfigurationSetTrackingOptionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteConfigurationSetTrackingOptionsCommandInput} for command's `input` shape.
 * @see {@link DeleteConfigurationSetTrackingOptionsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteConfigurationSetTrackingOptionsCommand = /** @class */ (function (_super) {
    __extends(DeleteConfigurationSetTrackingOptionsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteConfigurationSetTrackingOptionsCommand(input) {
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
    DeleteConfigurationSetTrackingOptionsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "DeleteConfigurationSetTrackingOptionsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteConfigurationSetTrackingOptionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteConfigurationSetTrackingOptionsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteConfigurationSetTrackingOptionsCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteConfigurationSetTrackingOptionsCommand(input, context);
    };
    DeleteConfigurationSetTrackingOptionsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteConfigurationSetTrackingOptionsCommand(output, context);
    };
    return DeleteConfigurationSetTrackingOptionsCommand;
}($Command));
export { DeleteConfigurationSetTrackingOptionsCommand };
//# sourceMappingURL=DeleteConfigurationSetTrackingOptionsCommand.js.map