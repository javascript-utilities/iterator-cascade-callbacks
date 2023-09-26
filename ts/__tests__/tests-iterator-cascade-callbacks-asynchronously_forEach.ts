#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.forEach -> Is it fead values in the proper order?', async () => {
	const expected = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	await icca
		.map((value) => {
			return value * 2;
		})
		.forEach((value, index_or_key, { callback_object, iterator_cascade_callbacks }, expected) => {
			expect(value).toStrictEqual(expected.shift());
		}, expected)
		.collect([]);
});

// test('forEach ->', async () => {});
