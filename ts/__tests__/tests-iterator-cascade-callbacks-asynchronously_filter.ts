#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.filter -> Will filtering for even numbers break anything?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca
		.filter((value) => {
			return value % 2 === 0;
		})
		.collect([]);

	const expected = Synchronous.array_input.filter((value) => {
		return value % 2 === 0;
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.filter -> What if filter returns `true` for all tests?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca
		.map((value) => {
			return value * 2;
		})
		.filter((value) => {
			return value % 2 === 0;
		})
		.collect([]);

	const expected = Synchronous.array_input
		.map((value) => {
			return value * 2;
		})
		.filter((value) => {
			return value % 2 === 0;
		});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.filter -> What if filter returns `false` for all tests?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca
		.filter((value) => {
			return isNaN(value);
		})
		.collect([]);

	const expected = Synchronous.array_input.filter((value) => {
		return isNaN(value);
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.filter -> Can `.filter()` and `.map()` be chained?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const collection = await icca
		.map((value) => {
			return value + 1;
		})
		.filter((value) => {
			return value % 2 === 0;
		})
		.map((value) => {
			return value - 1;
		})
		.collect([]);

	const expected = Synchronous.array_input
		.map((value) => {
			return value + 1;
		})
		.filter((value) => {
			return value % 2 === 0;
		})
		.map((value) => {
			return value - 1;
		});

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.filter -> ', async () => {});
