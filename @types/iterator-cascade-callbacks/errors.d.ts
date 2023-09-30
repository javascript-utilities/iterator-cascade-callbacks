// vim: noexpandtab

import { Synchronous } from './iterator-cascade-callbacks';
import { Asynchronous } from './iterator-cascade-callbacks-asynchronously';

declare global {
	export namespace Errors {
		/**
		 *
		 */
		interface Pause_Iteration extends Error {}

		/**
		 *
		 */
		interface Stop_Iteration extends Error {}
	}
}

export { Errors };
