#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.popCallbackWrapper -> ', () => {
	const icc = new Iterator_Cascade_Callbacks(['1', 2, NaN]);
	const map_callback: ICC.Callback_Function = (value, index_or_key, references, ...parameters) => {
		return value;
	};

	icc.map(map_callback);

	const popped_callback_wrapper = icc.popCallbackWrapper();

	expect(popped_callback_wrapper).toBeInstanceOf(Function);
});

test('Iterator_Cascade_Callbacks.popCallbackWrapper -> ', () => {
	const icc = new Iterator_Cascade_Callbacks(['1', 2, NaN]);

	const popped_callback_object = icc.popCallbackWrapper();

	expect(popped_callback_object).toBeUndefined();
});

// test('Iterator_Cascade_Callbacks.popCallbackWrapper -> ', () => {});
