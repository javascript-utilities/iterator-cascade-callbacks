// vim: noexpandtab

'use strict';

import { Pause_Iteration, Stop_Iteration } from './errors.js';
import { Yielded_Data } from './runtime-types.js';

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
	): IterableIterator<(Shared.Yielded_Data | undefined)[]> {
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
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 */
	static entries(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		iterator_cascade_callbacks.yielded_data.content = [
			iterator_cascade_callbacks.yielded_data.index_or_key,
			iterator_cascade_callbacks.yielded_data.content,
		]
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
	 */
	static filter(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		let results = callback_object.callback(
			iterator_cascade_callbacks.yielded_data.content,
			iterator_cascade_callbacks.yielded_data.index_or_key,
			{ iterator_cascade_callbacks, callback_object },
			...callback_object.parameters
		);
		if (results) {
			return;
		}

		let next_data: { value: any; done: boolean } = {
			value: undefined,
			done: false,
		};
		while (!results) {
			next_data = iterator_cascade_callbacks.iterator.next();

			iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
			iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

			iterator_cascade_callbacks.done = next_data.done;

			if (iterator_cascade_callbacks.done) {
				throw new Stop_Iteration('this.filter says this.iterator is done');
			}

			for (const callback_other of iterator_cascade_callbacks.callbacks) {
				if (callback_other === callback_object) {
					results = callback_object.callback(
						iterator_cascade_callbacks.yielded_data.content,
						iterator_cascade_callbacks.yielded_data.index_or_key,
						{ iterator_cascade_callbacks, callback_object },
						...callback_object.parameters
					);

					if (results) {
						return;
					}
					break;
				}

				callback_other.call(iterator_cascade_callbacks);

				results = callback_object.callback(
					iterator_cascade_callbacks.yielded_data.content,
					iterator_cascade_callbacks.yielded_data.index_or_key,
					{ iterator_cascade_callbacks, callback_object },
					...callback_object.parameters
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
		callback_object.callback(
			iterator_cascade_callbacks.yielded_data.content,
			iterator_cascade_callbacks.yielded_data.index_or_key,
			{ callback_object, iterator_cascade_callbacks },
			...callback_object.parameters
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
		callback_object.callback(
			iterator_cascade_callbacks.yielded_data.content,
			iterator_cascade_callbacks.yielded_data.index_or_key,
			{ callback_object, iterator_cascade_callbacks },
			...callback_object.parameters
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
			let found_self = false;
			for (const callback_other of iterator_cascade_callbacks.callbacks) {
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
		const results = callback_object.callback(
			iterator_cascade_callbacks.yielded_data.content,
			iterator_cascade_callbacks.yielded_data.index_or_key,
			{ iterator_cascade_callbacks, callback_object },
			...callback_object.parameters
		);

		if (results instanceof Yielded_Data) {
			iterator_cascade_callbacks.yielded_data = results;
		} else {
			iterator_cascade_callbacks.yielded_data.content = results;
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

		let next_data: { value: any; done: boolean } = {
			value: undefined,
			done: false,
		};
		while (callback_object.storage.count < callback_object.parameters[0]) {
			next_data = iterator_cascade_callbacks.iterator.next();

			iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
			iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

			iterator_cascade_callbacks.done = next_data.done;

			if (iterator_cascade_callbacks.done) {
				throw new Stop_Iteration('this.skip says this.iterator is done');
			}

			for (const callback_other of iterator_cascade_callbacks.callbacks) {
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

		let next_data: { value: any; done: boolean } = {
			value: undefined,
			done: false,
		};
		while (callback_object.storage.count < callback_object.parameters[0]) {
			next_data = iterator_cascade_callbacks.iterator.next();

			iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
			iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

			iterator_cascade_callbacks.done = next_data.done;

			if (iterator_cascade_callbacks.done) {
				throw new Stop_Iteration('this.step says this.iterator is done');
			}

			for (const callback_other of iterator_cascade_callbacks.callbacks) {
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
			let found_self = false;
			for (const callback_other of iterator_cascade_callbacks.callbacks) {
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

/**
 * Namespace of callback wrappers and similar functions for `Iterator_Cascade_Callbacks`
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Wrappers_Asynchronous {
	/**
	 * iterables - Almost anything that implements `[Symbol.iterator]` or [Symbol.asyncIterator]
	 * iterator_cascade_callbacks_asynchronously - Uninitialized class that is, or inherits from, `Iterator_Cascade_Callbacks_Asynchronously`
	 */
	static async *zip(
		iterables: any[],
		iterator_cascade_callbacks_asynchronously: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Static<ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance>
	): AsyncGenerator<(Shared.Yielded_Data | undefined)[]> {
		const iterators = iterables.map((iterable) => {
			if (iterable instanceof iterator_cascade_callbacks_asynchronously) {
				return iterable;
			}
			return new iterator_cascade_callbacks_asynchronously(iterable);
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
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 */
	static entries(
		callback_object: ICC.Callback_Object,
		iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance
	) {
		iterator_cascade_callbacks.yielded_data.content = [
			iterator_cascade_callbacks.yielded_data.index_or_key,
			iterator_cascade_callbacks.yielded_data.content,
		]
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 */
	static async filter(
		callback_object: ICCA.Callback_Object_Asynchronously,
		iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance
	) {
		let results = await callback_object.callback(
			iterator_cascade_callbacks.yielded_data.content,
			iterator_cascade_callbacks.yielded_data.index_or_key,
			{ iterator_cascade_callbacks, callback_object },
			...callback_object.parameters
		);
		if (results) {
			return;
		}

		let next_data: { value: any; done: boolean } = {
			value: undefined,
			done: false,
		};
		while (!results) {
			next_data = await iterator_cascade_callbacks.iterator.next();

			iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
			iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

			iterator_cascade_callbacks.done = next_data.done;

			if (iterator_cascade_callbacks.done) {
				throw new Stop_Iteration('this.filter says this.iterator is done');
			}

			for (const callback_other of iterator_cascade_callbacks.callbacks) {
				if (callback_other === callback_object) {
					results = await callback_object.callback(
						iterator_cascade_callbacks.yielded_data.content,
						iterator_cascade_callbacks.yielded_data.index_or_key,
						{ iterator_cascade_callbacks, callback_object },
						...callback_object.parameters
					);
					if (results) {
						return;
					}
					break;
				}
				await callback_other.call(iterator_cascade_callbacks);
				results = await callback_object.callback(
					iterator_cascade_callbacks.yielded_data.content,
					iterator_cascade_callbacks.yielded_data.index_or_key,
					{ iterator_cascade_callbacks, callback_object },
					...callback_object.parameters
				);
			}
		}
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 */
	static async forEach(
		callback_object: ICCA.Callback_Object_Asynchronously,
		iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance
	) {
		await callback_object.callback(
			iterator_cascade_callbacks.yielded_data.content,
			iterator_cascade_callbacks.yielded_data.index_or_key,
			{ callback_object, iterator_cascade_callbacks },
			...callback_object.parameters
		);
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 */
	static async inspect(
		callback_object: ICCA.Callback_Object_Asynchronously,
		iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance
	) {
		await callback_object.callback(
			iterator_cascade_callbacks.yielded_data.content,
			iterator_cascade_callbacks.yielded_data.index_or_key,
			{ callback_object, iterator_cascade_callbacks },
			...callback_object.parameters
		);
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 * @note this expects `callback_object.parameters[0]` to contain the limit
	 */
	static async limit(
		callback_object: ICCA.Callback_Object_Asynchronously,
		iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance
	) {
		if (isNaN(callback_object.storage.count)) {
			callback_object.storage.count = 0;
		}

		callback_object.storage.count++;

		if (callback_object.storage.count > callback_object.parameters[0]) {
			let found_self = false;
			for (const callback_other of iterator_cascade_callbacks.callbacks) {
				if (found_self) {
					await callback_other.call(iterator_cascade_callbacks);
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
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 */
	static async map(
		callback_object: ICCA.Callback_Object_Asynchronously,
		iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance
	) {
		const results = await callback_object.callback(
			iterator_cascade_callbacks.yielded_data.content,
			iterator_cascade_callbacks.yielded_data.index_or_key,
			{ iterator_cascade_callbacks, callback_object },
			...callback_object.parameters
		);

		if (results instanceof Yielded_Data) {
			iterator_cascade_callbacks.yielded_data = results;
		} else {
			iterator_cascade_callbacks.yielded_data.content = results;
		}
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 * @note this expects `callback_object.parameters[0]` to contain the limit
	 */
	static async skip(
		callback_object: ICCA.Callback_Object_Asynchronously,
		iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance
	) {
		if (isNaN(callback_object.storage.count)) {
			callback_object.storage.count = 0;
		}

		let next_data: { value: any; done: boolean } = {
			value: undefined,
			done: false,
		};
		while (callback_object.storage.count < callback_object.parameters[0]) {
			next_data = await iterator_cascade_callbacks.iterator.next();

			iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
			iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

			iterator_cascade_callbacks.done = next_data.done;

			if (iterator_cascade_callbacks.done) {
				throw new Stop_Iteration('this.skip says this.iterator is done');
			}

			for (const callback_other of iterator_cascade_callbacks.callbacks) {
				if (callback_other === callback_object) {
					callback_object.storage.count++;
					break;
				}
				await callback_other.call(iterator_cascade_callbacks);
			}
		}
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 * @note this expects `callback_object.parameters[0]` to contain the limit
	 */
	static async step(
		callback_object: ICCA.Callback_Object_Asynchronously,
		iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance
	) {
		if (isNaN(callback_object.storage.count)) {
			callback_object.storage.count = 0;
		}

		let next_data: { value: any; done: boolean } = {
			value: undefined,
			done: false,
		};
		while (callback_object.storage.count < callback_object.parameters[0]) {
			next_data = await iterator_cascade_callbacks.iterator.next();

			iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
			iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

			iterator_cascade_callbacks.done = next_data.done;

			if (iterator_cascade_callbacks.done) {
				throw new Stop_Iteration('this.step says this.iterator is done');
			}

			for (const callback_other of iterator_cascade_callbacks.callbacks) {
				if (callback_other === callback_object) {
					callback_object.storage.count++;
					break;
				}
				await callback_other.call(iterator_cascade_callbacks);
			}
		}

		callback_object.storage.count = 0;
	}

	/**
	 * callback_object - Instance reference to `this` of `Callback_Object`
	 * iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks_Asynchronously`
	 * @note this expects `callback_object.parameters[0]` to contain the limit
	 */
	static async take(
		callback_object: ICCA.Callback_Object_Asynchronously,
		iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance
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
			let found_self = false;
			for (const callback_other of iterator_cascade_callbacks.callbacks) {
				if (found_self) {
					await callback_other.call(iterator_cascade_callbacks);
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
		Wrappers_Asynchronous,
		Wrappers_Synchronous,
	};
}

export { Wrappers_Asynchronous, Wrappers_Synchronous };
