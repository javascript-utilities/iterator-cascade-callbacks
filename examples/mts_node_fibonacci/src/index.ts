// vim: noexpandtab

/**
 * @file Demonstrate interacting with generator that never reports `done === true`
 * @author S0AndS0
 * @license AGPL-3.0
 */

'use strict';

import { Synchronous } from '@javascript-utilities/iterator-cascade-callbacks';

import type { Synchronous as Synchronous_Types } from '@javascript-utilities/iterator-cascade-callbacks';

import { fibonacciGenerator } from './lib/fibonacci-generator.js';

/**
 * Filter even numbers from `fibonacciGenerator`, skip the first even result,
 * divide results by two, limit iteration to five results, and finally collect
 * values to an array.
 */
const icc = new Synchronous.Iterator_Cascade_Callbacks<number>(fibonacciGenerator)
	.filter((value) => {
		return value % 2 === 0;
	})
	.skip(1)
	.map((evens) => {
		return evens / 2;
	})
	.take(5);

const collection = icc.collect([]);

console.log(collection);
//> [ 1, 4, 17, 72, 305 ]
