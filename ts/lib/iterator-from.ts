// vim: noexpandtab

'use strict';

/**
 * Collection of static functions that convert output of common iterables
 */
class Iterator_From {
	/**
	 * Converts `Array` to `GeneratorFunction`
	 * @param {any[]} array - List any type of values
	 * @yields {[any, number]}
	 */
	static *array(array: any[]): IterableIterator<[any, number]> {
		for (const [index, value] of array.entries()) {
			yield [value, index];
		}
	}

	/**
	 * Converts `Object` to `GeneratorFunction`
	 * @param {Object} dictionary - Dictionary of key value pares
	 * @yields {[any, string]}
	 */
	static *object(dictionary: Shared.Dictionary): IterableIterator<[any, string]> {
		for (const [key, value] of Object.entries(dictionary)) {
			yield [value, key];
		}
	}

	/**
	 * Converts Iterator class or `GeneratorFunction` to `Generator`
	 * @param {GeneratorFunction} iterator - Objects with `.next()` or `[Symbol.iterator]()` method defined
	 * @yields {[any, number]}
	 */
	static *generator(iterator: Generator<unknown, void, unknown>): IterableIterator<[any, number]> {
		let count = 0;
		for (const value of iterator) {
			yield [value, count];
			count++;
		}
	}

	static async *asyncGenerator(
		iterator: AsyncIterable<unknown>
	): AsyncGenerator<unknown[], void, unknown> {
		let count = 0;
		for await (const value of iterator) {
			yield [value, count];
			count++;
		}
	}
}

/* istanbul ignore next */
if (typeof module !== 'undefined') {
	exports = module.exports = { Iterator_From };
}

export { Iterator_From };
