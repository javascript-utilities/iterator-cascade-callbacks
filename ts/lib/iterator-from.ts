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
	static *array(array: any[]): IterableIterator<Shared.Yielded_Data> {
		for (const [index_or_key, content] of array.entries()) {
			yield { content, index_or_key };
		}
	}

	/**
	 * Converts `Object` to `GeneratorFunction`
	 * @param {Object} dictionary - Dictionary of key value pares
	 * @yields {[any, string]}
	 */
	static *object(dictionary: Shared.Dictionary): IterableIterator<Shared.Yielded_Data> {
		for (const [index_or_key, content] of Object.entries(dictionary)) {
			yield { content, index_or_key };
		}
	}

	/**
	 * Converts Iterator class or `GeneratorFunction` to `Generator`
	 * @param {GeneratorFunction} iterator - Objects with `.next()` or `[Symbol.iterator]()` method defined
	 * @yields {[any, number]}
	 */
	static *generator(
		iterator: Generator<unknown, void, unknown>
	): IterableIterator<Shared.Yielded_Data> {
		let index_or_key = 0;
		for (const content of iterator) {
			yield { content, index_or_key };
			index_or_key++;
		}
	}

	static async *asyncGenerator(
		iterator: AsyncIterable<unknown>
	): AsyncGenerator<Shared.Yielded_Data, void, unknown> {
		let index_or_key = 0;
		for await (const content of iterator) {
			yield { content, index_or_key };
			index_or_key++;
		}
	}
}

/* istanbul ignore next */
if (typeof module !== 'undefined') {
	exports = module.exports = { Iterator_From };
}

export { Iterator_From };
