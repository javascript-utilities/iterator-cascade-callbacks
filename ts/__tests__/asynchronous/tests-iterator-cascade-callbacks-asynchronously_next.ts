#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.next -> Will `for` loop without callbacks yield expected values', async () => {
	const input_copy = [...Synchronous.array_input];

	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	for await (let value of icca) {
		const expected = input_copy.shift();
		expect(value).toStrictEqual(expected);
	}
});

// test('Iterator_Cascade_Callbacks.next -> ', async () => {});
