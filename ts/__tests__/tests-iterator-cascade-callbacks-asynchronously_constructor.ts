#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Asynchronous, Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Are array types supported?', () => {
	const icc = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Are generator functions supported?', () => {
	const icc = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.generator_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Are asynchronous generator functions supported?', () => {
	const icc = new Iterator_Cascade_Callbacks_Asynchronously(Asynchronous.generator_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Are instantiated iterators supported?', () => {
	const icc = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.iterator_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Are object types supported?', () => {
	const icc = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.object_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Are objects with [Symbol.iterator] defined supported?', () => {
	const icc = new Iterator_Cascade_Callbacks_Asynchronously(new Synchronous.class_input(-1));
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Are objects with [Symbol.asyncIterator] defined supported?', () => {
	const icc = new Iterator_Cascade_Callbacks_Asynchronously(new Asynchronous.class_input(-1));
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
// test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Uninitialized classes with [Symbol.asyncIterator] defined supported?', () => {
// 	const icc = new Iterator_Cascade_Callbacks_Asynchronously(Asynchronous.class_input);
// 	expect(icc).toBeDefined();
// });

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Are strings supported?', () => {
	const icc = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.string_input);
	expect(icc).toBeDefined();
});

test('Iterator_Cascade_Callbacks_Asynchronously.constructor -> Will unsported input throw an Error?', () => {
	expect(() => {
		new Iterator_Cascade_Callbacks_Asynchronously(42);
	}).toThrow(TypeError);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.constructor ->', () => {
//   const icc = new Iterator_Cascade_Callbacks(Synchronous.string_input);
//   expect(icc).toBeDefined();
// });

// // test('Iterator_Cascade_Callbacks_Asynchronously.constructor ->', () => {});
