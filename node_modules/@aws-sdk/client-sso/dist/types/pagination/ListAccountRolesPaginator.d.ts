import { ListAccountRolesCommandInput, ListAccountRolesCommandOutput } from "../commands/ListAccountRolesCommand";
import { SSOPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListAccountRoles(config: SSOPaginationConfiguration, input: ListAccountRolesCommandInput, ...additionalArguments: any): Paginator<ListAccountRolesCommandOutput>;
