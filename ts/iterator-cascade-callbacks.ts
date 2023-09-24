'use strict';

import { Callback_Object } from './lib/callback-objects.js';
import { Stop_Iteration, Pause_Iteration } from './lib/errors.js';
import { Iterator_From } from './lib/iterator-from.js';
import { GeneratorFunction, AsyncGeneratorFunction, Static_Contract } from './lib/runtime-types.js';


/**
 * Iterator that chains callback function execution
 * @author S0AndS0
 * @license AGPL-3.0
 */
@Static_Contract<ICC.Iterator_Cascade_Callbacks__Static<Iterator_Cascade_Callbacks>>()
class Iterator_Cascade_Callbacks implements Iterator_Cascade_Callbacks {
  /**
   * Instantiates new instance of `Iterator_Cascade_Callbacks` from `iterable` input
   * @param {any} iterable - Currently may be an array, object, generator, or iterator type
   */
  constructor(iterable: any) {
    this.done = false;
    this.value = [undefined, NaN];
    this.callbacks = [];
    this.state = {
      paused: false,
      resumed: false,
    };

    if (Array.isArray(iterable)) {
      /**
       * iterable: [ 9, 8, 7 ]
       */
      this.iterator = Iterator_From.array(iterable);
    } else if (iterable instanceof GeneratorFunction) {
      /**
       * iterable: function* () { for (let value of [6, 5, 4]) { yield value; } }
       */
      this.iterator = Iterator_From.generator((iterable as Shared.Generator_Function_Instance)());
    } else if (typeof iterable === 'object') {
      // console.trace('Iterator_Cascade_Callbacks constructor detected Object', { iterable });
      if (typeof (iterable as Generator<unknown, any, unknown>)[Symbol.iterator] === 'function' ) {
        /**
         * iterable: new class { [Symbol.iterable]() { return this; } }
         * iterable: (function* () { for (let value of [6, 5, 4]) { yield value; } })()
         */
        this.iterator = Iterator_From.generator((iterable as Generator<unknown, any, unknown>)[Symbol.iterator]());
     } else {
        /**
         * iterable: { key: 'value', spam: 'flavored' }
         */
        this.iterator = Iterator_From.object(iterable);
      }
    } else if (typeof (iterable as Generator<unknown, any, unknown>)[Symbol.iterator] === 'function') {
      /**
       * iterable: 'abcdefg'
       */
      this.iterator = Iterator_From.generator((iterable as Generator<unknown, any, unknown>)[Symbol.iterator]());
    } else {
      throw new TypeError(`Unsuported type of iterable -> ${typeof iterable}`);
    }
  }

  /**
   * Returns new instance of `Iterator_Cascade_Callbacks` that yields lists of either `Yielded_Tuple` or `undefined` results
   * @param {any[]} iterables - List of Generators, Iterators, and/or instances of `Iterator_Cascade_Callbacks`
   * @notes
   * - Parameters that are not an instance of `Iterator_Cascade_Callbacks` will be converted
   * - Iteration will continue until **all** iterables result in `done` value of `true`
   * @example - Equal Length Iterables
   * const icc_one = new Iterator_Cascade_Callbacks([1, 2, 3]);
   * const icc_two = new Iterator_Cascade_Callbacks([4, 5, 6]);
   *
   * const icc_zip = Iterator_Cascade_Callbacks.zip(icc_one, icc_two);
   *
   * for (let [results, count] of icc_zip) {
   *   console.log('results ->', results, '| count ->', count);
   * }
   * //> results -> [ [ 1, 0 ], [ 4, 0 ] ] | count -> 0
   * //> results -> [ [ 2, 1 ], [ 5, 1 ] ] | count -> 1
   * //> results -> [ [ 3, 2 ], [ 6, 2 ] ] | count -> 2
   * @example - Unequal Length Iterables
   * const icc_three = new Iterator_Cascade_Callbacks([7, 8, 9]);
   * const icc_four = new Iterator_Cascade_Callbacks([10, 11]);
   *
   * const icc_zip = Iterator_Cascade_Callbacks.zip(icc_three, icc_four);
   *
   * for (let [results, count] of icc_zip) {
   *   console.log('results ->', results, '| count ->', count);
   * }
   * //> results -> [ [ 9, 0 ], [ 10, 0 ] ] | count -> 2
   * //> results -> [ [ 8, 1 ], [ 11, 1 ] ] | count -> 1
   * //> results -> [ [ 7, 2 ], undefined ] | count -> 0
   */
  static zip(...iterables: any[]): Iterator_Cascade_Callbacks {
    const zip_wrapper = function* (iterables: any[], iterator_cascade_callbacks: InstanceType<any>): IterableIterator<(Shared.Yielded_Tuple | undefined)[]>  {
      const iterators = iterables.map((iterable) => {
        if (iterable instanceof iterator_cascade_callbacks) {
          return iterable;
        }
        return new iterator_cascade_callbacks(iterable);
      });

      while (true) {
        const results: Shared.Yielded_Result[] = iterators.map((iterator) => {
          return iterator.next();
        });

        if (results.every(({done}) => done === true)) {
          break;
        }

        const values = results.map(({value}) => {
          return value;
        });

        yield values;
      }
    };

    return new this(zip_wrapper(iterables, this));
  }

