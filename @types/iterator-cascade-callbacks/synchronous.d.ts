// vim: noexpandtab

import { Shared } from './index';
import type { Iterator_Cascade_Callbacks } from '../../ts/synchronous/iterator-cascade-callbacks';
import type { Callback_Object } from '../../ts/synchronous/callback-object';

/**
 * Shared namespace between source code and tests for this repository
 * @see {link} https://www.typescriptlang.org/docs/handbook/namespaces.html
 * @see {link} https://jsdoc.app/tags-namespace.html
 * @see {link} https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b#460e
 * @namespace Synchronous
 */
export namespace Synchronous {
	/**
	 * Object with references to `Iterator_Cascade_Callbacks` and `Callback_Object` instances
	 * @property {Synchronous.Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @property {Synchronous.Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
	 * @typedef {Synchronous.Callback_Function_References}
	 */
	export type Callback_Function_References<Value, Result, Parameters extends Array<unknown>, Key> = {
		iterator_cascade_callbacks: Synchronous.Iterator_Cascade_Callbacks;
		callback_object: Synchronous.Callback_Object<Value, Result, Parameters, Key>;
	};

	/**
	 * Generic callback function for parsing and/or mutating iterator data
	 * @param {unknown} value - First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()`
	 * @param {Shared.Index_Or_Key} index_or_key - Either a `string` or `number` depending upon iterable type
	 * @param {Synchronous.Callback_Function_References} references - Dictionary with reference to _`this`_ `Iterator_Cascade_Callbacks` and _`this`_ `Callback_Object`
	 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @typedef Callback_Function
	 */
	export type Callback_Function<Value, Result, Parameters extends Array<unknown>, Key> = (
		value: Value,
		index_or_key: Key,
		references: Synchronous.Callback_Function_References,
		...parameters: Parameters
	) => Result;

	/**
	 * Wrapper for callback function that parses inputs and outputs, and passes parameters to `Callback_Function`
	 * @param {Synchronous.Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
	 * @param {Synchronous.Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @typedef Callback_Wrapper
	 */
	export type Callback_Wrapper<Value, Result, Parameters extends Array<unknown>, Key> = (
		callback_object: Synchronous.Callback_Object<Value, Result, Parameters, Key>,
		iterator_cascade_callbacks: Synchronous.Iterator_Cascade_Callbacks
	) => void;

	/**
	 * Callback function for custom collection algorithms
	 * @param {any} target - An object that function will collect values to
	 * @param {value} any - Value portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
	 * @param {number|string} index_or_key - Index or Key portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
	 * @param {Synchronous.Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @typedef Collect_To_Function
	 * @example
	 * const icca = new Synchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
	 *
	 * const map = new Map();
	 *
	 * const collection = icca.collectToFunction(map, (target, value) => {
	 *   target.set(index_or_key, value);
	 * });
	 *
	 * console.log(collection);
	 * //> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
	 */
	export type Collect_To_Function = (
		target: any,
		value: any,
		index_or_key: Shared.Index_Or_Key,
		iterator_cascade_callbacks: Synchronous.Iterator_Cascade_Callbacks
	) => any;
}

export { Synchronous };
