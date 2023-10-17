#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Yielded_Data } from '../lib/runtime-types';

test('Yielded_Data.constructor -> Is okay with manual initalization?', () => {
	const yielded_data = new Yielded_Data({
		content: 'foo',
		index_or_key: 42,
	});

	expect(yielded_data).toBeInstanceOf(Yielded_Data);
});