  /*
   * Returns new instance of `Iterator_Cascade_Callbacks` that yields either list of values from iterators or `undefined` results
   * @param {any[]} iterables - List of Generators, Iterators, and/or instances of `Iterator_Cascade_Callbacks`
   * @notes
   * - Parameters that are not an instance of `Iterator_Cascade_Callbacks` will be converted
   * - Iteration will continue until **all** iterables result in `done` value of `true`
   * @example - Equal Length Iterables
   * const icc_one = new Iterator_Cascade_Callbacks([1, 2, 3]);
   * const icc_two = new Iterator_Cascade_Callbacks([4, 5, 6]);
   *
   * const icc_zip = Iterator_Cascade_Callbacks.zip(icc_one, icc_two);
   *
   * for (let [results, count] of icc_zip) {
   *   console.log('results ->', results, '| count ->', count);
   * }
   * //> results -> [ 1, 4 ] | count -> 0
   * //> results -> [ 2, 5 ] | count -> 1
   * //> results -> [ 3, 6 ] | count -> 2
   * @example - Unequal Length Iterables
   * const icc_three = new Iterator_Cascade_Callbacks([7, 8, 9]);
   * const icc_four = new Iterator_Cascade_Callbacks([10, 11]);
   *
   * const icc_zip = Iterator_Cascade_Callbacks.zip(icc_three, icc_four);
   *
   * for (let [results, count] of icc_zip) {
   *   console.log('results ->', results, '| count ->', count);
   * }
   * //> results -> [ 9, 10 ] | count -> 2
   * //> results -> [ 8, 11 ] | count -> 1
   * //> results -> [ 7, undefined ] | count -> 0
   */
  static zipValues(...iterables: any[]): Iterator_Cascade_Callbacks {
    const zip_values_wrapper = function* (iterables: any[], iterator_cascade_callbacks: InstanceType<any>): IterableIterator<(any[] | undefined)> {
      const iterators = iterables.map((iterable) => {
        if (iterable instanceof iterator_cascade_callbacks) {
          return iterable;
        }
        return new iterator_cascade_callbacks(iterable);
      });

      while (true) {
        const results: Shared.Yielded_Result[] = iterators.map((iterator) => {
          return iterator.next();
        });

        if (results.every(({done}) => done === true)) {
          break;
        }

        const values = results.map(({value}) => {
          if (Array.isArray(value)) {
            return value[0];
          }
          return value;
        });

        yield values;
      }
    };

    return new this(zip_values_wrapper(iterables, this));
  }

  /**
   * Converts list of `this.callbacks` objects to `GeneratorFunction`
   * @this {Iterator_Cascade_Callbacks}
   * @yields {Callback_Object}
   */
  *iterateCallbackObjects(): IterableIterator<ICC.Callback_Object> {
    for (const callback of this.callbacks) {
      yield callback;
    }
  }

