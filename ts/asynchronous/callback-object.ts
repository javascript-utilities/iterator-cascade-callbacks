// vim: noexpandtab

'use strict';

import type { Asynchronous, Shared } from '../../@types/iterator-cascade-callbacks/';

import type { Iterator_Cascade_Callbacks } from './iterator-cascade-callbacks';

/**
 * Classy object for storing wrapper function state between iterations
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Callback_Object<
	Value = unknown,
	Result = unknown,
	Parameters extends unknown[] = unknown[],
	Key = Shared.Index_Or_Key
> {
	wrapper: Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>;

	name: string;

	callback: Asynchronous.Callback_Function<Value, Result, Parameters, Key>;

	parameters: Parameters;

	storage: Shared.Dictionary;

	/**
	 * Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list
	 * @param {Object} o - Labeled parameters
	 * @param {Asynchronous.Callback_Wrapper} o.wrapper - Function wrapper that handles input/output between `Callback_Function` and `Iterator_Cascade_Callbacks`
	 * @param {string} o.name - Method name that instantiated callback, eg. `filter`
	 * @param {Asynchronous.Callback_Function} o.callback - Function that executes for each iteration of `Iterator_Cascade_Callbacks`
	 * @param {unknown[]} o.parameters - Array of arguments that are passed to callback on each iteration
	 */
	constructor({
		wrapper,
		name,
		callback,
		parameters,
	}: {
		wrapper: Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>;
		name: string;
		callback: Asynchronous.Callback_Function<Value, Result, Parameters, Key>;
		parameters: Parameters;
	}) {
		this.wrapper = wrapper;
		this.callback = callback;
		this.storage = {};
		this.name = name;
		if (Array.isArray(parameters)) {
			this.parameters = parameters;
		} else {
			this.parameters = [] as unknown as Parameters;
		}
	}

	/**
	 * Calls `this.wrapper` function with reference to this `Callback_Object` and `Iterator_Cascade_Callbacks`
	 * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Reference to `Iterator_Cascade_Callbacks` instance
	 * @this {Callback_Object}
	 */
	async call(iterator_cascade_callbacks: Iterator_Cascade_Callbacks) {
		await this.wrapper(this, iterator_cascade_callbacks);
	}
}

export { Callback_Object };
