"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAccountRolesCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Lists all roles that are assigned to the user for a given AWS account.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SSOClient, ListAccountRolesCommand } from "@aws-sdk/client-sso"; // ES Modules import
 * // const { SSOClient, ListAccountRolesCommand } = require("@aws-sdk/client-sso"); // CommonJS import
 * const client = new SSOClient(config);
 * const command = new ListAccountRolesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListAccountRolesCommandInput} for command's `input` shape.
 * @see {@link ListAccountRolesCommandOutput} for command's `response` shape.
 * @see {@link SSOClientResolvedConfig | config} for command's `input` shape.
 *
 */
class ListAccountRolesCommand extends smithy_client_1.Command {
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
        const clientName = "SSOClient";
        const commandName = "ListAccountRolesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListAccountRolesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListAccountRolesResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1ListAccountRolesCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1ListAccountRolesCommand(output, context);
    }
}
exports.ListAccountRolesCommand = ListAccountRolesCommand;
//# sourceMappingURL=ListAccountRolesCommand.js.map