  /**
   * Collects results from `this` to either an Array or Object
   * @param {any[]|Object|any} target - When target is Array values are pushed, when target is Object key value pares are assigned, callback is required for other types
   * @param {Collect_To_Function?|number?} callback_or_amount - Callback function for collecting to custom type, or number to limit collection to
   * @param {number?} amount - Limit collection to no more than amount
   * @return {any[]|Object|any}
   * @throws {TypeError}
   * @this {Iterator_Cascade_Callbacks}
   */
  collect(
    target: (any[] | Shared.Dictionary | any),
    callback_or_amount?: (ICC.Collect_To_Function | number),
    amount?: number
  ): (any[] | Shared.Dictionary | undefined)
  {
    if (typeof callback_or_amount === 'function') {
      return this.collectToFunction(target, callback_or_amount, amount);
    } else if (Array.isArray(target)) {
      return this.collectToArray(target, (callback_or_amount as number));
    } else if (typeof target === 'object') {
      return this.collectToObject(target, (callback_or_amount as number));
    } else {
      throw new TypeError(`Unsuported type for collect target -> ${typeof target}`);
    }
  }

  /**
   * Collects results from `this.next()` to an Array
   * @param {any[]} target - Array to push collected values to
   * @param {number?} amount - Limit collection to no more than amount
   * @return {any[]}
   * @this {Iterator_Cascade_Callbacks}
   * @example
   * const icc = new Iterator_Cascade_Callbacks([5, 6, 7, 8, 9]);
   *
   * const collection = icc.filter((value) => {
   *   return value % 2 === 0;
   * }).collectToArray([1, 2, 3]);
   *
   * console.log(collection);
   * //> [ 1, 2, 3, 6, 8 ]
   */
  collectToArray(target: any[], amount?: number): any[] {
    let count = 0;
    for (const results of this) {
      const [ value, index ] = (results as Shared.Yielded_Tuple);
      target.push(value);
      count++;
      if (count >= (amount as number)) {
        break;
      }
    }
    return target;
  }

  /**
   * Collects results from `this.next()` to a callback function target
   * @param {any} target - Any object or primitive, will be passed to `callback` function along with `value` and `index_or_key`
   * @param {Function} callback - Custom callback function for collecting iterated values
   * @param {number?} amount - Limit collection to no more than amount
   * @return {any} target - The object that callback function has mutated
   * @this {Iterator_Cascade_Callbacks}
   * @example
   * const icc = new Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
   *
   * const map = new Map();
   *
   * const collection = icc.collectToFunction(map, (target, value, index_or_key) => {
   *   target.set(index_or_key, value);
   * });
   *
   * console.log(collection);
   * //> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
   */
  collectToFunction(target: any, callback: ICC.Collect_To_Function, amount?: number): any {
    let count = 0;
    for (const results of this) {
      const [ value, index_or_key ] = (results as Shared.Yielded_Tuple);
      callback(target, value, index_or_key, this);
      count++;
      if (count >= (amount as number)) {
        break;
      }
    }
    return target;
  }

  /**
   * Collects results from `this.next()` to an Object
   * @param {Object} target - Dictionary like object to assign key value pares to
   * @param {number?} amount - Limit collection to no more than amount
   * @return {Object}
   * @this {Iterator_Cascade_Callbacks}
   * @example
   * const icc = new Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
   *
   * const collection = icc.collectToObject({});
   *
   * console.log(collection);
   * //> { spam: 'flavored', canned: 'ham' }
   */
  collectToObject(target: Shared.Dictionary, amount?: number): Shared.Dictionary {
    let count = 0;
    for (const results of this) {
      const [ value, key ] = (results as Shared.Yielded_Tuple);
      target[key] = value;
      count++;
      if (count >= (amount as number)) {
        break;
      }
    }
    return target;
  }

  /**
   * Returns new instance of `Iterator_Cascade_Callbacks` with copy of callbacks
   * @param {any} iterable - Any compatible iterable object, iterator, or generator
   * @return {Iterator_Cascade_Callbacks}
   * @notes
   * - New instance will share references to callback wrapper functions
   * @example
   * const iterable_one = [1, 2, 3, 4, 5];
   * const iterable_two = [9, 8, 7, 6, 5];
   *
   * const icc_one = new Iterator_Cascade_Callbacks(iterable_one);
   *
   * icc_one.filter((value) => {
   *   return value % 2 === 0;
   * }).map((evens) => {
   *   return evens / 2;
   * });
   *
   * const icc_two = icc_one.copyCallbacksOnto(iterable_two);
   *
   * console.log('Collection One ->', icc_one.collect([]));
   * //> [ 1, 2 ]
   * console.log('Collection Two ->', icc_two.collect([]));
   * //> [ 4, 3 ]
   */
  copyCallbacksOnto(iterable: any): Iterator_Cascade_Callbacks {
    const icc = new this.constructor(iterable);

    icc.callbacks = this.callbacks.map((callback_object) => {
      const callback_wrapper = callback_object.wrapper;
      return new Callback_Object(callback_wrapper, callback_object.name, callback_object.parameters);
    });

    return icc;
  }

