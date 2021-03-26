/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
'use strict';

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

// $FlowFixMe there's no flowtype flow-parser
const flowParser = require('flow-parser');

const fs = require('fs');

const path = require('path');

const _require = require('./components'),
  buildComponentSchema = _require.buildComponentSchema;

const _require2 = require('./components/schema'),
  wrapComponentSchema = _require2.wrapComponentSchema;

const _require3 = require('./modules'),
  buildModuleSchema = _require3.buildModuleSchema;

const _require4 = require('./modules/schema'),
  wrapModuleSchema = _require4.wrapModuleSchema;

const _require5 = require('./utils'),
  createParserErrorCapturer = _require5.createParserErrorCapturer;

const invariant = require('invariant');

function isComponent(ast) {
  const defaultExports = ast.body.filter(
    node => node.type === 'ExportDefaultDeclaration',
  );

  if (defaultExports.length === 0) {
    return false;
  }

  let declaration = defaultExports[0].declaration; // codegenNativeComponent can be nested inside a cast
  // expression so we need to go one level deeper

  if (declaration.type === 'TypeCastExpression') {
    declaration = declaration.expression;
  }

  if (declaration.type !== 'CallExpression') {
    return false;
  }

  return (
    declaration.callee.type === 'Identifier' &&
    declaration.callee.name === 'codegenNativeComponent'
  );
}

function isModule(ast) { // TODO(T71778680): Flow-type this node.
  const moduleInterfaces = ast.body
    .map(node => {
      if (
        node.type === 'ExportNamedDeclaration' &&
        node.exportKind === 'type' &&
        node.declaration.type === 'InterfaceDeclaration'
      ) {
        return node.declaration;
      }

      return node;
    })
    .filter(declaration => {
      return (
        declaration.type === 'InterfaceDeclaration' &&
        declaration.extends.length === 1 &&
        declaration.extends[0].type === 'InterfaceExtends' &&
        declaration.extends[0].id.name === 'TurboModule'
      );
    })
    .map(declaration => declaration.id.name);

  if (moduleInterfaces.length === 0) {
    return false;
  }

  if (moduleInterfaces.length > 1) {
    throw new Error(
      'File contains declarations of more than one module: ' +
        moduleInterfaces.join(', ') +
        '. Please declare exactly one module in this file.',
    );
  }

  return true;
}

function getConfigType(ast) { // TODO(T71778680): Flow-type this node.
  const isConfigAComponent = isComponent(ast);
  const isConfigAModule = isModule(ast);

  if (isConfigAModule && isConfigAComponent) {
    throw new Error(
      'Found type extending "TurboModule" and exported "codegenNativeComponent" declaration in one file. Split them into separated files.',
    );
  }

  if (isConfigAModule) {
    return 'module';
  } else if (isConfigAComponent) {
    return 'component';
  } else {
    throw new Error(
      'File neither contains a module declaration, nor a component declaration. ' +
        'For module declarations, please make sure your file has an InterfaceDeclaration extending TurboModule. ' +
        'For component declarations, please make sure your file has a default export calling the codegenNativeComponent<Props>(...) macro.',
    );
  }
}

const withSpace = (...args) => args.join('\\s*');
/**
 * Parse the TurboModuleRegistry.get(Enforcing)? call using RegExp.
 * Why? This call can appear anywhere in the NativeModule spec. Currently,
 * there is no good way of traversing the AST to find the MemberExpression
 * responsible for the call.
 */

const TURBO_MODULE_REGISTRY_REQUIRE_REGEX_STRING = withSpace(
  'TurboModuleRegistry',
  '\\.',
  'get(Enforcing)?',
  '<',
  'Spec',
  '>',
  '\\(',
  '[\'"](?<nativeModuleName>[A-Za-z$_0-9]+)[\'"]',
  ',?',
  '\\)',
);

function buildSchema(contents, filename) {
  const ast = flowParser.parse(contents);
  const configType = getConfigType(ast);

  if (configType === 'component') {
    return wrapComponentSchema(buildComponentSchema(ast));
  } else {
    if (filename === undefined || filename === null) {
      throw new Error('Filepath expected while parasing a module');
    }

    const hasteModuleName = path.basename(filename).replace(/\.js$/, '');
    const regex = new RegExp(TURBO_MODULE_REGISTRY_REQUIRE_REGEX_STRING, 'g');
    let match = regex.exec(contents);
    const errorHeader = `Error while parsing Module '${hasteModuleName}'`;

    if (match == null) {
      throw new Error(
        `${errorHeader}: No call to TurboModuleRegistry.get<Spec>('...') detected.`,
      );
    }

    const moduleNames = [];

    while (match != null) {
      const resultGroups = match.groups;
      invariant(
        resultGroups != null,
        `Couldn't parse TurboModuleRegistry.(get|getEnforcing)<Spec> call in module '${hasteModuleName}'.`,
      );

      if (!moduleNames.includes(resultGroups.nativeModuleName)) {
        moduleNames.push(resultGroups.nativeModuleName);
      }

      match = regex.exec(contents);
    }

    const _createParserErrorCap = createParserErrorCapturer(),
      _createParserErrorCap2 = _slicedToArray(_createParserErrorCap, 2),
      parsingErrors = _createParserErrorCap2[0],
      guard = _createParserErrorCap2[1];

    const schema = guard(() =>
      buildModuleSchema(hasteModuleName, moduleNames, ast, guard),
    );

    if (parsingErrors.length > 0) {
      /**
       * TODO(T77968131): We have two options:
       *  - Throw the first error, but indicate there are more then one errors.
       *  - Display all errors, nicely formatted.
       *
       * For the time being, we're just throw the first error.
       **/
      throw parsingErrors[0];
    }

    invariant(
      schema != null,
      'When there are no parsing errors, the schema should not be null',
    );
    return wrapModuleSchema(schema, hasteModuleName);
  }
}

function parseFile(filename) {
  const contents = fs.readFileSync(filename, 'utf8');
  return buildSchema(contents, filename);
}

function parseModuleFixture(filename) {
  const contents = fs.readFileSync(filename, 'utf8');
  return buildSchema(contents, 'path/NativeSampleTurboModule.js');
}

function parseString(contents, filename) {
  return buildSchema(contents, filename);
}

module.exports = {
  parseFile,
  parseModuleFixture,
  parseString,
};
