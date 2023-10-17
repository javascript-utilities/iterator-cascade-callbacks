#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../synchronous';
import { Synchronous } from '../lib/example-iterables';
import { Yielded_Data } from '../../lib/runtime-types.js';

	import type { Shared } from '../../../@types/iterator-cascade-callbacks/'

test('Iterator_Cascade_Callbacks.map -> Does chaining one callback break anything?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc
		.map((value: number) => {
			return value * 2;
		})
		.collect([]);
	const expected = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.map -> Can multiple map callbacks be chained as expected?', () => {
	const iterable = [9, 8, 7, 6, 5];
	const icc = new Iterator_Cascade_Callbacks(iterable);
	const collection = icc
		.map((value: number) => {
			return value * 2;
		})
		.map((doubled: number) => {
			return doubled ** 2;
		})
		.map((squared: number) => {
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

test('Iterator_Cascade_Callbacks.map -> Is it okay for map callbacks to return `Yielded_Data` instance?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc
		.map((value: number, index_or_key: Shared.Index_Or_Key) => {
			return new Yielded_Data({
				content: (index_or_key as number) % 2 === 0,
				index_or_key,
			});
		})
		.collect([]);

	const expected = Synchronous.array_input.map((value, index) => {
		return index % 2 === 0;
	});

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks.map -> ', () => {});
