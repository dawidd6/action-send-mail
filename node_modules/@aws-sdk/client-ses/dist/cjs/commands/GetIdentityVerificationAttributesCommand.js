"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIdentityVerificationAttributesCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_query_1 = require("../protocols/Aws_query");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Given a list of identities (email addresses and/or domains), returns the verification
 *             status and (for domain identities) the verification token for each identity.</p>
 *         <p>The verification status of an email address is "Pending" until the email address owner
 *             clicks the link within the verification email that Amazon SES sent to that address. If the
 *             email address owner clicks the link within 24 hours, the verification status of the
 *             email address changes to "Success". If the link is not clicked within 24 hours, the
 *             verification status changes to "Failed." In that case, if you still want to verify the
 *             email address, you must restart the verification process from the beginning.</p>
 *         <p>For domain identities, the domain's verification status is "Pending" as Amazon SES searches
 *             for the required TXT record in the DNS settings of the domain. When Amazon SES detects the
 *             record, the domain's verification status changes to "Success". If Amazon SES is unable to
 *             detect the record within 72 hours, the domain's verification status changes to "Failed."
 *             In that case, if you still want to verify the domain, you must restart the verification
 *             process from the beginning.</p>
 *         <p>This operation is throttled at one request per second and can only get verification
 *             attributes for up to 100 identities at a time.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, GetIdentityVerificationAttributesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, GetIdentityVerificationAttributesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new GetIdentityVerificationAttributesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetIdentityVerificationAttributesCommandInput} for command's `input` shape.
 * @see {@link GetIdentityVerificationAttributesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
class GetIdentityVerificationAttributesCommand extends smithy_client_1.Command {
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
        const commandName = "GetIdentityVerificationAttributesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetIdentityVerificationAttributesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetIdentityVerificationAttributesResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_query_1.serializeAws_queryGetIdentityVerificationAttributesCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_query_1.deserializeAws_queryGetIdentityVerificationAttributesCommand(output, context);
    }
}
exports.GetIdentityVerificationAttributesCommand = GetIdentityVerificationAttributesCommand;
//# sourceMappingURL=GetIdentityVerificationAttributesCommand.js.map