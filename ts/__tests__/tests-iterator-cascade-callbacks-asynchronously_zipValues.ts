#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';

test('Iterator_Cascade_Callbacks_Asynchronously.zipValues -> Will it zip values of `Iterator_Cascade_Callbacks_Asynchronously` instances?', async () => {
	const icca_one = new Iterator_Cascade_Callbacks_Asynchronously([1, 2, 3]);
	const icca_two = new Iterator_Cascade_Callbacks_Asynchronously([4, 5, 6]);
	const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zipValues(icca_one, icca_two);

	const collection = await icca_zip.collect([]);

	const expected = [
		[1, 4],
		[2, 5],
		[3, 6],
	];

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.zipValues -> Will coerce iterables into `Iterator_Cascade_Callbacks_Asynchronously` instances?', async () => {
	const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zipValues([1, 2, 3], [...'abc']);
	const collection = await icca_zip.collect([]);

	const expected = [
		[1, 'a'],
		[2, 'b'],
		[3, 'c'],
	];

	expect(collection).toStrictEqual(expected);
});

test('Iterator_Cascade_Callbacks_Asynchronously.zipValues -> What happens when iterators are uneven in length?', async () => {
	const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zipValues([1, 2, 3], [...'ab']);
	const collection = await icca_zip.collect([]);

	const expected = [
		[1, 'a'],
		[2, 'b'],
		[3, undefined],
	];

	expect(collection).toStrictEqual(expected);
});

// test('Iterator_Cascade_Callbacks_Asynchronously.zipValues ->', async () => {});
