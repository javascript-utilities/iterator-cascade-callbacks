#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks -- tests Error States -> `.constructor()` -- Will unsported input throw an Error?', () => {
	expect(() => {
		new Iterator_Cascade_Callbacks(42);
	}).toThrow(TypeError);
});

test('Iterator_Cascade_Callbacks -- tests Error States -> `.collect()` -- Will an unsuported collection target throw an Error?', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	// @ts-ignore
	await expect(async () => {
		await icca.collect('');
	}).rejects.toThrow(TypeError);
});

test('Iterator_Cascade_Callbacks -- tests Error States -> `.map()` -- Does `.next()` re-throw errors from callbacks?', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);

	const error_message = 'Please re-throw this `.next()` method!';

	icca.map((value) => {
		throw new Error(error_message);
	});

	expect(async () => {
		await icca.next();
	}).rejects.toThrowError(error_message);
});

// test('Iterator_Cascade_Callbacks -- tests Error States -> ', async () => {});
