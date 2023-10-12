// vim: noexpandtab

import { Shared } from './index';
import { Synchronous } from './synchronous';

/**
 * @namespace {Asynchronous}
 * @see {link} https://www.typescriptlang.org/docs/handbook/namespaces.html
 * @see {link} https://jsdoc.app/tags-namespace.html
 * @see {link} https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b#460e
 */
export namespace Asynchronous {
	/**
	 * Classy object for storing wrapper function state between iterations
	 * @typedef {Asynchronous.Callback_Object}
	 */
	export interface Callback_Object<Value, Result, Parameters, Key> {
		/**
		 * @property {Asynchronous.Callback_Wrapper} wrapper - Wrapper for callback function that parses inputs and outputs
		 */
		wrapper: Asynchronous.Callback_Wrapper;

		/**
		 * @property {string} name - Method name that instantiated callback, eg. `filter`
		 */
		name: string;

		/**
		 * @property {Asynchronous.Callback_Wrapper|Synchronous.Callback_Function} callback - Asynchronous callback wrapper Function to call
		 */
		callback:
			| Asynchronous.Callback_Function<Value, Result, Parameters, Key>
			| Synchronous.Callback_Function;

		/**
		 * @property {any[]} parameters - List of arguments that are passed to callback on each iteration
		 */
		parameters: Parameters;

		/**
		 * @property {Shared.Dictionary} storage - Generic dictionary like object
		 */
		storage: Shared.Dictionary;

		/**
		 * Calls `this.wrapper` function with reference to this `Callback_Object` and `Iterator_Cascade_Callbacks`
		 * @param {Asynchronous.Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Reference to `Iterator_Cascade_Callbacks` instance
		 */
		call: (iterator_cascade_callbacks: Asynchronous.Iterator_Cascade_Callbacks) => Promise<void>;
	}

	/**
	 * Object with references to `Iterator_Cascade_Callbacks` and `Callback_Object` instances
	 * @property {Asynchronous.Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @property {Asynchronous.Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
	 * @typedef {Asynchronous.Callback_Function_References}
	 */
	export type Callback_Function_References<Value, Result, Parameters, Key> = {
		iterator_cascade_callbacks: Asynchronous.Iterator_Cascade_Callbacks;
		callback_object: Asynchronous.Callback_Object<Value, Result, Parameters, Key>;
	};

	/**
	 * Generic callback function for parsing and/or mutating iterator data
	 * @param {unknown} value - First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()`
	 * @param {Shared.Index_Or_Key} index_or_key - Either a `string` or `number` depending upon iterable type
	 * @param {Asynchronous.Callback_Function_References} references - Dictionary with reference to _`this`_ `Iterator_Cascade_Callbacks` and _`this`_ `Callback_Object`
	 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @typedef Callback_Function
	 */
	export type Callback_Function<Value, Result, Parameters, Key> = (
		value: Value,
		index_or_key: Key,
		references: Asynchronous.Callback_Function_References,
		...parameters: Parameters
	) => Result;

	/**
	 * Wrapper for callback function that parses inputs and outputs, and passes parameters to `Callback_Function`
	 * @param {Asynchronous.Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
	 * @param {Asynchronous.Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @typedef Callback_Wrapper
	 */
	export type Callback_Wrapper<Value, Result, Parameters, Key> = (
		callback_object: Asynchronous.Callback_Object<Value, Result, Parameters, Key>,
		iterator_cascade_callbacks: Asynchronous.Iterator_Cascade_Callbacks
	) => Promise<void>;

	/**
	 * Callback function for custom collection algorithms
	 * @param {any} target - An object that function will collect values to
	 * @param {value} any - Value portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
	 * @param {number|string} index_or_key - Index or Key portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
	 * @param {Asynchronous.Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @typedef Collect_To_Function
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
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
		iterator_cascade_callbacks: Asynchronous.Iterator_Cascade_Callbacks
	) => Promise<any> | any;
}

export { Asynchronous };
