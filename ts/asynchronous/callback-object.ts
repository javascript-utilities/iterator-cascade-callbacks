// vim: noexpandtab

'use strict';

import type { Asynchronous, Shared } from '../../@types/iterator-cascade-callbacks/';

import type { Iterator_Cascade_Callbacks } from './iterator-cascade-callbacks';

import { Callback_Object_Base } from '../lib/callback-object-base';

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
> extends Callback_Object_Base<Parameters> {
	wrapper: Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>;
	callback: Asynchronous.Callback_Function<Value, Result, Parameters, Key>;

	/**
	 * Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list
	 * @param {Object} options - Labeled parameters
	 * @param {string} options.name - Method name that instantiated callback, eg. `filter`
	 * @param {unknown[]} options.parameters - Array of arguments that are passed to callback on each iteration
	 * @param {Asynchronous.Callback_Function} options.callback - Function that executes for each iteration of `Iterator_Cascade_Callbacks`
	 * @param {Asynchronous.Callback_Wrapper} options.wrapper - Function wrapper that handles input/output between `Callback_Function` and `Iterator_Cascade_Callbacks`
	 * @see {@link Callback_Object_Base#constructor} for `name` and `parameters`
	 */
	constructor(options: {
		name: string;
		parameters: Parameters;
		callback: Asynchronous.Callback_Function<Value, Result, Parameters, Key>;
		wrapper: Asynchronous.Callback_Wrapper<Value, Result, Parameters, Key>;
	}) {
		super(options);
		this.callback = options.callback;
		this.wrapper = options.wrapper;
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
