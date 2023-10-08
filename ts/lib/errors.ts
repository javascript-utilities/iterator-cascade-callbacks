// vim: noexpandtab

'use strict';

/**
 * Custom error type to temporarily stop iteration prematurely
 */
class Pause_Iteration extends Error {
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
class Stop_Iteration extends Error {
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

export { Pause_Iteration, Stop_Iteration };

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */

/**
 * Enable calling `new` and other non-instance methods
 */
export type Pause_Iteration__Staic = typeof Pause_Iteration;
export type Stop_Iteration__Static = typeof Stop_Iteration;
