#!/usr/bin/env node


'use strict';


class Test__Callback_Object {

  /**
   *
   */
  constructor() {
    this.callback_object = require('../iterator-cascade-callbacks').Callback_Object;

    this.callback_wrapper = (callback_object, iterator_cascade_callbacks) => {
      const callback: ICC.Callback_Function = (value, index_or_key, { callback_object, iterator_cascade_callbacks }, paramaters) => {
        return [ value, index_or_key ];
      };

      const [ value, index_or_key ] = (iterator_cascade_callbacks.value as ICC.Yielded_Tuple);
      const results = callback(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...callback_object.parameters);
      if (Array.isArray(results)) {
        iterator_cascade_callbacks.value = (results as ICC.Yielded_Tuple);
      } else {
        iterator_cascade_callbacks.value = [ results, index_or_key ];
      }
    };

    this.callback_paramaters = [ 'first', 'second', 'third' ];
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
    test('testsConstructor -> Are object properties assigned as designed?', () => {
      const name = 'noOpp';

      const callback_object = new this.callback_object(this.callback_wrapper, name, this.callback_paramaters);

      expect(callback_object.name).toStrictEqual(name);
      expect(callback_object.parameters).toStrictEqual(this.callback_paramaters);
      expect(callback_object.wrapper).toStrictEqual(this.callback_wrapper);
    });

    test('testsConstructor -> Do `.paramaters` default to an empty array if undefined?', () => {
      const name = 'empty_paramaters';

      /* @ts-ignore */
      const callback_object = new this.callback_object(this.callback_wrapper, name, undefined);
      expect(callback_object.parameters).toStrictEqual([]);
    });

    // test('testsConstructor ->', () => {});
  }
}


const test__callback_object = new Test__Callback_Object();
test__callback_object.runTests();


/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */

/**
 * Class for testing `Callback_Object`
 */
interface Test__Callback_Object {
  callback_object: ICC.Callback_Object;
  callback_wrapper: ICC.Callback_Wrapper;
  callback_paramaters: any[];
}

