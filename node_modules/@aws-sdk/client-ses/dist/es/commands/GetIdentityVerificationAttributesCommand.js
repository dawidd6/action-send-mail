import { __extends } from "tslib";
import { GetIdentityVerificationAttributesRequest, GetIdentityVerificationAttributesResponse, } from "../models/models_0";
import { deserializeAws_queryGetIdentityVerificationAttributesCommand, serializeAws_queryGetIdentityVerificationAttributesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Given a list of identities (email addresses and/or domains), returns the verification
 *             status and (for domain identities) the verification token for each identity.</p>
 *         <p>The verification status of an email address is "Pending" until the email address owner
 *             clicks the link within the verification email that Amazon SES sent to that address. If the
 *             email address owner clicks the link within 24 hours, the verification status of the
 *             email address changes to "Success". If the link is not clicked within 24 hours, the
 *             verification status changes to "Failed." In that case, if you still want to verify the
 *             email address, you must restart the verification process from the beginning.</p>
 *         <p>For domain identities, the domain's verification status is "Pending" as Amazon SES searches
 *             for the required TXT record in the DNS settings of the domain. When Amazon SES detects the
 *             record, the domain's verification status changes to "Success". If Amazon SES is unable to
 *             detect the record within 72 hours, the domain's verification status changes to "Failed."
 *             In that case, if you still want to verify the domain, you must restart the verification
 *             process from the beginning.</p>
 *         <p>This operation is throttled at one request per second and can only get verification
 *             attributes for up to 100 identities at a time.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetIdentityVerificationAttributesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetIdentityVerificationAttributesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetIdentityVerificationAttributesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetIdentityVerificationAttributesCommandInput} for command's `input` shape.
 * @see {@link GetIdentityVerificationAttributesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetIdentityVerificationAttributesCommand = /** @class */ (function (_super) {
    __extends(GetIdentityVerificationAttributesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetIdentityVerificationAttributesCommand(input) {
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
    GetIdentityVerificationAttributesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetIdentityVerificationAttributesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityVerificationAttributesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityVerificationAttributesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityVerificationAttributesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetIdentityVerificationAttributesCommand(input, context);
    };
    GetIdentityVerificationAttributesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetIdentityVerificationAttributesCommand(output, context);
    };
    return GetIdentityVerificationAttributesCommand;
}($Command));
export { GetIdentityVerificationAttributesCommand };
//# sourceMappingURL=GetIdentityVerificationAttributesCommand.js.map