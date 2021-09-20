import { __extends } from "tslib";
import { CreateConfigurationSetEventDestinationRequest, CreateConfigurationSetEventDestinationResponse, } from "../models/models_0";
import { deserializeAws_queryCreateConfigurationSetEventDestinationCommand, serializeAws_queryCreateConfigurationSetEventDestinationCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a configuration set event destination.</p>
 *         <note>
 *             <p>When you create or update an event destination, you must provide one, and only
 *                 one, destination. The destination can be CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS).</p>
 *         </note>
 *         <p>An event destination is the AWS service to which Amazon SES publishes the email sending
 *             events associated with a configuration set. For information about using configuration
 *             sets, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html">Amazon SES Developer
 *                 Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, CreateConfigurationSetEventDestinationCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, CreateConfigurationSetEventDestinationCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new CreateConfigurationSetEventDestinationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateConfigurationSetEventDestinationCommandInput} for command's `input` shape.
 * @see {@link CreateConfigurationSetEventDestinationCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CreateConfigurationSetEventDestinationCommand = /** @class */ (function (_super) {
    __extends(CreateConfigurationSetEventDestinationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateConfigurationSetEventDestinationCommand(input) {
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
    CreateConfigurationSetEventDestinationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "CreateConfigurationSetEventDestinationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateConfigurationSetEventDestinationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateConfigurationSetEventDestinationResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateConfigurationSetEventDestinationCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryCreateConfigurationSetEventDestinationCommand(input, context);
    };
    CreateConfigurationSetEventDestinationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryCreateConfigurationSetEventDestinationCommand(output, context);
    };
    return CreateConfigurationSetEventDestinationCommand;
}($Command));
export { CreateConfigurationSetEventDestinationCommand };
//# sourceMappingURL=CreateConfigurationSetEventDestinationCommand.js.map