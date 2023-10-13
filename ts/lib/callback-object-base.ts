// vim: noexpandtab

'use strict';

import type { Shared } from '../../@types/iterator-cascade-callbacks/';

/**
 * Classy object for storing wrapper function state between iterations
 * @author S0AndS0
 * @license AGPL-3.0
 */
export class Callback_Object_Base<Parameters extends unknown[] = unknown[]> {
	name: string;
	parameters: Parameters;
	storage: Shared.Dictionary;

	/**
	 * Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list
	 * @param {Object} options - Labeled parameters
	 * @param {string} options.name - Method name that instantiated callback, eg. `filter`
	 * @param {unknown[]} options.parameters - Array of arguments that are passed to callback on each iteration
	 */
	constructor(options: {
		name: string;
		parameters: Parameters;
	}) {
		this.storage = {};
		this.name = options.name;
		if (Array.isArray(options.parameters)) {
			this.parameters = options.parameters;
		} else {
			this.parameters = [] as unknown as Parameters;
		}
	}
}
