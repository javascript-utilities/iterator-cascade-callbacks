'use strict';

import { Pause_Iteration, Stop_Iteration } from './errors.js';

/**
 * Namespace of callback wrappers and similar functions for `Iterator_Cascade_Callbacks`
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Wrappers_Synchronous {
	/**
	 * iterables - Almost anything that implements `[Symbol.iterator]`
	 * iterator_cascade_callbacks - Uninitialized class that is, or inherits from, `Iterator_Cascade_Callbacks`
	 */
	static *zip(
		iterables: any[],
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Static<ICC.Iterator_Cascade_Callbacks__Instance>
	): IterableIterator<(Shared.Yielded_Tuple | undefined)[]> {
		const iterators = iterables.map((iterable) => {
			if (iterable instanceof iterator_cascade_callbacks) {
				return iterable;
			}
			return new iterator_cascade_callbacks(iterable);
		});

		while (true) {
			const results: Shared.Yielded_Result[] = iterators.map((iterator) => {
				return iterator.next();
			});

			if (results.every(({ done }) => done === true)) {
				break;
			}

			const values = results.map(({ value }) => {
				return value;
			});

			yield values;
		}
	}

	/**
	 * iterables - Almost anything that implements `[Symbol.iterator]`
	 * iterator_cascade_callbacks - Uninitialized class that is, or inherits from, `Iterator_Cascade_Callbacks`
	 */
	static *zipValues(
		iterables: any[],
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Static<ICC.Iterator_Cascade_Callbacks__Instance>
	): IterableIterator<any[] | undefined> {
		const iterators = iterables.map((iterable) => {
			if (iterable instanceof iterator_cascade_callbacks) {
				return iterable;
			}
			return new iterator_cascade_callbacks(iterable);
		});

		while (true) {
			const results: Shared.Yielded_Result[] = iterators.map((iterator) => {
				return iterator.next();
			});

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
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 */
	static filter(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		const { parameters } = callback_object;

		let [value, index_or_key] = iterator_cascade_callbacks.value as Shared.Yielded_Tuple;

		let results = callback_object.callback(
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
			next_data = iterator_cascade_callbacks.iterator.next();
			iterator_cascade_callbacks.value = next_data.value;
			iterator_cascade_callbacks.done = next_data.done;
			if (iterator_cascade_callbacks.done) {
				throw new Stop_Iteration('this.filter says this.iterator is done');
			}

			const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
			for (const callback_other of iterate_callbacks) {
				if (callback_other === callback_object) {
					[value, index_or_key] = iterator_cascade_callbacks.value;
					results = callback_object.callback(
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

				callback_other.call(iterator_cascade_callbacks);

				[value, index_or_key] = iterator_cascade_callbacks.value;

				results = callback_object.callback(
					value,
					index_or_key,
					{ iterator_cascade_callbacks, callback_object },
					...parameters
				);
			}
		}
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 */
	static forEach(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		const { parameters } = callback_object;
		const [value, index_or_key] = iterator_cascade_callbacks.value as Shared.Yielded_Tuple;
		callback_object.callback(
			value,
			index_or_key,
			{ callback_object, iterator_cascade_callbacks },
			...parameters
		);
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 */
	static inspect(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		const { parameters } = callback_object;
		const [value, index_or_key] = iterator_cascade_callbacks.value as Shared.Yielded_Tuple;
		callback_object.callback(
			value,
			index_or_key,
			{ callback_object, iterator_cascade_callbacks },
			...parameters
		);
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @note this expects `callback_object.parameters[0]` to contain the limit
	 */
	static limit(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		if (isNaN(callback_object.storage.count)) {
			callback_object.storage.count = 0;
		}

		callback_object.storage.count++;

		if (callback_object.storage.count > callback_object.parameters[0]) {
			const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
			let found_self = false;
			for (const callback_other of iterate_callbacks) {
				if (found_self) {
					callback_other.call(iterator_cascade_callbacks);
				} else if (callback_other === callback_object) {
					/* istanbul ignore next */
					found_self = true;
				}
			}

			throw new Stop_Iteration('this.limit says amount has been reached');
		}
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 */
	static map(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		const { parameters } = callback_object;
		const [value, index_or_key] = iterator_cascade_callbacks.value as Shared.Yielded_Tuple;
		const results = callback_object.callback(
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
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @note this expects `callback_object.parameters[0]` to contain the limit
	 */
	static skip(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		if (isNaN(callback_object.storage.count)) {
			callback_object.storage.count = 0;
		}

		let next_data: { value: Shared.Yielded_Tuple; done: boolean } = {
			value: [undefined, NaN],
			done: false,
		};
		while (callback_object.storage.count < callback_object.parameters[0]) {
			next_data = iterator_cascade_callbacks.iterator.next();
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
				callback_other.call(iterator_cascade_callbacks);
			}
		}
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @note this expects `callback_object.parameters[0]` to contain the limit
	 */
	static step(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		if (isNaN(callback_object.storage.count)) {
			callback_object.storage.count = 0;
		}

		let next_data: { value: Shared.Yielded_Tuple; done: boolean } = {
			value: [undefined, NaN],
			done: false,
		};
		while (callback_object.storage.count < callback_object.parameters[0]) {
			next_data = iterator_cascade_callbacks.iterator.next();
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
				callback_other.call(iterator_cascade_callbacks);
			}
		}

		callback_object.storage.count = 0;
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 * @note this expects `callback_object.parameters[0]` to contain the limit
	 */
	static take(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		if (isNaN(callback_object.storage.count)) {
			callback_object.storage.count = 0;
			callback_object.storage.resumed = false;
		} else if (callback_object.storage.paused) {
			callback_object.storage.count = 1;
			callback_object.storage.paused = false;
			callback_object.storage.resumed = true;
		}
		callback_object.storage.count++;

		if (callback_object.storage.count > callback_object.parameters[0]) {
			const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
			let found_self = false;
			for (const callback_other of iterate_callbacks) {
				if (found_self) {
					callback_other.call(iterator_cascade_callbacks);
				} else if (callback_other === callback_object) {
					found_self = true;
				}
			}

			callback_object.storage.paused = true;
			throw new Pause_Iteration('this.take says amount has been reached');
		}
	}
}

/* istanbul ignore next */
if (typeof module !== 'undefined') {
	exports = module.exports = {
		Wrappers_Synchronous,
	};
}

export { Wrappers_Synchronous };
