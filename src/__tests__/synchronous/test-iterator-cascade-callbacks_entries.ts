#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../synchronous';
import { Synchronous } from '../lib/example-iterables';

import type {  Shared } from '../../../@types/iterator-cascade-callbacks/'

test('Iterator_Cascade_Callbacks.entries() -> Handles array-like iterable input as expected?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	const collection = [...icc.entries()];
	const expected = [...Synchronous.array_input.entries()];
	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.entries() -> Handles object-like iterable input as expected?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	const collection = [...icc.entries()];
	const expected = [...Object.entries(Synchronous.object_input)];
	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.entries() -> Handles generator iterable input as expected?', () => {
	const amount = 5;

	const icc = new Iterator_Cascade_Callbacks(Synchronous.generator_input());
	const collection = [...icc.take(amount).entries()];

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

// test('Iterator_Cascade_Callbacks.entries() -> ', () => {});
