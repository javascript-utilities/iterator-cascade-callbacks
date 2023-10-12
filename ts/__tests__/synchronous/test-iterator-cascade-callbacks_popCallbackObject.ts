#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Callback_Object, Iterator_Cascade_Callbacks } from '../../synchronous';
import { Synchronous } from '../lib/example-iterables';

import type { Synchronous as Synchronous_Types } from '../../../@types/iterator-cascade-callbacks/'

test('Iterator_Cascade_Callbacks.popCallbackObject -> Does popping defined callback return an instance of `Callback_Object`?', () => {
	const icc = new Iterator_Cascade_Callbacks(['1', 2, NaN]);
	const map_callback: Synchronous_Types.Callback_Function = (value, index_or_key, references, ...parameters) => {
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
