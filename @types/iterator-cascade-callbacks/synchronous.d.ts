// vim: noexpandtab

import { Shared } from './index';

/**
 * Shared namespace between source code and tests for this repository
 * @see {link} https://www.typescriptlang.org/docs/handbook/namespaces.html
 * @see {link} https://jsdoc.app/tags-namespace.html
 * @see {link} https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b#460e
 * @namespace Synchronous
 */
export namespace Synchronous {
	/**
	 * Combined with `Static_Contract` Decorator this defines static types and properties
	 * @see {link} https://github.com/microsoft/TypeScript/issues/14600#issuecomment-488817980
	 * @typedef {Synchronous.Iterator_Cascade_Callbacks__Static}
	 */
	export interface Iterator_Cascade_Callbacks__Static<T> {
		new (...args: Array<unknown>): T;
		zip(...iterables: any[]): T;
	}

	/**
	 * Defines instance methods and properties
	 * @property {Shared.Dictionary} state - Data shared between `Callback_Wrapper` functions on each iteration
	 * @property {Shared.Dictionary} storage - Data shared between `Callback_Function` for each iteration
	 * @typedef {Synchronous.Iterator_Cascade_Callbacks__Instance}
	 */
	export interface Iterator_Cascade_Callbacks__Instance {
		iterator: any;
		done: boolean;
		yielded_data: Shared.Yielded_Data;
		callbacks: Synchronous.Callback_Object__Instance[];
		storage: Shared.Dictionary;
		state: {
			paused: boolean;
			resumed: boolean;
		};

		get value(): any;

		/* Instance method definitions */
		collect(
			target: any[] | Shared.Dictionary | any,
			callback_or_amount?: Synchronous.Collect_To_Function | number,
			amount?: number
		): any[] | Shared.Dictionary | undefined;

		collectToArray(target: any[], amount?: number): any[];
		collectToFunction(target: any, callback: Synchronous.Collect_To_Function, amount?: number): any;
		collectToObject(target: Shared.Dictionary, amount?: number): Shared.Dictionary;

		copyCallbacksOnto(iterable: any): Synchronous.Iterator_Cascade_Callbacks__Instance;

		entries(): IterableIterator<Shared.Yielded_Data>;

		filter(
			callback: Callback_Function,
			...parameters: any[]
		): Synchronous.Iterator_Cascade_Callbacks__Instance;
		forEach(
			callback: Callback_Function,
			...paramaters: any[]
		): Synchronous.Iterator_Cascade_Callbacks__Instance;
		inspect(
			callback: Callback_Function,
			...paramaters: any[]
		): Synchronous.Iterator_Cascade_Callbacks__Instance;
		limit(amount: number): Synchronous.Iterator_Cascade_Callbacks__Instance;
		map(
			callback: Callback_Function,
			...parameters: any[]
		): Synchronous.Iterator_Cascade_Callbacks__Instance;

		next(): Synchronous.Iterator_Cascade_Callbacks__Instance;

		popCallbackObject(): Synchronous.Callback_Object | undefined;
		popCallbackWrapper(): Synchronous.Callback_Wrapper | undefined;

		skip(amount: number): Synchronous.Iterator_Cascade_Callbacks__Instance;
		step(amount: number): Synchronous.Iterator_Cascade_Callbacks__Instance;
		take(amount: number): Synchronous.Iterator_Cascade_Callbacks__Instance;

		[Symbol.iterator](): Synchronous.Iterator_Cascade_Callbacks__Instance;
	}

	/**
	 * Combined with `Static_Contract` Decorator this defines static types and properties
	 * @see {link} https://github.com/microsoft/TypeScript/issues/14600#issuecomment-488817980
	 * @typedef {Synchronous.Callback_Object__Static}
	 */
	export interface Callback_Object__Static<T> {
		new ({
			wrapper,
			name,
			callback,
			parameters,
		}: {
			wrapper: Synchronous.Callback_Wrapper;
			name: string;
			callback?: Synchronous.Callback_Function;
			parameters: any[];
		}): T;
	}

	/**
	 * Classy object for storing wrapper function state between iterations
	 * @property {Callback_Wrapper} wrapper - Wrapper for callback function that parses inputs and outputs
	 * @property {Shared.Dictionary} storage - Generic dictionary like object
	 * @property {string} name - Method name that instantiated callback, eg. `filter`
	 * @property {any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @typedef {Synchronous.Callback_Object__Instance}
	 */
	export interface Callback_Object__Instance {
		wrapper: Synchronous.Callback_Wrapper;
		callback: Synchronous.Callback_Function;
		storage: Shared.Dictionary;
		name: string;
		parameters: any[];

		/**/
		call(iterator_cascade_callbacks: Synchronous.Iterator_Cascade_Callbacks): void;
	}

	/**
	 * Generic callback function for parsing and/or mutating iterator data
	 * @param {any} value - First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()`
	 * @param {Shared.Index_Or_Key} index_or_key - Either a `string` or `number` depending upon iterable type
	 * @param {Callback_Function_References} references - Dictionary with reference to _`this`_ `Iterator_Cascade_Callbacks` and _`this`_ `Callback_Object`
	 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @typedef Callback_Function
	 */
	export type Callback_Function = (
		value: any,
		index_or_key: Shared.Index_Or_Key,
		references: Callback_Function_References,
		...parameters: any[]
	) => any;
	// /**
	//  * Generic callback function for parsing and/or mutating iterator data
	//  * @param {unknown} value - First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()`
	//  * @param {Shared.Index_Or_Key} index_or_key - Either a `string` or `number` depending upon iterable type
	//  * @param {Synchronous.Callback_Function_References} references - Dictionary with reference to _`this`_ `Iterator_Cascade_Callbacks` and _`this`_ `Callback_Object`
	//  * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	//  * @typedef Callback_Function
	//  */
	// export type Callback_Function<Value, Result, Parameters, Key> = (
	// 	value: Value,
	// 	index_or_key: Key,
	// 	references: Synchronous.Callback_Function_References,
	// 	...parameters: Parameters
	// ) => Result;

	/**
	 * Object with references to `Iterator_Cascade_Callbacks` and `Callback_Object` instances
	 * @property {Synchronous.Iterator_Cascade_Callbacks__Instance} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @property {Synchronous.Callback_Object__Instance} callback_object - Instance reference to `this` of `Callback_Object`
	 * @typedef {Synchronous.Callback_Function_References}
	 */
	export type Callback_Function_References = {
		iterator_cascade_callbacks: Iterator_Cascade_Callbacks;
		callback_object: Callback_Object;
	};

	/**
	 * Wrapper for callback function that parses inputs and outputs, and passes parameters to `Callback_Function`
	 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
	 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @typedef {Synchronous.Callback_Wrapper}
	 */
	export type Callback_Wrapper = (
		callback_object: Callback_Object,
		iterator_cascade_callbacks: Iterator_Cascade_Callbacks
	) => void;

	/**
	 * Callback function for custom collection algorithms
	 * @param {any} target - An object that function will collect values to
	 * @param {value} any - Value portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
	 * @param {number|string} index_or_key - Index or Key portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
	 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @typedef {Synchronous.Collect_To_Function}
	 * @example
	 * const icc = new Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
	 *
	 * const map = new Map();
	 *
	 * const collection = icc.collectToFunction(map, (target, value) => {
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
		iterator_cascade_callbacks: Iterator_Cascade_Callbacks
	) => any;
}

export { Synchronous };
