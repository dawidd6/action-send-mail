import { __extends } from "tslib";
import { GetTemplateRequest, GetTemplateResponse } from "../models/models_0";
import { deserializeAws_queryGetTemplateCommand, serializeAws_queryGetTemplateCommand } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Displays the template object (which includes the Subject line, HTML part and text
 *             part) for the template you specify.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetTemplateCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetTemplateCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetTemplateCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetTemplateCommandInput} for command's `input` shape.
 * @see {@link GetTemplateCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetTemplateCommand = /** @class */ (function (_super) {
    __extends(GetTemplateCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetTemplateCommand(input) {
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
    GetTemplateCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "GetTemplateCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetTemplateRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetTemplateResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetTemplateCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetTemplateCommand(input, context);
    };
    GetTemplateCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetTemplateCommand(output, context);
    };
    return GetTemplateCommand;
}($Command));
export { GetTemplateCommand };
//# sourceMappingURL=GetTemplateCommand.js.map