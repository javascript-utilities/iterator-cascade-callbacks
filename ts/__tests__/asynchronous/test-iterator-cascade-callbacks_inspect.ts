#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

import type {
	Shared,
	Synchronous as Synchronous_Types,
} from '../../../@types/iterator-cascade-callbacks/';

test('Iterator_Cascade_Callbacks.inspect -> Is it possible to inspect before and after `map` callback?', async () => {
	const expected_one = [...Synchronous.array_input];
	const expected_two = Synchronous.array_input.map((value) => {
		return value * 2;
	});

	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	icca
		.inspect((value, index_or_key, references, ...parameters) => {
			expect(value).toStrictEqual(parameters[0].shift());
		}, expected_one)
		.map((value: number) => {
			return value * 2;
		})
		.inspect((value, index_or_key, references, ...parameters) => {
			expect(value).toStrictEqual(parameters[0].shift());
		}, expected_two);

	await icca.collect([]);
});

test('Iterator_Cascade_Callbacks.inspect ->', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	icca.inspect(
		(value, index_or_key, references, ...parameters) => {
			expect(parameters).toBeInstanceOf(Array);
		},
		'foo',
		'bar'
	);

	await icca.collect([]);
});

// test('Iterator_Cascade_Callbacks.inspect ->', async () => {});
