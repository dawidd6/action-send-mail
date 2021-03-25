import { ListIdentitiesCommandInput, ListIdentitiesCommandOutput } from "../commands/ListIdentitiesCommand";
import { SESPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListIdentities(config: SESPaginationConfiguration, input: ListIdentitiesCommandInput, ...additionalArguments: any): Paginator<ListIdentitiesCommandOutput>;
