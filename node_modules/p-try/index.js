export default async function pTry(function_, ...arguments_) {
	return new Promise(resolve => {
		resolve(function_(...arguments_));
	});
}
