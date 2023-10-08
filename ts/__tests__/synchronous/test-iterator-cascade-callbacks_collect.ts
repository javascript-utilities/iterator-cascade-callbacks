#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../../synchronous';
import { Synchronous } from '../lib/example-iterables';

test('Iterator_Cascade_Callbacks.collect -> Is Array collection target recognized correctly?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.array_input);
	const collection = icc.collect([]);
	expect(collection).toStrictEqual(Synchronous.array_input);
});

test('Iterator_Cascade_Callbacks.collect -> Is Object collection target recognized correctly?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	const collection = icc.collect({});
	expect(collection).toStrictEqual(Synchronous.object_input);
});

test('Iterator_Cascade_Callbacks.collect -> Is a custom collector function recognized correctly?', () => {
	const collectToDictionary: Synchronous.Collect_To_Function = (target, value, index_or_key) => {
		if (!target.hasOwnProperty(index_or_key)) {
			/**
			 * @dev we can ignore `error TS2538` because `.next()` behavior breaks
			 * when inner iterator reports `{ done: true }` _should_ protect us from
			 * `Shared.Yielded_Data['index_or_key']` ever being undefined
			 */
			/* @ts-ignore: Type 'undefined' cannot be used as an index type. */
			target[index_or_key] = value;
		}
	};

	const icc = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	const collection = { spam: true };
	icc.collect(collection, collectToDictionary);

	const expected = JSON.parse(JSON.stringify(Synchronous.object_input));
	expected['spam'] = true;

	expect(collection).toStrictEqual(expected);
});
