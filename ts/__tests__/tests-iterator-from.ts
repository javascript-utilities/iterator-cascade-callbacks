#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_From } from '../lib/iterator-from';

import { Asynchronous, Synchronous } from './lib/example-iterables';

test('Iterator_From.array -> ', () => {
	const iteratorFromArray = Iterator_From.array(Synchronous.array_input);

	const values = [];
	const indexes = [];
	for (let { content, index_or_key } of iteratorFromArray) {
		values.push(content);
		indexes.push(index_or_key);
	}

	expect(values).toStrictEqual(Synchronous.array_input);
	expect(indexes).toStrictEqual(Object.keys(Synchronous.array_input).map((x) => Number(x)));
});

test('Iterator_From.object -> ', () => {
	const iteratorFromObject = Iterator_From.object(Synchronous.object_input);

	const values = [];
	const keys = [];
	for (let { content, index_or_key } of iteratorFromObject) {
		values.push(content);
		keys.push(index_or_key);
	}

	expect(values).toStrictEqual(Object.values(Synchronous.object_input));
	expect(keys).toStrictEqual(Object.keys(Synchronous.object_input));
});

test('Iterator_From.generator -> ', () => {
	const iteratorFromGenerator = Iterator_From.generator(Synchronous.generator_input());

	const values = [];
	for (let { content, index_or_key } of iteratorFromGenerator) {
		values.push(content);
	}

	expect(values).toStrictEqual([...Synchronous.generator_input()]);
});

test('Iterator_From.asyncGenerator -> ', async () => {
	const iteratorFromAsyncGenerator = Iterator_From.asyncGenerator(Asynchronous.generator_input());

	const values = [];
	for await (let { content, index_or_key } of iteratorFromAsyncGenerator) {
		values.push(content);
	}

	expect(values).toStrictEqual(Synchronous.array_input);
});
