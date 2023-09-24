#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously -- tests Error States -> `.constructor()` -- Will unsported input throw an Error?', () => {
	expect(() => {
		new Iterator_Cascade_Callbacks_Asynchronously(42);
	}).toThrow(TypeError);
});

test('Iterator_Cascade_Callbacks_Asynchronously -- tests Error States -> `.collect()` -- Will an unsuported collection target throw an Error?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);
	// @ts-ignore
	await expect(async () => {
		await icca.collect('');
	}).rejects.toThrow(TypeError);
});

test('Iterator_Cascade_Callbacks_Asynchronously -- tests Error States -> `.map()` -- Does `.next()` re-throw errors from callbacks?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.array_input);

	const error_message = 'Please re-throw this `.next()` method!';

	icca.map((value) => {
		throw new Error(error_message);
	});

	expect(async () => {
		await icca.next();
	}).rejects.toThrowError(error_message);
});

// test('Iterator_Cascade_Callbacks_Asynchronously -- tests Error States -> ', async () => {});
