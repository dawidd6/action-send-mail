"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wellKnown;
const services_js_1 = require("./services.js");
const normalized = {};
Object.keys(services_js_1.services).forEach(key => {
    const service = services_js_1.services[key];
    const normalizedService = normalizeService(service);
    normalized[normalizeKey(key)] = normalizedService;
    [].concat(service.aliases || []).forEach(alias => {
        normalized[normalizeKey(alias)] = normalizedService;
    });
    [].concat(service.domains || []).forEach(domain => {
        normalized[normalizeKey(domain)] = normalizedService;
    });
});
function normalizeKey(key) {
    return key.replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase();
}
function normalizeService(service) {
    const response = {};
    Object.keys(service).forEach(key => {
        if (!['domains', 'aliases'].includes(key)) {
            response[key] = service[key];
        }
    });
    return response;
}
/**
 * Resolves SMTP config for given key. Key can be a name (like 'Gmail'), alias (like 'Google Mail') or
 * an email address (like 'test@googlemail.com').
 *
 * @param key Service name, alias or an email address
 * @returns SMTP config or false if not found
 */
function wellKnown(key) {
    key = normalizeKey(key.split('@').pop());
    return normalized[key] || false;
}
module.exports = exports.default;
Object.defineProperty(module.exports, 'default', { value: exports.default, enumerable: false, writable: true, configurable: true });
