// vim: noexpandtab

'use strict';

import type { Shared } from '../../@types/iterator-cascade-callbacks/';

// /**
//  * Enable `instanceof` checks for Asynchronous Generator functions
//  * @see {link} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator
//  * @TODO: Investigate following files
//  * - ../__tests__/tests-iterator-cascade-callbacks-asynchronously_constructor.ts
//  * > Iterator_Cascade_Callbacks.constructor -> Uninitialized classes with [Symbol.asyncIterator] defined supported?
//  *
//  * - ../iterator-cascade-callbacks-asynchronously.ts
//  * > constructor
//  */
// const AsyncGeneratorClass = Object.getPrototypeOf(
// 	Object.getPrototypeOf(Object.getPrototypeOf((async function* () {})()))
// ).constructor;

const AsyncGeneratorFunction = async function* () {}.constructor;

/**
 * Enable `instanceof` checks for Generator functions
 */
/* istanbul ignore next */
const GeneratorFunction = function* () {}.constructor;

/**
 * Thanks be to @theseyi of GitHub
 * @see {link} https://github.com/microsoft/TypeScript/issues/14600#issuecomment-488817980
 */
const Static_Contract =
	<T extends new (...args: Array<unknown>) => void>(): ((c: T) => void) =>
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	(_ctor: T): void => {};

/**
 * Classy object with `value` and `index_or_key` entries
 *
 * @example
 * ```typescript
 * const result: Yielded_Data = new Yielded_Data({ content: 'spam', index_or_key: 3 });
 * ```
 */
class Yielded_Data<T = unknown, K = Shared.Index_Or_Key> implements Shared.Yielded_Data<T, K> {
	content: T;

	index_or_key: K;

	constructor({ content, index_or_key }: Shared.Yielded_Data<T, K>) {
		this.content = content;
		this.index_or_key = index_or_key;
	}
}

export {
	// AsyncGeneratorClass,
	AsyncGeneratorFunction,
	GeneratorFunction,
	Static_Contract,
	Yielded_Data,
};

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */

/**
 * Enable calling `new` and other non-instance methods
 */
export type Yielded_Data__Static = typeof Yielded_Data;
