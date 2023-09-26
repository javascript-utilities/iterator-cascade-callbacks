#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.step -> Does steping over every other element function?', () => {
	const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

	const icc = new Iterator_Cascade_Callbacks(iterable);

	const collection = icc.step(1).collect([]);

	const expected = iterable.filter((value, index) => {
		return index % 2 !== 0;
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.step -> Will stepping over all elements produce empty results?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc.step(Synchronous.array_input.length).collect([]);

	expect(collection).toStrictEqual([]);
});

test('Iterator_Cascade_Callbacks.step -> Is it posible to step over every other even?', () => {
	const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

	const icc = new Iterator_Cascade_Callbacks(iterable);

	const collection = icc
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

// test('Iterator_Cascade_Callbacks.step ->', () => {});
