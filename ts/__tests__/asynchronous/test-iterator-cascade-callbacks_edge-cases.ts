#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';

import type {
	Shared,
	Synchronous as Synchronous_Types,
} from '../../../@types/iterator-cascade-callbacks/';

test('Iterator_Cascade_Callbacks -- tests Edge Cases -> What happens when extra parameters are provided?', async () => {
	const iterable = [1, 2, 3, 4];
	const parameters = ['first', 'second', 'third'];

	const map_callback = (
		value: typeof iterable,
		index_or_key: keyof typeof iterable,
		references: Synchronous_Types.Callback_Function_References<
			typeof iterable,
			typeof iterable,
			typeof parameters,
			keyof typeof iterable
		>,
		...parameters: any[]
	) => {
		if (parameters.length > (index_or_key as number)) {
			return parameters.splice(index_or_key as number)[0];
		}
		return value;
	};

	const icca = new Iterator_Cascade_Callbacks(iterable);
	icca.map(map_callback, ...parameters);

	const collection = await icca.collect([]);

	expect(collection).toStrictEqual(['first', 'second', 'third', 4]);
});

// test('Iterator_Cascade_Callbacks -- tests Edge Cases ->', async () => {});
