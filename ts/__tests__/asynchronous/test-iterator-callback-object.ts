#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Callback_Object } from '../../asynchronous';
import { Yielded_Data } from '../../lib/runtime-types';

import type { Asynchronous, Shared } from '../../../@types/iterator-cascade-callbacks/';
import type { Iterator_Cascade_Callbacks } from '../../asynchronous';

class Test__Callback_Object {
	callback_wrapper: Asynchronous.Callback_Wrapper;
	callback_parameters: any[];
	callback_function: Asynchronous.Callback_Function;

	/**
	 *
	 */
	constructor() {
		this.callback_function = (
			value: any,
			index_or_key: Shared.Index_Or_Key,
			references: Asynchronous.Callback_Function_References,
			parameters: any[]
		) => {
			return Promise.resolve([value, index_or_key]);
		};

		/* @TODO: Make wrapper behave similar to real wrappers */
		this.callback_wrapper = async (
			callback_object: Callback_Object,
			iterator_cascade_callbacks: Iterator_Cascade_Callbacks
		) => {
			const { content, index_or_key } = iterator_cascade_callbacks.yielded_data;
			const results = await this.callback_function(
				content,
				index_or_key,
				{ iterator_cascade_callbacks, callback_object },
				...callback_object.parameters
			);
			if (results instanceof Yielded_Data) {
				iterator_cascade_callbacks.yielded_data = results;
			} else {
				iterator_cascade_callbacks.yielded_data.content = results;
			}
		};

		this.callback_parameters = ['first', 'second', 'third'];
	}

	/**
	 *
	 */
	runTests() {
		this.testsConstructor();
	}

	/**
	 *
	 */
	testsConstructor() {
		test('Callback_Object.constructor -> Are object properties assigned as designed?', async () => {
			const name = 'noOpp';

			const callback_object = new Callback_Object({
				wrapper: this.callback_wrapper,
				name,
				callback: () => {
					return Promise.reject('Should not be called during runtime');
				},
				parameters: this.callback_parameters,
			});

			expect(callback_object.name).toStrictEqual(name);
			expect(callback_object.parameters).toStrictEqual(this.callback_parameters);
			expect(callback_object.wrapper).toStrictEqual(this.callback_wrapper);
		});

		test('Callback_Object.constructor -> Do `.parameters` default to an empty array if undefined?', async () => {
			const name = 'empty_parameters';

			const callback_object = new Callback_Object({
				wrapper: this.callback_wrapper,
				name,
				/* @ts-ignore: Type 'undefined' is not assignable to type 'any[]'. */
				parameters: undefined,
				callback: this.callback_function,
			});
			expect(callback_object.parameters).toStrictEqual([]);
		});

		// test('Callback_Object.constructor ->', async () => {});
	}
}

const test__callback_object = new Test__Callback_Object();
test__callback_object.runTests();
