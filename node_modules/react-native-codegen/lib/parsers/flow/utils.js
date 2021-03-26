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

const _require = require('./errors'),
  ParserError = _require.ParserError;
/**
 * This FlowFixMe is supposed to refer to an InterfaceDeclaration or TypeAlias
 * declaration type. Unfortunately, we don't have those types, because flow-parser
 * generates them, and flow-parser is not type-safe. In the future, we should find
 * a way to get these types from our flow parser library.
 *
 * TODO(T71778680): Flow type AST Nodes
 */

function getTypes(ast) {
  return ast.body.reduce((types, node) => {
    if (node.type === 'ExportNamedDeclaration' && node.exportKind === 'type') {
      if (
        node.declaration.type === 'TypeAlias' ||
        node.declaration.type === 'InterfaceDeclaration'
      ) {
        types[node.declaration.id.name] = node.declaration;
      }
    } else if (
      node.type === 'TypeAlias' ||
      node.type === 'InterfaceDeclaration'
    ) {
      types[node.id.name] = node;
    }

    return types;
  }, {});
} // $FlowFixMe there's no flowtype for ASTs

const invariant = require('invariant');

function resolveTypeAnnotation(typeAnnotation, types) { // TODO(T71778680): This is an Flow TypeAnnotation. Flow-type this
  invariant(
    typeAnnotation != null,
    'resolveTypeAnnotation(): typeAnnotation cannot be null',
  );
  let node = typeAnnotation;
  let nullable = false;
  let typeAliasResolutionStatus = {
    successful: false,
  };

  for (;;) {
    if (node.type === 'NullableTypeAnnotation') {
      nullable = true;
      node = node.typeAnnotation;
    } else if (node.type === 'GenericTypeAnnotation') {
      typeAliasResolutionStatus = {
        successful: true,
        aliasName: node.id.name,
      };
      const resolvedTypeAnnotation = types[node.id.name];

      if (resolvedTypeAnnotation == null) {
        break;
      }

      invariant(
        resolvedTypeAnnotation.type === 'TypeAlias',
        `GenericTypeAnnotation '${node.id.name}' must resolve to a TypeAlias. Instead, it resolved to a '${resolvedTypeAnnotation.type}'`,
      );
      node = resolvedTypeAnnotation.right;
    } else {
      break;
    }
  }

  return {
    nullable: nullable,
    typeAnnotation: node,
    typeAliasResolutionStatus,
  };
}

function getValueFromTypes(value, types) {
  if (value.type === 'GenericTypeAnnotation' && types[value.id.name]) {
    return getValueFromTypes(types[value.id.name].right, types);
  }

  return value;
}

function createParserErrorCapturer() {
  const errors = [];

  function guard(fn) {
    try {
      return fn();
    } catch (error) {
      if (!(error instanceof ParserError)) {
        throw error;
      }

      errors.push(error);
      return null;
    }
  }

  return [errors, guard];
}

module.exports = {
  getValueFromTypes,
  resolveTypeAnnotation,
  createParserErrorCapturer,
  getTypes,
};
