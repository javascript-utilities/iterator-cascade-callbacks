#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../synchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.skip -> May I skip over first element?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc.skip(1).collect([]);

	const expected = Synchronous.array_input.filter((value, index) => {
		return index > 0;
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.skip -> What about stepping over first even result?', () => {
	const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

	const icc = new Iterator_Cascade_Callbacks(iterable);

	const collection = icc
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

test('Iterator_Cascade_Callbacks.skip -> Does iteration stop if skip amount exceeds `Synchronous.iterator` elements?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc.skip(Synchronous.array_input.length).collect([]);

	expect(collection).toStrictEqual([]);
});

// test('Iterator_Cascade_Callbacks.skip ->', () => {});
