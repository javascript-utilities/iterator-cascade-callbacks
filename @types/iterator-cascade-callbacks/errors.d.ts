import { ICC } from './iterator-cascade-callbacks';
import { ICCA } from './iterator-cascade-callbacks-asynchronously';

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

