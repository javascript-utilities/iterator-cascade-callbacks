#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Iterator_Cascade_Callbacks } from '../iterator-cascade-callbacks';

test('Iterator_Cascade_Callbacks.zipValues -> Will it zip values of `Iterator_Cascade_Callbacks` instances?', () => {
	const icc_one = new Iterator_Cascade_Callbacks([1, 2, 3]);
	const icc_two = new Iterator_Cascade_Callbacks([4, 5, 6]);
	const icc_zip = Iterator_Cascade_Callbacks.zipValues(icc_one, icc_two);

	const collection = icc_zip.collect([]);

	const expected = [
		[1, 4],
		[2, 5],
		[3, 6],
	];

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.zipValues -> Will coerce iterables into `Iterator_Cascade_Callbacks` instances?', () => {
	const icc_zip = Iterator_Cascade_Callbacks.zipValues([1, 2, 3], [...'abc']);
	const collection = icc_zip.collect([]);

	const expected = [
		[1, 'a'],
		[2, 'b'],
		[3, 'c'],
	];

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks.zipValues -> What happens when iterators are uneven in length?', () => {
	const icc_zip = Iterator_Cascade_Callbacks.zipValues([1, 2, 3], [...'ab']);
	const collection = icc_zip.collect([]);

	const expected = [
		[1, 'a'],
		[2, 'b'],
		[3, undefined],
	];

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks.zipValues ->', () => {});
