#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.copyCallbacksOnto -> Can callbacks be copied to another instance of Iterator_Cascade_Callbacks_Asynchronously?', async () => {
	const iterable_one = [1, 2, 3, 4, 5];
	const iterable_two = [9, 8, 7, 6, 5];

	const icca_one = new Iterator_Cascade_Callbacks_Asynchronously(iterable_one);

	icca_one
		.filter((value) => {
			return value % 2 === 0;
		})
		.map((evens) => {
			return evens / 2;
		});

	const icca_two = icca_one.copyCallbacksOnto(iterable_two);

	const expected_one = iterable_one
		.filter((value) => {
			return value % 2 === 0;
		})
		.map((evens) => {
			return evens / 2;
		});

	const expected_two = iterable_two
		.filter((value) => {
			return value % 2 === 0;
		})
		.map((evens) => {
			return evens / 2;
		});

	const collection_one = await icca_one.collect([]);
	const collection_two = await icca_two.collect([]);

	expect(collection_one).toStrictEqual(expected_one);
	expect(collection_two).toStrictEqual(expected_two);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.copyCallbacksOnto ->', async () => {});
