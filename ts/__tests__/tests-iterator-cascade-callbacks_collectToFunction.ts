#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.collectToFunction -> Are custom collecter callback functions suported?', () => {
	const map = new Map();
	const collectToMap: ICC.Collect_To_Function = (target, value, index_or_key) => {
		(target as Map<number | string, any>).set(index_or_key, value);
	};

	const icc = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	icc.collectToFunction(map, collectToMap);

	const expected = new Map(Object.entries(Synchronous.object_input));
	expect(map).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.collectToFunction -> Is it possible to limit collection built by callback functions?', () => {
	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icc = new Iterator_Cascade_Callbacks(iterable);

	const collection_one = icc.collectToFunction(
		[],
		(target, value) => {
			target.push(value);
			return target;
		},
		4
	);
	const expected_one = iterable.splice(0, 4);
	expect(collection_one).toStrictEqual(expected_one);

	const collection_two = icc.collectToFunction(
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

// test('Iterator_Cascade_Callbacks.collectToFunction -> ', () => {});
