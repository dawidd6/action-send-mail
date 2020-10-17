"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractConnector {
    constructor() {
        this.connecting = false;
    }
    check(info) {
        return true;
    }
    disconnect() {
        this.connecting = false;
        if (this.stream) {
            this.stream.end();
        }
    }
}
exports.default = AbstractConnector;
