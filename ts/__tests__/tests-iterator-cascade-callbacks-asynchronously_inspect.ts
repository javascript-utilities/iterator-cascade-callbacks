#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.inspect -> Is it possible to inspect before and after `map` callback?', async () => {
	const expected_one = [...Synchronous.array_input];
	const expected_two = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	icca
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

	await icca.collect([]);
});

test('Iterator_Cascade_Callbacks_Asynchronously.inspect ->', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	icca.inspect(
		(value, index_or_key, references, ...paramaters) => {
			expect(paramaters).toBeInstanceOf(Array);
		},
		'foo',
		'bar'
	);

	await icca.collect([]);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.inspect ->', async () => {});
