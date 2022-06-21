# p-try

> Start a promise chain

[How is it useful?](http://cryto.net/~joepie91/blog/2016/05/11/what-is-promise-try-and-why-does-it-matter/)

## Install

```sh
npm install p-try
```

## Usage

```js
import pTry from 'p-try';

try {
	const value = await pTry(() => {
		return synchronousFunctionThatMightThrow();
	});
	console.log(value);
} catch (error) {
	console.error(error);
}
```

## API

### pTry(fn, ...arguments)

Returns a `Promise` resolved with the value of calling `fn(...arguments)`. If the function throws an error, the returned `Promise` will be rejected with that error.

Support for passing arguments on to the `fn` is provided in order to be able to avoid creating unnecessary closures. You probably don't need this optimization unless you're pushing a *lot* of functions.

#### fn

The function to run to start the promise chain.

#### arguments

Arguments to pass to `fn`.

## Related

- [More…](https://github.com/sindresorhus/promise-fun)

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-p-try?utm_source=npm-p-try&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
