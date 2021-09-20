import { SESClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SESClient";
import { ListTemplatesRequest, ListTemplatesResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListTemplatesCommandInput extends ListTemplatesRequest {
}
export interface ListTemplatesCommandOutput extends ListTemplatesResponse, __MetadataBearer {
}
/**
 * <p>Lists the email templates present in your Amazon SES account in the current AWS
 *             Region.</p>
 *         <p>You can execute this operation no more than once per second.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SESClient, ListTemplatesCommand } from "@aws-sdk/client-ses"; // ES Modules import
 * // const { SESClient, ListTemplatesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
 * const client = new SESClient(config);
 * const command = new ListTemplatesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListTemplatesCommandInput} for command's `input` shape.
 * @see {@link ListTemplatesCommandOutput} for command's `response` shape.
 * @see {@link SESClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class ListTemplatesCommand extends $Command<ListTemplatesCommandInput, ListTemplatesCommandOutput, SESClientResolvedConfig> {
    readonly input: ListTemplatesCommandInput;
    constructor(input: ListTemplatesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: SESClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListTemplatesCommandInput, ListTemplatesCommandOutput>;
    private serialize;
    private deserialize;
}
