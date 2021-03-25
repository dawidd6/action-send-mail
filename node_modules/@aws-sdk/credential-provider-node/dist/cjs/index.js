"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProvider = exports.ENV_IMDS_DISABLED = void 0;
const credential_provider_env_1 = require("@aws-sdk/credential-provider-env");
const credential_provider_imds_1 = require("@aws-sdk/credential-provider-imds");
const credential_provider_ini_1 = require("@aws-sdk/credential-provider-ini");
const credential_provider_process_1 = require("@aws-sdk/credential-provider-process");
const credential_provider_sso_1 = require("@aws-sdk/credential-provider-sso");
const property_provider_1 = require("@aws-sdk/property-provider");
const shared_ini_file_loader_1 = require("@aws-sdk/shared-ini-file-loader");
exports.ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
/**
 * Creates a credential provider that will attempt to find credentials from the
 * following sources (listed in order of precedence):
 *   * Environment variables exposed via `process.env`
 *   * Shared credentials and config ini files
 *   * The EC2/ECS Instance Metadata Service
 *
 * The default credential provider will invoke one provider at a time and only
 * continue to the next if no credentials have been located. For example, if
 * the process finds values defined via the `AWS_ACCESS_KEY_ID` and
 * `AWS_SECRET_ACCESS_KEY` environment variables, the files at
 * `~/.aws/credentials` and `~/.aws/config` will not be read, nor will any
 * messages be sent to the Instance Metadata Service.
 *
 * @param init                  Configuration that is passed to each individual
 *                              provider
 *
 * @see fromEnv                 The function used to source credentials from
 *                              environment variables
 * @see fromSSO                 The function used to source credentials from
 *                              resolved SSO token cache
 * @see fromIni                 The function used to source credentials from INI
 *                              files
 * @see fromProcess             The function used to sources credentials from
 *                              credential_process in INI files
 * @see fromInstanceMetadata    The function used to source credentials from the
 *                              EC2 Instance Metadata Service
 * @see fromContainerMetadata   The function used to source credentials from the
 *                              ECS Container Metadata Service
 */
