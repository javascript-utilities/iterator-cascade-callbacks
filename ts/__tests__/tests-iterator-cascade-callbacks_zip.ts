#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';

test('Iterator_Cascade_Callbacks.zip -> Is it possible to zip number and character arrays into Iterator_Cascade_Callbacks instance?', () => {
	const icc_zip = Iterator_Cascade_Callbacks.zip([1, 2, 3], [...'abc']);
	const collection = icc_zip.collect([]);

	const expected = [
		[1, 'a'],
		[2, 'b'],
		[3, 'c'],
	];

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.zip -> Is it possible to zip instances of Iterator_Cascade_Callbacks?', () => {
	const icc_one = new Iterator_Cascade_Callbacks([1, 2, 3]);
	icc_one.map((value) => {
		return value * 2;
	});

	const icc_two = new Iterator_Cascade_Callbacks([9, 8, 7]);
	icc_two.map((value) => {
		return value * 2;
	});

	const icc_zip = Iterator_Cascade_Callbacks.zip(icc_one, icc_two);
	const collection = icc_zip.collect([]);

	const expected = [
		[2, 18],
		[4, 16],
		[6, 14],
	];

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks.zip ->', () => {});
