#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.collectToArray -> Are Arrays unmodified without callbacks?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);
	const collection = await icca.collectToArray([]);
	expect(collection).toStrictEqual(Synchronous.array_input);
});

test('Iterator_Cascade_Callbacks_Asynchronously.collectToArray -> Is collection from Generator function to Array supported?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(function* () {
		for (let value of [6, 5, 4]) {
			yield value;
		}
	});
	const collection = await icca.collectToArray([]);
	expect(collection).toStrictEqual([6, 5, 4]);
});

test('Iterator_Cascade_Callbacks_Asynchronously.collectToArray -> Is collection from Iterator function to Array supported?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(
		(function* () {
			for (let value of [6, 5, 4]) {
				yield value;
			}
		})()
	);
	const collection = await icca.collectToArray([]);
	expect(collection).toStrictEqual([6, 5, 4]);
});

test('Iterator_Cascade_Callbacks_Asynchronously.collectToArray -> Can collecton be limited to 4 and resumed?', async () => {
	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(iterable);

	const collection_one = await icca.collectToArray([], 4);
	const expected_one = iterable.splice(0, 4);
	expect(collection_one).toStrictEqual(expected_one);

	const collection_two = await icca.collectToArray([], 4);
	const expected_two = iterable.splice(4, 4);
	expect(collection_two).toStrictEqual(expected_two);
});
