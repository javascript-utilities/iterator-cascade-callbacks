#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../synchronous';

test('Iterator_Cascade_Callbacks -- tests Edge Cases -> What happens when extra parameters are provided?', () => {
	const map_callback: Synchronous.Callback_Function = (
		value: any,
		index_or_key: Shared.Index_Or_Key,
		{ callback_object, iterator_cascade_callbacks },
		...parameters
	): Shared.Yielded_Data => {
		if (parameters.length > (index_or_key as number)) {
			return parameters.splice(index_or_key as number)[0];
		}
		return value;
	};

	const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);
	icc.map(map_callback, 'first', 'second', 'third');

	const collection = icc.collect([]);

	expect(collection).toStrictEqual(['first', 'second', 'third', 4]);
});

// test('Iterator_Cascade_Callbacks -- tests Edge Cases ->', () => {});
