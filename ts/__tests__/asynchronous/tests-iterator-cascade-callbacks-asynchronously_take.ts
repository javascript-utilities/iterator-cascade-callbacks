#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.take -> Can I has 2 elements?', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = await icca.take(2).collect([]);

	const expected = Synchronous.array_input.slice(0, 2);

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.take -> Can I has 4 elements at a time?', async () => {
	const page_size = 4;

	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icca = new Iterator_Cascade_Callbacks(iterable);
	icca.take(page_size);

	for (let i = 0; i < 5; i++) {
		const collection = await icca.collect([]);
		const expected = iterable.slice(i * page_size, i * page_size + page_size);
		expect(collection).toStrictEqual(expected);
	}
});

test('Iterator_Cascade_Callbacks.take -> Is anything broken by callbacks prior to taking?', async () => {
	const page_size = 4;

	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icca = new Iterator_Cascade_Callbacks(iterable);

	icca
		.map((value) => {
			return value * 2;
		})
		.take(page_size);

	for (let i = 0; i < 5; i++) {
		const collection = await icca.collect([]);

		const expected = iterable.slice(i * page_size, i * page_size + page_size).map((value) => {
			return value * 2;
		});

		expect(collection).toStrictEqual(expected);
	}
});

test('Iterator_Cascade_Callbacks.take -> Is anything broken by callbacks after taking?', async () => {
	const page_size = 4;

	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icca = new Iterator_Cascade_Callbacks(iterable);

	icca.take(page_size).map((value) => {
		return value * 2;
	});

	for (let i = 0; i < 5; i++) {
		const collection = await icca.collect([]);

		const expected = iterable.slice(i * page_size, i * page_size + page_size).map((value) => {
			return value * 2;
		});

		expect(collection).toStrictEqual(expected);
	}
});

// test('Iterator_Cascade_Callbacks.take -> ', async () => {});
