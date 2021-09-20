import { __extends } from "tslib";
import { GetIdentityNotificationAttributesRequest, GetIdentityNotificationAttributesResponse, } from "../models/models_0";
import { deserializeAws_queryGetIdentityNotificationAttributesCommand, serializeAws_queryGetIdentityNotificationAttributesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Given a list of verified identities (email addresses and/or domains), returns a
 *             structure describing identity notification attributes.</p>
 *         <p>This operation is throttled at one request per second and can only get notification
 *             attributes for up to 100 identities at a time.</p>
 *         <p>For more information about using notifications with Amazon SES, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/notifications.html">Amazon SES
 *                 Developer Guide</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetIdentityNotificationAttributesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetIdentityNotificationAttributesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetIdentityNotificationAttributesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetIdentityNotificationAttributesCommandInput} for command's `input` shape.
 * @see {@link GetIdentityNotificationAttributesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetIdentityNotificationAttributesCommand = /** @class */ (function (_super) {
    __extends(GetIdentityNotificationAttributesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetIdentityNotificationAttributesCommand(input) {
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
    GetIdentityNotificationAttributesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetIdentityNotificationAttributesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityNotificationAttributesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityNotificationAttributesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityNotificationAttributesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetIdentityNotificationAttributesCommand(input, context);
    };
    GetIdentityNotificationAttributesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetIdentityNotificationAttributesCommand(output, context);
    };
    return GetIdentityNotificationAttributesCommand;
}($Command));
export { GetIdentityNotificationAttributesCommand };
//# sourceMappingURL=GetIdentityNotificationAttributesCommand.js.map