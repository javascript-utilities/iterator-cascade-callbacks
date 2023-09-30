// vim: noexpandtab

'use strict';

/**
 * Enable `instanceof` checks for Generator functions
 */
/* istanbul ignore next */
const GeneratorFunction = function* () {}.constructor;

/* istanbul ignore next */
const AsyncGeneratorFunction = async function* () {}.constructor;

/**
 * Enable `instanceof` checks for Asynchronous Generator functions
 * @see {link} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator
 * @TODO: Investigate following files
 * - ../__tests__/tests-iterator-cascade-callbacks-asynchronously_constructor.ts
 * > Iterator_Cascade_Callbacks.constructor -> Uninitialized classes with [Symbol.asyncIterator] defined supported?
 *
 * - ../iterator-cascade-callbacks-asynchronously.ts
 * > constructor
 */
/* istanbul ignore next */
const AsyncGeneratorClass = Object.getPrototypeOf(
	Object.getPrototypeOf(Object.getPrototypeOf((async function* () {})()))
).constructor;

/**
 * Thanks be to @theseyi of GitHub
 * @see {link} https://github.com/microsoft/TypeScript/issues/14600#issuecomment-488817980
 */
const Static_Contract =
	<T extends new (...args: Array<unknown>) => void>(): ((c: T) => void) =>
	(_ctor: T): void => {};

/***/
class Yielded_Data implements Shared.Yielded_Data {
	content: any;
	index_or_key: Shared.Index_Or_Key;
	constructor({ content, index_or_key }: Shared.Yielded_Data) {
		this.content = content;
		this.index_or_key = index_or_key;
	}
}

/* istanbul ignore next */
if (typeof module !== 'undefined') {
	exports = module.exports = {
		GeneratorFunction,
		AsyncGeneratorFunction,
		AsyncGeneratorClass,
		Static_Contract,
		Yielded_Data,
	};
}

export {
	GeneratorFunction,
	AsyncGeneratorFunction,
	AsyncGeneratorClass,
	Static_Contract,
	Yielded_Data,
};
