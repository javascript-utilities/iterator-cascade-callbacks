#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.take -> Can I has 2 elements?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc.take(2).collect([]);

	const expected = Synchronous.array_input.slice(0, 2);

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.take -> Can I has 4 elements at a time?', () => {
	const page_size = 4;

	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icc = new Iterator_Cascade_Callbacks(iterable);
	icc.take(page_size);

	Array(4)
		.fill(undefined)
		.forEach((_, i) => {
			const collection = icc.collect([]);
			const expected = iterable.slice(i * page_size, i * page_size + page_size);
			expect(collection).toStrictEqual(expected);
		});
});

test('Iterator_Cascade_Callbacks.take -> Is anything broken by callbacks prior to taking?', () => {
	const page_size = 4;

	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icc = new Iterator_Cascade_Callbacks(iterable);

	icc
		.map((value) => {
			return value * 2;
		})
		.take(page_size);

	Array(4)
		.fill(undefined)
		.forEach((_, i) => {
			const collection = icc.collect([]);

			const expected = iterable.slice(i * page_size, i * page_size + page_size).map((value) => {
				return value * 2;
			});

			expect(collection).toStrictEqual(expected);
		});
});

test('Iterator_Cascade_Callbacks.take -> Is anything broken by callbacks after taking?', () => {
	const page_size = 4;

	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icc = new Iterator_Cascade_Callbacks(iterable);

	icc.take(page_size).map((value) => {
		return value * 2;
	});

	Array(4)
		.fill(undefined)
		.forEach((_, i) => {
			const collection = icc.collect([]);

			const expected = iterable.slice(i * page_size, i * page_size + page_size).map((value) => {
				return value * 2;
			});

			expect(collection).toStrictEqual(expected);
		});
});

// // test('Iterator_Cascade_Callbacks.take -> ', () => {});
