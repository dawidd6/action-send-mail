"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ReservedNameError extends Error {
  constructor(name) {
    super(`Not a valid name for a project. Please do not use the reserved word "${name}".`);
  }

}

exports.default = ReservedNameError;

//# sourceMappingURL=ReservedNameError.js.map