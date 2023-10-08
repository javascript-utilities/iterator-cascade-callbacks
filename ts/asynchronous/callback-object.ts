// vim: noexpandtab

'use strict';

import type { Asynchronous, Synchronous, Shared } from '../../@types/iterator-cascade-callbacks/';

import type { Iterator_Cascade_Callbacks as Iterator_Cascade_Callbacks__Instance } from './iterator-cascade-callbacks';

/**
 * Classy object for storing wrapper function state between iterations
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Callback_Object {
	/**
	 * @property {Asynchronous.Callback_Wrapper} wrapper - Wrapper for callback function that parses inputs and outputs
	 */
	wrapper: Asynchronous.Callback_Wrapper;

	/**
	 * @property {string} name - Method name that instantiated callback, eg. `filter`
	 */
	name: string;

	/**
	 * @property {Asynchronous.Callback_Wrapper|Synchronous.Callback_Function} callback - Asynchronous callback wrapper Function to call
	 */
	callback: Asynchronous.Callback_Function | Synchronous.Callback_Function;

	/**
	 * @property {any[]} parameters - List of arguments that are passed to callback on each iteration
	 */
	parameters: unknown[];

	/**
	 * @property {Shared.Dictionary} storage - Generic dictionary like object
	 */
	storage: Shared.Dictionary;

	/**
	 * Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list
	 * @param {Object} o - Labeled parameters
	 * @param {Asynchronous.Callback_Wrapper} o.wrapper - Function wrapper that handles input/output between `Callback_Function` and `Iterator_Cascade_Callbacks`
	 * @param {string} o.name - Method name that instantiated callback, eg. `filter`
	 * @param {Asynchronous.Callback_Function} o.callback - Function that executes for each iteration of `Iterator_Cascade_Callbacks`
	 * @param {any[]} o.parameters - Array of arguments that are passed to callback on each iteration
	 */
	constructor({
		wrapper,
		name,
		callback,
		parameters,
	}: {
		wrapper: Asynchronous.Callback_Wrapper;
		name: string;
		callback: Asynchronous.Callback_Function;
		parameters: unknown[];
	}) {
		this.wrapper = wrapper;
		this.callback = callback;
		this.storage = {};
		this.name = name;
		if (Array.isArray(parameters)) {
			this.parameters = parameters;
		} else {
			this.parameters = [];
		}
	}

	/**
	 * Calls `this.wrapper` function with reference to this `Callback_Object` and `Iterator_Cascade_Callbacks`
	 * @param {Iterator_Cascade_Callbacks__Instance} iterator_cascade_callbacks - Reference to `Iterator_Cascade_Callbacks` instance
	 * @this {Callback_Object}
	 */
	async call(iterator_cascade_callbacks: Iterator_Cascade_Callbacks__Instance) {
		await this.wrapper(this, iterator_cascade_callbacks);
	}
}

export { Callback_Object };

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */

/**
 * Enable calling `new` and other non-instance methods
 */
export type Callback_Object__Static = typeof Callback_Object;
