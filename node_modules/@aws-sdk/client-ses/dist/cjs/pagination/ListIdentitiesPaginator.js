"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListIdentities = void 0;
const SES_1 = require("../SES");
const SESClient_1 = require("../SESClient");
const ListIdentitiesCommand_1 = require("../commands/ListIdentitiesCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListIdentitiesCommand_1.ListIdentitiesCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listIdentities(input, ...args);
};
async function* paginateListIdentities(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.NextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxItems"] = config.pageSize;
        if (config.client instanceof SES_1.SES) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof SESClient_1.SESClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected SES | SESClient");
        }
        yield page;
        token = page.NextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListIdentities = paginateListIdentities;
//# sourceMappingURL=ListIdentitiesPaginator.js.map