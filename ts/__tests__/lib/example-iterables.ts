#!/usr/bin/env node
// vim: noexpandtab

'use strict';

/**
 *
 */
class Count_Iterator {
	value: number;
	done: boolean;

	constructor(value: number = -1) {
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

/**
 *
 */
class Count_Iterator_Asynchronously {
	value: number;
	done: boolean;

	constructor(value: number = -1) {
		this.value = value;
		this.done = false;
	}

	async next() {
		this.value++;
		return this;
	}

	[Symbol.asyncIterator]() {
		return this;
	}
}

const Synchronous = {
	array_input: Array(20)
		.fill(undefined)
		.map((_, i) => i),
	class_input: Count_Iterator,
	generator_input: function* () {
		for (let value of this.array_input) {
			yield value;
		}
	},
	iterator_input: (function* () {
		for (let value of this.array_input) {
			yield value;
		}
	})(),
	object_input: { spam: 'flavored', canned: 'ham' },
	string_input: 'abcdefg',
	Count_Iterator,
};

const Asynchronous = {
	generator_input: async function* (input?: any[]) {
		if (!input) {
			input = Synchronous.array_input;
		}

		for await (let value of input as any[]) {
			yield value;
		}
	},
	iterator_input: (function* () {
		for (let value of Synchronous.array_input) {
			yield value;
		}
	})(),
	class_input: Count_Iterator_Asynchronously,
};

/* istanbul ignore next */
if (typeof module !== 'undefined') {
	exports = module.exports = {
		Synchronous,
		Asynchronous,
	};
}

export { Synchronous, Asynchronous };
