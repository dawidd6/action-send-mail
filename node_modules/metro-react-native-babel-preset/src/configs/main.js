/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

const lazyImports = require("./lazy-imports");

const passthroughSyntaxPlugins = require("../passthrough-syntax-plugins");

function isTypeScriptSource(fileName) {
  return !!fileName && fileName.endsWith(".ts");
}

function isTSXSource(fileName) {
  return !!fileName && fileName.endsWith(".tsx");
}

const defaultPlugins = [
  [require("@babel/plugin-syntax-flow")],
  [require("@babel/plugin-proposal-optional-catch-binding")],
  [require("@babel/plugin-transform-block-scoping")],
  [
    require("@babel/plugin-proposal-class-properties"), // use `this.foo = bar` instead of `this.defineProperty('foo', ...)`
    {
      loose: true
    }
  ],
  [require("@babel/plugin-syntax-dynamic-import")],
  [require("@babel/plugin-syntax-export-default-from")]
].concat(_toConsumableArray(passthroughSyntaxPlugins), [
  [require("@babel/plugin-transform-destructuring")],
  [require("@babel/plugin-transform-function-name")],
  [require("@babel/plugin-transform-literals")],
  [require("@babel/plugin-transform-parameters")],
  [require("@babel/plugin-transform-regenerator")],
  [require("@babel/plugin-transform-sticky-regex")],
  [require("@babel/plugin-transform-unicode-regex")]
]);
const es2015ArrowFunctions = [
  require("@babel/plugin-transform-arrow-functions")
];
const es2015Classes = [require("@babel/plugin-transform-classes")];
const es2015ForOf = [
  require("@babel/plugin-transform-for-of"),
  {
    loose: true
  }
];
const es2015ComputedProperty = [
  require("@babel/plugin-transform-computed-properties")
];
const es2015Spread = [require("@babel/plugin-transform-spread")];
const es2015TemplateLiterals = [
  require("@babel/plugin-transform-template-literals"),
  {
    loose: true
  } // dont 'a'.concat('b'), just use 'a'+'b'
];
const exponentiationOperator = [
  require("@babel/plugin-transform-exponentiation-operator")
];
const shorthandProperties = [
  require("@babel/plugin-transform-shorthand-properties")
];
const objectAssign = [require("@babel/plugin-transform-object-assign")];
const objectRestSpread = [
  require("@babel/plugin-proposal-object-rest-spread"), // Assume no dependence on getters or evaluation order. See https://github.com/babel/babel/pull/11520
  {
    loose: true
  }
];
const nullishCoalescingOperator = [
  require("@babel/plugin-proposal-nullish-coalescing-operator"),
  {
    loose: true
  }
];
const optionalChaining = [
  require("@babel/plugin-proposal-optional-chaining"),
  {
    loose: true
  }
];
const reactDisplayName = [
  require("@babel/plugin-transform-react-display-name")
];
const reactJsxSource = [require("@babel/plugin-transform-react-jsx-source")];
const reactJsxSelf = [require("@babel/plugin-transform-react-jsx-self")];
const babelRuntime = [
  require("@babel/plugin-transform-runtime"),
  {
    helpers: true,
    regenerator: true
  }
];

const getPreset = (src, options) => {
  const transformProfile =
    (options && options.unstable_transformProfile) || "default";
  const isHermesStable = transformProfile === "hermes-stable";
  const isHermesCanary = transformProfile === "hermes-canary";
  const isHermes = isHermesStable || isHermesCanary;
  const isNull = src == null;
  const hasClass = isNull || src.indexOf("class") !== -1;
  const hasForOf =
    isNull || (src.indexOf("for") !== -1 && src.indexOf("of") !== -1);
  const extraPlugins = [];

  if (!options.useTransformReactJSXExperimental) {
    extraPlugins.push([require("@babel/plugin-transform-react-jsx")]);
  }

  if (!options || !options.disableImportExportTransform) {
    extraPlugins.push(
      [require("@babel/plugin-proposal-export-default-from")],
      [
        require("@babel/plugin-transform-modules-commonjs"),
        {
          strict: false,
          strictMode: false,
          // prevent "use strict" injections
          lazy:
            options && options.lazyImportExportTransform != null
              ? options.lazyImportExportTransform
              : importSpecifier => lazyImports.has(importSpecifier),
          allowTopLevelThis: true // dont rewrite global `this` -> `undefined`
        }
      ]
    );
  }

  if (hasClass) {
    extraPlugins.push(es2015Classes);
  } // TODO(gaearon): put this back into '=>' indexOf bailout
  // and patch react-refresh to not depend on this transform.

  extraPlugins.push(es2015ArrowFunctions);

  if (!isHermesCanary) {
    extraPlugins.push(es2015ComputedProperty);
  }

  if (!isHermesCanary && (isNull || hasClass || src.indexOf("...") !== -1)) {
    extraPlugins.push(es2015Spread);
    extraPlugins.push(objectRestSpread);
  }

  if (!isHermes && (isNull || src.indexOf("`") !== -1)) {
    extraPlugins.push(es2015TemplateLiterals);
  }

  if (isNull || src.indexOf("**") !== -1) {
    extraPlugins.push(exponentiationOperator);
  }

  if (isNull || src.indexOf("Object.assign") !== -1) {
    extraPlugins.push(objectAssign);
  }

  if (hasForOf) {
    extraPlugins.push(es2015ForOf);
  }

  if (
    isNull ||
    src.indexOf("React.createClass") !== -1 ||
    src.indexOf("createReactClass") !== -1
  ) {
    extraPlugins.push(reactDisplayName);
  }

  if (!isHermes && (isNull || src.indexOf("?.") !== -1)) {
    extraPlugins.push(optionalChaining);
  }

  if (isNull || src.indexOf("??") !== -1) {
    extraPlugins.push(nullishCoalescingOperator);
  }

  if (!isHermes) {
    extraPlugins.push(shorthandProperties);
  }

  if (options && options.dev && !options.useTransformReactJSXExperimental) {
    extraPlugins.push(reactJsxSource);
    extraPlugins.push(reactJsxSelf);
  }

  if (!options || options.enableBabelRuntime !== false) {
    extraPlugins.push(babelRuntime);
  }

  return {
    comments: false,
    compact: true,
    overrides: [
      // the flow strip types plugin must go BEFORE class properties!
      // there'll be a test case that fails if you don't.
      {
        plugins: [require("@babel/plugin-transform-flow-strip-types")]
      },
      {
        plugins: defaultPlugins
      },
      {
        test: isTypeScriptSource,
        plugins: [
          [
            require("@babel/plugin-transform-typescript"),
            {
              isTSX: false,
              allowNamespaces: true
            }
          ]
        ]
      },
      {
        test: isTSXSource,
        plugins: [
          [
            require("@babel/plugin-transform-typescript"),
            {
              isTSX: true,
              allowNamespaces: true
            }
          ]
        ]
      },
      {
        plugins: extraPlugins
      }
    ]
  };
};

module.exports = options => {
  if (options.withDevTools == null) {
    const env = process.env.BABEL_ENV || process.env.NODE_ENV;

    if (!env || env === "development") {
      return getPreset(
        null,
        _objectSpread(
          _objectSpread({}, options),
          {},
          {
            dev: true
          }
        )
      );
    }
  }

  return getPreset(null, options);
};

module.exports.getPreset = getPreset;
