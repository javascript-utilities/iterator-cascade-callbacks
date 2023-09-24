#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';

test('Iterator_Cascade_Callbacks_Asynchronously.popCallbackWrapper -> ', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(['1', 2, NaN]);

	const map_callback: ICC.Callback_Function = (value, index_or_key, references, ...parameters) => {
		return value;
	};

	icca.map(map_callback);

	const popped_callback_wrapper = icca.popCallbackWrapper();

	expect(popped_callback_wrapper).toBeInstanceOf(Function);
});

test('Iterator_Cascade_Callbacks_Asynchronously.popCallbackWrapper -> ', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(['1', 2, NaN]);

	const popped_callback_object = icca.popCallbackWrapper();

	expect(popped_callback_object).toBeUndefined();
});

// test('Iterator_Cascade_Callbacks_Asynchronously.popCallbackWrapper -> ', async () => {});
