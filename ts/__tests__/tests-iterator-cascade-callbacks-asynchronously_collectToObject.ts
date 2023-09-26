#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';
import { Synchronous } from './lib/example-iterables';

test('Iterator_Cascade_Callbacks_Asynchronously.collectToObject -> Are Objects unmodified without callbacks?', async () => {
	const icca = new Iterator_Cascade_Callbacks_Asynchronously(Synchronous.object_input);
	const collection = await icca.collectToObject({});
	expect(collection).toStrictEqual(Synchronous.object_input);
});

test('Iterator_Cascade_Callbacks_Asynchronously.collectToObject -> Is it okay to limit collection amount?', async () => {
	const iterable = Array(20)
		.fill(undefined)
		.map((_, i) => i);

	const icca = new Iterator_Cascade_Callbacks_Asynchronously(iterable);

	const collection_one = await icca.collectToObject({}, 4);
	const expected_one = Object.assign({}, iterable.splice(0, 4));
	expect(collection_one).toStrictEqual(expected_one);

	const collection_two = await icca.collectToObject({}, 4);
	const expected_two = iterable.splice(4, 4).reduce((accumulator, value, index) => {
		accumulator[index + 4] = value;
		return accumulator;
	}, {} as { [key: string]: number });
	expect(collection_two).toStrictEqual(expected_two);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.collectToObject ->', async () => {});
