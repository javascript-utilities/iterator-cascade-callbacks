'use strict';

/**
 * @note this is **NOT** intended for production use! And _should_ only be used
 * for rapid prototyping and/or testing features interactively.
 *
 * @example Python testing server
 * ```bash
 * python3 -m http.server --bind 127.0.0.1 8080
 * ```
 *
 * @example `dev/index.html`
 * ```html
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8" />
 *     <meta name="color-scheme" content="light dark" />
 *     <script src="../targets/mjs/index.js" type="module"></script>
 *     <title>Interactively Test Iterator Cascade Callbacks</title>
 *   </head>
 *   <body>
 *     <p>Please open your web-browser debugger console</p>
 *     <p>Then utilize the <code>window.ICC</code> name space to access features</p>
 *   </body>
 * </html>
 * ```
 *
 * @example Then open a web-browser pointed at the above HTML file
 * ```bash
 * firefox 'http://localhost:8080/dev/'
 * ```
 */

import { Iterator_Cascade_Callbacks } from './iterator-cascade-callbacks.js';
import { Iterator_Cascade_Callbacks_Asynchronously } from './iterator-cascade-callbacks-asynchronously.js';
export { Iterator_Cascade_Callbacks, Iterator_Cascade_Callbacks_Asynchronously };

import { Callback_Object, Callback_Object_Asynchronously } from './lib/callback-objects.js';
import { Stop_Iteration, Pause_Iteration } from './lib/errors.js';
import { Iterator_From } from './lib/iterator-from.js';
import {
	GeneratorFunction,
	AsyncGeneratorFunction,
	AsyncGeneratorClass,
	Static_Contract,
} from './lib/runtime-types.js';

// @ts-ignore
window.ICC = {
	Synchronous: {
		Iterator_Cascade_Callbacks,
		GeneratorFunction,
		Callback_Object,
	},
	Asynchronous: {
		Iterator_Cascade_Callbacks_Asynchronously,
		AsyncGeneratorFunction,
		AsyncGeneratorClass,
		Callback_Object_Asynchronously,
	},
	Shared: {
		Iterator_From,
		Stop_Iteration,
		Pause_Iteration,
	},
};
