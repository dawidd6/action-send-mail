# http-client [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/mjackson/http-client/master.svg?style=flat-square
[build]: https://travis-ci.org/mjackson/http-client

[npm-badge]: https://img.shields.io/npm/v/http-client.svg?style=flat-square
[npm]: https://www.npmjs.org/package/http-client

[http-client](https://www.npmjs.com/package/http-client) lets you compose HTTP clients using JavaScript's [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This library has the following goals:

  - Preserve the full capabilities of the fetch API
  - Provide an extendable middleware API
  - Use the same API on both client and server

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save http-client

http-client requires you to bring your own [global `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) function (for convenience when using the top-level `createFetch` function). [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) is a great polyfill if you need to support environments that don't already have a global `fetch` function.

Then, use as you would anything else:

```js
// using ES6 modules
import { createFetch } from 'http-client'

// using CommonJS modules
var createFetch = require('http-client').createFetch
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/http-client/umd/http-client.min.js"></script>
```

You can find the library on `window.HTTPClient`.

## Usage

http-client simplifies the process of creating flexible HTTP clients that work in both node and the browser. You create your own `fetch` function using the `createFetch` method, optionally passing [middleware](#middleware) as arguments.

```js
import { createFetch, base, accept, parse } from 'http-client'

const fetch = createFetch(
  base('https://api.stripe.com/v1'),  // Prefix all request URLs
  accept('application/json'),         // Set "Accept: application/json" in the request headers
  parse('json')                       // Read the response as JSON and put it in response.body
)

fetch('/customers/5').then(response => {
  console.log(response.jsonData)
})
```

## Top-level API

#### `createFetch(...middleware)`

Creates a `fetch` function that uses some [middleware](#middleware). Uses the global `fetch` function to actually make the request.

#### `createStack(...middleware)`

Combines several middleware into one, in the same order they are provided as arguments. Use this function to create re-usable [middleware stacks](#stacks) or if you don't want to use a global `fetch` function.

#### `enableRecv(fetch)`

Returns an "enhanced" version of the given `fetch` function that knows how to run response handlers registered using [`recv`](#recvhandler). This is only really useful when using [stacks](#stacks) directly instead of `createFetch`.

## Middleware

http-client provides a variety of middleware that may be used to extend the functionality of the client. Out of the box, http-client ships with the following middleware:

#### `accept(contentType)`

Adds an `Accept` header to the request.

```js
import { createFetch, accept } from 'http-client'

const fetch = createFetch(
  accept('application/json')
)
```

#### `auth(value)`

Adds an `Authorization` header to the request.

```js
import { createFetch, auth } from 'http-client'

const fetch = createFetch(
  auth('Bearer ' + oauth2Token)
)
```

#### `base(baseURL)`

Adds the given `baseURL` to the beginning of the request URL.

```js
import { createFetch, base } from 'http-client'

const fetch = createFetch(
  base('https://api.stripe.com/v1')
)

fetch('/customers/5') // GET https://api.stripe.com/v1/customers/5
```

#### `body(content, contentType)`

Sets the given `content` string as the request body.

```js
import { createFetch, body } from 'http-client'

const fetch = createFetch(
  body(JSON.stringify(data), 'application/json')
)
```

#### `debug()`

Adds a `debug` property to the response or error object so you can inspect them. Mainly useful for testing/debugging (should run *after* all other middleware).

```js
import { createFetch, debug } from 'http-client'

const fetch = createFetch(
  // ... other middleware
  debug()
)

fetch(input).then(response => {
  console.log(response.debug.input, response.debug.options)
})
```

#### `header(name, value)`

Adds a header to the request.

```js
import { createFetch, header } from 'http-client'

const fetch = createFetch(
  header('Content-Type', 'application/json')
)
```

#### `init(propertyName, value)`

Sets the value of an arbitrary property in the options object.

```js
import { createFetch, init } from 'http-client'

const fetch = createFetch(
  init('credentials', 'include')
)
```

#### `json(object)`

Adds the data in the given object as JSON to the request body.

#### `method(verb)`

Sets the request method.

```js
import { createFetch, method } from 'http-client'

const fetch = createFetch(
  method('POST')
)
```

#### `params(object)`

Adds the given object to the query string of `GET`/`HEAD` requests and as a `x-www-form-urlencoded` payload on all others.

```js
import { createFetch, method, params } from 'http-client'

// Create a client that will append hello=world to the URL in the query string
const fetch = createFetch(
  params({ hello: 'world' })
)

// Create a client that will send hello=world as POST data
const fetch = createFetch(
  method('POST'),
  params({ hello: 'world' })
)
```

#### `parse(parser, as = 'body')`

Reads the response body to completion, parses the response, and puts the result on `response.body` (or whatever `as` is). `parser` must be the name of a valid [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body) parsing method. The following parsers are available in [the spec](https://fetch.spec.whatwg.org/#body-mixin):

- `arrayBuffer`
- `blob`
- `formData`
- `json`
- `text`

```js
import { createFetch, parse } from 'http-client'

const fetch = createFetch(
  parse('json')
)

fetch(input).then(response => {
  console.log(response.body)
})
```

Note: Some parsers may not be available when using a `fetch` polyfill. In particular if you're using `node-fetch`, you should be aware of [its limitations](https://github.com/bitinn/node-fetch/blob/master/LIMITS.md).

#### `query(object)`

Adds the data in the given object (or string) to the query string of the request URL.

#### `recv(handler)`

Used to handle the `response` in some way. The `handler` function should return the new response value, or a promise for it. Response handlers run in the order they are defined.

```js
import { createFetch, recv } from 'http-client'

const fetch = createFetch(
  recv(response => (console.log('runs first'), response)),
  recv(response => (console.log('runs second'), response))
)
```

## Stacks

Middleware may be combined together into re-usable middleware "stacks" using `createStack`. A stack is itself a middleware that is composed of one or more other pieces of middleware. Thus, you can pass a stack directly to `createFetch` as if it were any other piece of middleware.

This is useful when you have a common set of functionality that you'd like to share between several different `fetch` methods, e.g.:

```js
import { createFetch, createStack, header, base, parse, query } from 'http-client'

const commonStack = createStack(
  header('X-Auth-Key', key),
  header('X-Auth-Email', email),
  base('https://api.cloudflare.com/client/v4'),
  parse('json')
)

// This fetch function can be used standalone...
const fetch = createFetch(commonStack)

// ...or we can add further middleware to create another fetch function!
const fetchSinceBeginningOf2015 = createFetch(
  commonStack,
  query({ since: '2015-01-01T00:00:00Z' })
)
```

Stacks are also useful when you don't have a global `fetch` function, e.g. in node. In those cases, you can still use http-client middleware and supply your own `fetch` (we recommend [node-fetch](https://www.npmjs.com/package/node-fetch)) function directly, but make sure you "enhance" it first:

```js
const { createStack, enableRecv, header, base } = require('http-client')

// We need to "enhance" node-fetch so it knows how to
// handle responses correctly. Specifically, enableRecv
// gives a fetch function the ability to run response
// handlers registered with recv (which parse, used below,
// uses behind the scenes).
const fetch = enableRecv(
  require('node-fetch')
)

const stack = createStack(
  header('X-Auth-Key', key),
  header('X-Auth-Email', email),
  base('https://api.cloudflare.com/client/v4'),
  parse('json')
)

stack(fetch, input, options)
```
