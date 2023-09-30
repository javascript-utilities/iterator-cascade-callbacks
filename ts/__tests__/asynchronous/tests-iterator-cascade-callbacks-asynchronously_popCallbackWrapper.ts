#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';

test('Iterator_Cascade_Callbacks.popCallbackWrapper -> ', async () => {
	const icca = new Iterator_Cascade_Callbacks(['1', 2, NaN]);

	const map_callback: Synchronous.Callback_Function = (value, index_or_key, references, ...parameters) => {
		return value;
	};

	icca.map(map_callback);

	const popped_callback_wrapper = icca.popCallbackWrapper();

	expect(popped_callback_wrapper).toBeInstanceOf(Function);
});

test('Iterator_Cascade_Callbacks.popCallbackWrapper -> ', async () => {
	const icca = new Iterator_Cascade_Callbacks(['1', 2, NaN]);

	const popped_callback_object = icca.popCallbackWrapper();

	expect(popped_callback_object).toBeUndefined();
});

// test('Iterator_Cascade_Callbacks.popCallbackWrapper -> ', async () => {});
