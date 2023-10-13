// vim: noexpandtab

import { Asynchronous } from './asynchronous';
import { Synchronous } from './synchronous';

export namespace Shared {
	/**
	 * Generic dictionary like object
	 * @typedef Dictionary
	 * @example
	 * const data: Dictionary = { key: 'value' };
	 */
	export type Dictionary<T = unknown> = { [key: string]: T };

	/**
	 * Array `index` or Object `key` or Generator `count`
	 * @typedef Index_Or_Key
	 * @example
	 * const key: Index_Or_Key = 'key';
	 * const index: Index_Or_Key = 42;
	 */
	// export type Index_Or_Key = number | string | undefined;
	export type Index_Or_Key<K = number | string> = K | unknown;

	/**
	 * Classy object with `value` and `index_or_key` entries
	 * @typedef Yielded_Data
	 * @example
	 * ```typescript
	 * const result: Yielded_Data = new Yielded_Data({ content: 'spam', index_or_key: 3 });
	 * ```
	 */
	export type Yielded_Data<T = unknown | undefined, K = Shared.Index_Or_Key | undefined> = {
		content: T;
		index_or_key: K;
	};

	/**
	 * Array with `index_or_key` and `value` entries
	 * @typedef {[Index_Or_Key, any]} Yielded_Entry
	 * @example
	 * ```typescript
	 * const result_from_array: Yielded_Entry = [3, 'spam'];
	 * const result_from_object: Yielded_Entry = ['foo', 'bar'];
	 * ```
	 */
	export type Yielded_Entry<T = unknown> = [Index_Or_Key<T>, any];

	/**
	 * Generator function that has not been initialized
	 * @example As Function Parameter
	 * function* gen() { for (let i = 0; i < 10; i++;) { yield i; } }
	 *
	 * function collect(generator: Generator_Function_Instance): any[] {
	 *   let collection = [];
	 *   const iterable = generator();
	 *   for (const value of iterable) {
	 *     collection.push(value);
	 *   }
	 *   return collection;
	 * }
	 */
	export type Generator_Function_Instance<T = unknown> = (
		...args: unknown[]
	) => Generator<T, void, unknown>;

	/**
	 * Results from Generator/Iterator function/class
	 * @property {boolean} done
	 * @property {any} value
	 * @typedef Yielded_Result
	 * @example
	 * const icc = new Iterator_Cascade_Callbacks([1, 2, 3]);
	 *
	 * let results = icc.next();
	 * while (!results.done) {
	 *   const { value, done } = results;
	 *   console.log('value ->', value, '| done ->', done);
	 *
	 *   const [ data, index_or_key ] = value;
	 *   console.log('data ->', data, '| index_or_key ->', index_or_key)
	 *
	 *   results = icc.next();
	 * }
	 */
	export type Yielded_Result = { done: boolean; value?: Shared.Yielded_Data };
}

export { Synchronous, Asynchronous, Shared };
