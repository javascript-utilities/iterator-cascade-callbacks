#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.iterator -> Can I has 2 elements?', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = await icca.limit(2).collect([]);
	const expected = Synchronous.array_input.slice(0, 2);

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.iterator -> Will pre-filtering cause any issues?', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = await icca
		.filter((value) => {
			return value % 2 === 0;
		})
		.limit(2)
		.collect([]);

	const expected = Synchronous.array_input
		.filter((value) => {
			return value % 2 === 0;
		})
		.slice(0, 2);

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.iterator -> Do callbacks after `.limit()` get called?', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = await icca
		.limit(2)
		.map((value) => {
			return value * 2;
		})
		.collect([]);

	const expected = Synchronous.array_input.slice(0, 2).map((value) => {
		return value * 2;
	});

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks.iterator -> ', async () => {});
