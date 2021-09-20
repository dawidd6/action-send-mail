import { ListAccountsCommandInput, ListAccountsCommandOutput } from "../commands/ListAccountsCommand";
import { SSOPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListAccounts(config: SSOPaginationConfiguration, input: ListAccountsCommandInput, ...additionalArguments: any): Paginator<ListAccountsCommandOutput>;