  /**
   * Sets `this.value` if callback function returns _truthy_, else consumes `this.iterator` and recomputes value for callback to test
   * @param {Callback_Function} callback - Function that determines truth of `value` and/or `index_or_key` for each iteration
   * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
   * @return {this}
   * @this {Iterator_Cascade_Callbacks}
   * @example
   * const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
   *
   * const collection = icc.filter((value) => {
   *   return value % 2 === 0;
   * }).collect([]);
   *
   * console.log(collection);
   * //> [ 8, 6 ]
   */
  filter(callback: ICC.Callback_Function, ...parameters: any[]): Iterator_Cascade_Callbacks {
    /**
     * @function filter_wrapper
     * @type {Callback_Wrapper}
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     */
    const filter_wrapper: ICC.Callback_Wrapper = (callback_object, iterator_cascade_callbacks) => {
      const { parameters } = callback_object;
      let [ value, index_or_key ] = (iterator_cascade_callbacks.value as Shared.Yielded_Tuple);
      let results = callback(value, index_or_key, { iterator_cascade_callbacks, callback_object }, ...parameters);
      if (results) {
        return;
      }

      let next_data: { value: Shared.Yielded_Tuple, done: boolean } = { value: [undefined, NaN], done: false };
      while (!results) {
        next_data = iterator_cascade_callbacks.iterator.next();
        iterator_cascade_callbacks.value = next_data.value;
        iterator_cascade_callbacks.done = next_data.done;
        if (iterator_cascade_callbacks.done) {
          throw new Stop_Iteration('this.filter says this.iterator is done');
        }

        const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
        for (const callback_other of iterate_callbacks) {
          if (callback_other === callback_object) {
            [ value, index_or_key ] = iterator_cascade_callbacks.value;
            results = callback(value, index_or_key, { iterator_cascade_callbacks, callback_object }, ...parameters);
            if (results) {
              return;
            }
            break;
          }
          callback_other.call(iterator_cascade_callbacks);
          [ value, index_or_key ] = iterator_cascade_callbacks.value;
          results = callback(value, index_or_key, { iterator_cascade_callbacks, callback_object }, ...parameters);
        }
      }
    };

    return this.pushCallbackWrapper(filter_wrapper, 'filter', ...parameters);
  }

  /**
   * Executes callback for each iteration
   * @param {Callback_Function} callback - Function that generally does not mutate `value` or `index_or_key` for `Iterator_Cascade_Callbacks` instance
   * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
   * @notes
   * - If mutation of `value` or `index_or_key` are desired then `map` is a better option
   * - No protections are in place to prevent mutation of `value` or `index_or_key` Objects
   * @example
   * const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
   *
   * const collection = icc.forEach((value) => {
   *   console.log(value);
   * }).collect([]);
   *
   * console.log(collection);
   * //> [ 9, 8, 7, 6, 5 ]
   */
  forEach(callback: ICC.Callback_Function, ...parameters: any[]): Iterator_Cascade_Callbacks {
    /**
     * @function for_each_wrapper
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     */
    const for_each_wrapper: ICC.Callback_Wrapper = (callback_object, iterator_cascade_callbacks) => {
      const { parameters } = callback_object;
      const [ value, index_or_key ] = (iterator_cascade_callbacks.value as Shared.Yielded_Tuple);
      callback(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...parameters);
    };

    return this.pushCallbackWrapper(for_each_wrapper, 'forEach', ...parameters);
  }

