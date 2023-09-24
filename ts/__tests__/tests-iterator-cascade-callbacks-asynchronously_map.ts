#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.map -> Does chaining one callback break anything?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca
		.map((value) => {
			return value * 2;
		})
		.collect([]);

	const expected = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.map -> Can multiple map callbacks be chained as expected?', async () => {
	const iterable = [9, 8, 7, 6, 5];

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(iterable);

	const collection = await icca
		.map((value) => {
			return value * 2;
		})
		.map((doubled) => {
			return doubled ** 2;
		})
		.map((squared) => {
			return squared / 3;
		})
		.collect([]);

	const expected = iterable
		.map((value) => {
			return value * 2;
		})
		.map((doubled) => {
			return doubled ** 2;
		})
		.map((squared) => {
			return squared / 3;
		});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.map -> Is it okay for map callbacks to return `value` / `index_or_key` Tuple', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca
		.map((value, index_or_key) => {
			return [(index_or_key as number) % 2 === 0, index_or_key];
		})
		.collect([]);

	const expected = Synchronous.array_input.map((value, index) => {
		return index % 2 === 0;
	});

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.map -> ', async () => {});
