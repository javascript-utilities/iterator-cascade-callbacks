#!/usr/bin/env node

'use strict';

import { Iterator_From } from '../lib/iterator-from';

import { Asynchronous, Synchronous } from './lib/example-iterables';

test('Iterator_From.array -> ', () => {
	const iteratorFromArray = Iterator_From.array(Synchronous.array_input);

	const values = [];
	const indexes = [];
	for (let [value, index] of iteratorFromArray) {
		values.push(value);
		indexes.push(index);
	}

	expect(values).toStrictEqual(Synchronous.array_input);
	expect(indexes).toStrictEqual(Object.keys(Synchronous.array_input).map((x) => Number(x)));
});

test('Iterator_From.object -> ', () => {
	const iteratorFromObject = Iterator_From.object(Synchronous.object_input);

	const values = [];
	const keys = [];
	for (let [value, index] of iteratorFromObject) {
		values.push(value);
		keys.push(index);
	}

	expect(values).toStrictEqual(Object.values(Synchronous.object_input));
	expect(keys).toStrictEqual(Object.keys(Synchronous.object_input));
});

test('Iterator_From.generator -> ', () => {
	const iteratorFromGenerator = Iterator_From.generator(Synchronous.generator_input());

	const values = [];
	for (let [value, index] of iteratorFromGenerator) {
		values.push(value);
	}

	expect(values).toStrictEqual([...Synchronous.generator_input()]);
});

test('Iterator_From.asyncGenerator -> ', async () => {
	const iteratorFromAsyncGenerator = Iterator_From.asyncGenerator(Asynchronous.generator_input());

	const values = [];
	for await (let [value, index] of iteratorFromAsyncGenerator) {
		values.push(value);
	}

	expect(values).toStrictEqual(Synchronous.array_input);
});
