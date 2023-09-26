#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.skip -> May I skip over first element?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca.skip(1).collect([]);

	const expected = Synchronous.array_input.filter((value, index) => {
		return index > 0;
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.skip -> What about stepping over first even result?', async () => {
	const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(iterable);

	const collection = await icca
		.filter((value) => {
			return value % 2 === 0;
		})
		.skip(1)
		.collect([]);

	const expected = iterable
		.filter((value) => {
			return value % 2 === 0;
		})
		.filter((evens, index) => {
			return index > 0;
		});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.skip -> Does iteration stop if skip amount exceeds `Synchronous.iterator` elements?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca.skip(Synchronous.array_input.length).collect([]);

	expect(collection).toStrictEqual([]);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.skip ->', async () => {});
