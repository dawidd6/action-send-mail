"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTemplateCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class GetTemplateCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "SESClient";
        const commandName = "GetTemplateCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetTemplateRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetTemplateResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryGetTemplateCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryGetTemplateCommand(output, context);
    }
}
exports.GetTemplateCommand = GetTemplateCommand;
//# sourceMappingURL=GetTemplateCommand.js.map