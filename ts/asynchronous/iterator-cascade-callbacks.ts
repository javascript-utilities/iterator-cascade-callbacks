// vim: noexpandtab

'use strict';

import type { Asynchronous, Synchronous, Shared } from '../../@types/iterator-cascade-callbacks/';

import { Stop_Iteration, Pause_Iteration } from '../lib/errors.js';
import * as Iterator_From from '../lib/iterator-from.js';
import {
	// AsyncGeneratorClass,
	AsyncGeneratorFunction,
	GeneratorFunction,
	Yielded_Data,
} from '../lib/runtime-types.js';

import * as Wrappers from './wrappers.js';

import { Callback_Object } from './callback-object.js';

/**
 * Asynchronous Iterator that chains callback function execution
 * @author S0AndS0
 * @license AGPL-3.0
 * @see {link} https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#async-iteration
 */
class Iterator_Cascade_Callbacks<Initial_Iterable_Value = unknown> {
	done: boolean;

	yielded_data: Shared.Yielded_Data<Initial_Iterable_Value>;

	callbacks: Asynchronous.Callback_Object<Initial_Iterable_Value, unknown, unknown[], unknown>[];

	state: { paused: boolean; resumed: boolean };

	iterator:
		| IterableIterator<Shared.Yielded_Data<Initial_Iterable_Value>>
		| AsyncGenerator<Shared.Yielded_Data<Initial_Iterable_Value>, void, unknown>;

