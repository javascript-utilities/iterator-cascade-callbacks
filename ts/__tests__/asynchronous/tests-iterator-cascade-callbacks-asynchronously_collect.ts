#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../asynchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.collect -> Is Array collection target recognized correctly?', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	const collection = await icca.collect([]);
	expect(collection).toStrictEqual(Synchronous.array_input);
});

test('Iterator_Cascade_Callbacks.collect -> Is Object collection target recognized correctly?', async () => {
	const icca = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	const collection = await icca.collect({});
	expect(collection).toStrictEqual(Synchronous.object_input);
});

test('Iterator_Cascade_Callbacks.collect -> Is a custom collector function recognized correctly?', async () => {
	const collectToDictionary: Synchronous.Collect_To_Function = (target, value, index_or_key) => {
		if (!target.hasOwnProperty(index_or_key)) {
			target[index_or_key] = value;
		}
	};

	const icca = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	const collection = { spam: true };
	await icca.collect(collection, collectToDictionary);

	const expected = JSON.parse(JSON.stringify(Synchronous.object_input));
	expected['spam'] = true;

	expect(collection).toStrictEqual(expected);
});
