#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Callback_Object } from '../lib/callback-objects';
import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';

import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.constructor -> Are array types supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Are generator functions supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.generator_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Are instantiated iterators supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.iterator_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Are object types supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Are objects with [Symbol.iterator] defined supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(new Synchronous.class_input(-1));
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Are strings supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.string_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Will unsported input throw an Error?', () => {
	expect(() => {
		new Iterator_Cascade_Callbacks(42);
	}).toThrow(TypeError);
});
