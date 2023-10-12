#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../synchronous';
import { Synchronous } from '../lib/example-iterables';

import type {  Shared, Synchronous as Synchronous_Types } from '../../../@types/iterator-cascade-callbacks/'

test('Iterator_Cascade_Callbacks.forEach -> Is it fead values in the proper order?', () => {
	const expected = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	icc
		.map((value: number) => {
			return value * 2;
		})
		.forEach(
			(
				value: number,
				index_or_key: Shared.Index_Or_Key,
				references: Synchronous_Types.Callback_Function_References,
				...paramaters: any[]
			) => {
				expect(value).toStrictEqual(expected.shift());
			},
			expected
		)
		.collect([]);
});

// test('forEach ->', () => {});
