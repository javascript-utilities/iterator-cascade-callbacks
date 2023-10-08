// vim: noexpandtab

'use strict';

import * as Synchronous from './synchronous.js';
import * as Asynchronous from './asynchronous.js';

import { Stop_Iteration, Pause_Iteration } from './lib/errors.js';
import * as Iterator_From from './lib/iterator-from.js';
import {
	GeneratorFunction,
	AsyncGeneratorFunction,
	// AsyncGeneratorClass,
} from './lib/runtime-types.js';

const Shared = {
	// AsyncGeneratorClass,
	AsyncGeneratorFunction,
	GeneratorFunction,
	Iterator_From,
	Pause_Iteration,
	Stop_Iteration,
};

export { Asynchronous, Shared, Synchronous };
