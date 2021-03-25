"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListAccounts = void 0;
const SSO_1 = require("../SSO");
const SSOClient_1 = require("../SSOClient");
const ListAccountsCommand_1 = require("../commands/ListAccountsCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListAccountsCommand_1.ListAccountsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listAccounts(input, ...args);
};
async function* paginateListAccounts(config, input, ...additionalArguments) {
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
exports.paginateListAccounts = paginateListAccounts;
//# sourceMappingURL=ListAccountsPaginator.js.map