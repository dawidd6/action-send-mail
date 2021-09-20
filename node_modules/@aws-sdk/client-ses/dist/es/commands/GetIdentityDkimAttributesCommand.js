import { __extends } from "tslib";
import { GetIdentityDkimAttributesRequest, GetIdentityDkimAttributesResponse } from "../models/models_0";
import { deserializeAws_queryGetIdentityDkimAttributesCommand, serializeAws_queryGetIdentityDkimAttributesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the current status of Easy DKIM signing for an entity. For domain name
 *             identities, this operation also returns the DKIM tokens that are required for Easy DKIM
 *             signing, and whether Amazon SES has successfully verified that these tokens have been
 *             published.</p>
 *         <p>This operation takes a list of identities as input and returns the following
 *             information for each:</p>
 *         <ul>
 *             <li>
 *                 <p>Whether Easy DKIM signing is enabled or disabled.</p>
 *             </li>
 *             <li>
 *                 <p>A set of DKIM tokens that represent the identity. If the identity is an email
 *                     address, the tokens represent the domain of that address.</p>
 *             </li>
 *             <li>
 *                 <p>Whether Amazon SES has successfully verified the DKIM tokens published in the
 *                     domain's DNS. This information is only returned for domain name identities, not
 *                     for email addresses.</p>
 *             </li>
 *          </ul>
 *         <p>This operation is throttled at one request per second and can only get DKIM attributes
 *             for up to 100 identities at a time.</p>
 *         <p>For more information about creating DNS records using DKIM tokens, go to the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim-dns-records.html">Amazon SES Developer Guide</a>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetIdentityDkimAttributesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetIdentityDkimAttributesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetIdentityDkimAttributesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetIdentityDkimAttributesCommandInput} for command's `input` shape.
 * @see {@link GetIdentityDkimAttributesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetIdentityDkimAttributesCommand = /** @class */ (function (_super) {
    __extends(GetIdentityDkimAttributesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetIdentityDkimAttributesCommand(input) {
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
    GetIdentityDkimAttributesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetIdentityDkimAttributesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityDkimAttributesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityDkimAttributesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityDkimAttributesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetIdentityDkimAttributesCommand(input, context);
    };
    GetIdentityDkimAttributesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetIdentityDkimAttributesCommand(output, context);
    };
    return GetIdentityDkimAttributesCommand;
}($Command));
export { GetIdentityDkimAttributesCommand };
//# sourceMappingURL=GetIdentityDkimAttributesCommand.js.map