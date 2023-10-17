// vim: noexpandtab

import { Iterator_Cascade_Callbacks } from '@javascript-utilities/iterator-cascade-callbacks/synchronous';

'use strict';

class Counter {
	constructor(value = -1) {
		this.value = value;
		this.done = false;
	}

	next() {
		this.value++;
		return this;
	}

	[Symbol.iterator]() {
		return this;
	}
}

window.addEventListener('load', () => {
	const output_text__results = document.getElementById('output-text__results');

	const input_text__counter__start = document.getElementById('input-text__counter__start');
	const code__span__counter__start = document.getElementById('code__span__counter__start');

	const input_text__filter_modulo = document.getElementById('input-text__filter_modulo');
	const code__span__filter_modulo = document.getElementById('code__span__filter_modulo');

	const input_text__map_multiplier = document.getElementById('input-text__map_multiplier');
	const code__span__map_multiplier = document.getElementById('code__span__map_multiplier');

	const input_text__take_amount = document.getElementById('input-text__take_amount');
	const code__span__take_amount = document.getElementById('code__span__take_amount');

	const button__iterate = document.getElementById('button__iterate');
	button__iterate.addEventListener('click', () => {
		console.error('CLICKED!');
		/**
		 * Parse inputs
		 */
		let count_start = input_text__counter__start.value;
		if (isNaN(count_start)) {
			count_start = 0;
			input_text__counter__start = count_start;
		}
		code__span__counter__start.innerText = count_start;

		let filter_modulo = Number(input_text__filter_modulo.value);
		if (isNaN(filter_modulo)) {
			filter_modulo = 1;
			input_text__filter_modulo.value = filter_modulo;
		}
		code__span__filter_modulo.innerText = filter_modulo;

		let map_multiplier = Number(input_text__map_multiplier.value);
		if (isNaN(map_multiplier)) {
			map_multiplier = 1;
			input_text__map_multiplier.value = map_multiplier;
		}
		code__span__map_multiplier.innerText = map_multiplier;

		let take_amount = Number(input_text__take_amount.value);
		if (isNaN(take_amount)) {
			take_amount = 1;
			input_text__take_amount.value = take_amount;
		}
		code__span__take_amount.innerText = take_amount;

		const counter = new Counter(count_start);
		const icc = new Iterator_Cascade_Callbacks(counter);

		icc
			.filter((value) => {
				return value % filter_modulo === 0;
			})
			.map((value) => {
				return value * map_multiplier;
			})
			.take(take_amount);

		const collection = icc.collect([]);

		console.log('collection ->', collection);
		const results = `[ ${collection.join(', ')} ]`;
		output_text__results.value = results;
	});
});
