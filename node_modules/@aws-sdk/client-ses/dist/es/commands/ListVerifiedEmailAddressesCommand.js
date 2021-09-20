import { __extends } from "tslib";
import { ListVerifiedEmailAddressesResponse } from "../models/models_0";
import { deserializeAws_queryListVerifiedEmailAddressesCommand, serializeAws_queryListVerifiedEmailAddressesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deprecated. Use the <code>ListIdentities</code> operation to list the email addresses
 *             and domains associated with your account.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListVerifiedEmailAddressesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListVerifiedEmailAddressesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListVerifiedEmailAddressesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListVerifiedEmailAddressesCommandInput} for command's `input` shape.
 * @see {@link ListVerifiedEmailAddressesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListVerifiedEmailAddressesCommand = /** @class */ (function (_super) {
    __extends(ListVerifiedEmailAddressesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListVerifiedEmailAddressesCommand(input) {
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
    ListVerifiedEmailAddressesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ListVerifiedEmailAddressesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: function (input) { return input; },
            outputFilterSensitiveLog: ListVerifiedEmailAddressesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListVerifiedEmailAddressesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListVerifiedEmailAddressesCommand(input, context);
    };
    ListVerifiedEmailAddressesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListVerifiedEmailAddressesCommand(output, context);
    };
    return ListVerifiedEmailAddressesCommand;
}($Command));
export { ListVerifiedEmailAddressesCommand };
//# sourceMappingURL=ListVerifiedEmailAddressesCommand.js.map