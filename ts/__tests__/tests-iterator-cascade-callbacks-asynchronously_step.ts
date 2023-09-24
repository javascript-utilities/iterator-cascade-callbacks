#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.step -> Does steping over every other element function?', async () => {
	const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(iterable);

	const collection = await icca.step(1).collect([]);

	const expected = iterable.filter((value, index) => {
		return index % 2 !== 0;
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.step -> Will stepping over all elements produce empty results?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca.step(Synchronous.array_input.length).collect([]);

	expect(collection).toStrictEqual([]);
});

test('Iterator_Cascade_Callbacks_Asynchronously.step -> Is it posible to step over every other even?', async () => {
	const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(iterable);

	const collection = await icca
		.filter((value) => {
			return value % 2 === 0;
		})
		.step(1)
		.collect([]);

	const expected = iterable
		.filter((value, index) => {
			return value % 2 === 0;
		})
		.filter((value, index) => {
			return index % 2 !== 0;
		});

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.step ->', async () => {});
