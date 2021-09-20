import { __extends } from "tslib";
import { VerifyDomainIdentityRequest, VerifyDomainIdentityResponse } from "../models/models_0";
import { deserializeAws_queryVerifyDomainIdentityCommand, serializeAws_queryVerifyDomainIdentityCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Adds a domain to the list of identities for your Amazon SES account in the current AWS
 *             Region and attempts to verify it. For more information about verifying domains, see
 *                 <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html">Verifying Email
 *                 Addresses and Domains</a> in the <i>Amazon SES Developer
 *             Guide.</i>
 *          </p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, VerifyDomainIdentityCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, VerifyDomainIdentityCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new VerifyDomainIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link VerifyDomainIdentityCommandInput} for command's `input` shape.
 * @see {@link VerifyDomainIdentityCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var VerifyDomainIdentityCommand = /** @class */ (function (_super) {
    __extends(VerifyDomainIdentityCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function VerifyDomainIdentityCommand(input) {
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
    VerifyDomainIdentityCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "VerifyDomainIdentityCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: VerifyDomainIdentityRequest.filterSensitiveLog,
            outputFilterSensitiveLog: VerifyDomainIdentityResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    VerifyDomainIdentityCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryVerifyDomainIdentityCommand(input, context);
    };
    VerifyDomainIdentityCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryVerifyDomainIdentityCommand(output, context);
    };
    return VerifyDomainIdentityCommand;
}($Command));
export { VerifyDomainIdentityCommand };
//# sourceMappingURL=VerifyDomainIdentityCommand.js.map