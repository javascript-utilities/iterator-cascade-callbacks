#!/usr/bin/env node

'use strict';

import { Iterator_Cascade_Callbacks_Asynchronously } from '../iterator-cascade-callbacks-asynchronously';

test('Iterator_Cascade_Callbacks_Asynchronously.zip -> Is it possible to zip number and character arrays into Iterator_Cascade_Callbacks_Asynchronously instance?', async () => {
	const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zip([1, 2, 3], [...'abc']);

	const collection = await icca_zip.collect([]);

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

test('Iterator_Cascade_Callbacks_Asynchronously.zip -> Is it possible to zip instances of Iterator_Cascade_Callbacks_Asynchronously?', async () => {
	const icca_one = new Iterator_Cascade_Callbacks_Asynchronously([1, 2, 3]);
	icca_one.map((value) => {
		return value * 2;
	});

	const icca_two = new Iterator_Cascade_Callbacks_Asynchronously([9, 8, 7]);
	icca_two.map((value) => {
		return value * 2;
	});

	const icca_zip = Iterator_Cascade_Callbacks_Asynchronously.zip(icca_one, icca_two);
	const collection = await icca_zip.collect([]);

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

// test('Iterator_Cascade_Callbacks_Asynchronously.zip ->', async () => {});
