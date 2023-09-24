#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';

test('Iterator_Cascade_Callbacks.zip -> Is it possible to zip number and character arrays into Iterator_Cascade_Callbacks instance?', () => {
	const icc_zip = Iterator_Cascade_Callbacks.zip([1, 2, 3], [...'abc']);
	const collection = icc_zip.collect([]);

	const expected = [
		[
			[1, 0],
			['a', 0],
		],
		[
			[2, 1],
			['b', 1],
		],
		[
			[3, 2],
			['c', 2],
		],
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
		[
			[2, 0],
			[18, 0],
		],
		[
			[4, 1],
			[16, 1],
		],
		[
			[6, 2],
			[14, 2],
		],
	];

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks.zip ->', () => {});
