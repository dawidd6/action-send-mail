import { SESClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SESClient";
import { TestRenderTemplateRequest, TestRenderTemplateResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface TestRenderTemplateCommandInput extends TestRenderTemplateRequest {
}
export interface TestRenderTemplateCommandOutput extends TestRenderTemplateResponse, __MetadataBearer {
}
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
export declare class TestRenderTemplateCommand extends $Command<TestRenderTemplateCommandInput, TestRenderTemplateCommandOutput, SESClientResolvedConfig> {
    readonly input: TestRenderTemplateCommandInput;
    constructor(input: TestRenderTemplateCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: SESClientResolvedConfig, options?: __HttpHandlerOptions): Handler<TestRenderTemplateCommandInput, TestRenderTemplateCommandOutput>;
    private serialize;
    private deserialize;
}
