import { __extends } from "tslib";
import { TestRenderTemplateRequest, TestRenderTemplateResponse } from "../models/models_0";
import { deserializeAws_queryTestRenderTemplateCommand, serializeAws_queryTestRenderTemplateCommand, } from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a preview of the MIME content of an email when provided with a template and a
 *             set of replacement data.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, TestRenderTemplateCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, TestRenderTemplateCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new TestRenderTemplateCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link TestRenderTemplateCommandInput} for command's `input` shape.
 * @see {@link TestRenderTemplateCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
var TestRenderTemplateCommand = /** @class */ (function (_super) {
    __extends(TestRenderTemplateCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function TestRenderTemplateCommand(input) {
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
    TestRenderTemplateCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SESClient";
        var commandName = "TestRenderTemplateCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: TestRenderTemplateRequest.filterSensitiveLog,
            outputFilterSensitiveLog: TestRenderTemplateResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    TestRenderTemplateCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryTestRenderTemplateCommand(input, context);
    };
    TestRenderTemplateCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryTestRenderTemplateCommand(output, context);
    };
    return TestRenderTemplateCommand;
}($Command));
export { TestRenderTemplateCommand };
//# sourceMappingURL=TestRenderTemplateCommand.js.map