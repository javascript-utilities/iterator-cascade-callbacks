#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks.collectToObject -> Are Objects unmodified without callbacks?', () => {
	const icc = new Iterator_Cascade_Callbacks(Synchronous.object_input);
	const collection = icc.collectToObject({});
	expect(collection).toStrictEqual(Synchronous.object_input);
});

test('Iterator_Cascade_Callbacks.collectToObject -> Is it okay to limit collection amount?', () => {
	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icc = new Iterator_Cascade_Callbacks(iterable);

	const collection_one = icc.collectToObject({}, 4);
	const expected_one = Object.assign({}, iterable.splice(0, 4));
	expect(collection_one).toStrictEqual(expected_one);

	const collection_two = icc.collectToObject({}, 4);
	const expected_two = iterable.splice(4, 4).reduce((accumulator, value, index) => {
		accumulator[index + 4] = value;
		return accumulator;
	}, {} as { [key: string]: number });
	expect(collection_two).toStrictEqual(expected_two);
});

// test('Iterator_Cascade_Callbacks.collectToObject ->', () => {});
