import { SESClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SESClient";
import { ListVerifiedEmailAddressesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListVerifiedEmailAddressesCommandInput {
}
export interface ListVerifiedEmailAddressesCommandOutput extends ListVerifiedEmailAddressesResponse, __MetadataBearer {
}
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
export declare class ListVerifiedEmailAddressesCommand extends $Command<ListVerifiedEmailAddressesCommandInput, ListVerifiedEmailAddressesCommandOutput, SESClientResolvedConfig> {
    readonly input: ListVerifiedEmailAddressesCommandInput;
    constructor(input: ListVerifiedEmailAddressesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: SESClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListVerifiedEmailAddressesCommandInput, ListVerifiedEmailAddressesCommandOutput>;
    private serialize;
    private deserialize;
}
