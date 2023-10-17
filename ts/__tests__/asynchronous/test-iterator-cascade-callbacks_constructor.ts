#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Asynchronous, Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.constructor -> Are array types supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Are generator functions supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.generator_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Are asynchronous generator functions supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Asynchronous.generator_input);
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

test('Iterator_Cascade_Callbacks.constructor -> Are objects with [Symbol.asyncIterator] defined supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(new Asynchronous.class_input(-1));
	expect(icc).toBeDefined();
});

/**
 * @TODO: Investigate following files
 * - ../lib/runtime-types.ts
 * > AsyncGeneratorClass
 *
 * - ../iterator-cascade-callbacks-asynchronously.ts
 * > constructor
 */
// test('Iterator_Cascade_Callbacks.constructor -> Uninitialized classes with [Symbol.asyncIterator] defined supported?', () => {
// 	const icc = new Iterator_Cascade_Callbacks(Asynchronous.class_input);
// 	expect(icc).toBeDefined();
// });

test('Iterator_Cascade_Callbacks.constructor -> Are strings supported?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.string_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks.constructor -> Will unsported input throw an Error?', () => {
	expect(() => {
		new Iterator_Cascade_Callbacks(42);
	}).toThrow(TypeError);
});

// test('Iterator_Cascade_Callbacks.constructor ->', () => {
//   const icc = new Iterator_Cascade_Callbacks(Synchronous.string_input);
//   expect(icc).toBeDefined();
// });

// // test('Iterator_Cascade_Callbacks.constructor ->', () => {});
