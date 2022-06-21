'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestInfo = exports.debug = exports.parseText = exports.parseJSON = exports.parse = exports.onResponse = exports.handleResponse = exports.recv = exports.params = exports.json = exports.body = exports.query = exports.base = exports.accept = exports.auth = exports.header = exports.method = exports.init = exports.fetch = exports.createFetch = exports.createStack = exports.enhanceFetch = exports.enableRecv = undefined;

var _queryString = require('query-string');

var _byteLength = require('byte-length');

var _byteLength2 = _interopRequireDefault(_byteLength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = (1, eval)('this');

var stringifyQuery = function stringifyQuery(query) {
  return typeof query === 'string' ? query : (0, _queryString.stringify)(query);
};

var stringifyJSON = function stringifyJSON(json) {
  return typeof json === 'string' ? json : JSON.stringify(json);
};

var processResponse = function processResponse(response, handlers) {
  return handlers.reduce(function (promise, handler) {
    return promise.then(handler);
  }, Promise.resolve(response));
};

/**
 * Returns a new fetch function that knows how to execute
 * options.responseHandlers on the response.
 */
var enableRecv = exports.enableRecv = function enableRecv(fetch) {
  return function (input) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return fetch(input, options).then(function (response) {
      var responseHandlers = options.responseHandlers;

      return responseHandlers && responseHandlers.length ? processResponse(response, responseHandlers) : response;
    });
  };
};

// Deprecated.
var enhanceFetch = exports.enhanceFetch = enableRecv;

var emptyStack = function emptyStack(fetch, input, options) {
  return fetch(input, options);
};

/**
 * Creates a middleware "stack" function using all arguments.
 * A "stack" is essentially a bunch of middleware composed into
 * a single middleware function. Since all middleware share the
 * same signature, stacks may further be combined to create more
 * stacks with different characteristics.
 */
var createStack = exports.createStack = function createStack() {
  for (var _len = arguments.length, middleware = Array(_len), _key = 0; _key < _len; _key++) {
    middleware[_key] = arguments[_key];
  }

  if (middleware.length === 0) return emptyStack;

  return middleware.reduceRight(function (inner, outer) {
    return function (fetch, outerInput, outerOptions) {
      return outer(function (innerInput, innerOptions) {
        return inner(fetch, innerInput, innerOptions);
      }, outerInput, outerOptions);
    };
  });
};

/**
 * Creates a fetch function using all arguments as middleware.
 * This function is a "stack" that uses the global fetch, so the
 * following two examples are equivalent:
 *
 *   const stack = createStack(middleware)
 *   stack(global.fetch, input, options)
 *
 *   const fetch = createFetch(middleware)
 *   fetch(input, options)
 *
 * Thus, createFetch essentially eliminates some boilerplate code
 * when you just want to use the global fetch function.
 */
var createFetch = exports.createFetch = function createFetch() {
  if (arguments.length === 0) return global.fetch;

  var stack = createStack.apply(undefined, arguments);

  return enableRecv(function (input) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return stack(global.fetch, input, options);
  });
};

// Deprecated.
var mainFetch = enableRecv(global.fetch);
exports.fetch = mainFetch;

/**
 * Sets a property name and value in the options object.
 */

var init = exports.init = function init(propertyName, value) {
  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options[propertyName] = value;
    return fetch(input, options);
  };
};

/**
 * Sets the request method.
 */
var method = exports.method = function method(verb) {
  return init('method', verb);
};

var setHeader = function setHeader(options, name, value) {
  (options.headers || (options.headers = {}))[name] = value;
};

/**
 * Adds a header to the request.
 */
var header = exports.header = function header(name, value) {
  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    setHeader(options, name, value);
    return fetch(input, options);
  };
};

/**
 * Adds an Authorization header to the request.
 */
var auth = exports.auth = function auth(value) {
  return header('Authorization', value);
};

/**
 * Adds an Accept header to the request.
 */
var accept = exports.accept = function accept(value) {
  return header('Accept', value);
};

/**
 * Adds the given string at the front of the request URL.
 */
var base = exports.base = function base(baseURL) {
  return function (fetch, input, options) {
    return fetch(baseURL + (input || ''), options);
  };
};

/**
 * Adds the given object to the query string in the request.
 */
var query = exports.query = function query(object) {
  var queryString = stringifyQuery(object);

  return function (fetch, input, options) {
    return fetch(input + (input.indexOf('?') === -1 ? '?' : '&') + queryString, options);
  };
};

/**
 * Adds the given content to the request.
 */
var body = exports.body = function body(content, contentType) {
  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options.body = content;

    if (content.length != null) setHeader(options, 'Content-Length', (0, _byteLength2.default)(content));

    if (contentType) setHeader(options, 'Content-Type', contentType);

    return fetch(input, options);
  };
};

/**
 * Adds an application/json payload to the request.
 */
var json = exports.json = function json(object) {
  return body(stringifyJSON(object), 'application/json');
};

/**
 * Adds the given object to the query string of GET/HEAD requests
 * and as a application/x-www-form-urlencoded payload on all others.
 */
var params = exports.params = function params(object) {
  var queryString = stringifyQuery(object);

  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var verb = (options.method || 'GET').toUpperCase();
    var middleware = verb === 'GET' || verb === 'HEAD' ? query(queryString) : body(queryString, 'application/x-www-form-urlencoded');

    return middleware(fetch, input, options);
  };
};

/**
 * A helper for creating middleware that handles a successful response.
 */
var recv = exports.recv = function recv(handler) {
  return function (fetch, input) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    (options.responseHandlers || (options.responseHandlers = [])).push(handler);
    return fetch(input, options);
  };
};

// Deprecated.
var handleResponse = exports.handleResponse = recv;
var onResponse = exports.onResponse = recv;

/**
 * Reads the response stream to completion, parses its content
 * using the given parser, and adds the result to response.body.
 */
var parse = exports.parse = function parse(parser) {
  var as = arguments.length <= 1 || arguments[1] === undefined ? 'body' : arguments[1];
  return recv(function (response) {
    if (as in response) return response[as];

    return response[parser]().then(function (body) {
      response[as] = body;
      return response;
    }, function (error) {
      throw new Error('parse(\'' + parser + '\') error: ' + error.stack);
    });
  });
};

// Deprecated.
var parseJSON = exports.parseJSON = function parseJSON() {
  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'jsonData' : arguments[0];
  return parse('json', propertyName);
};

// Deprecated.
var parseText = exports.parseText = function parseText() {
  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'textString' : arguments[0];
  return parse('text', propertyName);
};

/**
 * Adds a debug property to the response/error that contains
 * the input and options used in the request. Mainly useful in
 * testing and debugging.
 */
var debug = exports.debug = function debug() {
  return function (fetch, input, options) {
    return fetch(input, options).then(function (response) {
      response.debug = { input: input, options: options };
      return response;
    }, function () {
      var error = arguments.length <= 0 || arguments[0] === undefined ? new Error() : arguments[0];

      error.debug = { input: input, options: options };
      throw error;
    });
  };
};

// Deprecated.
var requestInfo = exports.requestInfo = function requestInfo() {
  return function (fetch, input, options) {
    return fetch(input, options).then(function (response) {
      response.requestInput = input;
      response.requestOptions = options;
      return response;
    }, function () {
      var error = arguments.length <= 0 || arguments[0] === undefined ? new Error() : arguments[0];

      error.requestInput = input;
      error.requestOptions = options;
      throw error;
    });
  };
};