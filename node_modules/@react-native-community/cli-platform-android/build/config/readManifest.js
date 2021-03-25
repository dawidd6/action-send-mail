"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readManifest;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _xmldoc() {
  const data = _interopRequireDefault(require("xmldoc"));

  _xmldoc = function () {
    return data;
  };

  return data;
}

function _cliTools() {
  const data = require("@react-native-community/cli-tools");

  _cliTools = function () {
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
 *
 */
function readManifest(manifestPath) {
  try {
    return new (_xmldoc().default.XmlDocument)(_fs().default.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    throw new (_cliTools().CLIError)(`Failed to parse Android Manifest file at ${manifestPath}`, error);
  }
}

//# sourceMappingURL=readManifest.js.map