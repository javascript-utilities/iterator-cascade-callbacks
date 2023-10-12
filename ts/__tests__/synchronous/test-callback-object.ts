#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Callback_Object } from '../../synchronous';
import { Yielded_Data } from '../../lib/runtime-types';

import type {
	Shared,
	Synchronous as Synchronous_Types,
} from '../../../@types/iterator-cascade-callbacks/';

class Test__Callback_Object {
	callback_wrapper: Synchronous_Types.Callback_Wrapper;
	callback_parameters: any[];

	/**
	 *
	 */
	constructor() {
		this.callback_wrapper = (callback_object, iterator_cascade_callbacks) => {
			const callback: Synchronous_Types.Callback_Function = (
				value,
				index_or_key,
				{ callback_object, iterator_cascade_callbacks },
				parameters
			) => {
				return [value, index_or_key];
			};

			const { value, index_or_key } = iterator_cascade_callbacks.yielded_data;
			const results = callback(
				value,
				index_or_key,
				{ callback_object, iterator_cascade_callbacks },
				...callback_object.parameters
			);
			if (results instanceof Yielded_Data) {
				iterator_cascade_callbacks.yielded_data = results;
			} else {
				iterator_cascade_callbacks.yielded_data.value = results;
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
		test('Callback_Object.constructor -> Are object properties assigned as designed?', () => {
			const name = 'noOpp';

			const callback_object = new Callback_Object({
				wrapper: this.callback_wrapper,
				name,
				callback: () => {},
				parameters: this.callback_parameters,
			});

			expect(callback_object.name).toStrictEqual(name);
			expect(callback_object.parameters).toStrictEqual(this.callback_parameters);
			expect(callback_object.wrapper).toStrictEqual(this.callback_wrapper);
		});

		test('Callback_Object.constructor -> Do `.parameters` default to an empty array if undefined?', () => {
			const name = 'empty_parameters';

			/* @ts-ignore */
			const callback_object = new Callback_Object(this.callback_wrapper, name, undefined);
			expect(callback_object.parameters).toStrictEqual([]);
		});

		// test('Callback_Object.constructor ->', () => {});
	}
}

const test__callback_object = new Test__Callback_Object();
test__callback_object.runTests();
