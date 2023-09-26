#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.inspect -> Is it possible to inspect before and after `map` callback?', () => {
	const expected_one = [...Synchronous.array_input];
	const expected_two = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	icc
		.inspect(
			(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...paramaters) => {
				expect(value).toStrictEqual(paramaters[0].shift());
			},
			expected_one
		)
		.map((value) => {
			return value * 2;
		})
		.inspect(
			(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...paramaters) => {
				expect(value).toStrictEqual(paramaters[0].shift());
			},
			expected_two
		);
});

test('Iterator_Cascade_Callbacks.inspect ->', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	icc.inspect(
		(value, index_or_key, references, ...paramaters) => {
			expect(paramaters).toBeInstanceOf(Array);
		},
		'foo',
		'bar'
	);

	icc.collect([]);
});

// test('Iterator_Cascade_Callbacks.inspect ->', () => {});
