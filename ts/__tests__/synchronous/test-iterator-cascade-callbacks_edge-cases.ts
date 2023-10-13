#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../synchronous';

import type {
	Shared,
	Synchronous as Synchronous_Types,
} from '../../../@types/iterator-cascade-callbacks/';

test('Iterator_Cascade_Callbacks -- tests Edge Cases -> What happens when extra parameters are provided?', () => {
	const iterable = [1, 2, 3, 4];
	const paramaters = ['first', 'second', 'third'];

	const map_callback = (
		value: typeof iterable,
		index_or_key: keyof typeof iterable,
		references: Synchronous_Types.Callback_Function_References<
			typeof iterable,
			typeof iterable,
			typeof paramaters,
			keyof typeof iterable
		>,
		...parameters: typeof paramaters
	) => {
		if (parameters.length > (index_or_key as number)) {
			return parameters.splice(index_or_key as number)[0];
		}
		return value;
	};

	const icc = new Iterator_Cascade_Callbacks(iterable);
	icc.map(map_callback, ...paramaters);

	const collection = icc.collect([]);

	expect(collection).toStrictEqual(['first', 'second', 'third', 4]);
});

// test('Iterator_Cascade_Callbacks -- tests Edge Cases ->', () => {});
