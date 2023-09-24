#!/usr/bin/env node

'use strict';

import { Callback_Object } from '../lib/callback-objects';
import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.popCallbackObject -> Does popping defined callback return an instance of `Callback_Object`?', () => {
	const icc = new Iterator_Cascade_Callbacks(['1', 2, NaN]);
	const map_callback: ICC.Callback_Function = (value, index_or_key, references, ...parameters) => {
		return value;
	};

	icc.map(map_callback);

	const popped_callback_object = icc.popCallbackObject();

	expect(popped_callback_object).toBeInstanceOf(Callback_Object);
});

test('Iterator_Cascade_Callbacks.popCallbackObject -> Will popping an undefined callback return `undefined`?', () => {
	const icc = new Iterator_Cascade_Callbacks(['1', 2, NaN]);

	const popped_callback_object = icc.popCallbackObject();

	expect(popped_callback_object).toBeUndefined();
});

// test('Iterator_Cascade_Callbacks.popCallbackObject -> ', () => {});
