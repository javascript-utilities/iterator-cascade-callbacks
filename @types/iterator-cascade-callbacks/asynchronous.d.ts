// vim: noexpandtab

import { Shared } from './index';

/**
 * @see {link} https://www.typescriptlang.org/docs/handbook/namespaces.html
 * @see {link} https://jsdoc.app/tags-namespace.html
 * @see {link} https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b#460e
 */
declare global {
	/**
	 *
	 * @namespace {Asynchronous}
	 */
	export namespace Asynchronous {
		//
		export interface Iterator_Cascade_Callbacks__Static<T> {
			new (...args: Array<unknown>): T;
			zip(...iterables: any[]): T;
		}

		//
		export interface Iterator_Cascade_Callbacks__Instance {
			iterator: any;
			yielded_data: Shared.Yielded_Data;
			done: boolean;
			callbacks: Asynchronous.Callback_Object__Instance[];
			storage: Shared.Dictionary;
			state: {
				paused: boolean;
				resumed: boolean;
			};

			get value(): any;

			/* Generator/Iterator methods */
			entries(): AsyncIterator<Shared.Yielded_Data>;

			/* Instance method definitions */
			collect(
				target: any[] | Shared.Dictionary | any,
				callback_or_amount?: Asynchronous.Collect_To_Function | number,
				amount?: number
			): Promise<any[] | Shared.Dictionary | undefined>;

			collectToArray(target: any[], amount?: number): Promise<any[]>;
			collectToFunction(target: any, callback: Collect_To_Function, amount?: number): Promise<any>;
			collectToObject(target: Shared.Dictionary, amount?: number): Promise<Shared.Dictionary>;
			collectToArray(target: any[], amount?: number): Promise<any[]>;

			next(): Promise<Asynchronous.Iterator_Cascade_Callbacks__Instance>;

			popCallbackObject(): Asynchronous.Callback_Object__Instance | undefined;
			popCallbackWrapper(): Asynchronous.Callback_Wrapper | undefined;

			skip(amount: number):Asynchronous.Iterator_Cascade_Callbacks;
			step(amount: number):Asynchronous.Iterator_Cascade_Callbacks;
			take(amount: number):Asynchronous.Iterator_Cascade_Callbacks;

			[Symbol.asyncIterator](): Asynchronous.Iterator_Cascade_Callbacks;
		}

		//
		export interface Callback_Object__Static<T> {
			new (callback_wrapper: Callback_Wrapper, name: string, parameters: any[]): Asynchronous.Callback_Object__Instance;
		}

		/**
		 * Classy object for storing wrapper function state between iterations
		 * @property {Callback_Wrapper} wrapper - Wrapper for callback function that parses inputs and outputs
		 * @property {Shared.Dictionary} storage - Generic dictionary like object
		 * @property {string} name - Method name that instantiated callback, eg. `filter`
		 * @property {any[]} parameters - List of arguments that are passed to callback on each iteration
		 * @typedef {Asynchronous.Callback_Object__Instance}
		 */
		//
		export interface Callback_Object__Instance {
			wrapper: Asynchronous.Callback_Wrapper;
			callback: Asynchronous.Callback_Function;
			storage: Shared.Dictionary;
			name: string;
			parameters: any[];

			call(iterator_cascade_callbacks: Iterator_Cascade_Callbacks): Promise<void>;
		}

		/**
		 * Object with references to `Iterator_Cascade_Callbacks` and `Callback_Object` instances
		 * @property {Asynchronous.Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
		 * @property {Asynchronous.Callback_Object__Instance} callback_object - Instance reference to `this` of `Callback_Object`
		 * @typedef {Asynchronous.Callback_Function_References}
		 */
		export type Callback_Function_References = {
			iterator_cascade_callbacks: Asynchronous.Iterator_Cascade_Callbacks;
			callback_object: Asynchronous.Callback_Object__Instance;
		};

		/**
		 * Generic callback function for parsing and/or mutating iterator data
		 * @param {any} value - First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()`
		 * @param {Index_Or_Key} index_or_key - Either a `string` or `number` depending upon iterable type
		 * @param {Callback_Function_References} references - Dictionary with reference to _`this`_ `Iterator_Cascade_Callbacks` and _`this`_ `Callback_Object`
		 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
		 * @typedef Callback_Function
		 */
		export type Callback_Function = (
			value: any,
			index_or_key: Shared.Index_Or_Key,
			references: Asynchronous.Callback_Function_References,
			...parameters: any[]
		) => Promise<any> | any;

		/**
		 * Wrapper for callback function that parses inputs and outputs, and passes parameters to `Callback_Function`
		 * @param {Asynchronous.Callback_Object__Instance} callback_object - Instance reference to `this` of `Callback_Object`
		 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
		 * @typedef Callback_Wrapper
		 */
		export type Callback_Wrapper = (
			callback_object: Asynchronous.Callback_Object__Instance,
			iterator_cascade_callbacks: Asynchronous.Iterator_Cascade_Callbacks
		) => void;

		/**
		 * Callback function for custom collection algorithms
		 * @param {any} target - An object that function will collect values to
		 * @param {value} any - Value portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
		 * @param {number|string} index_or_key - Index or Key portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
		 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
		 * @typedef Collect_To_Function
		 * @example
		 * const icc = new Asynchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
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
			iterator_cascade_callbacks: Asynchronous.Iterator_Cascade_Callbacks
		) => Promise<any> | any;
	}
}

export { Asynchronous };
