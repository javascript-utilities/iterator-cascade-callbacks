#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.filter -> Will filtering for even numbers break anything?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc
		.filter((value) => {
			return value % 2 === 0;
		})
		.collect([]);

	const expected = Synchronous.array_input.filter((value) => {
		return value % 2 === 0;
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.filter -> What if filter returns `true` for all tests?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc
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

test('Iterator_Cascade_Callbacks.filter -> What if filter returns `false` for all tests?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc
		.filter((value) => {
			return isNaN(value);
		})
		.collect([]);

	const expected = Synchronous.array_input.filter((value) => {
		return isNaN(value);
	});

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.filter -> Can `.filter()` and `.map()` be chained?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const collection = icc
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

// test('Iterator_Cascade_Callbacks.filter -> ', () => {});
