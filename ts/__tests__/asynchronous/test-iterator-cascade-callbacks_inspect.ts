#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.inspect -> Is it possible to inspect before and after `map` callback?', async () => {
	const expected_one = [...Synchronous.array_input];
	const expected_two = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	icca
		.inspect(
			(
				value: any,
				index_or_key: Shared.Index_Or_Key,
				references: Synchronous.Callback_Function_References,
				...paramaters: any[]
			) => {
				expect(value).toStrictEqual(paramaters[0].shift());
			},
			expected_one
		)
		.map((value: number) => {
			return value * 2;
		})
		.inspect(
			(
				value: any,
				index_or_key: Shared.Index_Or_Key,
				references: Synchronous.Callback_Function_References,
				...paramaters: any[]
			) => {
				expect(value).toStrictEqual(paramaters[0].shift());
			},
			expected_two
		);

	await icca.collect([]);
});

test('Iterator_Cascade_Callbacks.inspect ->', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	icca.inspect(
		(
			value: any,
			index_or_key: Shared.Index_Or_Key,
			references: Synchronous.Callback_Function_References,
			...paramaters: any[]
		) => {
			expect(paramaters).toBeInstanceOf(Array);
		},
		'foo',
		'bar'
	);

	await icca.collect([]);
});

// test('Iterator_Cascade_Callbacks.inspect ->', async () => {});
