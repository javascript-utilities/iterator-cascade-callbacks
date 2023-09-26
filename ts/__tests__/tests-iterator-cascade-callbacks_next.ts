#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.next -> Will `for` loop without callbacks yield expected values', () => {
	const input_copy = [...Synchronous.array_input];
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	for (let results of icc) {
		const [value, index] = results as Shared.Yielded_Tuple;
		const expected = input_copy.shift();
		expect(value).toStrictEqual(expected);
	}
});

// test('Iterator_Cascade_Callbacks.next -> ', () => {});
