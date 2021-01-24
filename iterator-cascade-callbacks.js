'use strict';
/**
 * Enable `instanceof` checks for Generator functions
 */
/* istanbul ignore next */
const GeneratorFunction = function* () { }.constructor;
/**
 * Custom error type to permanently stop iteration prematurely
 * @example
 * const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);
 *
 * const collection = icc.map((value, index_or_key) => {
 *   if (index_or_key > 2) {
 *     throw new Stop_Iteration('map says to stop at indexes greater than 2');
 *   }
 *   return value;
 * }).collect([]);
 *
 * console.log(collection);
 * //> [ 1, 2, 3 ]
 */
class Stop_Iteration extends Error {
    /**
     * Builds new instance of `Stop_Iteration` for throwing
     * @param {string?} message - Error message to print
     */
    constructor(message) {
        super();
        this.name = 'Stop_Iteration';
        /* istanbul ignore next */
        if (message) {
            this.message = message;
        }
        else {
            this.message = '';
        }
    }
}
/**
 * Custom error type to temporarily stop iteration prematurely
 * @TODO: See `Iterator_Cascade_Callbacks.take` for implementation draft
 */
/* istanbul ignore next */
class Pause_Iteration extends Error {
    /**
     * Builds new instance of `Pause_Iteration` for throwing
     * @param {string?} message - Error message to print
     */
    constructor(message) {
        super();
        this.name = 'Pause_Iteration';
        /* istanbul ignore next */
        if (message) {
            this.message = message;
        }
        else {
            this.message = '';
        }
    }
}
/**
 * Classy object for storing wrapper function state between iterations
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Callback_Object {
    /**
     * Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list
     * @param {Callback_Wrapper} callback_wrapper - Function wrapper that handles input/output between `Callback_Function` and `Iterator_Cascade_Callbacks`
     */
    constructor(callback_wrapper) {
        this.wrapper = callback_wrapper;
        this.storage = {};
    }
    /**
     * Calls `this.wrapper` function with reference to this `Callback_Object` and `Iterator_Cascade_Callbacks`
     * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Reference to `Iterator_Cascade_Callbacks` instance
     * @this {Callback_Object}
     */
    call(iterator_cascade_callbacks) {
        this.wrapper(this, iterator_cascade_callbacks);
    }
}
/**
 * Iterator that chains callback function execution
 * @author S0AndS0
 * @license AGPL-3.0
 */
