#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks -- tests Error States -> `.constructor()` -- Will unsported input throw an Error?', () => {
	expect(() => {
		new Iterator_Cascade_Callbacks(42);
	}).toThrow(TypeError);
});

test('Iterator_Cascade_Callbacks -- tests Error States -> `.collect()` -- Will an unsuported collection target throw an Error?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	// @ts-ignore
	expect(() => {
		icc.collect('');
	}).toThrow(TypeError);
});

test('Iterator_Cascade_Callbacks -- tests Error States -> `.map()` -- Does `.next()` re-throw errors from callbacks?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	icc.map((value) => {
		throw new Error('Please re-throw this `.next()` method!');
	});

	expect(() => {
		icc.next();
	}).toThrowError('Please re-throw this `.next()` method!');
});

// test('Iterator_Cascade_Callbacks -- tests Error States -> ', () => {});
