"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyDomainIdentityCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class VerifyDomainIdentityCommand extends smithy_client_1.Command {
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
        const commandName = "VerifyDomainIdentityCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.VerifyDomainIdentityRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.VerifyDomainIdentityResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryVerifyDomainIdentityCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryVerifyDomainIdentityCommand(output, context);
    }
}
exports.VerifyDomainIdentityCommand = VerifyDomainIdentityCommand;
//# sourceMappingURL=VerifyDomainIdentityCommand.js.map