export {};


/**
 * @see {link} https://www.typescriptlang.org/docs/handbook/namespaces.html
 * @see {link} https://jsdoc.app/tags-namespace.html
 * @see {link} https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b#460e
 * @namespace ICC
 */
declare global {
  namespace ICC {
    /**
     * Results from Generator/Iterator function/class
     * @property {boolean} done
     * @property {any} value
     * @typedef Yielded_Result
     */
    export type Yielded_Result = { done: boolean, value?: Yielded_Tuple };


    /**
     * Callback function for custom collection algorithms
     * @param {any} target - An object that function will collect values to
     * @param {value} any - Value portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
     * @param {number|string} index_or_key - Index or Key portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     * @typedef Collect_To_Function
     * @example
     * const icc = new Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });
     *
     * const map = new Map();
     *
     * const collection = icc.collectToFunction(map, (target, value) => {
     *   target.set(index_or_key, value);
     * });
     *
     * console.log(collection);
     * //> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
     */
    export type Collect_To_Function = (target: any, value: any, index_or_key: Index_Or_Key, iterator_cascade_callbacks: Iterator_Cascade_Callbacks) => any;


    /**
     * Generic dictionary like object
     * @typedef Dictionary
     * @example
     * const data: Dictionary = { key: 'value' };
     */
    export type Dictionary = { [key: string]: any };


    /**
     * Array `index` or Object `key` or Generator `count`
     * @typedev Index_Or_Key
     * @example
     * const key: Index_Or_Key = 'key';
     * const index: Index_Or_Key = 42;
     */
    export type Index_Or_Key = number | string;


    /**
     * Array with `value` and `index_or_key` entries
     * @typedef Yielded_Tuple
     * @example
     * const result: Yielded_Tuple = ['spam', 3];
     */
    export type Yielded_Tuple = [ any, Index_Or_Key ];


    /**
     * Object with references to `Iterator_Cascade_Callbacks` and `Callback_Object` instances
     * @property {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     * @property {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @typedef Callback_Function_References
     */
    export type Callback_Function_References = {
      iterator_cascade_callbacks: Iterator_Cascade_Callbacks,
      callback_object: Callback_Object,
    };


    /**
     * Generic callback function for parsing and/or mutating iterator data
     * @param {any} value - First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()`
     * @param {Index_Or_Key} index_or_key - Either a `string` or `number` depending upon iterable type
     * @param {Callback_Function_References} references - Dictionary with reference to _`this`_ `Iterator_Cascade_Callbacks` and _`this`_ `Callback_Object`
     * @param {...any[]} parameters - List of arguments that are passed to callback on each iteration
     * @typedef Callback_Function
     */
    export type Callback_Function = (value: any, index_or_key: Index_Or_Key, references: Callback_Function_References, ...parameters: any[]) => any;


    /**
     * Wrapper for callback function that parses inputs and outputs, and passes parameters to `Callback_Function`
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
     * @typedef Callback_Wrapper
     */
    export type Callback_Wrapper = (callback_object: Callback_Object, iterator_cascade_callbacks: Iterator_Cascade_Callbacks) => void;


    /**
     * Classy object for storing wrapper function state between iterations
     * @property {Callback_Wrapper} wrapper - Wrapper for callback function that parses inputs and outputs
     * @property {Dictionary} storage - Generic dictionary like object
     * @property {string} name - Method name that instantiated callback, eg. `filter`
     * @property {any[]} parameters - List of arguments that are passed to callback on each iteration
     * @typedef {Callback_Object}
     */
    export interface Callback_Object {
      wrapper: Callback_Wrapper;
      storage: Dictionary;
      name: string;
      parameters: any[];

      new(callback_wrapper: Callback_Wrapper, name: string, parameters: any[]): Callback_Object;
      call(iterator_cascade_callbacks: Iterator_Cascade_Callbacks): void;
    }

    /**
     * Enables static methods to be called from within class methods
     * @see {link} - https://github.com/Microsoft/TypeScript/issues/3841
     * @property {Dictionary} state - Data shared between `Callback_Wrapper` functions on each iteration
     * @property {Dictionary} storage - Data shared between `Callback_Function` for each iteration
     * @typedef Iterator_Cascade_Callbacks
     */
    export interface Iterator_Cascade_Callbacks {
      iterator: any;
      done: boolean;
      value: Yielded_Tuple | undefined;
      callbacks: Callback_Object[];
      storage: Dictionary;
      state: {
        paused: boolean,
        resumed: boolean,
      };

      /* Static method definitions */
      new(iterable: any): Iterator_Cascade_Callbacks;
      zip(...iterables: any[]): Iterator_Cascade_Callbacks;
      zipValues(...iterables: any[]): Iterator_Cascade_Callbacks;
      iteratorFromArray(array: any[]): IterableIterator<[any, number]>;
      iteratorFromObject(dictionary: Dictionary): IterableIterator<[any, string]>;
      iteratorFromGenerator(iterator: Generator<any[], void, unknown>): IterableIterator<[any, number]>;

      /* Instance method definitions */
      collect(
        target: (any[] | Dictionary | any),
        callback_or_amount?: (Collect_To_Function | number),
        amount?: number
      ): (any[] | Dictionary | undefined);

      collectToArray(target: any[], amount?: number): any[];
      collectToFunction(target: any, callback: Collect_To_Function, amount?: number): any;
      collectToObject(target: Dictionary, amount?: number): Dictionary;

      copyCallbacksOnto(iterable: any): Iterator_Cascade_Callbacks;

      filter(callback: Callback_Function, ...parameters: any[]): Iterator_Cascade_Callbacks;
      forEach(callback: Callback_Function, ...paramaters: any[]): Iterator_Cascade_Callbacks;
      inspect(callback: Callback_Function, ...paramaters: any[]): Iterator_Cascade_Callbacks;
      limit(amount: number): Iterator_Cascade_Callbacks;
      map(callback: Callback_Function, ...parameters: any[]): Iterator_Cascade_Callbacks;
      skip(amount: number): Iterator_Cascade_Callbacks;
      step(amount: number): Iterator_Cascade_Callbacks;
      take(amount: number): Iterator_Cascade_Callbacks;

      iterateCallbackObjects(): IterableIterator<Callback_Object>;

      next(): Iterator_Cascade_Callbacks;
      [Symbol.iterator](): Iterator_Cascade_Callbacks;
    }
  }
}