  /**
   * Useful for debugging and inspecting iteration state
   * @param {Callback_Function} callback - Function that logs something about each iteration
   * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
   * @example
   * function inspector(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...parameters) {
   *   console.log('value ->', value);
   *   console.log('index_or_key ->', index_or_key);
   *   console.log('callback_object ->', callback_object);
   *   console.log('iterator_cascade_callbacks ->', iterator_cascade_callbacks);
   * }
   *
   * const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
   *
   * const collection = icc.filter((value) => {
   *   return value % 2 === 0;
   * }).inspect(inspector).map((even) => {
   *   return even / 2;
   * }).inspect(inspector).collect([]);
   */
  inspect(callback: ICC.Callback_Function, ...parameters: any[]): Iterator_Cascade_Callbacks {
    const inspect_wrapper: ICC.Callback_Wrapper = (callback_object, iterator_cascade_callbacks) => {
      const { parameters } = callback_object;
      const [ value, index_or_key ] = (iterator_cascade_callbacks.value as Shared.Yielded_Tuple);
      callback(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...parameters);
    };

    return this.pushCallbackWrapper(inspect_wrapper, 'inspect', ...parameters);
  }

  /**
   * Stops iteration when limit is reached
   * @param {number} amount - Max number of values to compute
   * @return {this}
   * @throws {Stop_Iteration}
   * @this {Iterator_Cascade_Callbacks}
   * @notes
   * - Useful when iterating over data of indeterminate, or infinite, length
   * - More predictable if ordered at the end of `this.callbacks` list
   * - Callbacks exist when `amount` is reached will be called prior to throwing `Stop_Iteration`
   * @example
   * const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);
   *
   * const collection = icc.limit(2).collect([]);
   *
   * console.log(collection);
   * //> [1, 2]
   */
  limit(amount: number): Iterator_Cascade_Callbacks {
    /**
     * @function limit_wrapper
     * @type {Callback_Wrapper}
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     */
    const limit_wrapper: ICC.Callback_Wrapper = (callback_object, iterator_cascade_callbacks) => {
      if (isNaN(callback_object.storage.count)) {
        callback_object.storage.count = 0;
      }

      callback_object.storage.count++;

      if (callback_object.storage.count > amount) {
        const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
        let found_self = false;
        for (const callback_other of iterate_callbacks) {
          if (found_self) {
            callback_other.call(iterator_cascade_callbacks);
          }
          /* istanbul ignore next */
          else if (callback_other === callback_object) {
            found_self = true;
          }
        }

        throw new Stop_Iteration('this.limit says amount has been reached');
      }
    }

    return this.pushCallbackWrapper(limit_wrapper, 'limit');
  }

  /**
   * Applies `callback` to modify `value` and/or `index_or_key` for each iteration
   * @param {Callback_Function} callback - Function may modify `value` and/or `index_or_key`
   * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
   * @return {this}
   * @this {Iterator_Cascade_Callbacks}
   * @notes
   * - If callback does **not** return `Yielded_Tuple` (array), then results from callback are used as `value` and initial `index_or_key` is reused
   * @example
   * const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);
   *
   * const collection = icc.filter((value) => {
   *   return value % 2 === 0;
   * }).map((value) => {
   *   return value / 2;
   * }).collect([]);
   *
   * console.log(collection);
   * //> [4, 3]
   */
  map(callback: ICC.Callback_Function, ...parameters: any[]): Iterator_Cascade_Callbacks {
    /**
     * @function map_wrapper
     * @type {Callback_Wrapper}
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     */
    const map_wrapper: ICC.Callback_Wrapper = (callback_object, iterator_cascade_callbacks) => {
      const { parameters } = callback_object;
      const [ value, index_or_key ] = (iterator_cascade_callbacks.value as Shared.Yielded_Tuple);
      const results = callback(value, index_or_key, { iterator_cascade_callbacks, callback_object }, ...parameters);
      if (Array.isArray(results) && results.length === 2) {
        iterator_cascade_callbacks.value = (results as Shared.Yielded_Tuple);
      } else {
        iterator_cascade_callbacks.value = [results, index_or_key];
      }
    }

    return this.pushCallbackWrapper(map_wrapper, 'map', ...parameters);
  }

