#!/usr/bin/env node
// vim: noexpandtab

'use strict';

import { Callback_Object, Wrappers } from '../../synchronous';
import { Yielded_Data } from '../../lib/runtime-types';

import type {
	Shared,
	Synchronous as Synchronous_Types,
} from '../../../@types/iterator-cascade-callbacks/';

class Test__Callback_Object {
	callback_parameters: unknown[];

	/**
	 *
	 */
	constructor() {
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

			const wrapper = Wrappers.map;

			const callback_object = new Callback_Object<unknown, unknown, unknown[], unknown>({
				wrapper,
				name,
				callback: () => {},
				parameters: this.callback_parameters,
			});

			expect(callback_object.name).toStrictEqual(name);
			expect(callback_object.parameters).toStrictEqual(this.callback_parameters);
			expect(callback_object.wrapper).toStrictEqual(wrapper);
		});

		test('Callback_Object.constructor -> Do `.parameters` default to an empty array if undefined?', () => {
			const name = 'empty_parameters';
			const wrapper = Wrappers.map;

			const callback_object = new Callback_Object({
				wrapper,
				name,
				callback: () => {},
				/* @ts-ignore: Type 'undefined' is not assignable to type 'any[]'. */
				parameters: undefined,
			});

			expect(callback_object.parameters).toStrictEqual([]);
		});

		// test('Callback_Object.constructor ->', () => {});
	}
}

const test__callback_object = new Test__Callback_Object();
test__callback_object.runTests();
