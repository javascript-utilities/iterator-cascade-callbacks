// vim: noexpandtab

'use strict';

import type { Synchronous, Shared } from '../../@types/iterator-cascade-callbacks/';

import type { Iterator_Cascade_Callbacks } from './iterator-cascade-callbacks';

import { Callback_Object_Base } from '../lib/callback-object-base';

/**
 * Classy object for storing wrapper function state between iterations
 * @author S0AndS0
 * @license AGPL-3.0
 */
export class Callback_Object<
	Value = unknown,
	Result = unknown,
	Parameters extends unknown[] = unknown[],
	Key = Shared.Index_Or_Key
> extends Callback_Object_Base<Parameters> {
	wrapper: Synchronous.Callback_Wrapper<Value, Result, Parameters, Key>;
	callback: Synchronous.Callback_Function<Value, Result, Parameters, Key>;

	/**
	 * Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list
	 * @param {Object} options - Labeled parameters
	 * @param {string} options.name - Method name that instantiated callback, eg. `"filter"` or `"map"`
	 * @param {unknown[]} options.parameters - Array of arguments that are passed to callback on each iteration
	 * @param {Synchronous.Callback_Function} options.callback - Function that executes for each iteration of `Synchronous.Iterator_Cascade_Callbacks`
	 * @param {Synchronous.Callback_Wrapper} options.wrapper - Function wrapper that handles input/output between `Synchronous.Callback_Function` and `Synchronous.Iterator_Cascade_Callbacks`
	 * @see {@link Callback_Object_Base#constructor} for `name` and `parameters`
	 */
	constructor(options: {
		name: string;
		parameters: Parameters;
		callback: Synchronous.Callback_Function<Value, Result, Parameters, Key>;
		wrapper: Synchronous.Callback_Wrapper<Value, Result, Parameters, Key>;
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
	call(iterator_cascade_callbacks: Iterator_Cascade_Callbacks) {
		this.wrapper(this, iterator_cascade_callbacks);
	}
}