class Iterator_Cascade_Callbacks {
    /**
     * Instantiates new instance of `Iterator_Cascade_Callbacks` from `iterable` input
     * @param {any} iterable - Currently may be an array, object, generator, or iterator type
     */
    constructor(iterable) {
        this.done = false;
        this.value = undefined;
        this.callbacks = [];
        this.state = {
            paused: false,
            resumed: false,
        };
        if (Array.isArray(iterable)) {
            /**
             * iterable: [ 9, 8, 7 ]
             */
            this.iterator = this.constructor.iteratorFromArray(iterable);
        }
        else if (iterable instanceof GeneratorFunction) {
            /**
             * iterable: function* () { for (let value of [6, 5, 4]) { yield value; } }
             */
            this.iterator = this.constructor.iteratorFromGenerator(iterable());
        }
        else if (typeof iterable === 'object') {
            if (typeof iterable[Symbol.iterator] === 'function') {
                /**
                 * iterable: new class { [Symbol.iterable]() { return this; } }
                 * iterable: (function* () { for (let value of [6, 5, 4]) { yield value; } })()
                 */
                this.iterator = this.constructor.iteratorFromGenerator(iterable[Symbol.iterator]());
            }
            else {
                /**
                 * iterable: { key: 'value', spam: 'flavored' }
                 */
                this.iterator = this.constructor.iteratorFromObject(iterable);
            }
        }
        else {
            throw new TypeError(`Unsuported type of iterable -> ${typeof iterable}`);
        }
    }
    /**
     * Converts `Array` to `GeneratorFunction`
     * @param {any[]} array - List any type of values
     * @yields {[any, number]}
     */
    static *iteratorFromArray(array) {
        for (let [index, value] of Object.entries(array)) {
            yield [value, Number(index)];
        }
    }
    /**
     * Converts `Object` to `GeneratorFunction`
     * @param {Object} dictionary - Dictionary of key value pares
     * @yields {[any, string]}
     */
    static *iteratorFromObject(dictionary) {
        for (let [key, value] of Object.entries(dictionary)) {
            yield [value, key];
        }
    }
    /**
     * Converts Iterator class or `GeneratorFunction` to `Generator`
     * @param {GeneratorFunction} iterator - Objects with `.next()` or `[Symbol.iterator]()` method defined
     * @yields {[any, number]}
     */
    static *iteratorFromGenerator(iterator) {
        let count = 0;
        for (let value of iterator) {
            yield [value, count];
            count++;
        }
    }
    /**
     * Converts list of `this.callbacks` objects to `GeneratorFunction`
     * @this {Iterator_Cascade_Callbacks}
     * @yields {Callback_Object}
     */
    *iterateCallbackObjects() {
        for (let callback of this.callbacks) {
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
    collect(target, callback_or_amount, amount) {
        if (typeof callback_or_amount === 'function') {
            return this.collectToFunction(target, callback_or_amount, amount);
        }
        else if (Array.isArray(target)) {
            return this.collectToArray(target, callback_or_amount);
        }
        else if (typeof target === 'object') {
            return this.collectToObject(target, callback_or_amount);
        }
        else {
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
    collectToArray(target, amount) {
        let count = 0;
        for (let [value, index] of this) {
            target.push(value);
            count++;
            if (count >= amount) {
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
    collectToFunction(target, callback, amount) {
        let count = 0;
        for (let [value, index_or_key] of this) {
            callback(target, value, index_or_key, this);
            count++;
            if (count >= amount) {
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
    collectToObject(target, amount) {
        let count = 0;
        for (let [value, key] of this) {
            target[key] = value;
            count++;
            if (count >= amount) {
                break;
            }
        }
        return target;
    }
    /**
     * Sets `this.value` if callback function returns _truthy_, else consumes `this.iterator` and recomputes value for callback to test
     * @param {Callback_Function} callback - Function that determines truth of `value` and/or `index_or_key` for each iteration
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
    filter(callback) {
        /**
         * @function filter_wrapper
         * @type {Callback_Wrapper}
         * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
         * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
         */
        const filter_wrapper = (callback_object, iterator_cascade_callbacks) => {
            let [value, index_or_key] = iterator_cascade_callbacks.value;
            let results = callback(value, index_or_key, { iterator_cascade_callbacks, callback_object });
            if (results) {
                return;
            }
            let next_data = { value: [undefined, NaN], done: false };
            while (!results) {
                next_data = iterator_cascade_callbacks.iterator.next();
                iterator_cascade_callbacks.value = next_data.value;
                iterator_cascade_callbacks.done = next_data.done;
                if (iterator_cascade_callbacks.done) {
                    throw new Stop_Iteration('this.filter says this.iterator is done');
                }
                const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
                for (let callback_other of iterate_callbacks) {
                    if (callback_other === callback_object) {
                        [value, index_or_key] = iterator_cascade_callbacks.value;
                        results = callback(value, index_or_key, { iterator_cascade_callbacks, callback_object });
                        if (results) {
                            return;
                        }
                        break;
                    }
                    callback_other.call(iterator_cascade_callbacks);
                    [value, index_or_key] = iterator_cascade_callbacks.value;
                    results = callback(value, index_or_key, { iterator_cascade_callbacks, callback_object });
                }
            }
        };
        return this.pushCallbackWrapper(filter_wrapper);
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
    limit(amount) {
        /**
         * @function limit_wrapper
         * @type {Callback_Wrapper}
         * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
         * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
         */
        const limit_wrapper = (callback_object, iterator_cascade_callbacks) => {
            if (isNaN(callback_object.storage.count)) {
                callback_object.storage.count = 0;
            }
            callback_object.storage.count++;
            if (callback_object.storage.count > amount) {
                const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
                let found_self = false;
                for (let callback_other of iterate_callbacks) {
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
        };
        return this.pushCallbackWrapper(limit_wrapper);
    }
    /**
     * Applies `callback` to modify `value` and/or `index_or_key` for each iteration
     * @param {Callback_Function} callback - Function may modify `value` and/or `index_or_key`
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
    map(callback) {
        /**
         * @function map_wrapper
         * @type {Callback_Wrapper}
         * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
         * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
         */
        const map_wrapper = (callback_object, iterator_cascade_callbacks) => {
            const [value, index_or_key] = iterator_cascade_callbacks.value;
            const results = callback(value, index_or_key, { iterator_cascade_callbacks, callback_object });
            if (Array.isArray(results)) {
                iterator_cascade_callbacks.value = results;
            }
            else {
                iterator_cascade_callbacks.value = [results, index_or_key];
            }
        };
        return this.pushCallbackWrapper(map_wrapper);
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
    next() {
        /* istanbul ignore next */
        if (this.state.paused) {
            this.done = false;
            this.state.paused = false;
            this.state.resumed = true;
            return this;
        }
        const yielded_result = this.iterator.next();
        this.done = yielded_result.done;
        this.value = yielded_result.value;
        if (!this.done) {
            for (let callback_object of this.callbacks) {
                try {
                    callback_object.call(this);
                }
                catch (error) {
                    if (error instanceof Stop_Iteration) {
                        this.done = true;
                        this.value = undefined;
                        return this;
                    }
                    /* istanbul ignore next */
                    else if (error instanceof Pause_Iteration) {
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
     */
    /* istanbul ignore next */
    popCallbackObject() {
        return this.callbacks.pop();
    }
    /**
     * Removes last `Callback_Object` from `this.callbacks` list and returns `Callback_Wrapper` function
     * @return {Callback_Wrapper?}
     * @this {Iterator_Cascade_Callbacks}
     */
    /* istanbul ignore next */
    popCallbackWrapper() {
        const callback_object = this.popCallbackObject();
        if (callback_object !== undefined) {
            return callback_object.wrapper;
        }
    }
    /**
     * Instantiates `Callback_Object` with callback_wrapper and pushes to `this.callbacks` via `this.pushCallbackObject`
     * @param {Callback_Wrapper} callback_wrapper
     * @return {this}
     * @this {Iterator_Cascade_Callbacks}
     */
    pushCallbackWrapper(callback_wrapper) {
        const callback_object = new Callback_Object(callback_wrapper);
        return this.pushCallbackObject(callback_object);
    }
    /**
     * Pushes `Callback_Object` to `this.callbacks` then returns reference to instance of `Iterator_Cascade_Callbacks`
     * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
     * @return {this}
     * @this {Iterator_Cascade_Callbacks}
     */
    pushCallbackObject(callback_object) {
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
    skip(amount) {
        /**
         * @function skip_wrapper
         * @type {Callback_Wrapper}
         * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
         * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
         */
        const skip_wrapper = (callback_object, iterator_cascade_callbacks) => {
            if (isNaN(callback_object.storage.count)) {
                callback_object.storage.count = 0;
            }
            let next_data = { value: [undefined, NaN], done: false };
            while (callback_object.storage.count < amount) {
                next_data = iterator_cascade_callbacks.iterator.next();
                iterator_cascade_callbacks.value = next_data.value;
                iterator_cascade_callbacks.done = next_data.done;
                if (iterator_cascade_callbacks.done) {
                    throw new Stop_Iteration('this.skip says this.iterator is done');
                }
                const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
                for (let callback_other of iterate_callbacks) {
                    if (callback_other === callback_object) {
                        callback_object.storage.count++;
                        break;
                    }
                    callback_other.call(iterator_cascade_callbacks);
                }
            }
        };
        return this.pushCallbackWrapper(skip_wrapper);
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
    step(amount) {
        /**
         * @function step_wrapper
         * @type {Callback_Wrapper}
         * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
         * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
         */
        const step_wrapper = (callback_object, iterator_cascade_callbacks) => {
            if (isNaN(callback_object.storage.count)) {
                callback_object.storage.count = 0;
            }
            let next_data = { value: [undefined, NaN], done: false };
            while (callback_object.storage.count < amount) {
                next_data = iterator_cascade_callbacks.iterator.next();
                iterator_cascade_callbacks.value = next_data.value;
                iterator_cascade_callbacks.done = next_data.done;
                if (iterator_cascade_callbacks.done) {
                    throw new Stop_Iteration('this.skip says this.iterator is done');
                }
                const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
                for (let callback_other of iterate_callbacks) {
                    if (callback_other === callback_object) {
                        callback_object.storage.count++;
                        break;
                    }
                    callback_other.call(iterator_cascade_callbacks);
                }
            }
            callback_object.storage.count = 0;
        };
        return this.pushCallbackWrapper(step_wrapper);
    }
    /**
     * Pauses/breaks iteration when limit is reached
     * @TODO: Finish implementing logic to allow resuming iteration
     * @param {number} amount
     * @return {this}
     * @throws {Stop_Iteration}
     * @this {Iterator_Cascade_Callbacks}
     * @example
     * const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);
     *
     * const collection_one = icc.take(2).collect([]);
     * console.log(collection_one);
     * //> [ 1, 2 ]
     *
     * const collection_two = icc.take(2).collect([]);
     * console.log(collection_two);
     * //> [ 3, 4 ]
     */
    /* istanbul ignore next */
    take(amount) {
        /**
         * @function take_wrapper
         * @type {Callback_Wrapper}
         * @param {Callback_Object} callback_object - Instance reference to `this` of `Callback_Object`
         * @param {Iterator_Cascade_Callbacks} iterator_cascade_callbacks - Instance reference to `this` of `Iterator_Cascade_Callbacks`
         */
        const take_wrapper = (callback_object, iterator_cascade_callbacks) => {
            if (isNaN(callback_object.storage.count)) {
                callback_object.storage.count = 0;
                callback_object.storage.resumed = false;
            }
            else if (callback_object.storage.paused) {
                callback_object.storage.count = 1;
                callback_object.storage.paused = false;
                callback_object.storage.resumed = true;
            }
            callback_object.storage.count++;
            if (callback_object.storage.count > amount) {
                const iterate_callbacks = iterator_cascade_callbacks.iterateCallbackObjects();
                let found_self = false;
                for (let callback_other of iterate_callbacks) {
                    if (found_self) {
                        callback_other.call(iterator_cascade_callbacks);
                    }
                    else if (callback_other === callback_object) {
                        found_self = true;
                    }
                }
                callback_object.storage.paused = true;
                throw new Pause_Iteration('this.take says amount has been reached');
            }
        };
        return this.pushCallbackWrapper(take_wrapper);
    }
    /* istanbul ignore next */
    [Symbol.iterator]() {
        return this;
    }
}
/* istanbul ignore next */
if (typeof module !== 'undefined') {
    module.exports = {
        Callback_Object,
        Iterator_Cascade_Callbacks,
        Pause_Iteration,
        Stop_Iteration,
    };
}
//# sourceMappingURL=iterator-cascade-callbacks.js.map