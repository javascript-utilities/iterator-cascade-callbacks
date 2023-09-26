#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.collectToArray -> Are Arrays unmodified without callbacks?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	const collection = icc.collectToArray([]);
	expect(collection).toStrictEqual(Synchronous.array_input);
});

test('Iterator_Cascade_Callbacks.collectToArray -> Is collection from Generator function to Array supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(function* () {
		for (let value of [6, 5, 4]) {
			yield value;
		}
	});
	const collection = icc.collectToArray([]);
	expect(collection).toStrictEqual([6, 5, 4]);
});

test('Iterator_Cascade_Callbacks.collectToArray -> Is collection from Iterator function to Array supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(
		(function* () {
			for (let value of [6, 5, 4]) {
				yield value;
			}
		})()
	);
	const collection = icc.collectToArray([]);
	expect(collection).toStrictEqual([6, 5, 4]);
});

test('Iterator_Cascade_Callbacks.collectToArray -> Can collecton be limited to 4 and resumed?', () => {
	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icc = new Iterator_Cascade_Callbacks(iterable);

	const collection_one = icc.collectToArray([], 4);
	const expected_one = iterable.splice(0, 4);
	expect(collection_one).toStrictEqual(expected_one);

	const collection_two = icc.collectToArray([], 4);
	const expected_two = iterable.splice(4, 4);
	expect(collection_two).toStrictEqual(expected_two);
});
