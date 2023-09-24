'use strict';

import { Callback_Object_Asynchronously } from './lib/callback-objects';
import { Stop_Iteration, Pause_Iteration } from './lib/errors';
import { Iterator_From } from './lib/iterator-from';
import {
	GeneratorFunction,
	AsyncGeneratorFunction,
	AsyncGeneratorClass,
	Static_Contract,
} from './lib/runtime-types';

/**
 * Asynchronous Iterator that chains callback function execution
 * @author S0AndS0
 * @license AGPL-3.0
 * @see {link} https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#async-iteration
 */
@Static_Contract<
	ICCA.Iterator_Cascade_Callbacks_Asynchronously__Static<Iterator_Cascade_Callbacks_Asynchronously>
>()
class Iterator_Cascade_Callbacks_Asynchronously
	implements Iterator_Cascade_Callbacks_Asynchronously
{
	/**
	 * Instantiates new instance of `Iterator_Cascade_Callbacks_Asynchronously` from `iterable` input
	 * @param {any} iterable - Currently may be an array, object, generator, or iterator type
	 */
	constructor(iterable: any) {
		this.done = false;
		this.value = [undefined, NaN];
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
		} else if (iterable instanceof AsyncGeneratorFunction) {
			/**
			 * iterable: async function* () { for (let value of [6, 5, 4]) { yield value; } }
			 */
			this.iterator = Iterator_From.asyncGenerator(iterable as AsyncIterable<unknown>);
		} else if (typeof iterable === 'object') {
			if (
				typeof (iterable as AsyncGenerator<unknown, any, unknown>)[Symbol.asyncIterator] ===
				'function'
			) {
				/**
				 * iterable: new class { [Symbol.asyncIterator]() { return this; } }
				 * iterable: (async function* () { for (let value of [6, 5, 4]) { yield value; } })()
				 */
				this.iterator = Iterator_From.asyncGenerator(
					(iterable as AsyncGenerator<unknown>)[Symbol.asyncIterator]()
				);
			} else if (
				typeof (iterable as Generator<unknown, any, unknown>)[Symbol.iterator] === 'function'
			) {
				/**
				 * iterable: new class { [Symbol.iterable]() { return this; } }
				 * iterable: (function* () { for (let value of [6, 5, 4]) { yield value; } })()
				 */
				this.iterator = Iterator_From.generator(
					(iterable as Generator<unknown, any, unknown>)[Symbol.iterator]()
				);
			} else {
				/**
				 * iterable: { key: 'value', spam: 'flavored' }
				 */
				this.iterator = Iterator_From.object(iterable);
			}
		}
		/**
		 * @TODO: Investigate following files
		 * - ./__tests__/tests-iterator-cascade-callbacks-asynchronously_constructor.ts
		 * > Iterator_Cascade_Callbacks_Asynchronously.constructor -> Uninitialized classes with [Symbol.asyncIterator] defined supported?
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
			typeof (iterable as Generator<unknown, any, unknown>)[Symbol.iterator] === 'function'
		) {
			/**
			 * iterable: 'abcdefg'
			 */
			this.iterator = Iterator_From.generator(
				(iterable as Generator<unknown, any, unknown>)[Symbol.iterator]()
			);
		} else {
			throw new TypeError(`Unsuported type of iterable -> ${typeof iterable}`);
		}
	}

	/**
	 * Returns new instance of `Iterator_Cascade_Callbacks_Asynchronously` that yields lists of either `Yielded_Tuple` or `undefined` results
	 * @param {any[]} iterables - List of Generators, Iterators, and/or instances of `Iterator_Cascade_Callbacks_Asynchronously`
	 * @notes
	 * - Parameters that are not an instance of `Iterator_Cascade_Callbacks_Asynchronously` will be converted
	 * - Iteration will continue until **all** iterables result in `done` value of `true`
	 * @example - Equal Length Iterables
	 * const icca_one = new Iterator_Cascade_Callbacks_Asynchronously([1, 2, 3]);
	 * const icca_two = new Iterator_Cascade_Callbacks_Asynchronously([4, 5, 6]);
	 *
	 * const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zip(icca_one, icca_two);
	 *
	 * (async () => {
	 *   for await (let [results, count] of icca_zip) {
	 *     console.log('results ->', results, '| count ->', count);
	 *   }
	 *   //> results -> [ [ 1, 0 ], [ 4, 0 ] ] | count -> 0
	 *   //> results -> [ [ 2, 1 ], [ 5, 1 ] ] | count -> 1
	 *   //> results -> [ [ 3, 2 ], [ 6, 2 ] ] | count -> 2
	 * })();
	 *
	 * @example - Unequal Length Iterables
	 * const icca_three = new Iterator_Cascade_Callbacks_Asynchronously([7, 8, 9]);
	 * const icca_four = new Iterator_Cascade_Callbacks_Asynchronously([10, 11]);
	 *
	 * const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zip(icca_three, icca_four);
	 *
	 * (async () => {
	 *   for (let [results, count] of icca_zip) {
	 *     console.log('results ->', results, '| count ->', count);
	 *   }
	 *   //> results -> [ [ 9, 0 ], [ 10, 0 ] ] | count -> 2
	 *   //> results -> [ [ 8, 1 ], [ 11, 1 ] ] | count -> 1
	 *   //> results -> [ [ 7, 2 ], undefined ] | count -> 0
	 * })();
	 */
	static zip(...iterables: any[]): Iterator_Cascade_Callbacks_Asynchronously {
		const zip_wrapper = async function* (
			iterables: any[],
			iterator_cascade_callbacks: InstanceType<any>
		): AsyncGenerator<(Shared.Yielded_Tuple | undefined)[]> {
			const iterators = iterables.map((iterable) => {
				if (iterable instanceof iterator_cascade_callbacks) {
					return iterable;
				}
				return new iterator_cascade_callbacks(iterable);
			});

			while (true) {
				let results = [];
				for (const iterator of iterators) {
					results.push(await iterator.next());
				}

				if (results.every(({ done }) => done === true)) {
					break;
				}

				const values = results.map(({ value }) => {
					return value;
				});

				yield values;
			}
		};

		return new this(zip_wrapper(iterables, this));
	}

	/*
	 * Returns new instance of `Iterator_Cascade_Callbacks_Asynchronously` that yields either list of values from iterators or `undefined` results
	 * @param {any[]} iterables - List of Generators, Iterators, and/or instances of `Iterator_Cascade_Callbacks_Asynchronously`
	 * @notes
	 * - Parameters that are not an instance of `Iterator_Cascade_Callbacks_Asynchronously` will be converted
	 * - Iteration will continue until **all** iterables result in `done` value of `true`
	 * @example - Equal Length Iterables
	 * const icca_one = new Iterator_Cascade_Callbacks_Asynchronously([1, 2, 3]);
	 * const icca_two = new Iterator_Cascade_Callbacks_Asynchronously([4, 5, 6]);
	 *
	 * const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zip(icca_one, icca_two);
	 *
	 * for (let [results, count] of icca_zip) {
	 *   console.log('results ->', results, '| count ->', count);
	 * }
	 * //> results -> [ 1, 4 ] | count -> 0
	 * //> results -> [ 2, 5 ] | count -> 1
	 * //> results -> [ 3, 6 ] | count -> 2
	 * @example - Unequal Length Iterables
	 * const icca_three = new Iterator_Cascade_Callbacks_Asynchronously([7, 8, 9]);
	 * const icca_four = new Iterator_Cascade_Callbacks_Asynchronously([10, 11]);
	 *
	 * const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zip(icca_three, icca_four);
	 *
	 * for (let [results, count] of icca_zip) {
	 *   console.log('results ->', results, '| count ->', count);
	 * }
	 * //> results -> [ 9, 10 ] | count -> 2
	 * //> results -> [ 8, 11 ] | count -> 1
	 * //> results -> [ 7, undefined ] | count -> 0
	 */
	static zipValues(...iterables: any[]): Iterator_Cascade_Callbacks_Asynchronously {
		const zip_values_wrapper = async function* (
			iterables: any[],
			iterator_cascade_callbacks: InstanceType<any>
		): AsyncGenerator<any[] | undefined> {
			const iterators = iterables.map((iterable) => {
				if (iterable instanceof iterator_cascade_callbacks) {
					return iterable;
				}
				return new iterator_cascade_callbacks(iterable);
			});

			while (true) {
				let results = [];
				for (const iterator of iterators) {
					results.push(await iterator.next());
				}

				if (results.every(({ done }) => done === true)) {
					break;
				}

				const values = results.map(({ value }) => {
					if (Array.isArray(value)) {
						return value[0];
					}
					return value;
				});

				yield values;
			}
		};

		return new this(zip_values_wrapper(iterables, this));
	}

	/**
	 * Converts list of `this.callbacks` objects to `GeneratorFunction`
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @yields {Callback_Object}
	 */
	*iterateCallbackObjects(): IterableIterator<ICCA.Callback_Object_Asynchronously> {
		for (const callback of this.callbacks) {
			yield callback;
		}
	}

	/**
	 * Collects results from `this` to either an Array or Object
	 * @param {any[]|Object|any} target - When target is Array values are pushed, when target is Object key value pares are assigned, callback is required for other types
	 * @param {Collect_To_Function?|number?} callback_or_amount - Callback function for collecting to custom type, or number to limit collection to
	 * @param {number?} amount - Limit collection to no more than amount
	 * @return {any[]|Object|any}
	 * @throws {TypeError}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 */
	async collect(
		target: any[] | Shared.Dictionary | any,
		callback_or_amount?: ICCA.Collect_To_Function | number,
		amount?: number
	): Promise<any[] | Shared.Dictionary | undefined> {
		if (typeof callback_or_amount === 'function') {
			return await this.collectToFunction(target, callback_or_amount, amount);
		} else if (Array.isArray(target)) {
			return await this.collectToArray(target, callback_or_amount as number);
		} else if (typeof target === 'object') {
			return await this.collectToObject(target, callback_or_amount as number);
		} else {
			throw new TypeError(`Unsuported type for collect target -> ${typeof target}`);
		}
	}

	/**
	 * Collects results from `this.next()` to an Array
	 * @param {any[]} target - Array to push collected values to
	 * @param {number?} amount - Limit collection to no more than amount
	 * @return {Promise<any[]>}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([5, 6, 7, 8, 9]);
	 *
	 * (async () => {
	 *   const collection = icca.filter((value) => {
	 *     return value % 2 === 0;
	 *   }).collectToArray([1, 2, 3]);
	 *
	 *   console.log(collection);
	 *   //> [ 1, 2, 3, 6, 8 ]
	 * })();
	 */
	async collectToArray(target: any[], amount?: number): Promise<any[]> {
		let count = 0;
		for await (const results of this) {
			const [value, index] = results as Shared.Yielded_Tuple;
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
	 * @param {any} target - Any object or primitive, will be passed to `callback` function along with `value` and `index_or_key`
	 * @param {Function} callback - Custom callback function for collecting iterated values
	 * @param {number?} amount - Limit collection to no more than amount
	 * @return {Promise<any>} target - The object that callback function has mutated
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously({ spam: 'flavored', canned: 'ham' });
	 *
	 * const map = new Map();
	 *
	 * (async () => {
	 *   const collection = icca.collectToFunction(map, (target, value, index_or_key) => {
	 *     target.set(index_or_key, value);
	 *   });
	 *
	 *   console.log(collection);
	 *   //> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
	 * })();
	 */
	async collectToFunction(
		target: any,
		callback: ICCA.Collect_To_Function,
		amount?: number
	): Promise<any> {
		let count = 0;
		for await (const results of this) {
			const [value, index_or_key] = results as Shared.Yielded_Tuple;
			await callback(target, value, index_or_key, this);
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
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously({ spam: 'flavored', canned: 'ham' });
	 *
	 * (async () => {
	 *   const collection = icca.collectToObject({});
	 *
	 *   console.log(collection);
	 *   //> { spam: 'flavored', canned: 'ham' }
	 * })();
	 */
	async collectToObject(target: Shared.Dictionary, amount?: number): Promise<Shared.Dictionary> {
		let count = 0;
		for await (const results of this) {
			const [value, key] = results as Shared.Yielded_Tuple;
			target[key] = value;
			count++;
			if (count >= (amount as number)) {
				break;
			}
		}
		return target;
	}

	/**
	 * Returns new instance of `Iterator_Cascade_Callbacks_Asynchronously` with copy of callbacks
	 * @param {any} iterable - Any compatible iterable object, iterator, or generator
	 * @return {Iterator_Cascade_Callbacks_Asynchronously}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @notes
	 * - New instance will share references to callback wrapper functions
	 * @example
	 * const iterable_one = [1, 2, 3, 4, 5];
	 * const iterable_two = [9, 8, 7, 6, 5];
	 *
	 * const icca_one = new Iterator_Cascade_Callbacks_Asynchronously(iterable_one);
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
	 *   console.log('Collection One ->', icca_one.collect([]));
	 *   //> [ 1, 2 ]
	 *   console.log('Collection Two ->', icca_two.collect([]));
	 *   //> [ 4, 3 ]
	 * })();
	 */
	copyCallbacksOnto(iterable: any): Iterator_Cascade_Callbacks_Asynchronously {
		const icca = new this.constructor(iterable);

		icca.callbacks = this.callbacks.map((callback_object) => {
			const callback_wrapper = callback_object.wrapper;
			return new Callback_Object_Asynchronously(
				callback_wrapper,
				callback_object.name,
				callback_object.parameters
			);
		});

		return icca;
	}

	/**
	 * Sets `this.value` if callback function returns _truthy_, else consumes `this.iterator` and recomputes value for callback to test
	 * @param {ICCA.Callback_Function} callback - Function that determines truth of `value` and/or `index_or_key` for each iteration
	 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = icca.filter((value) => {
	 *     return value % 2 === 0;
	 *   }).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ 8, 6 ]
	 * })();
	 */
	filter(
		callback: ICCA.Callback_Function,
		...parameters: any[]
	): Iterator_Cascade_Callbacks_Asynchronously {
		/**
		 * @function filter_wrapper
		 * @type {Callback_Wrapper}
		 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
		 * @param {Iterator_Cascade_Callbacks_Asynchronously} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
		 */
		const filter_wrapper: ICCA.Callback_Wrapper = async (
			callback_object,
			iterator_cascade_callbacks
		) => {
			const { parameters } = callback_object;
			let [value, index_or_key] = iterator_cascade_callbacks.value as Shared.Yielded_Tuple;
			let results = await callback(
				value,
				index_or_key,
				{ iterator_cascade_callbacks, callback_object },
				...parameters
			);
			if (results) {
				return;
			}

			let next_data: { value: Shared.Yielded_Tuple; done: boolean } = {
				value: [undefined, NaN],
				done: false,
			};
			while (!results) {
				next_data = await iterator_cascade_callbacks.iterator.next();
				iterator_cascade_callbacks.value = next_data.value;
				iterator_cascade_callbacks.done = next_data.done;
				if (iterator_cascade_callbacks.done) {
					throw new Stop_Iteration('this.filter says this.iterator is done');
				}

				const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
				for (const callback_other of iterate_callbacks) {
					if (callback_other === callback_object) {
						[value, index_or_key] = iterator_cascade_callbacks.value;
						results = await callback(
							value,
							index_or_key,
							{ iterator_cascade_callbacks, callback_object },
							...parameters
						);
						if (results) {
							return;
						}
						break;
					}
					await callback_other.call(iterator_cascade_callbacks);
					[value, index_or_key] = iterator_cascade_callbacks.value;
					results = await callback(
						value,
						index_or_key,
						{ iterator_cascade_callbacks, callback_object },
						...parameters
					);
				}
			}
		};

		return this.pushCallbackWrapper(filter_wrapper, 'filter', ...parameters);
	}

	/**
	 * Executes callback for each iteration
	 * @param {ICCA.Callback_Function} callback - Function that generally does not mutate `value` or `index_or_key` for `Iterator_Cascade_Callbacks_Asynchronously` instance
	 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @notes
	 * - If mutation of `value` or `index_or_key` are desired then `map` is a better option
	 * - No protections are in place to prevent mutation of `value` or `index_or_key` Objects
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = await icca.forEach((value) => {
	 *     console.log(value);
	 *   }).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ 9, 8, 7, 6, 5 ]
	 * })();
	 */
	forEach(
		callback: ICCA.Callback_Function,
		...parameters: any[]
	): Iterator_Cascade_Callbacks_Asynchronously {
		/**
		 * @function for_each_wrapper
		 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
		 * @param {Iterator_Cascade_Callbacks_Asynchronously} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
		 */
		const for_each_wrapper: ICC.Callback_Wrapper = async (
			callback_object,
			iterator_cascade_callbacks
		) => {
			const { parameters } = callback_object;
			const [value, index_or_key] = iterator_cascade_callbacks.value as Shared.Yielded_Tuple;
			await callback(
				value,
				index_or_key,
				{ callback_object, iterator_cascade_callbacks },
				...parameters
			);
		};

		return this.pushCallbackWrapper(for_each_wrapper, 'forEach', ...parameters);
	}

	/**
	 * Useful for debugging and inspecting iteration state
	 * @param {ICCA.Callback_Function} callback - Function that logs something about each iteration
	 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @example
	 * function inspector(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...parameters) {
	 *   console.log('value ->', value);
	 *   console.log('index_or_key ->', index_or_key);
	 *   console.log('callback_object ->', callback_object);
	 *   console.log('iterator_cascade_callbacks ->', iterator_cascade_callbacks);
	 * }
	 *
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = icca.filter((value) => {
	 *     return value % 2 === 0;
	 *   }).inspect(inspector).map((even) => {
	 *     return even / 2;
	 *   }).inspect(inspector).collect([]);
	 * })();
	 */
	inspect(
		callback: ICCA.Callback_Function,
		...parameters: any[]
	): Iterator_Cascade_Callbacks_Asynchronously {
		const inspect_wrapper: ICC.Callback_Wrapper = async (
			callback_object,
			iterator_cascade_callbacks
		) => {
			const { parameters } = callback_object;
			const [value, index_or_key] = iterator_cascade_callbacks.value as Shared.Yielded_Tuple;
			await callback(
				value,
				index_or_key,
				{ callback_object, iterator_cascade_callbacks },
				...parameters
			);
		};

		return this.pushCallbackWrapper(inspect_wrapper, 'inspect', ...parameters);
	}

	/**
	 * Stops iteration when limit is reached
	 * @param {number} amount - Max number of values to compute
	 * @return {this}
	 * @throws {Stop_Iteration}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @notes
	 * - Useful when iterating over data of indeterminate, or infinite, length
	 * - More predictable if ordered at the end of `this.callbacks` list
	 * - Callbacks exist when `amount` is reached will be called prior to throwing `Stop_Iteration`
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([1, 2, 3, 4]);
	 *
	 * (async () => {
	 *   const collection = icca.limit(2).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [1, 2]
	 * })();
	 */
	limit(amount: number): Iterator_Cascade_Callbacks_Asynchronously {
		/**
		 * @function limit_wrapper
		 * @type {Callback_Wrapper}
		 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
		 * @param {Iterator_Cascade_Callbacks_Asynchronously} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
		 */
		const limit_wrapper: ICC.Callback_Wrapper = async (
			callback_object,
			iterator_cascade_callbacks
		) => {
			if (isNaN(callback_object.storage.count)) {
				callback_object.storage.count = 0;
			}

			callback_object.storage.count++;

			if (callback_object.storage.count > amount) {
				const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
				let found_self = false;
				for (const callback_other of iterate_callbacks) {
					if (found_self) {
						await callback_other.call(iterator_cascade_callbacks);
					} else if (callback_other === callback_object) {
						/* istanbul ignore next */
						found_self = true;
					}
				}

				throw new Stop_Iteration('this.limit says amount has been reached');
			}
		};

		return this.pushCallbackWrapper(limit_wrapper, 'limit');
	}

	/**
	 * Applies `callback` to modify `value` and/or `index_or_key` for each iteration
	 * @param {ICCA.Callback_Function} callback - Function may modify `value` and/or `index_or_key`
	 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @notes
	 * - If callback does **not** return `Yielded_Tuple` (array), then results from callback are used as `value` and initial `index_or_key` is reused
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([9, 8, 7, 6, 5]);
	 *
	 * (async () => {
	 *   const collection = icca.filter((value) => {
	 *     return value % 2 === 0;
	 *   }).map((value) => {
	 *     return value / 2;
	 *   }).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [4, 3]
	 * })();
	 */
	map(
		callback: ICCA.Callback_Function,
		...parameters: any[]
	): Iterator_Cascade_Callbacks_Asynchronously {
		/**
		 * @function map_wrapper
		 * @type {Callback_Wrapper}
		 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
		 * @param {Iterator_Cascade_Callbacks_Asynchronously} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
		 */
		const map_wrapper: ICC.Callback_Wrapper = async (
			callback_object,
			iterator_cascade_callbacks
		) => {
			const { parameters } = callback_object;
			const [value, index_or_key] = iterator_cascade_callbacks.value as Shared.Yielded_Tuple;
			const results = await callback(
				value,
				index_or_key,
				{ iterator_cascade_callbacks, callback_object },
				...parameters
			);
			if (Array.isArray(results) && results.length === 2) {
				iterator_cascade_callbacks.value = results as Shared.Yielded_Tuple;
			} else {
				iterator_cascade_callbacks.value = [results, index_or_key];
			}
		};

		return this.pushCallbackWrapper(map_wrapper, 'map', ...parameters);
	}

	/**
	 * Updates `this.value` from chaining `this.callbacks` list, and `this.done` from `this.iterator.next()`
	 * @return {Promise<this>}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([1, 2, 3, 4]);
	 *
	 * (async () => {
	 *   for await (let [value, index_or_key] of icca) {
	 *     console.log('index_or_key ->', index_or_key, 'value ->', value);
	 *   }
	 *   //> index_or_key -> 0 value -> 1
	 *   //> index_or_key -> 1 value -> 2
	 *   //> index_or_key -> 2 value -> 3
	 *   //> index_or_key -> 3 value -> 4
	 * })()
	 */
	async next(): Promise<Iterator_Cascade_Callbacks_Asynchronously> {
		if (this.state.paused) {
			this.done = false;
			this.state.paused = false;
			this.state.resumed = true;
			return this;
		}

		const yielded_result: Shared.Yielded_Result = await this.iterator.next();
		this.done = yielded_result.done;
		this.value = yielded_result.value;

		if (!this.done) {
			for (const callback_object of this.callbacks) {
				try {
					await callback_object.call(this);
				} catch (error) {
					if (error instanceof Stop_Iteration) {
						this.done = true;
						this.value = undefined;
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
	 * @return {Callback_Object?}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 */
	popCallbackObject(): ICCA.Callback_Object_Asynchronously | undefined {
		return this.callbacks.pop();
	}

	/**
	 * Removes last `Callback_Object` from `this.callbacks` list and returns `Callback_Wrapper` function
	 * @return {Callback_Wrapper?}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 */
	popCallbackWrapper(): ICCA.Callback_Wrapper | undefined {
		const callback_object = this.popCallbackObject();
		if (callback_object !== undefined) {
			return callback_object.wrapper;
		}
	}

	/**
	 * Instantiates `Callback_Object` with callback_wrapper and pushes to `this.callbacks` via `this.pushCallbackObject`
	 * @param {Callback_Wrapper} callback_wrapper - Wrapper for callback function that parses inputs and outputs
	 * @param {string} name - Callback wrapper name
	 * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 */
	pushCallbackWrapper(
		callback_wrapper: ICCA.Callback_Wrapper,
		name: string,
		...parameters: any[]
	): Iterator_Cascade_Callbacks_Asynchronously {
		const callback_object = new Callback_Object_Asynchronously(callback_wrapper, name, parameters);
		return this.pushCallbackObject(callback_object);
	}

	/**
	 * Pushes `Callback_Object` to `this.callbacks` then returns reference to instance of `Iterator_Cascade_Callbacks_Asynchronously`
	 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 */
	pushCallbackObject(
		callback_object: ICC.Callback_Object
	): Iterator_Cascade_Callbacks_Asynchronously {
		this.callbacks.push(callback_object);
		return this;
	}

	/**
	 * Skip number of iterations
	 * @param {number} amount - Number of iterations to skip past
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([0, 1, 2, 3, 4, 5]);
	 *
	 * (async () => {
	 *   const collection = icca.skip(2).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ 2, 3, 4, 5 ]
	 * })();
	 */
	skip(amount: number): Iterator_Cascade_Callbacks_Asynchronously {
		/**
		 * @function skip_wrapper
		 * @type {Callback_Wrapper}
		 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
		 * @param {Iterator_Cascade_Callbacks_Asynchronously} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
		 */
		const skip_wrapper: ICCA.Callback_Wrapper = async (
			callback_object,
			iterator_cascade_callbacks
		) => {
			if (isNaN(callback_object.storage.count)) {
				callback_object.storage.count = 0;
			}

			let next_data: { value: Shared.Yielded_Tuple; done: boolean } = {
				value: [undefined, NaN],
				done: false,
			};
			while (callback_object.storage.count < amount) {
				next_data = await iterator_cascade_callbacks.iterator.next();
				iterator_cascade_callbacks.value = next_data.value;
				iterator_cascade_callbacks.done = next_data.done;
				if (iterator_cascade_callbacks.done) {
					throw new Stop_Iteration('this.skip says this.iterator is done');
				}

				const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
				for (const callback_other of iterate_callbacks) {
					if (callback_other === callback_object) {
						callback_object.storage.count++;
						break;
					}
					await callback_other.call(iterator_cascade_callbacks);
				}
			}
		};

		return this.pushCallbackWrapper(skip_wrapper, 'skip');
	}

	/**
	 * Step over every _n_ iterations
	 * @param {number} amount - Number of iterations to step over
	 * @return {this}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([0, 1, 2, 3, 4, 5]);
	 *
	 * (async () => {
	 *   const collection = icca.step(1).collect([]);
	 *
	 *   console.log(collection);
	 *   //> [ 1, 3, 5 ]
	 * })();
	 */
	step(amount: number): Iterator_Cascade_Callbacks_Asynchronously {
		/**
		 * @function step_wrapper
		 * @type {ICCA.Callback_Wrapper}
		 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
		 * @param {Iterator_Cascade_Callbacks_Asynchronously} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
		 */
		const step_wrapper: ICCA.Callback_Wrapper = async (
			callback_object,
			iterator_cascade_callbacks
		) => {
			if (isNaN(callback_object.storage.count)) {
				callback_object.storage.count = 0;
			}

			let next_data: { value: Shared.Yielded_Tuple; done: boolean } = {
				value: [undefined, NaN],
				done: false,
			};
			while (callback_object.storage.count < amount) {
				next_data = await iterator_cascade_callbacks.iterator.next();
				iterator_cascade_callbacks.value = next_data.value;
				iterator_cascade_callbacks.done = next_data.done;
				if (iterator_cascade_callbacks.done) {
					throw new Stop_Iteration('this.skip says this.iterator is done');
				}

				const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
				for (const callback_other of iterate_callbacks) {
					if (callback_other === callback_object) {
						callback_object.storage.count++;
						break;
					}
					await callback_other.call(iterator_cascade_callbacks);
				}
			}

			callback_object.storage.count = 0;
		};

		return this.pushCallbackWrapper(step_wrapper, 'step');
	}

	/**
	 * Pauses/breaks iteration when limit is reached
	 * @param {number} amount - Number of values to compute before pausing
	 * @return {this}
	 * @throws {Pause_Iteration}
	 * @this {Iterator_Cascade_Callbacks_Asynchronously}
	 * @notes
	 * - If immediately collecting to an object, consider using `collect()` method instead
	 * @example
	 * const icca = new Iterator_Cascade_Callbacks_Asynchronously([1, 2, 3, 4]);
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
	take(amount: number): Iterator_Cascade_Callbacks_Asynchronously {
		/**
		 * @function take_wrapper
		 * @type {ICCA.Callback_Wrapper}
		 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
		 * @param {Iterator_Cascade_Callbacks_Asynchronously} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
		 */
		const take_wrapper: ICCA.Callback_Wrapper = async (
			callback_object,
			iterator_cascade_callbacks
		) => {
			if (isNaN(callback_object.storage.count)) {
				callback_object.storage.count = 0;
				callback_object.storage.resumed = false;
			} else if (callback_object.storage.paused) {
				callback_object.storage.count = 1;
				callback_object.storage.paused = false;
				callback_object.storage.resumed = true;
			}
			callback_object.storage.count++;

			if (callback_object.storage.count > amount) {
				const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
				let found_self = false;
				for (const callback_other of iterate_callbacks) {
					if (found_self) {
						await callback_other.call(iterator_cascade_callbacks);
					} else if (callback_other === callback_object) {
						found_self = true;
					}
				}

				callback_object.storage.paused = true;
				throw new Pause_Iteration('this.take says amount has been reached');
			}
		};

		return this.pushCallbackWrapper(take_wrapper, 'take');
	}

	/**
	 * @see {link} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator
	 * @see {link} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols
	 */
	[Symbol.asyncIterator]() {
		return this;
	}
}

interface Iterator_Cascade_Callbacks_Asynchronously
	extends ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance {
	constructor: typeof Iterator_Cascade_Callbacks_Asynchronously;
}

/* istanbul ignore next */
if (typeof module !== 'undefined') {
	exports = module.exports = {
		Iterator_Cascade_Callbacks_Asynchronously,
	};
}

export { Iterator_Cascade_Callbacks_Asynchronously };
