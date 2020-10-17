"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const net_1 = require("net");
function getNodeKey(node) {
    node.port = node.port || 6379;
    node.host = node.host || "127.0.0.1";
    return node.host + ":" + node.port;
}
exports.getNodeKey = getNodeKey;
function nodeKeyToRedisOptions(nodeKey) {
    const portIndex = nodeKey.lastIndexOf(":");
    if (portIndex === -1) {
        throw new Error(`Invalid node key ${nodeKey}`);
    }
    return {
        host: nodeKey.slice(0, portIndex),
        port: Number(nodeKey.slice(portIndex + 1)),
    };
}
exports.nodeKeyToRedisOptions = nodeKeyToRedisOptions;
function normalizeNodeOptions(nodes) {
    return nodes.map((node) => {
        const options = {};
        if (typeof node === "object") {
            Object.assign(options, node);
        }
        else if (typeof node === "string") {
            Object.assign(options, utils_1.parseURL(node));
        }
        else if (typeof node === "number") {
            options.port = node;
        }
        else {
            throw new Error("Invalid argument " + node);
        }
        if (typeof options.port === "string") {
            options.port = parseInt(options.port, 10);
        }
        // Cluster mode only support db 0
        delete options.db;
        if (!options.port) {
            options.port = 6379;
        }
        if (!options.host) {
            options.host = "127.0.0.1";
        }
        return options;
    });
}
exports.normalizeNodeOptions = normalizeNodeOptions;
function getUniqueHostnamesFromOptions(nodes) {
    const uniqueHostsMap = {};
    nodes.forEach((node) => {
        uniqueHostsMap[node.host] = true;
    });
    return Object.keys(uniqueHostsMap).filter((host) => !net_1.isIP(host));
}
exports.getUniqueHostnamesFromOptions = getUniqueHostnamesFromOptions;
