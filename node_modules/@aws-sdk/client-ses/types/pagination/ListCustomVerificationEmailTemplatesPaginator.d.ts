import { ListCustomVerificationEmailTemplatesCommandInput, ListCustomVerificationEmailTemplatesCommandOutput } from "../commands/ListCustomVerificationEmailTemplatesCommand";
import { SESPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListCustomVerificationEmailTemplates(config: SESPaginationConfiguration, input: ListCustomVerificationEmailTemplatesCommandInput, ...additionalArguments: any): Paginator<ListCustomVerificationEmailTemplatesCommandOutput>;
