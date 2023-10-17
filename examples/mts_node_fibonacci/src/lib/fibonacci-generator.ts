// vim: noexpandtab

'use strict';

/**
 * Generator that produces Fibonacci sequence
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators}
 */
export function* fibonacciGenerator(): Generator<number, void, unknown> {
	let current = 0;
	let next = 1;
	while (true) {
		let reset = yield current;
		[current, next] = [next, next + current];
		if (reset) {
			current = 0;
			next = 1;
		}
	}
}
