#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../synchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.copyCallbacksOnto -> Can callbacks be copied to another instance of Iterator_Cascade_Callbacks?', () => {
	const iterable_one = [1, 2, 3, 4, 5];
	const iterable_two = [9, 8, 7, 6, 5];

	const icc_one = new Iterator_Cascade_Callbacks(iterable_one);

	icc_one
		.filter((value: number) => {
			return value % 2 === 0;
		})
		.map((evens: number) => {
			return evens / 2;
		});

	const icc_two = icc_one.copyCallbacksOnto(iterable_two);

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

	const collection_one = icc_one.collect([]);
	const collection_two = icc_two.collect([]);

	expect(collection_one).toStrictEqual(expected_one);
	expect(collection_two).toStrictEqual(expected_two);
});

// test('Iterator_Cascade_Callbacks.copyCallbacksOnto ->', () => {});
