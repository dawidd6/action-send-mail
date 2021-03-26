"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListAccountRoles = void 0;
const SSO_1 = require("../SSO");
const SSOClient_1 = require("../SSOClient");
const ListAccountRolesCommand_1 = require("../commands/ListAccountRolesCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListAccountRolesCommand_1.ListAccountRolesCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listAccountRoles(input, ...args);
};
async function* paginateListAccountRoles(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.nextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.nextToken = token;
        input["maxResults"] = config.pageSize;
        if (config.client instanceof SSO_1.SSO) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof SSOClient_1.SSOClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected SSO | SSOClient");
        }
        yield page;
        token = page.nextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListAccountRoles = paginateListAccountRoles;
//# sourceMappingURL=ListAccountRolesPaginator.js.map