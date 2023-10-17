#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Callback_Object, Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

import type {
	Shared,
	Synchronous as Synchronous_Types,
} from '../../../@types/iterator-cascade-callbacks/';

test('Iterator_Cascade_Callbacks.popCallbackObject -> Does popping defined callback return an instance of `Callback_Object`?', async () => {
	const icca = new Iterator_Cascade_Callbacks(['1', 2, NaN]);

	icca.map((
		value,
		index_or_key,
		references,
		...parameters
	) => {
		return value;
	});

	const popped_callback_object = icca.popCallbackObject();

	expect(popped_callback_object).toBeInstanceOf(Callback_Object);
});

test('Iterator_Cascade_Callbacks.popCallbackObject -> Will popping an undefined callback return `undefined`?', async () => {
	const icca = new Iterator_Cascade_Callbacks(['1', 2, NaN]);

	const popped_callback_object = icca.popCallbackObject();

	expect(popped_callback_object).toBeUndefined();
});

// test('Iterator_Cascade_Callbacks.popCallbackObject -> ', async () => {});
