#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.forEach -> Is it fead values in the proper order?', () => {
	const expected = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	icc
		.map((value) => {
			return value * 2;
		})
		.forEach((value, index_or_key, { callback_object, iterator_cascade_callbacks }, expected) => {
			expect(value).toStrictEqual(expected.shift());
		}, expected)
		.collect([]);
});

// test('forEach ->', () => {});