  /**
   * Updates `this.value` from chaining `this.callbacks` list, and `this.done` from `this.iterator.next()`
   * @return {this}
   * @this {Iterator_Cascade_Callbacks}
   * @example
   * const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);
   *
   * for (let [value, index_or_key] of icc) {
   *   console.log('index_or_key ->', index_or_key, 'value ->', value);
   * }
   * //> index_or_key -> 0 value -> 1
   * //> index_or_key -> 1 value -> 2
   * //> index_or_key -> 2 value -> 3
   * //> index_or_key -> 3 value -> 4
   */
  next(): Iterator_Cascade_Callbacks {
    if (this.state.paused) {
      this.done = false;
      this.state.paused = false;
      this.state.resumed = true;
      return this;
    }

    const yielded_result: Shared.Yielded_Result = this.iterator.next();
    this.done = yielded_result.done;
    this.value = yielded_result.value;

    if (!this.done) {
      for (const callback_object of this.callbacks) {
        try {
          callback_object.call(this);
        } catch (error) {
          if (error instanceof Stop_Iteration) {
            this.done = true;
            this.value = undefined;
            return this;
          } else if (error instanceof Pause_Iteration) {
            this.done = true;
            this.state.paused = true;
            this.state.resumed = false;
            return this;
          }
          throw error;
        }
      }
    }

    return this;
  }

  /**
   * Returns, and removes, last `Callback_Object` from `this.callbacks` list
   * @return {Callback_Object?}
   * @this {Iterator_Cascade_Callbacks}
   */
  popCallbackObject(): (ICC.Callback_Object | undefined) {
    return this.callbacks.pop();
  }

  /**
   * Removes last `Callback_Object` from `this.callbacks` list and returns `Callback_Wrapper` function
   * @return {Callback_Wrapper?}
   * @this {Iterator_Cascade_Callbacks}
   */
  popCallbackWrapper(): (ICC.Callback_Wrapper | undefined) {
    const callback_object = this.popCallbackObject();
    if (callback_object !== undefined) {
      return callback_object.wrapper;
    }
  }

  /**
   * Instantiates `Callback_Object` with callback_wrapper and pushes to `this.callbacks` via `this.pushCallbackObject`
   * @param {Callback_Wrapper} callback_wrapper - Wrapper for callback function that parses inputs and outputs
   * @param {string} name - Callback wrapper name
   * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
   * @return {this}
   * @this {Iterator_Cascade_Callbacks}
   */
  pushCallbackWrapper(callback_wrapper: ICC.Callback_Wrapper, name: string, ...parameters: any[]): Iterator_Cascade_Callbacks {
    const callback_object = new Callback_Object(callback_wrapper, name, parameters);
    return this.pushCallbackObject(callback_object);
  }

  /**
   * Pushes `Callback_Object` to `this.callbacks` then returns reference to instance of `Iterator_Cascade_Callbacks`
   * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
   * @return {this}
   * @this {Iterator_Cascade_Callbacks}
   */
  pushCallbackObject(callback_object: ICC.Callback_Object): Iterator_Cascade_Callbacks {
    this.callbacks.push(callback_object);
    return this;
  }

  /**
   * Skip number of iterations
   * @param {number} amount - Number of iterations to skip past
   * @return {this}
   * @this {Iterator_Cascade_Callbacks}
   * @example
   * const icc = new Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);
   *
   * const collection = icc.skip(2).collect([]);
   *
   * console.log(collection);
   * //> [ 2, 3, 4, 5 ]
   */
  skip(amount: number): Iterator_Cascade_Callbacks {
    /**
     * @function skip_wrapper
     * @type {Callback_Wrapper}
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     */
    const skip_wrapper: ICC.Callback_Wrapper = (callback_object, iterator_cascade_callbacks) => {
      if (isNaN(callback_object.storage.count)) {
        callback_object.storage.count = 0;
      }

      let next_data: { value: Shared.Yielded_Tuple, done: boolean } = { value: [undefined, NaN], done: false };
      while (callback_object.storage.count < amount) {
        next_data = iterator_cascade_callbacks.iterator.next();
        iterator_cascade_callbacks.value = next_data.value;
        iterator_cascade_callbacks.done = next_data.done;
        if (iterator_cascade_callbacks.done) {
          throw new Stop_Iteration('this.skip says this.iterator is done');
        }

        const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
        for (const callback_other of iterate_callbacks) {
          if (callback_other === callback_object) {
            callback_object.storage.count++;
            break;
          }
          callback_other.call(iterator_cascade_callbacks);
        }
      }
    };

    return this.pushCallbackWrapper(skip_wrapper, 'skip');
  }

