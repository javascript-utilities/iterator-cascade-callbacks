#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.collectToFunction -> Are custom collecter callback functions suported?', async () => {
	const map = new Map();
	const collectToMap: ICC.Collect_To_Function = (target, value, index_or_key) => {
		(target as Map<number | string, any>).set(index_or_key, value);
	};

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.object_input);
	await icca.collectToFunction(map, collectToMap);

	const expected = new Map(Object.entries(Synchronous.object_input));
	expect(map).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.collectToFunction -> Is it possible to limit collection built by callback functions?', async () => {
	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(iterable);

	const collection_one = await icca.collectToFunction(
		[],
		async (target, value) => {
			target.push(value);
			return target;
		},
		4
	);
	const expected_one = iterable.splice(0, 4);
	expect(collection_one).toStrictEqual(expected_one);

	const collection_two = await icca.collectToFunction(
		[],
		(target, value) => {
			target.push(value);
			return target;
		},
		4
	);
	const expected_two = iterable.splice(4, 4);
	expect(collection_two).toStrictEqual(expected_two);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.collectToFunction -> ', async () => {});
