"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIdentityDkimAttributesCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class GetIdentityDkimAttributesCommand extends smithy_client_1.Command {
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
        const commandName = "GetIdentityDkimAttributesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetIdentityDkimAttributesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetIdentityDkimAttributesResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryGetIdentityDkimAttributesCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryGetIdentityDkimAttributesCommand(output, context);
    }
}
exports.GetIdentityDkimAttributesCommand = GetIdentityDkimAttributesCommand;
//# sourceMappingURL=GetIdentityDkimAttributesCommand.js.map