  /**
   * Step over every _n_ iterations
   * @param {number} amount - Number of iterations to step over
   * @return {this}
   * @this {Iterator_Cascade_Callbacks}
   * @example
   * const icc = new Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);
   *
   * const collection = icc.step(1).collect([]);
   *
   * console.log(collection);
   * //> [ 1, 3, 5 ]
   */
  step(amount: number): Iterator_Cascade_Callbacks {
    /**
     * @function step_wrapper
     * @type {Callback_Wrapper}
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     */
    const step_wrapper: ICC.Callback_Wrapper = (callback_object, iterator_cascade_callbacks) => {
      if (isNaN(callback_object.storage.count)) {
        callback_object.storage.count = 0;
      }

      let next_data: { value: Shared.Yielded_Tuple, done: boolean } = { value: [undefined, NaN], done: false };
      while (callback_object.storage.count < amount) {
        next_data = iterator_cascade_callbacks.iterator.next();
        iterator_cascade_callbacks.value = next_data.value;
        iterator_cascade_callbacks.done = next_data.done;
        if (iterator_cascade_callbacks.done) {
          throw new Stop_Iteration('this.skip says this.iterator is done');
        }

        const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
        for (const callback_other of iterate_callbacks) {
          if (callback_other === callback_object) {
            callback_object.storage.count++;
            break;
          }
          callback_other.call(iterator_cascade_callbacks);
        }
      }

      callback_object.storage.count = 0;
    };

    return this.pushCallbackWrapper(step_wrapper, 'step');
  }

  /**
   * Pauses/breaks iteration when limit is reached
   * @param {number} amount - Number of values to compute before pausing
   * @return {this}
   * @throws {Pause_Iteration}
   * @this {Iterator_Cascade_Callbacks}
   * @notes
   * - If immediately collecting to an object, consider using `collect()` method instead
   * @example
   * const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);
   *
   * icc.take(2);
   *
   * const collection_one = icc.collect([]);
   * console.log(collection_one);
   * //> [ 1, 2 ]
   *
   * const collection_two = icc.collect([]);
   * console.log(collection_two);
   * //> [ 3, 4 ]
   */
  take(amount: number): Iterator_Cascade_Callbacks {
    /**
     * @function take_wrapper
     * @type {Callback_Wrapper}
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     */
    const take_wrapper: ICC.Callback_Wrapper = (callback_object, iterator_cascade_callbacks) => {
      if (isNaN(callback_object.storage.count)) {
        callback_object.storage.count = 0;
        callback_object.storage.resumed = false;
      } else if (callback_object.storage.paused) {
        callback_object.storage.count = 1;
        callback_object.storage.paused = false;
        callback_object.storage.resumed = true;
      }
      callback_object.storage.count++;

      if (callback_object.storage.count > amount) {
        const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
        let found_self = false;
        for (const callback_other of iterate_callbacks) {
          if (found_self) {
            callback_other.call(iterator_cascade_callbacks);
          } else if (callback_other === callback_object) {
            found_self = true;
          }
        }

        callback_object.storage.paused = true;
        throw new Pause_Iteration('this.take says amount has been reached');
      }
    }

    return this.pushCallbackWrapper(take_wrapper, 'take');
  }

  [Symbol.iterator]() {
    return this;
  }
}


/* istanbul ignore next */
if (typeof module !== 'undefined') {
  exports = module.exports = {
    Iterator_Cascade_Callbacks,
  };
}

export {
  Iterator_Cascade_Callbacks,
}

/**
 * ===========================================================================
 *                  Custom TypeScript interfaces and types
 * ===========================================================================
 */


/**
 * Enables static methods to be called from within class methods
 * @see {link} - https://github.com/Microsoft/TypeScript/issues/3841
 * @property {Shared.Dictionary} state - Data shared between `Callback_Wrapper` functions on each iteration
 * @property {Shared.Dictionary} storage - Data shared between `Callback_Function` for each iteration
 * @typedef Iterator_Cascade_Callbacks
 */
interface Iterator_Cascade_Callbacks extends ICC.Iterator_Cascade_Callbacks__Instance {
  constructor: typeof Iterator_Cascade_Callbacks;
}