const defaultProvider = (init = {}) => {
    const options = { profile: process.env[credential_provider_ini_1.ENV_PROFILE], ...init };
    if (!options.loadedConfig)
        options.loadedConfig = shared_ini_file_loader_1.loadSharedConfigFiles(init);
    const providers = [credential_provider_sso_1.fromSSO(options), credential_provider_ini_1.fromIni(options), credential_provider_process_1.fromProcess(options), remoteProvider(options)];
    if (!options.profile)
        providers.unshift(credential_provider_env_1.fromEnv());
    const providerChain = property_provider_1.chain(...providers);
    return property_provider_1.memoize(providerChain, (credentials) => credentials.expiration !== undefined && credentials.expiration.getTime() - Date.now() < 300000, (credentials) => credentials.expiration !== undefined);
};
exports.defaultProvider = defaultProvider;
const remoteProvider = (init) => {
    if (process.env[credential_provider_imds_1.ENV_CMDS_RELATIVE_URI] || process.env[credential_provider_imds_1.ENV_CMDS_FULL_URI]) {
        return credential_provider_imds_1.fromContainerMetadata(init);
    }
    if (process.env[exports.ENV_IMDS_DISABLED]) {
        return () => Promise.reject(new property_provider_1.ProviderError("EC2 Instance Metadata Service access disabled"));
    }
    return credential_provider_imds_1.fromInstanceMetadata(init);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOEVBQTJEO0FBQzNELGdGQU0yQztBQUMzQyw4RUFBcUY7QUFDckYsc0ZBQW9GO0FBQ3BGLDhFQUF3RTtBQUN4RSxrRUFBMkU7QUFDM0UsNEVBQXdFO0FBRzNELFFBQUEsaUJBQWlCLEdBQUcsMkJBQTJCLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0ksTUFBTSxlQUFlLEdBQUcsQ0FDN0IsT0FBeUUsRUFBRSxFQUN2RCxFQUFFO0lBQ3RCLE1BQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQVcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZO1FBQUUsT0FBTyxDQUFDLFlBQVksR0FBRyw4Q0FBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RSxNQUFNLFNBQVMsR0FBRyxDQUFDLGlDQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsaUNBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSx5Q0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztRQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQU8sRUFBRSxDQUFDLENBQUM7SUFDbkQsTUFBTSxhQUFhLEdBQUcseUJBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBRTFDLE9BQU8sMkJBQU8sQ0FDWixhQUFhLEVBQ2IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFDL0csQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUN0RCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBZFcsUUFBQSxlQUFlLG1CQWMxQjtBQUVGLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBd0IsRUFBc0IsRUFBRTtJQUN0RSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQXFCLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUFpQixDQUFDLEVBQUU7UUFDeEUsT0FBTyxnREFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQztJQUVELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBaUIsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUFhLENBQUMsK0NBQStDLENBQUMsQ0FBQyxDQUFDO0tBQ2pHO0lBRUQsT0FBTywrQ0FBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tRW52IH0gZnJvbSBcIkBhd3Mtc2RrL2NyZWRlbnRpYWwtcHJvdmlkZXItZW52XCI7XG5pbXBvcnQge1xuICBFTlZfQ01EU19GVUxMX1VSSSxcbiAgRU5WX0NNRFNfUkVMQVRJVkVfVVJJLFxuICBmcm9tQ29udGFpbmVyTWV0YWRhdGEsXG4gIGZyb21JbnN0YW5jZU1ldGFkYXRhLFxuICBSZW1vdGVQcm92aWRlckluaXQsXG59IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLWltZHNcIjtcbmltcG9ydCB7IEVOVl9QUk9GSUxFLCBmcm9tSW5pLCBGcm9tSW5pSW5pdCB9IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLWluaVwiO1xuaW1wb3J0IHsgZnJvbVByb2Nlc3MsIEZyb21Qcm9jZXNzSW5pdCB9IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLXByb2Nlc3NcIjtcbmltcG9ydCB7IGZyb21TU08sIEZyb21TU09Jbml0IH0gZnJvbSBcIkBhd3Mtc2RrL2NyZWRlbnRpYWwtcHJvdmlkZXItc3NvXCI7XG5pbXBvcnQgeyBjaGFpbiwgbWVtb2l6ZSwgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHsgbG9hZFNoYXJlZENvbmZpZ0ZpbGVzIH0gZnJvbSBcIkBhd3Mtc2RrL3NoYXJlZC1pbmktZmlsZS1sb2FkZXJcIjtcbmltcG9ydCB7IENyZWRlbnRpYWxQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgRU5WX0lNRFNfRElTQUJMRUQgPSBcIkFXU19FQzJfTUVUQURBVEFfRElTQUJMRURcIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY3JlZGVudGlhbCBwcm92aWRlciB0aGF0IHdpbGwgYXR0ZW1wdCB0byBmaW5kIGNyZWRlbnRpYWxzIGZyb20gdGhlXG4gKiBmb2xsb3dpbmcgc291cmNlcyAobGlzdGVkIGluIG9yZGVyIG9mIHByZWNlZGVuY2UpOlxuICogICAqIEVudmlyb25tZW50IHZhcmlhYmxlcyBleHBvc2VkIHZpYSBgcHJvY2Vzcy5lbnZgXG4gKiAgICogU2hhcmVkIGNyZWRlbnRpYWxzIGFuZCBjb25maWcgaW5pIGZpbGVzXG4gKiAgICogVGhlIEVDMi9FQ1MgSW5zdGFuY2UgTWV0YWRhdGEgU2VydmljZVxuICpcbiAqIFRoZSBkZWZhdWx0IGNyZWRlbnRpYWwgcHJvdmlkZXIgd2lsbCBpbnZva2Ugb25lIHByb3ZpZGVyIGF0IGEgdGltZSBhbmQgb25seVxuICogY29udGludWUgdG8gdGhlIG5leHQgaWYgbm8gY3JlZGVudGlhbHMgaGF2ZSBiZWVuIGxvY2F0ZWQuIEZvciBleGFtcGxlLCBpZlxuICogdGhlIHByb2Nlc3MgZmluZHMgdmFsdWVzIGRlZmluZWQgdmlhIHRoZSBgQVdTX0FDQ0VTU19LRVlfSURgIGFuZFxuICogYEFXU19TRUNSRVRfQUNDRVNTX0tFWWAgZW52aXJvbm1lbnQgdmFyaWFibGVzLCB0aGUgZmlsZXMgYXRcbiAqIGB+Ly5hd3MvY3JlZGVudGlhbHNgIGFuZCBgfi8uYXdzL2NvbmZpZ2Agd2lsbCBub3QgYmUgcmVhZCwgbm9yIHdpbGwgYW55XG4gKiBtZXNzYWdlcyBiZSBzZW50IHRvIHRoZSBJbnN0YW5jZSBNZXRhZGF0YSBTZXJ2aWNlLlxuICpcbiAqIEBwYXJhbSBpbml0ICAgICAgICAgICAgICAgICAgQ29uZmlndXJhdGlvbiB0aGF0IGlzIHBhc3NlZCB0byBlYWNoIGluZGl2aWR1YWxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJcbiAqXG4gKiBAc2VlIGZyb21FbnYgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICogQHNlZSBmcm9tU1NPICAgICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdXNlZCB0byBzb3VyY2UgY3JlZGVudGlhbHMgZnJvbVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZCBTU08gdG9rZW4gY2FjaGVcbiAqIEBzZWUgZnJvbUluaSAgICAgICAgICAgICAgICAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gc291cmNlIGNyZWRlbnRpYWxzIGZyb20gSU5JXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzXG4gKiBAc2VlIGZyb21Qcm9jZXNzICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHNvdXJjZXMgY3JlZGVudGlhbHMgZnJvbVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsX3Byb2Nlc3MgaW4gSU5JIGZpbGVzXG4gKiBAc2VlIGZyb21JbnN0YW5jZU1ldGFkYXRhICAgIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFQzIgSW5zdGFuY2UgTWV0YWRhdGEgU2VydmljZVxuICogQHNlZSBmcm9tQ29udGFpbmVyTWV0YWRhdGEgICBUaGUgZnVuY3Rpb24gdXNlZCB0byBzb3VyY2UgY3JlZGVudGlhbHMgZnJvbSB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRUNTIENvbnRhaW5lciBNZXRhZGF0YSBTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvdmlkZXIgPSAoXG4gIGluaXQ6IEZyb21JbmlJbml0ICYgUmVtb3RlUHJvdmlkZXJJbml0ICYgRnJvbVByb2Nlc3NJbml0ICYgRnJvbVNTT0luaXQgPSB7fVxuKTogQ3JlZGVudGlhbFByb3ZpZGVyID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgcHJvZmlsZTogcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdLCAuLi5pbml0IH07XG4gIGlmICghb3B0aW9ucy5sb2FkZWRDb25maWcpIG9wdGlvbnMubG9hZGVkQ29uZmlnID0gbG9hZFNoYXJlZENvbmZpZ0ZpbGVzKGluaXQpO1xuICBjb25zdCBwcm92aWRlcnMgPSBbZnJvbVNTTyhvcHRpb25zKSwgZnJvbUluaShvcHRpb25zKSwgZnJvbVByb2Nlc3Mob3B0aW9ucyksIHJlbW90ZVByb3ZpZGVyKG9wdGlvbnMpXTtcbiAgaWYgKCFvcHRpb25zLnByb2ZpbGUpIHByb3ZpZGVycy51bnNoaWZ0KGZyb21FbnYoKSk7XG4gIGNvbnN0IHByb3ZpZGVyQ2hhaW4gPSBjaGFpbiguLi5wcm92aWRlcnMpO1xuXG4gIHJldHVybiBtZW1vaXplKFxuICAgIHByb3ZpZGVyQ2hhaW4sXG4gICAgKGNyZWRlbnRpYWxzKSA9PiBjcmVkZW50aWFscy5leHBpcmF0aW9uICE9PSB1bmRlZmluZWQgJiYgY3JlZGVudGlhbHMuZXhwaXJhdGlvbi5nZXRUaW1lKCkgLSBEYXRlLm5vdygpIDwgMzAwMDAwLFxuICAgIChjcmVkZW50aWFscykgPT4gY3JlZGVudGlhbHMuZXhwaXJhdGlvbiAhPT0gdW5kZWZpbmVkXG4gICk7XG59O1xuXG5jb25zdCByZW1vdGVQcm92aWRlciA9IChpbml0OiBSZW1vdGVQcm92aWRlckluaXQpOiBDcmVkZW50aWFsUHJvdmlkZXIgPT4ge1xuICBpZiAocHJvY2Vzcy5lbnZbRU5WX0NNRFNfUkVMQVRJVkVfVVJJXSB8fCBwcm9jZXNzLmVudltFTlZfQ01EU19GVUxMX1VSSV0pIHtcbiAgICByZXR1cm4gZnJvbUNvbnRhaW5lck1ldGFkYXRhKGluaXQpO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52W0VOVl9JTURTX0RJU0FCTEVEXSkge1xuICAgIHJldHVybiAoKSA9PiBQcm9taXNlLnJlamVjdChuZXcgUHJvdmlkZXJFcnJvcihcIkVDMiBJbnN0YW5jZSBNZXRhZGF0YSBTZXJ2aWNlIGFjY2VzcyBkaXNhYmxlZFwiKSk7XG4gIH1cblxuICByZXR1cm4gZnJvbUluc3RhbmNlTWV0YWRhdGEoaW5pdCk7XG59O1xuIl19