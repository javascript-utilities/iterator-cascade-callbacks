#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.next -> Will `for` loop without callbacks yield expected values', async () => {
	const input_copy = [...Synchronous.array_input];

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);
	for await (let results of icca) {
		const [value, index] = results as Shared.Yielded_Tuple;
		const expected = input_copy.shift();
		expect(value).toStrictEqual(expected);
	}
});

// test('Iterator_Cascade_Callbacks_Asynchronously.next -> ', async () => {});
