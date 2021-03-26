import { __extends } from "tslib";
import { SSOClient } from "./SSOClient";
import { GetRoleCredentialsCommand, } from "./commands/GetRoleCredentialsCommand";
import { ListAccountRolesCommand, } from "./commands/ListAccountRolesCommand";
import { ListAccountsCommand, } from "./commands/ListAccountsCommand";
import { LogoutCommand } from "./commands/LogoutCommand";
/**
 * <p>AWS Single Sign-On Portal is a web service that makes it easy for you to assign user
 *       access to AWS SSO resources such as the user portal. Users can get AWS account applications
 *       and roles assigned to them and get federated into the application.</p>
 *
 *          <p>For general information about AWS SSO, see <a href="https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html">What is AWS
 *         Single Sign-On?</a> in the <i>AWS SSO User Guide</i>.</p>
 *
 *          <p>This API reference guide describes the AWS SSO Portal operations that you can call
 *       programatically and includes detailed information on data types and errors.</p>
 *
 *          <note>
 *             <p>AWS provides SDKs that consist of libraries and sample code for various programming
 *         languages and platforms, such as Java, Ruby, .Net, iOS, or Android. The SDKs provide a
 *         convenient way to create programmatic access to AWS SSO and other AWS services. For more
 *         information about the AWS SDKs, including how to download and install them, see <a href="http://aws.amazon.com/tools/">Tools for Amazon Web Services</a>.</p>
 *          </note>
 */
var SSO = /** @class */ (function (_super) {
    __extends(SSO, _super);
    function SSO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SSO.prototype.getRoleCredentials = function (args, optionsOrCb, cb) {
        var command = new GetRoleCredentialsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SSO.prototype.listAccountRoles = function (args, optionsOrCb, cb) {
        var command = new ListAccountRolesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SSO.prototype.listAccounts = function (args, optionsOrCb, cb) {
        var command = new ListAccountsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SSO.prototype.logout = function (args, optionsOrCb, cb) {
        var command = new LogoutCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return SSO;
}(SSOClient));
export { SSO };
//# sourceMappingURL=SSO.js.map