#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

import type {
	Shared,
	Synchronous as Synchronous_Types,
} from '../../../@types/iterator-cascade-callbacks/';

test('Iterator_Cascade_Callbacks.forEach -> Is it fead values in the proper order?', async () => {
	const expected = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	await icca
		.map((value: number) => {
			return value * 2;
		})
		.forEach((value, index_or_key, references, ...paramaters) => {
			expect(value).toStrictEqual(expected.shift());
		}, expected)
		.collect([]);
});

// test('forEach ->', async () => {});
