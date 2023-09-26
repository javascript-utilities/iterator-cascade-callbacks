// vim: noexpandtab

'use strict';

/**
 * Classy object for storing wrapper function state between iterations
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Callback_Object implements Callback_Object {
	/**
	 * Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list
	 * @param {Callback_Wrapper} callback_wrapper - Function wrapper that handles input/output between `Callback_Function` and `Iterator_Cascade_Callbacks`
	 * @param {string} name - Method name that instantiated callback, eg. `filter`
	 * @param {any[]} parameters - Array of arguments that are passed to callback on each iteration
	 */
	constructor({
		wrapper,
		name,
		callback,
		parameters,
	}: {
		wrapper: ICC.Callback_Wrapper;
		name: string;
		callback: ICC.Callback_Function;
		parameters: any[];
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
	 * @param {ICC.Iterator_Cascade_Callbacks__Instance} iterator_cascade_callbacks - Reference to `Iterator_Cascade_Callbacks` instance
	 * @this {Callback_Object}
	 */
	call(iterator_cascade_callbacks: ICC.Iterator_Cascade_Callbacks__Instance) {
		this.wrapper(this, iterator_cascade_callbacks);
	}
}

/**
 * Classy object for storing wrapper function state between iterations
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Callback_Object_Asynchronously implements Callback_Object_Asynchronously {
	/**
	 * Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list
	 * @param {Callback_Wrapper} callback_wrapper - Function wrapper that handles input/output between `Callback_Function` and `Iterator_Cascade_Callbacks`
	 * @param {string} name - Method name that instantiated callback, eg. `filter`
	 * @param {any[]} parameters - Array of arguments that are passed to callback on each iteration
	 */
	constructor({
		wrapper,
		name,
		callback,
		parameters,
	}: {
		wrapper: ICCA.Callback_Wrapper;
		name: string;
		callback: ICCA.Callback_Function;
		parameters: any[];
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
	 * @param {ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance} iterator_cascade_callbacks - Reference to `Iterator_Cascade_Callbacks` instance
	 * @this {Callback_Object}
	 */
	async call(iterator_cascade_callbacks: ICCA.Iterator_Cascade_Callbacks_Asynchronously__Instance) {
		await this.wrapper(this, iterator_cascade_callbacks);
	}
}

/* istanbul ignore next */
if (typeof module !== 'undefined') {
	exports = module.exports = {
		Callback_Object,
		Callback_Object_Asynchronously,
	};
}

export { Callback_Object, Callback_Object_Asynchronously };

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */

/**
 * Classy object for storing wrapper function state between iterations
 * @property {Callback_Wrapper} wrapper - Wrapper for callback function that parses inputs and outputs
 * @property {Dictionary} storage - Generic dictionary like object
 * @property {string} name - Method name that instantiated callback, eg. `filter`
 * @property {any[]} parameters - List of arguments that are passed to callback on each iteration
 * @typedef {Callback_Object}
 */
interface Callback_Object extends ICC.Callback_Object {}

/**
 * Classy object for storing wrapper function state between iterations
 * @property {Callback_Wrapper} wrapper - Wrapper for callback function that parses inputs and outputs
 * @property {Dictionary} storage - Generic dictionary like object
 * @property {string} name - Method name that instantiated callback, eg. `filter`
 * @property {any[]} parameters - List of arguments that are passed to callback on each iteration
 * @typedef {Callback_Object}
 */
interface Callback_Object_Asynchronously extends ICCA.Callback_Object_Asynchronously {}
