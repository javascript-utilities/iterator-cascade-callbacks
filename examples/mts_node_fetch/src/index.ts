// vim: noexpandtab

import { Asynchronous } from '@javascript-utilities/iterator-cascade-callbacks';

import type { Asynchronous as Asynchronous_Types } from '@javascript-utilities/iterator-cascade-callbacks';

import { mockFetch as fetch } from './lib/mock-fetch';

import { repeatArray } from './lib/repeat-array';

const database_urls = [
	'http://localhost:8080/mock/us-east/status',
	'http://localhost:8081/mock/us-west/status',
];

(async () => {
	const iterable = repeatArray(database_urls);

	/**
	 * @notes
	 * - `.limit`   ⇒  Stop regardless of success when amount is reached
	 * - `.map`     ⇒  Return error/result variants as an Object 
	 * - `.filter`  ⇒  Ignore error variant
	 * - `.map`     ⇒  Extract JSON Promise from ok variant
	 * - `.take`    ⇒  Pause upon first successful fetch
	 */
	const icca = new Asynchronous.Iterator_Cascade_Callbacks(iterable)
		.limit(5)
		.map((url: string) => {
			return fetch(url)
				.then((result) => {
					return { result };
				})
				.catch((error) => {
					return { error };
				});
		})
		.filter((response: { error?: unknown; ok?: unknown }) => {
			return Object.hasOwn(response, 'result');
		})
		.map((response: { result: { json: () => Promise<JSON> } }) => {
			return response.result.json();
		})
		.take(1);

	/* Request from `database_urls` until the first success or report failure */
	const data = await icca.next().then(({ value }) => {
		if (!value) {
			throw new Error('Failed all fetches');
		}
		return value;
	});

	console.log({ data });
	//> { chance: 4, url: 'http://localhost:8080/mock/us-east/status' }
	//> { chance: 3, url: 'http://localhost:8081/mock/us-west/status' }
	//> { data: { body: "rockin'" } }
})();
