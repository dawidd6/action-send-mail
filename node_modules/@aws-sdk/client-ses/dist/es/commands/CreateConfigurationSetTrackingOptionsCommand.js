import { __extends } from "tslib";
import { CreateConfigurationSetTrackingOptionsRequest, CreateConfigurationSetTrackingOptionsResponse, } from "../models/models_0";
import { deserializeAws_queryCreateConfigurationSetTrackingOptionsCommand, serializeAws_queryCreateConfigurationSetTrackingOptionsCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates an association between a configuration set and a custom domain for open and
 *             click event tracking. </p>
 *         <p>By default, images and links used for tracking open and click events are hosted on
 *             domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 *             events. For information about using custom domains, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-custom-open-click-domains.html">Amazon SES Developer Guide</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, CreateConfigurationSetTrackingOptionsCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, CreateConfigurationSetTrackingOptionsCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new CreateConfigurationSetTrackingOptionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateConfigurationSetTrackingOptionsCommandInput} for command's `input` shape.
 * @see {@link CreateConfigurationSetTrackingOptionsCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CreateConfigurationSetTrackingOptionsCommand = /** @class */ (function (_super) {
    __extends(CreateConfigurationSetTrackingOptionsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateConfigurationSetTrackingOptionsCommand(input) {
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
    CreateConfigurationSetTrackingOptionsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "CreateConfigurationSetTrackingOptionsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateConfigurationSetTrackingOptionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateConfigurationSetTrackingOptionsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateConfigurationSetTrackingOptionsCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryCreateConfigurationSetTrackingOptionsCommand(input, context);
    };
    CreateConfigurationSetTrackingOptionsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryCreateConfigurationSetTrackingOptionsCommand(output, context);
    };
    return CreateConfigurationSetTrackingOptionsCommand;
}($Command));
export { CreateConfigurationSetTrackingOptionsCommand };
//# sourceMappingURL=CreateConfigurationSetTrackingOptionsCommand.js.map