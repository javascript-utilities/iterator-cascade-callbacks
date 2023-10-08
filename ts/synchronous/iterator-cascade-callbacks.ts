// vim: noexpandtab

'use strict';

import type { Synchronous } from '../../@types/iterator-cascade-callbacks/';

import { Stop_Iteration, Pause_Iteration } from '../lib/errors.js';
import * as Iterator_From from '../lib/iterator-from.js';
import { GeneratorFunction, Yielded_Data } from '../lib/runtime-types.js';

import * as Wrappers from './wrappers.js';

import { Callback_Object } from './callback-object.js';
import type { Callback_Object as Callback_Object__Instance } from './callback-object';

/**
 * Iterator that chains callback function execution
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Iterator_Cascade_Callbacks {
	done: boolean;

	yielded_data: Shared.Yielded_Data;

	callbacks: Callback_Object__Instance[];

	state: { paused: boolean; resumed: boolean };

	iterator: IterableIterator<Shared.Yielded_Data>;

	/**
	 * Instantiates new instance of `Iterator_Cascade_Callbacks` from `iterable` input
	 * @param {unknown} iterable - Currently may be an array, object, generator, or iterator type
	 */
	constructor(iterable: unknown) {
		this.done = false;
		this.yielded_data = new Yielded_Data({ content: undefined, index_or_key: NaN });
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
			this.iterator = Iterator_From.generator((iterable as Shared.Generator_Function_Instance)());
		} else if (typeof iterable === 'object') {
			// console.trace('Iterator_Cascade_Callbacks constructor detected Object', { iterable });
			if (typeof (iterable as Generator<unknown, void, unknown>)[Symbol.iterator] === 'function') {
				/**
				 * iterable: new class { [Symbol.iterable]() { return this; } }
				 * iterable: (function* () { for (let value of [6, 5, 4]) { yield value; } })()
				 */
				this.iterator = Iterator_From.generator(
					(iterable as Generator<unknown, void, unknown>)[Symbol.iterator]()
				);
			} else {
				/**
				 * iterable: { key: 'value', spam: 'flavored' }
				 */
				this.iterator = Iterator_From.object(iterable as Shared.Dictionary);
			}
		} else if (
			typeof (iterable as Generator<unknown, void, unknown>)[Symbol.iterator] === 'function'
		) {
			/**
			 * iterable: 'abcdefg'
			 */
			this.iterator = Iterator_From.generator(
				(iterable as Generator<unknown, void, unknown>)[Symbol.iterator]()
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
	 * Returns new instance of `Iterator_Cascade_Callbacks` that yields lists of values from each iteration
	 * @param {unknown[]} iterables - List of Generators, Iterators, and/or instances of `Iterator_Cascade_Callbacks`
	 * @notes
	 * - Parameters that are not an instance of `Iterator_Cascade_Callbacks` will be converted
	 * - Iteration will continue until **all** iterables result in `done` value of `true`
	 *
	 * @example - Equal Length Iterables
	 * const icc_one = new Synchronous.Iterator_Cascade_Callbacks([1, 2, 3]);
	 * const icc_two = new Synchronous.Iterator_Cascade_Callbacks([4, 5, 6]);
	 *
	 * const icc_zip = Iterator_Cascade_Callbacks.zip(icc_one, icc_two);
	 *
	 * for (let values of icc_zip) {
	 *   console.log('values ->', values);
	 * }
	 * //> values -> [ 1, 4 ]
	 * //> values -> [ 2, 5 ]
	 * //> values -> [ 3, 6 ]
	 *
	 * @example - Unequal Length Iterables
	 * const icc_three = new Synchronous.Iterator_Cascade_Callbacks([7, 8, 9]);
	 * const icc_four = new Synchronous.Iterator_Cascade_Callbacks([10, 11]);
	 *
	 * const icc_zip = Iterator_Cascade_Callbacks.zip(icc_three, icc_four);
	 *
	 * for (let values of icc_zip) {
	 *   console.log('values ->', values);
	 * }
	 * //> values -> [ 7, 10 ]
	 * //> values -> [ 8, 11 ]
	 * //> values -> [ 9, undefined ]
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
	 * @return {unknown[]|Object|unknown}
	 * @throws {TypeError}
	 * @this {Iterator_Cascade_Callbacks}
	 */
	collect(
		/* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents */
		target: unknown[] | Shared.Dictionary | unknown,
		callback_or_amount?: Synchronous.Collect_To_Function | number,
		amount?: number
		/* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents */
	): unknown[] | Shared.Dictionary | undefined | unknown {
		if (typeof callback_or_amount === 'function') {
			return this.collectToFunction(target, callback_or_amount, amount);
		} else if (Array.isArray(target)) {
			return this.collectToArray(target, callback_or_amount as number);
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
	 * @return {unknown[]}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([5, 6, 7, 8, 9]);
	 *
	 * const collection = icc
	 *   .filter((value) => {
	 *     return value % 2 === 0;
	 *   })
	 *   .collectToArray([1, 2, 3]);
	 *
	 * console.log(collection);
	 * //> [ 1, 2, 3, 6, 8 ]
	 */
	collectToArray(target: unknown[], amount?: number): unknown[] {
		let count = 0;
		for (const value of this) {
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
	 * @return {unknown} target - The object that callback function has mutated
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
	 *
	 * const map = new Map();
	 *
	 * const collection = icc.collectToFunction(map, (target, value, index_or_key) => {
	 *   target.set(index_or_key, value);
	 * });
	 *
	 * console.log(collection);
	 * //> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
	 */
	collectToFunction(
		target: unknown,
		callback: Synchronous.Collect_To_Function,
		amount?: number
	): unknown {
		let count = 0;
		for (const value of this) {
			callback(target, value, this.yielded_data.index_or_key, this);
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
	 * @return {Object}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
	 *
	 * const collection = icc.collectToObject({});
	 *
	 * console.log(collection);
	 * //> { spam: 'flavored', canned: 'ham' }
	 */
	collectToObject(target: Shared.Dictionary, amount?: number): Shared.Dictionary {
		let count = 0;
		for (const value of this) {
			/**
			 * @dev we can ignore `error TS2538` because above `for` loop behavior to
			 * break when an iterator reports `{ done: true }` _should_ protect us
			 * from `Shared.Yielded_Data['index_or_key']` from ever being undefined
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
	 * @notes
	 * - New instance will share references to callback wrapper functions
	 * @example
	 * const iterable_one = [1, 2, 3, 4, 5];
	 * const iterable_two = [9, 8, 7, 6, 5];
	 *
	 * const icc_one = new Synchronous.Iterator_Cascade_Callbacks(iterable_one)
	 *   .filter((value) => {
	 *     return value % 2 === 0;
	 *   })
	 *   .map((evens) => {
	 *     return evens / 2;
	 *   });
	 *
	 * const icc_two = icc_one.copyCallbacksOnto(iterable_two);
	 *
	 * console.log('Collection One ->', icc_one.collect([]));
	 * //> [ 1, 2 ]
	 * console.log('Collection Two ->', icc_two.collect([]));
	 * //> [ 4, 3 ]
	 */
	copyCallbacksOnto(iterable: unknown): Iterator_Cascade_Callbacks {
		const icc = new (this.constructor as Iterator_Cascade_Callbacks__Static)(iterable);

		icc.callbacks = this.callbacks.map((callback_object) => {
			return new Callback_Object({
				wrapper: callback_object.wrapper,
				name: callback_object.name,
				callback: callback_object.callback,
				parameters: callback_object.parameters,
			});
		});

		return icc;
	}

	/**
	 * Sets `this.value` to `Yielded_Entry` which contains `[this.yielded_data.index_or_key, this.yielded_data.content]`
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * const collection = icc.entries().filter(([index, value]) => {
	 *   return (value - index) % 3 === 0;
	 * }).collect([]);
	 *
	 * console.log(collection);
	 * //> [ [ 0, 9 ], [ 3, 6 ] ]
	 */
	entries(): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.entries,
			name: 'entries',
			/* eslint-disable-next-line @typescript-eslint/unbound-method */
			callback: this.#noOpCallback,
			parameters: this.#noOpParameters,
		});
	}

	/**
	 * Sets `this.value` if callback function returns _truthy_, else consumes `this.iterator` and recomputes value for callback to test
	 * @param {Callback_Function} callback - Function that determines truth of `value` and/or `index_or_key` for each iteration
	 * @param {...unknown[]} parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * const collection = icc
	 *   .filter((value) => {
	 *     return value % 2 === 0;
	 *   })
	 *   .collect([]);
	 *
	 * console.log(collection);
	 * //> [ 8, 6 ]
	 */
	filter(
		callback: Synchronous.Callback_Function,
		...parameters: unknown[]
	): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.filter,
			name: 'filter',
			callback,
			parameters,
		});
	}

	/**
	 * Executes callback for each iteration
	 * @param {Callback_Function} callback - Function that generally does not mutate `value` or `index_or_key` for `Iterator_Cascade_Callbacks` instance
	 * @param {...unknown[]} parameters - List of arguments that are passed to callback on each iteration
	 * @notes
	 * - If mutation of `value` or `index_or_key` are desired then `map` is a better option
	 * - No protections are in place to prevent mutation of `value` or `index_or_key` Objects
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * const collection = icc
	 *   .forEach((value) => {
	 *     console.log(value);
	 *   })
	 *   .collect([]);
	 *
	 * console.log(collection);
	 * //> [ 9, 8, 7, 6, 5 ]
	 */
	forEach(
		callback: Synchronous.Callback_Function,
		...parameters: unknown[]
	): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.forEach,
			name: 'forEach',
			callback,
			parameters,
		});
	}

	/**
	 * Useful for debugging and inspecting iteration state
	 * @param {Callback_Function} callback - Function that logs something about each iteration
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
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * const collection = icc
	 *   .filter((value) => {
	 *     return value % 2 === 0;
	 *   })
	 *   .inspect(inspector)
	 *   .map((even) => {
	 *     return even / 2;
	 *   })
	 *   .inspect(inspector)
	 *   .collect([]);
	 */
	inspect(
		callback: Synchronous.Callback_Function,
		...parameters: unknown[]
	): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.inspect,
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
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);
	 *
	 * const collection = icc.limit(2).collect([]);
	 *
	 * console.log(collection);
	 * //> [1, 2]
	 */
	limit(amount: number): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.limit,
			name: 'limit',
			/* eslint-disable-next-line @typescript-eslint/unbound-method */
			callback: this.#noOpCallback,
			parameters: [amount],
		});
	}

	/**
	 * Applies `callback` to modify `value` and/or `index_or_key` for each iteration
	 * @param {Callback_Function} callback - Function may modify `value` and/or `index_or_key`
	 * @param {...unknown[]} parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @notes
	 * - If callback does **not** return `Yielded_Tuple` (array), then results from callback are used as `value` and initial `index_or_key` is reused
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
	 *
	 * const collection = icc
	 *   .filter((value) => {
	 *     return value % 2 === 0;
	 *   })
	 *   .map((value) => {
	 *     return value / 2;
	 *   })
	 *   .collect([]);
	 *
	 * console.log(collection);
	 * //> [ 4, 3 ]
	 */
	map(
		callback: Synchronous.Callback_Function,
		...parameters: unknown[]
	): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.map,
			name: 'map',
			callback,
			parameters,
		});
	}

	/**
	 * Updates `this.value` from chaining `this.callbacks` list, and `this.done` from `this.iterator.next()`
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);
	 *
	 * for (let value of icc) {
	 *   console.log('value ->', value);
	 * }
	 * //> value -> 1
	 * //> value -> 2
	 * //> value -> 3
	 * //> value -> 4
	 */
	next(): Iterator_Cascade_Callbacks {
		if (this.state.paused) {
			this.done = false;
			this.state.paused = false;
			this.state.resumed = true;
			return this;
		}

		const yielded_result = this.iterator.next() as IteratorResult<Shared.Yielded_Data, undefined>;
		this.done = Boolean(yielded_result.done);
		this.yielded_data.content = yielded_result.value?.content;
		this.yielded_data.index_or_key = yielded_result.value?.index_or_key;

		if (!this.done) {
			for (const callback_object of this.callbacks) {
				try {
					callback_object.call(this);
				} catch (error) {
					if (error instanceof Stop_Iteration) {
						this.done = true;
						this.yielded_data.content = undefined;
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
	 * @return {Synchronous.Callback_Object__Instance?}
	 * @this {Iterator_Cascade_Callbacks}
	 */
	popCallbackObject(): Synchronous.Callback_Object__Instance | undefined {
		return this.callbacks.pop();
	}

	/**
	 * Removes last `Callback_Object` from `this.callbacks` list and returns `Callback_Wrapper` function
	 * @return {Callback_Wrapper?}
	 * @this {Iterator_Cascade_Callbacks}
	 */
	popCallbackWrapper(): Synchronous.Callback_Wrapper | undefined {
		const callback_object = this.popCallbackObject();
		if (callback_object !== undefined) {
			return callback_object.wrapper;
		}
	}

	/**
	 * Instantiates `Callback_Object` with callback_wrapper and pushes to `this.callbacks` via `this.pushCallbackObject`
	 * @param {Object} o
	 * @param {Synchronous.Callback_Wrapper} o.wrapper - Wrapper for callback function that parses inputs and outputs
	 * @param {string} o.name - Callback wrapper name
	 * @param {Synchronous.Callback_Function} callback - Generic callback function for parsing and/or mutating iterator data
	 * @param {...unknown[]} o.parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 */
	pushCallbackWrapper(o: {
		wrapper: Synchronous.Callback_Wrapper;
		name: string;
		callback: Synchronous.Callback_Function;
		parameters: unknown[];
	}): Iterator_Cascade_Callbacks {
		const callback_object = new Callback_Object(o);
		this.callbacks.push(callback_object);
		return this;
	}

	/**
	 * Skip number of iterations
	 * @param {number} amount - Number of iterations to skip past
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks}
	 * @example
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);
	 *
	 * const collection = icc.skip(2).collect([]);
	 *
	 * console.log(collection);
	 * //> [ 2, 3, 4, 5 ]
	 */
	skip(amount: number): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.skip,
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
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);
	 *
	 * const collection = icc.step(1).collect([]);
	 *
	 * console.log(collection);
	 * //> [ 1, 3, 5 ]
	 */
	step(amount: number): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.step,
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
	 * const icc = new Synchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);
	 *
	 * icc.take(2);
	 *
	 * const collection_one = icc.collect([]);
	 * console.log(collection_one);
	 * //> [ 1, 2 ]
	 *
	 * const collection_two = icc.collect([]);
	 * console.log(collection_two);
	 * //> [ 3, 4 ]
	 */
	take(amount: number): Iterator_Cascade_Callbacks {
		return this.pushCallbackWrapper({
			wrapper: Wrappers.take,
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

	[Symbol.iterator]() {
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