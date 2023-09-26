#!/usr/bin/env node
// vim: noexpandtab

import { Callback_Object, Callback_Object_Asynchronously } from '../lib/callback-objects';

'use strict';


class Test__Callback_Object {
  callback_wrapper: ICC.Callback_Wrapper;
  callback_parameters: any[];

  /**
   *
   */
  constructor() {
    this.callback_wrapper = (callback_object, iterator_cascade_callbacks) => {
      const callback: ICC.Callback_Function = (value, index_or_key, { callback_object, iterator_cascade_callbacks }, parameters) => {
        return [ value, index_or_key ];
      };

      const [ value, index_or_key ] = (iterator_cascade_callbacks.value as Shared.Yielded_Tuple);
      const results = callback(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...callback_object.parameters);
      if (Array.isArray(results)) {
        iterator_cascade_callbacks.value = (results as Shared.Yielded_Tuple);
      } else {
        iterator_cascade_callbacks.value = [ results, index_or_key ];
      }
    };

    this.callback_parameters = [ 'first', 'second', 'third' ];
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
        parameters: this.callback_parameters
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


class Test__Callback_Object_Asynchronously {
  callback_wrapper: ICCA.Callback_Wrapper;
  callback_parameters: any[];

  /**
   *
   */
  constructor() {
    this.callback_wrapper = async (callback_object, iterator_cascade_callbacks) => {
      const callback: ICCA.Callback_Function = (value, index_or_key, { callback_object, iterator_cascade_callbacks }, parameters) => {
        return [ value, index_or_key ];
      };

      const [ value, index_or_key ] = (iterator_cascade_callbacks.value as Shared.Yielded_Tuple);
      const results = await callback(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...callback_object.parameters);
      if (Array.isArray(results)) {
        iterator_cascade_callbacks.value = (results as Shared.Yielded_Tuple);
      } else {
        iterator_cascade_callbacks.value = [ results, index_or_key ];
      }
    };

    this.callback_parameters = [ 'first', 'second', 'third' ];
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
    test('Callback_Object_Asynchronously.constructor -> Are object properties assigned as designed?', async () => {
      const name = 'noOpp';

      const callback_object = new Callback_Object_Asynchronously(this.callback_wrapper, name, this.callback_parameters);

      expect(callback_object.name).toStrictEqual(name);
      expect(callback_object.parameters).toStrictEqual(this.callback_parameters);
      expect(callback_object.wrapper).toStrictEqual(this.callback_wrapper);
    });

    test('Callback_Object_Asynchronously.constructor -> Do `.parameters` default to an empty array if undefined?', async () => {
      const name = 'empty_parameters';

      /* @ts-ignore */
      const callback_object = new Callback_Object_Asynchronously(this.callback_wrapper, name, undefined);
      expect(callback_object.parameters).toStrictEqual([]);
    });

    // test('Callback_Object_Asynchronously.constructor ->', async () => {});
  }
}


const test__callback_object = new Test__Callback_Object();
test__callback_object.runTests();

const test__callback_object_asynchronously = new Test__Callback_Object_Asynchronously();
test__callback_object_asynchronously.runTests();

