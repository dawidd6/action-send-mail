import { SESClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SESClient";
import { GetTemplateRequest, GetTemplateResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetTemplateCommandInput extends GetTemplateRequest {
}
export interface GetTemplateCommandOutput extends GetTemplateResponse, __MetadataBearer {
}
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
export declare class GetTemplateCommand extends $Command<GetTemplateCommandInput, GetTemplateCommandOutput, SESClientResolvedConfig> {
    readonly input: GetTemplateCommandInput;
    constructor(input: GetTemplateCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: SESClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetTemplateCommandInput, GetTemplateCommandOutput>;
    private serialize;
    private deserialize;
}
