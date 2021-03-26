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

const invariant = require('invariant');

const _require = require('../errors'),
  ParserError = _require.ParserError;

class MisnamedModuleFlowInterfaceParserError extends ParserError {
  constructor(hasteModuleName, id) {
    super(
      hasteModuleName,
      id,
      `All Flow interfaces extending TurboModule must be called 'Spec'. Please rename Flow interface '${id.name}' to 'Spec'.`,
    );
  }
}

class ModuleFlowInterfaceNotParserError extends ParserError {
  constructor(hasteModuleName, ast) {
    super(
      hasteModuleName,
      ast,
      `Module ${hasteModuleName}: No Flow interfaces extending TurboModule were detected in this NativeModule spec.`,
    );
  }
}

class UnsupportedModulePropertyParserError extends ParserError {
  constructor(
    hasteModuleName,
    propertyValue,
    propertyName,
    invalidPropertyValueType,
  ) {
    super(
      hasteModuleName,
      propertyValue,
      `Flow interfaces extending TurboModule must only contain 'FunctionTypeAnnotation's. Property '${propertyName}' refers to a '${invalidPropertyValueType}'.`,
    );
  }
}

class UnsupportedFlowTypeAnnotationParserError extends ParserError {
  constructor(hasteModuleName, typeAnnotation) {
    super(
      hasteModuleName,
      typeAnnotation,
      `Flow type annotation '${typeAnnotation.type}' is unsupported in NativeModule specs.`,
    );
    this.typeAnnotationType = typeAnnotation.type;
  }
}

class UnsupportedFlowGenericParserError extends ParserError {
  constructor(hasteModuleName, genericTypeAnnotation) {
    const genericName = genericTypeAnnotation.id.name;
    super(
      hasteModuleName,
      genericTypeAnnotation,
      `Unrecognized generic type '${genericName}' in NativeModule spec.`,
    );
    this.genericName = genericName;
  }
}

class IncorrectlyParameterizedFlowGenericParserError extends ParserError {
  constructor(hasteModuleName, genericTypeAnnotation) {
    if (genericTypeAnnotation.typeParameters == null) {
      super(
        hasteModuleName,
        genericTypeAnnotation,
        `Generic '${genericTypeAnnotation.id.name}' must have type parameters.`,
      );
      return;
    }

    if (
      genericTypeAnnotation.typeParameters.type ===
        'TypeParameterInstantiation' &&
      genericTypeAnnotation.typeParameters.params.length !== 1
    ) {
      super(
        hasteModuleName,
        genericTypeAnnotation.typeParameters,
        `Generic '${genericTypeAnnotation.id.name}' must have exactly one type parameter.`,
      );
      return;
    }

    invariant(
      false,
      "Couldn't create IncorrectlyParameterizedFlowGenericParserError",
    );
  }
}
/**
 * Array parsing errors
 */

class UnsupportedArrayElementTypeAnnotationParserError extends ParserError {
  constructor(
    hasteModuleName,
    arrayElementTypeAST,
    arrayType,
    invalidArrayElementType,
  ) {
    super(
      hasteModuleName,
      arrayElementTypeAST,
      `${arrayType} element types cannot be '${invalidArrayElementType}'.`,
    );
  }
}
/**
 * Object parsing errors
 */

class UnsupportedObjectPropertyTypeAnnotationParserError extends ParserError {
  constructor(hasteModuleName, propertyAST, invalidPropertyType) {
    let message = `'ObjectTypeAnnotation' cannot contain '${invalidPropertyType}'.`;

    if (invalidPropertyType === 'ObjectTypeSpreadProperty') {
      message = "Object spread isn't supported in 'ObjectTypeAnnotation's.";
    }

    super(hasteModuleName, propertyAST, message);
  }
}

class UnsupportedObjectPropertyValueTypeAnnotationParserError extends ParserError {
  constructor(
    hasteModuleName,
    propertyValueAST,
    propertyName,
    invalidPropertyValueType,
  ) {
    super(
      hasteModuleName,
      propertyValueAST,
      `Object property '${propertyName}' cannot have type '${invalidPropertyValueType}'.`,
    );
  }
}
/**
 * Function parsing errors
 */

class UnnamedFunctionParamParserError extends ParserError {
  constructor(functionParam, hasteModuleName) {
    super(
      hasteModuleName,
      functionParam,
      'All function parameters must be named.',
    );
  }
}

class UnsupportedFunctionParamTypeAnnotationParserError extends ParserError {
  constructor(
    hasteModuleName,
    flowParamTypeAnnotation,
    paramName,
    invalidParamType,
  ) {
    super(
      hasteModuleName,
      flowParamTypeAnnotation,
      `Function parameter '${paramName}' cannot have type '${invalidParamType}'.`,
    );
  }
}

class UnsupportedFunctionReturnTypeAnnotationParserError extends ParserError {
  constructor(hasteModuleName, flowReturnTypeAnnotation, invalidReturnType) {
    super(
      hasteModuleName,
      flowReturnTypeAnnotation,
      `Function return cannot have type '${invalidReturnType}'.`,
    );
  }
}

module.exports = {
  IncorrectlyParameterizedFlowGenericParserError,
  MisnamedModuleFlowInterfaceParserError,
  ModuleFlowInterfaceNotParserError,
  UnnamedFunctionParamParserError,
  UnsupportedArrayElementTypeAnnotationParserError,
  UnsupportedFlowGenericParserError,
  UnsupportedFlowTypeAnnotationParserError,
  UnsupportedFunctionParamTypeAnnotationParserError,
  UnsupportedFunctionReturnTypeAnnotationParserError,
  UnsupportedModulePropertyParserError,
  UnsupportedObjectPropertyTypeAnnotationParserError,
  UnsupportedObjectPropertyValueTypeAnnotationParserError,
};