	/**
	 * Instantiates new instance of `Iterator_Cascade_Callbacks` from `iterable` input
	 * @param {unknown} iterable - Currently may be an array, object, generator, or iterator type
	 */
	constructor(iterable: unknown) {
		this.done = false;
		this.yielded_data = new Yielded_Data({
			content: undefined as unknown as Initial_Iterable_Value,
			index_or_key: NaN,
		});
		this.callbacks = [];
		this.state = {
			paused: false,
			resumed: false,
		};

		if (Array.isArray(iterable)) {
			/**
			 * iterable: [ 9, 8, 7 ]
			 */
			this.iterator = Iterator_From.array(iterable);
		} else if (iterable instanceof GeneratorFunction) {
			/**
			 * iterable: function* () { for (let value of [6, 5, 4]) { yield value; } }
			 */
			this.iterator = Iterator_From.generator(
				(iterable as Shared.Generator_Function_Instance<Initial_Iterable_Value>)()
			);
		} else if (iterable instanceof AsyncGeneratorFunction) {
			/**
			 * iterable: async function* () { for (let value of [6, 5, 4]) { yield value; } }
			 */
			this.iterator = Iterator_From.asyncGenerator(
				iterable as AsyncIterable<Initial_Iterable_Value>
			);
		} else if (typeof iterable === 'object') {
			if (
				typeof (iterable as AsyncGenerator<unknown, void, unknown>)[Symbol.asyncIterator] ===
				'function'
			) {
				/**
				 * iterable: new class { [Symbol.asyncIterator]() { return this; } }
				 * iterable: (async function* () { for (let value of [6, 5, 4]) { yield value; } })()
				 */
				this.iterator = Iterator_From.asyncGenerator(
					(iterable as AsyncGenerator<Initial_Iterable_Value>)[Symbol.asyncIterator]()
				);
			} else if (
				typeof (iterable as Generator<Initial_Iterable_Value, void, unknown>)[Symbol.iterator] ===
				'function'
			) {
				/**
				 * iterable: new class { [Symbol.iterable]() { return this; } }
				 * iterable: (function* () { for (let value of [6, 5, 4]) { yield value; } })()
				 */
				this.iterator = Iterator_From.generator(
					(iterable as Generator<Initial_Iterable_Value, void, unknown>)[Symbol.iterator]()
				);
			} else {
				/**
				 * iterable: { key: 'value', spam: 'flavored' }
				 */
				this.iterator = Iterator_From.object(iterable as Shared.Dictionary<Initial_Iterable_Value>);
			}
		}
		/**
		 * @TODO: Investigate following files
		 * - ./__tests__/tests-iterator-cascade-callbacks-asynchronously_constructor.ts
		 * > Iterator_Cascade_Callbacks.constructor -> Uninitialized classes with [Symbol.asyncIterator] defined supported?
		 *
		 * - ./lib/runtime-types.ts
		 * > AsyncGeneratorClass
		 */
		// else if (iterable instanceof AsyncGeneratorClass) {
		// 	/**
		// 	 * iterable: new class { [Symbol.asyncIterator]() { return this; } }
		// 	 */
		// 		this.iterator = Iterator_From.asyncGenerator(
		// 			new (iterable as any)()
		// 		);
		// }
		else if (
			typeof (iterable as Generator<Initial_Iterable_Value, void, unknown>)[Symbol.iterator] ===
			'function'
		) {
			/**
			 * iterable: 'abcdefg'
			 */
			this.iterator = Iterator_From.generator(
				(iterable as Generator<Initial_Iterable_Value, void, unknown>)[Symbol.iterator]()
			);
		} else {
			throw new TypeError(`Unsuported type of iterable -> ${typeof iterable}`);
		}

		/* https://stackoverflow.com/questions/34517538/setting-an-es6-class-getter-to-enumerable */
		for (const [key, descriptor] of Object.entries(
			Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this))
		)) {
			if (typeof descriptor.get === 'function') {
				descriptor.enumerable = true;
				Object.defineProperty(this, key, descriptor);
			}
		}
	}

	/**
	 * Returns new instance of `Iterator_Cascade_Callbacks` that yields lists of either `Yielded_Tuple` or `undefined` results
	 * @param {unknown[]} iterables - List of Generators, Iterators, and/or instances of `Iterator_Cascade_Callbacks`
	 * @notes
	 * - Parameters that are not an instance of `Iterator_Cascade_Callbacks` will be converted
	 * - Iteration will continue until **all** iterables result in `done` value of `true`
	 * @example - Equal Length Iterables
	 * const icca_one = new Asynchronous.Iterator_Cascade_Callbacks([1, 2, 3]);
	 * const icca_two = new Asynchronous.Iterator_Cascade_Callbacks([4, 5, 6]);
	 *
	 * const icca_zip = Iterator_Cascade_Callbacks.zip(icca_one, icca_two);
	 *
	 * (async () => {
	 *   for await (let values of icca_zip) {
	 *     console.log('values ->', values);
	 *   }
	 *   //> values -> [ 1, 4 ]
	 *   //> values -> [ 2, 5 ]
	 *   //> values -> [ 3, 6 ]
	 * })();
	 *
	 * @example - Unequal Length Iterables
	 * const icca_three = new Asynchronous.Iterator_Cascade_Callbacks([7, 8, 9]);
	 * const icca_four = new Asynchronous.Iterator_Cascade_Callbacks([10, 11]);
	 *
	 * const icca_zip = Iterator_Cascade_Callbacks.zip(icca_three, icca_four);
	 *
	 * (async () => {
	 *   for await (let values of icca_zip) {
	 *     console.log('values ->', values);
	 *   }
	 *   //> values -> [ 7, 10 ]
	 *   //> values -> [ 8, 11 ]
	 *   //> values -> [ 9, undefined ]
	 * })();
	 */
	static zip(...iterables: unknown[]): Iterator_Cascade_Callbacks {
		return new this(Wrappers.zip(iterables, this));
	}

	/***/
	get value() {
		return this.yielded_data.content;
	}

	/**
	 * Collects results from `this` to either an Array or Object
	 * @param {unknown[]|Object|unknown} target - When target is Array values are pushed, when target is Object key value pares are assigned, callback is required for other types
	 * @param {Collect_To_Function?|number?} callback_or_amount - Callback function for collecting to custom type, or number to limit collection to
	 * @param {number?} amount - Limit collection to no more than amount
	 * @return {Promise<unknown[]|Object|unknown>}
	 * @throws {TypeError}
	 * @this {Iterator_Cascade_Callbacks}
	 */
	async collect(
		/* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents */
		target: unknown[] | Shared.Dictionary | unknown,
		callback_or_amount?:
			| Asynchronous.Collect_To_Function
			| Synchronous.Collect_To_Function
			| number,
		amount?: number
		/* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents */
	): Promise<unknown[] | Shared.Dictionary | undefined | unknown> {
		if (typeof callback_or_amount === 'function') {
			return await this.collectToFunction(target, callback_or_amount, amount);
		} else if (Array.isArray(target)) {
			return await this.collectToArray(target, callback_or_amount as number);
		} else if (typeof target === 'object') {
			return this.collectToObject(target as Shared.Dictionary, callback_or_amount as number);
		} else {
			throw new TypeError(`Unsuported type for collect target -> ${typeof target}`);
		}
	}

	/**
	 * Collects results from `this.next()` to an Array
	 * @param {unknown[]} target - Array to push collected values to
	 * @param {number?} amount - Limit collection to no more than amount
	 * @return {Promise<unknown[]>}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([5, 6, 7, 8, 9]);
	 *
	 * (async () => {
	 *   const collection = await icca.filter((value) => {
	 *     return value % 2 === 0;
	 *   }).collectToArray([1, 2, 3]);
	 *
	 *   console.log(collection);
	 *   //> [ 1, 2, 3, 6, 8 ]
	 * })();
	 */
	async collectToArray(target: unknown[], amount?: number): Promise<unknown[]> {
		let count = 0;
		for await (const value of this) {
			target.push(value);
			count++;
			if (count >= (amount as number)) {
				break;
			}
		}
		return target;
	}

	/**
	 * Collects results from `this.next()` to a callback function target
	 * @param {unknown} target - Any object or primitive, will be passed to `callback` function along with `value` and `index_or_key`
	 * @param {Function} callback - Custom callback function for collecting iterated values
	 * @param {number?} amount - Limit collection to no more than amount
	 * @return {Promise<unknown>} target - The object that callback function has mutated
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
	 *
	 * const map = new Map();
	 *
	 * (async () => {
	 *   const collection = await icca.collectToFunction(map, (target, value, index_or_key) => {
	 *     target.set(index_or_key, value);
	 *   });
	 *
	 *   console.log(collection);
	 *   //> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
	 * })();
	 */
	async collectToFunction(
		target: unknown,
		callback: Asynchronous.Collect_To_Function,
		amount?: number
	): Promise<unknown> {
		let count = 0;
		for await (const value of this) {
			await callback(target, value, this.yielded_data.index_or_key, this);
			count++;
			if (count >= (amount as number)) {
				break;
			}
		}
		return target;
	}

	/**
	 * Collects results from `this.next()` to an Object
	 * @param {Object} target - Dictionary like object to assign key value pares to
	 * @param {number?} amount - Limit collection to no more than amount
	 * @return {Promise<Object>}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
	 *
	 * (async () => {
	 *   const collection = await icca.collectToObject({});
	 *
	 *   console.log(collection);
	 *   //> { spam: 'flavored', canned: 'ham' }
	 * })();
	 */
	async collectToObject(target: Shared.Dictionary, amount?: number): Promise<Shared.Dictionary> {
		let count = 0;
		for await (const value of this) {
			/**
			 * @dev we can ignore `error TS2538` because `.next()` behavior breaks
			 * when inner iterator reports `{ done: true }` _should_ protect us from
			 * `Shared.Yielded_Data['index_or_key']` ever being undefined
			 */
			/* @ts-expect-error: Type 'undefined' cannot be used as an index type. */
			target[this.yielded_data.index_or_key] = value;
			count++;
			if (count >= (amount as number)) {
				break;
			}
		}
		return target;
	}

	/**
	 * Returns new instance of `Iterator_Cascade_Callbacks` with copy of callbacks
	 * @param {unknown} iterable - Any compatible iterable object, iterator, or generator
	 * @return {Iterator_Cascade_Callbacks}
	 * @this {Iterator_Cascade_Callbacks}
	 * @notes
	 * - New instance will share references to callback wrapper functions
	 * @example
	 * const iterable_one = [1, 2, 3, 4, 5];
	 * const iterable_two = [9, 8, 7, 6, 5];
	 *
	 * const icca_one = new Asynchronous.Iterator_Cascade_Callbacks(iterable_one);
	 *
	 * icca_one.filter((value) => {
	 *   return value % 2 === 0;
	 * }).map((evens) => {
	 *   return evens / 2;
	 * });
	 *
	 * const icca_two = icc_one.copyCallbacksOnto(iterable_two);
	 *
	 * (async () => {
	 *   console.log('Collection One ->', await icca_one.collect([]));
	 *   //> [ 1, 2 ]
	 *   console.log('Collection Two ->', await icca_two.collect([]));
	 *   //> [ 4, 3 ]
	 * })();
	 */
	copyCallbacksOnto(iterable: unknown): Iterator_Cascade_Callbacks {
		const icca = new (this.constructor as Iterator_Cascade_Callbacks__Static)(iterable);

		icca.callbacks = this.callbacks.map((callback_object) => {
			return new Callback_Object({
				/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
				wrapper: callback_object.wrapper,
				name: callback_object.name,
				callback: callback_object.callback,
				parameters: callback_object.parameters,
			});
		});

		return icca;
	}

	/**
	 * Sets `this.value` to `Yielded_Entry` which contains `[this.yielded_data.index_or_key, this.yielded_data.content]`
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = await icca
	 *     .entries()
	 *     .filter(([index, value]) => {
	 *       return (value - index) % 3 === 0;
	 *     })
	 *     .collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ [ 0, 9 ], [ 3, 6 ] ]
	 * })();
	 */
	entries<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(): this {
		return this.pushCallbackWrapper<Value, Result, Parameters, Key>({
			wrapper: Wrappers.entries as Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>,
			name: 'entries',
			/* eslint-disable-next-line @typescript-eslint/unbound-method */
			callback: this.#noOpCallback,
			parameters: this.#noOpParameters as unknown as Parameters,
		});
	}

	/**
	 * Sets `this.value` if callback function returns _truthy_, else consumes `this.iterator` and recomputes value for callback to test
	 * @param {Asynchronous.Callback_Function} callback - Function that determines truth of `value` and/or `index_or_key` for each iteration
	 * @param {...unknown[]} parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = icca
	 *     .filter((value) => {
	 *       return value % 2 === 0;
	 *     })
	 *     .collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ 8, 6 ]
	 * })();
	 */
	filter<
		Value = unknown,
		// Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(
		callback: Asynchronous.Callback_Function<Value, boolean, Parameters, Key>,
		...parameters: Parameters
	): this {
		return this.pushCallbackWrapper<Value, boolean, Parameters, Key>({
			wrapper: Wrappers.filter as Asynchronous.Callback_Wrapper<Value, boolean, Parameters, Key>,
			name: 'filter',
			callback,
			parameters,
		});
	}

	/**
	 * Executes callback for each iteration
	 * @param {Asynchronous.Callback_Function} callback - Function that generally does not mutate `value` or `index_or_key` for `Iterator_Cascade_Callbacks` instance
	 * @param {...unknown[]} parameters - List of arguments that are passed to callback on each iteration
	 * @notes
	 * - If mutation of `value` or `index_or_key` are desired then `map` is a better option
	 * - No protections are in place to prevent mutation of `value` or `index_or_key` Objects
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = await icca
	 *     .forEach((value) => {
	 *       console.log(value);
	 *     })
	 *     .collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ 9, 8, 7, 6, 5 ]
	 * })();
	 */
	forEach<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(
		callback: Asynchronous.Callback_Function<Value, Result, Parameters, Key>,
		...parameters: Parameters
	): this {
		return this.pushCallbackWrapper<Value, Result, Parameters, Key>({
			wrapper: Wrappers.forEach as Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>,
			name: 'forEach',
			callback,
			parameters,
		});
	}

	/**
	 * Useful for debugging and inspecting iteration state
	 * @param {Asynchronous.Callback_Function} callback - Function that logs something about each iteration
	 * @param {...unknown[]} parameters - List of arguments that are passed to callback on each iteration
	 * @example
	 * function inspector(
	 *   value,
	 *   index_or_key,
	 *   { callback_object, iterator_cascade_callbacks },
	 *   ...parameters
	 * ) {
	 *   console.log('value ->', value);
	 *   console.log('index_or_key ->', index_or_key);
	 *   console.log('callback_object ->', callback_object);
	 *   console.log('iterator_cascade_callbacks ->', iterator_cascade_callbacks);
	 * }
	 *
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = await icca
	 *     .filter((value) => {
	 *       return value % 2 === 0;
	 *     })
	 *     .inspect(inspector)
	 *     .map((even) => {
	 *       return even / 2;
	 *     })
	 *     .inspect(inspector)
	 *     .collect([]);
	 * })();
	 */
	inspect<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(
		callback: Asynchronous.Callback_Function<Value, Result, Parameters, Key>,
		...parameters: Parameters
	): this {
		return this.pushCallbackWrapper<Value, Result, Parameters, Key>({
			wrapper: Wrappers.inspect as Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>,
			name: 'inspect',
			callback,
			parameters,
		});
	}

	/**
	 * Stops iteration when limit is reached
	 * @param {number} amount - Max number of values to compute
	 * @return {this}
	 * @throws {Stop_Iteration}
	 * @this {Iterator_Cascade_Callbacks}
	 * @notes
	 * - Useful when iterating over data of indeterminate, or infinite, length
	 * - More predictable if ordered at the end of `this.callbacks` list
	 * - Callbacks exist when `amount` is reached will be called prior to throwing `Stop_Iteration`
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);
	 *
	 * (async () => {
	 *   const collection = await icca.limit(2).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [1, 2]
	 * })();
	 */
	limit<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(amount: number): this {
		return this.pushCallbackWrapper<Value, Result, [number, ...Parameters[]], Key>({
			wrapper: Wrappers.limit as Asynchronous.Callback_Wrapper<
				Value,
				Result,
				[number, ...Parameters[]],
				Key
			>,
			name: 'limit',
			/* eslint-disable-next-line @typescript-eslint/unbound-method */
			callback: this.#noOpCallback,
			parameters: [amount],
		});
	}

	/**
	 * Applies `callback` to modify `value` and/or `index_or_key` for each iteration
	 * @param {Asynchronous.Callback_Function} callback - Function may modify `value` and/or `index_or_key`
	 * @param {...unknown[]} parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @notes
	 * - If callback does **not** return `Yielded_Data` (array), then results from callback are used as `value` and initial `index_or_key` is reused
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = await icca
	 *     .filter((value) => {
	 *       return value % 2 === 0;
	 *     })
	 *     .map((value) => {
	 *       return value / 2;
	 *     })
	 *     .collect([]);
	 *
	 *   console.log(collection);
	 *   //> [4, 3]
	 * })();
	 */
	map<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(
		callback: Asynchronous.Callback_Function<Value, Result, Parameters, Key>,
		...parameters: Parameters
	): this {
		return this.pushCallbackWrapper<Value, Result, Parameters, Key>({
			wrapper: Wrappers.map as Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>,
			name: 'map',
			callback,
			parameters,
		});
	}

	/**
	 * Updates `this.value` from chaining `this.callbacks` list, and `this.done` from `this.iterator.next()`
	 * @return {Promise<this>}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);
	 *
	 * (async () => {
	 *   for await (let value of icca) {
	 *     console.log('value ->', value);
	 *   }
	 *   //> value -> 1
	 *   //> value -> 2
	 *   //> value -> 3
	 *   //> value -> 4
	 * })();
	 */
	async next(): Promise<this> {
		if (this.state.paused) {
			this.done = false;
			this.state.paused = false;
			this.state.resumed = true;
			return this;
		}

		const yielded_result = (await this.iterator.next()) as IteratorResult<
			Shared.Yielded_Data,
			undefined
		>;
		this.done = Boolean(yielded_result.done);
		this.yielded_data.content = yielded_result.value?.content as Initial_Iterable_Value;
		this.yielded_data.index_or_key = yielded_result.value?.index_or_key;

		if (!this.done) {
			for (const callback_object of this.callbacks) {
				try {
					await callback_object.call(this);
				} catch (error) {
					if (error instanceof Stop_Iteration) {
						this.done = true;
						this.yielded_data.content = undefined as unknown as Initial_Iterable_Value;
						return this;
					} else if (error instanceof Pause_Iteration) {
						this.done = true;
						this.state.paused = true;
						this.state.resumed = false;
						return this;
					}
					throw error;
				}
			}
		}

		return this;
	}

	/**
	 * Returns, and removes, last `Callback_Object` from `this.callbacks` list
	 * @return {Asynchronous.Callback_Object}
	 * @this {Iterator_Cascade_Callbacks}
	 */
	popCallbackObject():
		| Asynchronous.Callback_Object<unknown, unknown, unknown[], unknown>
		| undefined {
		return this.callbacks.pop();
	}

	/**
	 * Removes last `Callback_Object` from `this.callbacks` list and returns `Callback_Wrapper` function
	 * @return {Asynchronous.Callback_Wrapper?}
	 * @this {Iterator_Cascade_Callbacks}
	 */
	popCallbackWrapper():
		| Asynchronous.Callback_Wrapper<unknown, unknown, unknown[], unknown>
		| undefined {
		const callback_object = this.popCallbackObject();
		if (callback_object !== undefined) {
			return callback_object.wrapper as Asynchronous.Callback_Wrapper<
				unknown,
				unknown,
				unknown[],
				unknown
			>;
		}
	}

	/**
	 * Instantiates `Callback_Object` with callback_wrapper and pushes to `this.callbacks` via `this.pushCallbackObject`
	 * @param {Object} o
	 * @param {Asynchronous.Callback_Wrapper} o.wrapper - Wrapper for callback function that parses inputs and outputs
	 * @param {string} o.name - Callback wrapper name
	 * @param {Asynchronous.Callback_Function} callback - Generic callback function for parsing and/or mutating iterator data
	 * @param {...unknown[]} o.parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 */
	pushCallbackWrapper<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(o: {
		wrapper: Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>;
		name: string;
		callback:
			| Asynchronous.Callback_Function<Value, Result, Parameters, Key>
			| Synchronous.Callback_Function;
		// | Synchronous.Callback_Function<Value, Result, Parameters, Key>;
		parameters: Parameters;
	}): this {
		const callback_object = new Callback_Object(o);
		this.callbacks.push(
			/* @TODO: Figure out how to correct, or convince TypeScript the type hints are correct */
			/* @ts-expect-error: Argument of type 'Callback_Object<Value, Result, Parameters, Key>' is not assignable to parameter of type 'Callback_Object<unknown, unknown, unknown[], unknown>'. */
			callback_object as Asynchronous.Callback_Object<Value, Result, Parameters, Key>
		);
		return this;
	}

	/**
	 * Skip number of iterations
	 * @param {number} amount - Number of iterations to skip past
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);
	 *
	 * (async () => {
	 *   const collection = await icca.skip(2).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ 2, 3, 4, 5 ]
	 * })();
	 */
	skip<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(amount: number): this {
		return this.pushCallbackWrapper<Value, Result, [number, ...Parameters[]], Key>({
			wrapper: Wrappers.skip as Asynchronous.Callback_Wrapper<
				Value,
				Result,
				[number, ...Parameters[]],
				Key
			>,
			name: 'skip',
			/* eslint-disable-next-line @typescript-eslint/unbound-method */
			callback: this.#noOpCallback,
			parameters: [amount],
		});
	}

	/**
	 * Step over every _n_ iterations
	 * @param {number} amount - Number of iterations to step over
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);
	 *
	 * (async () => {
	 *   const collection = await icca.step(1).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ 1, 3, 5 ]
	 * })();
	 */
	step<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(amount: number): this {
		return this.pushCallbackWrapper<Value, Result, [number, ...Parameters[]], Key>({
			wrapper: Wrappers.step as Asynchronous.Callback_Wrapper<
				Value,
				Result,
				[number, ...Parameters[]],
				Key
			>,
			name: 'step',
			/* eslint-disable-next-line @typescript-eslint/unbound-method */
			callback: this.#noOpCallback,
			parameters: [amount],
		});
	}

	/**
	 * Pauses/breaks iteration when limit is reached
	 * @param {number} amount - Number of values to compute before pausing
	 * @return {this}
	 * @throws {Pause_Iteration}
	 * @this {Iterator_Cascade_Callbacks}
	 * @notes
	 * - If immediately collecting to an object, consider using `collect()` method instead
	 * @example
	 * const icca = new Asynchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);
	 *
	 * icca.take(2);
	 *
	 * (async () => {
	 *   const collection_one = await icca.collect([]);
	 *   console.log(collection_one);
	 *   //> [ 1, 2 ]
	 *
	 *   const collection_two = await icca.collect([]);
	 *   console.log(collection_two);
	 *   //> [ 3, 4 ]
	 * })();
	 */
	take<
		Value = unknown,
		Result = unknown,
		Parameters extends unknown[] = unknown[],
		Key = Shared.Index_Or_Key
	>(amount: number): this {
		return this.pushCallbackWrapper<Value, Result, [number, ...Parameters[]], Key>({
			wrapper: Wrappers.take as Asynchronous.Callback_Wrapper<
				Value,
				Result,
				[number, ...Parameters[]],
				Key
			>,
			name: 'take',
			/* eslint-disable-next-line @typescript-eslint/unbound-method */
			callback: this.#noOpCallback,
			parameters: [amount],
		});
	}

	/**
	 * Cheep reusable function reference satisfies TypeScript, and `pushCallbackWrapper`, requirements
	 */
	#noOpCallback() {}

	/**
	 * Cheep reusable array reference satisfies TypeScript, and `pushCallbackWrapper`, requirements
	 */
	#noOpParameters = [];

	/**
	 * @see {link} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator
	 * @see {link} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols
	 */
	[Symbol.asyncIterator]() {
		return this;
	}
}

export { Iterator_Cascade_Callbacks };

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */

/**
 * Enable calling `new` and other non-instance methods
 */
export type Iterator_Cascade_Callbacks__Static = typeof Iterator_Cascade_Callbacks;
