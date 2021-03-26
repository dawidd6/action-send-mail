"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _prompts() {
  const data = _interopRequireDefault(require("prompts"));

  _prompts = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _default = questions => new Promise((resolve, reject) => {
  if (!questions) {
    resolve({});
    return;
  }

  (0, _prompts().default)(questions).then(resolve, reject);
});

exports.default = _default;

//# sourceMappingURL=pollParams.js.map