// vim: noexpandtab

import { Errors } from './errors';
import { ICC } from './iterator-cascade-callbacks';
import { ICCA } from './iterator-cascade-callbacks-asynchronously';

declare global {
	export namespace Shared {
		/**
		 * Generic dictionary like object
		 * @typedef Dictionary
		 * @example
		 * const data: Dictionary = { key: 'value' };
		 */
		export type Dictionary = { [key: string]: any };

		/**
		 * Array `index` or Object `key` or Generator `count`
		 * @typedef Index_Or_Key
		 * @example
		 * const key: Index_Or_Key = 'key';
		 * const index: Index_Or_Key = 42;
		 */
		export type Index_Or_Key = number | string;

		/**
		 * Classy object with `value` and `index_or_key` entries
		 * @typedef Yielded_Data
		 * @example
		 * const result: Yielded_Data = new Yielded_Data({ value: 'spam', index_or_key: 3 });
		 */
		export type Yielded_Data = {
			content: any;
			index_or_key: Index_Or_Key;
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
		export type Yielded_Entry = ArrayLike<Index_Or_Key, any>;

		/**
		 * Return string value for comparisons
		 * @notes
		 * - `==` values are equivalent after type coercion
		 * - `===` values and types are equal
		 * - `!=` values are not equivalent after type coercion
		 * - `!==` values are not equal but types are equivalent
		 * - `>=` left is greater than right and types are equal
		 * - `>` left is greater than right after type coercion
		 * - `<=` left is less than right but types are equivalent
		 * - `<` left is less than right after type coercion
		 */
		export type Comparison_Results = '==' | '===' | '!=' | '!==' | '>=' | '>' | '<=' | '<';

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
		export type Generator_Function_Instance = (...args: any[]) => Generator<unknown, any, unknown>;

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
}

export { Errors, ICC, ICCA, Shared };
