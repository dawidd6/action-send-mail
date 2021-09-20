import { __extends } from "tslib";
import { GetIdentityMailFromDomainAttributesRequest, GetIdentityMailFromDomainAttributesResponse, } from "../models/models_0";
import { deserializeAws_queryGetIdentityMailFromDomainAttributesCommand, serializeAws_queryGetIdentityMailFromDomainAttributesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the custom MAIL FROM attributes for a list of identities (email addresses :
 *             domains).</p>
 *         <p>This operation is throttled at one request per second and can only get custom MAIL
 *             FROM attributes for up to 100 identities at a time.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetIdentityMailFromDomainAttributesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetIdentityMailFromDomainAttributesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetIdentityMailFromDomainAttributesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetIdentityMailFromDomainAttributesCommandInput} for command's `input` shape.
 * @see {@link GetIdentityMailFromDomainAttributesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetIdentityMailFromDomainAttributesCommand = /** @class */ (function (_super) {
    __extends(GetIdentityMailFromDomainAttributesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetIdentityMailFromDomainAttributesCommand(input) {
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
    GetIdentityMailFromDomainAttributesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetIdentityMailFromDomainAttributesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityMailFromDomainAttributesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityMailFromDomainAttributesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityMailFromDomainAttributesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetIdentityMailFromDomainAttributesCommand(input, context);
    };
    GetIdentityMailFromDomainAttributesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetIdentityMailFromDomainAttributesCommand(output, context);
    };
    return GetIdentityMailFromDomainAttributesCommand;
}($Command));
export { GetIdentityMailFromDomainAttributesCommand };
//# sourceMappingURL=GetIdentityMailFromDomainAttributesCommand.js.map