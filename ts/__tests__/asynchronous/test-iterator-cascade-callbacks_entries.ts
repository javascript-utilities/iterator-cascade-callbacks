#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous, Asynchronous } from '../lib/example-iterables';

import type { Shared } from '../../../@types/iterator-cascade-callbacks/';

test('Iterator_Cascade_Callbacks.entries() -> Handles array-like iterable input as expected?', async () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	const collection = await icc.entries().collect([]);
	const expected = [...Synchronous.array_input.entries()];
	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.entries() -> Handles object-like iterable input as expected?', async () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	const collection = await icc.entries().collect([]);
	const expected = [...Object.entries(Synchronous.object_input)];
	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.entries() -> Handles synchronous generator input as expected?', async () => {
	const amount = 5;

	const icc = new Iterator_Cascade_Callbacks(Synchronous.generator_input());
	const collection = await icc.entries().take(amount).collect([]);

	let expected: Shared.Yielded_Entry[] = [];
	let count = 0;
	for (const value of Synchronous.generator_input()) {
		expected.push([count, value]);
		if (++count === amount) {
			break;
		}
	}

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.entries() -> Handles asynchronous generator input as expected?', async () => {
	const amount = 5;

	const icc = new Iterator_Cascade_Callbacks(Asynchronous.generator_input());
	const collection = await icc.entries().take(amount).collect([]);

	let expected: Shared.Yielded_Entry[] = [];
	let count = 0;
	for await (const value of Asynchronous.generator_input()) {
		expected.push([count, value]);
		if (++count === amount) {
			break;
		}
	}

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks.entries() -> ', async () => {});
