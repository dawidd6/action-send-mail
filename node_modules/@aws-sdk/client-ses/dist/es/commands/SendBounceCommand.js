import { __extends } from "tslib";
import { SendBounceRequest, SendBounceResponse } from "../models/models_0";
import { deserializeAws_querySendBounceCommand, serializeAws_querySendBounceCommand } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Generates and sends a bounce message to the sender of an email you received through
 *             Amazon SES. You can only use this API on an email up to 24 hours after you receive it.</p>
 *         <note>
 *             <p>You cannot use this API to send generic bounces for mail that was not received by
 *                 Amazon SES.</p>
 *         </note>
 *         <p>For information about receiving email through Amazon SES, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email.html">Amazon SES
 *                 Developer Guide</a>.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, SendBounceCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, SendBounceCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new SendBounceCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendBounceCommandInput} for command's `input` shape.
 * @see {@link SendBounceCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SendBounceCommand = /** @class */ (function (_super) {
    __extends(SendBounceCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SendBounceCommand(input) {
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
    SendBounceCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "SendBounceCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SendBounceRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SendBounceResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SendBounceCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySendBounceCommand(input, context);
    };
    SendBounceCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySendBounceCommand(output, context);
    };
    return SendBounceCommand;
}($Command));
export { SendBounceCommand };
//# sourceMappingURL=SendBounceCommand.js.map