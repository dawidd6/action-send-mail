/**
Start a promise chain.

@param function_ - The function to run to start the promise chain.
@param arguments - Arguments to pass to `function_`.
@returns The value of calling `function_(...arguments)`. If the function throws an error, the returned `Promise` will be rejected with that error.

@example
```
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
*/
export default function<ValueType, ArgumentsType extends unknown[]>(
	function_: (...arguments: ArgumentsType) => PromiseLike<ValueType> | ValueType,
	...arguments: ArgumentsType
): Promise<ValueType>;
