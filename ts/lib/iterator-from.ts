// vim: noexpandtab

'use strict';

import type { Shared } from '../../@types/iterator-cascade-callbacks/';

/**
 * @file Collection of export function functions that convert output of common iterables
 * @author S0AndS0
 * @license AGPL-3.0
 */

/**
 * Converts `Array` to `GeneratorFunction`
 * @param {any[]} array - List any type of values
 * @yields {[any, number]}
 */
export function* array<T = unknown>(values: T[]): IterableIterator<Shared.Yielded_Data<T, number>> {
	for (const [index_or_key, content] of values.entries()) {
		yield { content, index_or_key };
	}
}

/**
 * Converts `Object` to `GeneratorFunction`
 * @param {Object} dictionary - Dictionary of key value pares
 * @yields {[any, string]}
 */
export function* object<T = unknown>(
	dictionary: Shared.Dictionary<T>
): IterableIterator<Shared.Yielded_Data<T, string>> {
	for (const [index_or_key, content] of Object.entries<T>(dictionary)) {
		yield { content, index_or_key };
	}
}

/**
 * Converts Iterator class or `GeneratorFunction` to `Generator`
 * @param {GeneratorFunction} iterator - Objects with `.next()` or `[Symbol.iterator]()` method defined
 * @yields {[any, number]}
 */
export function* generator<T = unknown>(
	iterator: Generator<T, void, unknown>
): IterableIterator<Shared.Yielded_Data<T, number>> {
	let index_or_key = 0;
	for (const content of iterator) {
		yield { content, index_or_key };
		index_or_key++;
	}
}

export async function* asyncGenerator<T = unknown>(
	iterator: AsyncIterable<T>
): AsyncGenerator<Shared.Yielded_Data<T, number>, void, unknown> {
	let index_or_key = 0;
	for await (const content of iterator) {
		yield { content, index_or_key };
		index_or_key++;
	}
}

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */
