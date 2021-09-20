import { __extends } from "tslib";
import { ListIdentitiesRequest, ListIdentitiesResponse } from "../models/models_0";
import { deserializeAws_queryListIdentitiesCommand, serializeAws_queryListIdentitiesCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns a list containing all of the identities (email addresses and domains) for your
 *             AWS account in the current AWS Region, regardless of verification status.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListIdentitiesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListIdentitiesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListIdentitiesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListIdentitiesCommandInput} for command's `input` shape.
 * @see {@link ListIdentitiesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListIdentitiesCommand = /** @class */ (function (_super) {
    __extends(ListIdentitiesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListIdentitiesCommand(input) {
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
    ListIdentitiesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "ListIdentitiesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListIdentitiesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListIdentitiesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListIdentitiesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListIdentitiesCommand(input, context);
    };
    ListIdentitiesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListIdentitiesCommand(output, context);
    };
    return ListIdentitiesCommand;
}($Command));
export { ListIdentitiesCommand };
//# sourceMappingURL=ListIdentitiesCommand.js.map