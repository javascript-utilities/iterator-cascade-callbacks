#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Callback_Object_Asynchronously } from '../lib/callback-objects';
import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.popCallbackObject -> Does popping defined callback return an instance of `Callback_Object`?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(['1', 2, NaN]);

	const map_callback: ICC.Callback_Function = (value, index_or_key, references, ...parameters) => {
		return value;
	};

	icca.map(map_callback);

	const popped_callback_object = icca.popCallbackObject();

	expect(popped_callback_object).toBeInstanceOf(Callback_Object_Asynchronously);
});

test('Iterator_Cascade_Callbacks_Asynchronously.popCallbackObject -> Will popping an undefined callback return `undefined`?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(['1', 2, NaN]);

	const popped_callback_object = icca.popCallbackObject();

	expect(popped_callback_object).toBeUndefined();
});

// test('Iterator_Cascade_Callbacks_Asynchronously.popCallbackObject -> ', async () => {});
