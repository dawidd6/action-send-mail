"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const utils_1 = require("../../utils");
const tls_1 = require("tls");
const StandaloneConnector_1 = require("../StandaloneConnector");
const SentinelIterator_1 = require("./SentinelIterator");
exports.SentinelIterator = SentinelIterator_1.default;
const AbstractConnector_1 = require("../AbstractConnector");
const redis_1 = require("../../redis");
const debug = utils_1.Debug("SentinelConnector");
class SentinelConnector extends AbstractConnector_1.default {
    constructor(options) {
        super();
        this.options = options;
        if (!this.options.sentinels.length) {
            throw new Error("Requires at least one sentinel to connect to.");
        }
        if (!this.options.name) {
            throw new Error("Requires the name of master.");
        }
        this.sentinelIterator = new SentinelIterator_1.default(this.options.sentinels);
    }
    check(info) {
        const roleMatches = !info.role || this.options.role === info.role;
        if (!roleMatches) {
            debug("role invalid, expected %s, but got %s", this.options.role, info.role);
            // Start from the next item.
            // Note that `reset` will move the cursor to the previous element,
            // so we advance two steps here.
            this.sentinelIterator.next();
            this.sentinelIterator.next();
            this.sentinelIterator.reset(true);
        }
        return roleMatches;
    }
    connect(eventEmitter) {
        this.connecting = true;
        this.retryAttempts = 0;
        let lastError;
        const connectToNext = () => new Promise((resolve, reject) => {
            const endpoint = this.sentinelIterator.next();
            if (endpoint.done) {
                this.sentinelIterator.reset(false);
                const retryDelay = typeof this.options.sentinelRetryStrategy === "function"
                    ? this.options.sentinelRetryStrategy(++this.retryAttempts)
                    : null;
                let errorMsg = typeof retryDelay !== "number"
                    ? "All sentinels are unreachable and retry is disabled."
                    : `All sentinels are unreachable. Retrying from scratch after ${retryDelay}ms.`;
                if (lastError) {
                    errorMsg += ` Last error: ${lastError.message}`;
                }
                debug(errorMsg);
                const error = new Error(errorMsg);
                if (typeof retryDelay === "number") {
                    setTimeout(() => {
                        resolve(connectToNext());
                    }, retryDelay);
                    eventEmitter("error", error);
                }
                else {
                    reject(error);
                }
                return;
            }
            this.resolve(endpoint.value, (err, resolved) => {
                if (!this.connecting) {
                    reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
                    return;
                }
                if (resolved) {
                    debug("resolved: %s:%s", resolved.host, resolved.port);
                    if (this.options.enableTLSForSentinelMode && this.options.tls) {
                        Object.assign(resolved, this.options.tls);
                        this.stream = tls_1.connect(resolved);
                    }
                    else {
                        this.stream = net_1.createConnection(resolved);
                    }
                    this.sentinelIterator.reset(true);
                    resolve(this.stream);
                }
                else {
                    const endpointAddress = endpoint.value.host + ":" + endpoint.value.port;
                    const errorMsg = err
                        ? "failed to connect to sentinel " +
                            endpointAddress +
                            " because " +
                            err.message
                        : "connected to sentinel " +
                            endpointAddress +
                            " successfully, but got an invalid reply: " +
                            resolved;
                    debug(errorMsg);
                    eventEmitter("sentinelError", new Error(errorMsg));
                    if (err) {
                        lastError = err;
                    }
                    resolve(connectToNext());
                }
            });
        });
        return connectToNext();
    }
    updateSentinels(client, callback) {
        if (!this.options.updateSentinels) {
            return callback(null);
        }
        client.sentinel("sentinels", this.options.name, (err, result) => {
            if (err) {
                client.disconnect();
                return callback(err);
            }
            if (!Array.isArray(result)) {
                return callback(null);
            }
            result
                .map(utils_1.packObject)
                .forEach((sentinel) => {
                const flags = sentinel.flags ? sentinel.flags.split(",") : [];
                if (flags.indexOf("disconnected") === -1 &&
                    sentinel.ip &&
                    sentinel.port) {
                    const endpoint = this.sentinelNatResolve(addressResponseToAddress(sentinel));
                    if (this.sentinelIterator.add(endpoint)) {
                        debug("adding sentinel %s:%s", endpoint.host, endpoint.port);
                    }
                }
            });
            debug("Updated internal sentinels: %s", this.sentinelIterator);
            callback(null);
        });
    }
    resolveMaster(client, callback) {
        client.sentinel("get-master-addr-by-name", this.options.name, (err, result) => {
            if (err) {
                client.disconnect();
                return callback(err);
            }
            this.updateSentinels(client, (err) => {
                client.disconnect();
                if (err) {
                    return callback(err);
                }
                callback(null, this.sentinelNatResolve(Array.isArray(result)
                    ? { host: result[0], port: Number(result[1]) }
                    : null));
            });
        });
    }
    resolveSlave(client, callback) {
        client.sentinel("slaves", this.options.name, (err, result) => {
            client.disconnect();
            if (err) {
                return callback(err);
            }
            if (!Array.isArray(result)) {
                return callback(null, null);
            }
            const availableSlaves = result
                .map(utils_1.packObject)
                .filter((slave) => slave.flags && !slave.flags.match(/(disconnected|s_down|o_down)/));
            callback(null, this.sentinelNatResolve(selectPreferredSentinel(availableSlaves, this.options.preferredSlaves)));
        });
    }
    sentinelNatResolve(item) {
        if (!item || !this.options.natMap)
            return item;
        return this.options.natMap[`${item.host}:${item.port}`] || item;
    }
    resolve(endpoint, callback) {
        const client = new redis_1.default({
            port: endpoint.port || 26379,
            host: endpoint.host,
            username: this.options.sentinelUsername || null,
            password: this.options.sentinelPassword || null,
            family: endpoint.family ||
                (StandaloneConnector_1.isIIpcConnectionOptions(this.options)
                    ? undefined
                    : this.options.family),
            tls: this.options.sentinelTLS,
            retryStrategy: null,
            enableReadyCheck: false,
            connectTimeout: this.options.connectTimeout,
            dropBufferSupport: true,
        });
        // ignore the errors since resolve* methods will handle them
        client.on("error", noop);
        if (this.options.role === "slave") {
            this.resolveSlave(client, callback);
        }
        else {
            this.resolveMaster(client, callback);
        }
    }
}
exports.default = SentinelConnector;
function selectPreferredSentinel(availableSlaves, preferredSlaves) {
    if (availableSlaves.length === 0) {
        return null;
    }
    let selectedSlave;
    if (typeof preferredSlaves === "function") {
        selectedSlave = preferredSlaves(availableSlaves);
    }
    else if (preferredSlaves !== null && typeof preferredSlaves === "object") {
        const preferredSlavesArray = Array.isArray(preferredSlaves)
            ? preferredSlaves
            : [preferredSlaves];
        // sort by priority
        preferredSlavesArray.sort((a, b) => {
            // default the priority to 1
            if (!a.prio) {
                a.prio = 1;
            }
            if (!b.prio) {
                b.prio = 1;
            }
            // lowest priority first
            if (a.prio < b.prio) {
                return -1;
            }
            if (a.prio > b.prio) {
                return 1;
            }
            return 0;
        });
        // loop over preferred slaves and return the first match
        for (let p = 0; p < preferredSlavesArray.length; p++) {
            for (let a = 0; a < availableSlaves.length; a++) {
                const slave = availableSlaves[a];
                if (slave.ip === preferredSlavesArray[p].ip) {
                    if (slave.port === preferredSlavesArray[p].port) {
                        selectedSlave = slave;
                        break;
                    }
                }
            }
            if (selectedSlave) {
                break;
            }
        }
    }
    // if none of the preferred slaves are available, a random available slave is returned
    if (!selectedSlave) {
        selectedSlave = utils_1.sample(availableSlaves);
    }
    return addressResponseToAddress(selectedSlave);
}
function addressResponseToAddress(input) {
    return { host: input.ip, port: Number(input.port) };
}
function noop() { }
