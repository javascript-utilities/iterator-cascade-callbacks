#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';

test('Iterator_Cascade_Callbacks -- tests Edge Cases -> What happens when extra parameters are provided?', async () => {
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

	const icca = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);
	icca.map(map_callback, 'first', 'second', 'third');

	const collection = await icca.collect([]);

	expect(collection).toStrictEqual(['first', 'second', 'third', 4]);
});

// test('Iterator_Cascade_Callbacks -- tests Edge Cases ->', async () => {});