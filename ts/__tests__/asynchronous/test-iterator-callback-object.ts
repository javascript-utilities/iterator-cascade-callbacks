#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Callback_Object } from '../../asynchronous';
import { Yielded_Data } from '../../lib/runtime-types';

import type { Asynchronous, Shared } from '../../../@types/iterator-cascade-callbacks/';
import type { Iterator_Cascade_Callbacks } from '../../asynchronous';

class Test__Callback_Object {
	callback_wrapper: Asynchronous.Callback_Wrapper<any, any, any[], Shared.Index_Or_Key>;
	callback_parameters: any[];
	callback_function: Asynchronous.Callback_Function<any, any, any[], Shared.Index_Or_Key>;

	/**
	 *
	 */
	constructor() {
		this.callback_function = (
			value: any,
			index_or_key: Shared.Index_Or_Key,
			references: Asynchronous.Callback_Function_References<any, any, any[], Shared.Index_Or_Key>,
			parameters: any[]
		) => {
			return Promise.resolve([value, index_or_key]);
		};

		/* Yoinked from `.inspect` */
		this.callback_wrapper = async <
			Value = unknown,
			Result = unknown,
			Parameters extends unknown[] = unknown[],
			Key = Shared.Index_Or_Key
		>(
			callback_object: Asynchronous.Callback_Object<Value, Result, Parameters, Key>,
			iterator_cascade_callbacks: Iterator_Cascade_Callbacks
		) => {
			await (
				callback_object.callback as Asynchronous.Callback_Function<Value, Result, Parameters, Key>
			)(
				iterator_cascade_callbacks.yielded_data.content as Value,
				iterator_cascade_callbacks.yielded_data.index_or_key as Key,
				{ callback_object, iterator_cascade_callbacks },
				...callback_object.parameters
			);
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

			const callback_object = new Callback_Object<any, any, any[], Shared.Index_Or_Key>({
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
