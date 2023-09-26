// vim: noexpandtab

'use strict';

/**
 * Custom error type to temporarily stop iteration prematurely
 */
class Pause_Iteration extends Error implements Pause_Iteration {
	/**
	 * Builds new instance of `Pause_Iteration` for throwing
	 * @param {string?} message - Error message to print
	 */
	constructor(message?: string) {
		super();
		this.name = 'Pause_Iteration';

		if (message) {
			this.message = message;
		} else {
			this.message = '';
		}
	}
}

/**
 * Custom error type to permanently stop iteration prematurely
 * @example
 * const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);
 *
 * const collection = icc.map((value, index_or_key) => {
 *   if (index_or_key > 2) {
 *     throw new Stop_Iteration('map says to stop at indexes greater than 2');
 *   }
 *   return value;
 * }).collect([]);
 *
 * console.log(collection);
 * //> [ 1, 2, 3 ]
 */
class Stop_Iteration extends Error implements Stop_Iteration {
	/**
	 * Builds new instance of `Stop_Iteration` for throwing
	 * @param {string?} message - Error message to print
	 */
	constructor(message?: string) {
		super();
		this.name = 'Stop_Iteration';

		if (message) {
			this.message = message;
		} else {
			this.message = '';
		}
	}
}

/* istanbul ignore next */
if (typeof module !== 'undefined') {
	exports = module.exports = {
		Pause_Iteration,
		Stop_Iteration,
	};
}

export { Pause_Iteration, Stop_Iteration };

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */

interface Pause_Iteration extends Errors.Pause_Iteration {}

interface Stop_Iteration extends Errors.Stop_Iteration {}
