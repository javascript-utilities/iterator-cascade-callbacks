// vim: noexpandtab

'use strict';

import type {
	Iterator_Cascade_Callbacks__Static,
	Iterator_Cascade_Callbacks,
} from './iterator-cascade-callbacks';

import type { Callback_Object } from './callback-object';

import { Stop_Iteration, Pause_Iteration } from '../lib/errors.js';
import { Yielded_Data } from '../lib/runtime-types.js';

/**
 * @file Callback wrappers and similar export functions for `Synchronous.Iterator_Cascade_Callbacks`
 * @author S0AndS0
 * @license AGPL-3.0
 */

/**
 * @param {any[]} iterables - Almost anything that implements `[Symbol.iterator]`
 * @param {Iterator_Cascade_Callbacks__Static} iterator_cascade_callbacks - Uninitialized class that is, or inherits from, `Iterator_Cascade_Callbacks`
 */
export function* zip(
	iterables: unknown[],
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks__Static
): IterableIterator<(Shared.Yielded_Data | undefined)[]> {
	const iterators = iterables.map((iterable) => {
		if (iterable instanceof iterator_cascade_callbacks) {
			return iterable;
		}
		return new iterator_cascade_callbacks(iterable);
	});

	while (true) {
		const results: Shared.Yielded_Result[] = [];
		for (const iterator of iterators) {
			results.push(iterator.next() as Shared.Yielded_Result);
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
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 */
export function entries(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	iterator_cascade_callbacks.yielded_data.content = [
		iterator_cascade_callbacks.yielded_data.index_or_key,
		iterator_cascade_callbacks.yielded_data.content,
	];
}

/**
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 */
export function filter(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	let results: boolean = callback_object.callback(
		iterator_cascade_callbacks.yielded_data.content,
		iterator_cascade_callbacks.yielded_data.index_or_key,
		{ iterator_cascade_callbacks, callback_object },
		...callback_object.parameters
	) as boolean;
	if (results) {
		return;
	}

	let next_data: IteratorResult<Shared.Yielded_Data, undefined> = {
		value: { content: undefined, index_or_key: NaN },
		done: false,
	};
	while (!results) {
		next_data = iterator_cascade_callbacks.iterator.next() as IteratorResult<
			Shared.Yielded_Data,
			undefined
		>;

		iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
		iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

		iterator_cascade_callbacks.done = Boolean(next_data.done);

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
				) as boolean;

				if (results) {
					return;
				}
				break;
			}

			callback_other.call(iterator_cascade_callbacks);

			/* @TODO: do we really need/want the following? */
			results = callback_object.callback(
				iterator_cascade_callbacks.yielded_data.content,
				iterator_cascade_callbacks.yielded_data.index_or_key,
				{ iterator_cascade_callbacks, callback_object },
				...callback_object.parameters
			) as boolean;
		}
	}
}

/**
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 */
export function forEach(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	callback_object.callback(
		iterator_cascade_callbacks.yielded_data.content,
		iterator_cascade_callbacks.yielded_data.index_or_key,
		{ callback_object, iterator_cascade_callbacks },
		...callback_object.parameters
	);
}

/**
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 */
export function inspect(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	callback_object.callback(
		iterator_cascade_callbacks.yielded_data.content,
		iterator_cascade_callbacks.yielded_data.index_or_key,
		{ callback_object, iterator_cascade_callbacks },
		...callback_object.parameters
	);
}

/**
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 * @note this expects `callback_object.parameters[0]` to contain the limit
 */
export function limit(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	if (isNaN(callback_object.storage.count as number)) {
		callback_object.storage.count = 0;
	}

	(callback_object.storage as Shared.Dictionary<number>).count++;

	if ((callback_object.storage as Shared.Dictionary<number>).count > (callback_object.parameters as [number, ...unknown[]])[0]) {
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
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 */
export function map(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	const results: unknown = callback_object.callback(
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
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 * @note this expects `callback_object.parameters[0]` to contain the limit
 */
export function skip(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	if (isNaN(callback_object.storage.count as number)) {
		callback_object.storage.count = 0;
	}

	let next_data: IteratorResult<Shared.Yielded_Data, undefined> = {
		value: { content: undefined, index_or_key: NaN },
		done: false,
	};
	while (
		(callback_object.storage as Shared.Dictionary<number>).count < (callback_object.parameters as [number, ...unknown[]])[0]
	) {
		next_data = iterator_cascade_callbacks.iterator.next() as IteratorResult<
			Shared.Yielded_Data,
			undefined
		>;

		iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
		iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

		iterator_cascade_callbacks.done = Boolean(next_data.done);

		if (iterator_cascade_callbacks.done) {
			throw new Stop_Iteration('this.skip says this.iterator is done');
		}

		for (const callback_other of iterator_cascade_callbacks.callbacks) {
			if (callback_other === callback_object) {
				(callback_object.storage as Shared.Dictionary<number>).count++;
				break;
			}
			callback_other.call(iterator_cascade_callbacks);
		}
	}
}

/**
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 * @note this expects `callback_object.parameters[0]` to contain the limit
 */
export function step(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	if (isNaN(callback_object.storage.count as number)) {
		callback_object.storage.count = 0;
	}

	let next_data: IteratorResult<Shared.Yielded_Data, undefined> = {
		value: { content: undefined, index_or_key: NaN },
		done: false,
	};
	while (
		(callback_object.storage as Shared.Dictionary<number>).count <
		(callback_object.parameters as [number, ...unknown[]])[0]
	) {
		next_data = iterator_cascade_callbacks.iterator.next() as IteratorResult<
			Shared.Yielded_Data,
			undefined
		>;

		iterator_cascade_callbacks.yielded_data.content = next_data.value?.content;
		iterator_cascade_callbacks.yielded_data.index_or_key = next_data.value?.index_or_key;

		iterator_cascade_callbacks.done = Boolean(next_data.done);

		if (iterator_cascade_callbacks.done) {
			throw new Stop_Iteration('this.step says this.iterator is done');
		}

		for (const callback_other of iterator_cascade_callbacks.callbacks) {
			if (callback_other === callback_object) {
				(callback_object.storage as Shared.Dictionary<number>).count++;
				break;
			}
			callback_other.call(iterator_cascade_callbacks);
		}
	}

	callback_object.storage.count = 0;
}

/**
 * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
 * @note this expects `callback_object.parameters[0]` to contain the limit
 */
export function take(
	callback_object: Callback_Object,
	iterator_cascade_callbacks: Iterator_Cascade_Callbacks
) {
	if (isNaN(callback_object.storage.count as number)) {
		callback_object.storage.count = 0;
		callback_object.storage.resumed = false;
	} else if (callback_object.storage.paused) {
		callback_object.storage.count = 1;
		callback_object.storage.paused = false;
		callback_object.storage.resumed = true;
	}
	(callback_object.storage as Shared.Dictionary<number>).count++;

	if (
		(callback_object.storage as Shared.Dictionary<number>).count >
		(callback_object.parameters as [number, ...unknown[]])[0]
	) {
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

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */
