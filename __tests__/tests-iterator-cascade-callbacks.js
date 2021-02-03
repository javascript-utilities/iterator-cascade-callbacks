#!/usr/bin/env node
'use strict';
/**
 *
 */
class Count_Iterator {
    constructor(value = -1) {
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
;
/**
 * Tests methods for instance(s) of `Iterator_Cascade_Callbacks` class
 */
class Test__Iterator_Cascade_Callbacks {
    /**
     *
     */
    constructor() {
        this.iterator_cascade_callbacks = require('../iterator-cascade-callbacks').Iterator_Cascade_Callbacks;
        this.callback_object = require('../iterator-cascade-callbacks').Callback_Object;
        // this.callback_wrapper = require('../iterator-cascade-callbacks').Callback_Wrapper;
        this.array_input = [9, 8, 7];
        this.class_input = Count_Iterator;
        this.generator_input = function* () { for (let value of [6, 5, 4]) {
            yield value;
        } };
        this.iterator_input = (function* () { for (let value of [6, 5, 4]) {
            yield value;
        } })();
        this.object_input = { spam: 'flavored', canned: 'ham' };
        this.string_input = 'abcdefg';
    }
    /**
     *
     */
    runTests() {
        this.testConstructor();
        /* Test `static` methods */
        this.testIteratorFromArray();
        this.testsZip();
        this.testsZipValues();
        /* Test instance methods */
        this.testCollectToArray();
        this.testCollectToFunction();
        this.testCollectToObject();
        this.testCollect();
        this.testsCopyCallbacksOnto();
        this.testsFilter();
        this.testsForEach();
        this.testsInspect();
        this.testsLimit();
        this.testsNext();
        this.testsMap();
        this.testsSkip();
        this.testsStep();
        this.testsTake();
        this.testsPopCallbackObject();
        this.testsPopCallbackWrapper();
        this.testsValuesAreEqual();
        this.testsValuesAreGreaterOrEqual();
        this.testsValuesAreGreaterThan();
        this.testsValuesAreLessOrEqual();
        this.testsValuesAreLessThan();
        this.testsValuesCompare();
        /* Test Edge cases and Error states */
        this.testsEdgeCases();
        this.testsErrorStates();
    }
    /**
     *
     */
    testConstructor() {
        test('constructor -> Are array types supported?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            expect(icc).toBeDefined();
        });
        test('constructor -> Are generator functions supported?', () => {
            const icc = new this.iterator_cascade_callbacks(this.generator_input);
            expect(icc).toBeDefined();
        });
        test('constructor -> Are instantiated iterators supported?', () => {
            const icc = new this.iterator_cascade_callbacks(this.iterator_input);
            expect(icc).toBeDefined();
        });
        test('constructor -> Are object types supported?', () => {
            const icc = new this.iterator_cascade_callbacks(this.object_input);
            expect(icc).toBeDefined();
        });
        test('constructor -> Are objects with [Symbol.iterator] defined supported?', () => {
            const icc = new this.iterator_cascade_callbacks(new this.class_input(-1));
            expect(icc).toBeDefined();
        });
        test('constructor ->', () => {
            const icc = new this.iterator_cascade_callbacks(this.string_input);
            expect(icc).toBeDefined();
        });
        // test('constructor ->', () => {});
    }
    /**
     *
     */
    testIteratorFromArray() {
        test('iteratorFromArray -> ', () => {
            const iteratorFromArray = this.iterator_cascade_callbacks.iteratorFromArray(this.array_input);
            const collection = [];
            for (let [value, index] of iteratorFromArray) {
                collection.push(value);
            }
            expect(collection).toStrictEqual(this.array_input);
        });
    }
    /**
     *
     */
    testCollectToArray() {
        test('collectToArray -> Are Arrays unmodified without callbacks?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.collectToArray([]);
            expect(collection).toStrictEqual(this.array_input);
        });
        test('collectToArray -> Is collection from Generator function to Array supported?', () => {
            const icc = new this.iterator_cascade_callbacks(function* () { for (let value of [6, 5, 4]) {
                yield value;
            } });
            const collection = icc.collectToArray([]);
            expect(collection).toStrictEqual([6, 5, 4]);
        });
        test('collectToArray -> Is collection from Iterator function to Array supported?', () => {
            const icc = new this.iterator_cascade_callbacks((function* () { for (let value of [6, 5, 4]) {
                yield value;
            } })());
            const collection = icc.collectToArray([]);
            expect(collection).toStrictEqual([6, 5, 4]);
        });
        test('collectToArray -> Can collecton be limited to 4 and resumed?', () => {
            const iterable = Array(20).fill(undefined).map((_, i) => i);
            const icc = new this.iterator_cascade_callbacks(iterable);
            const collection_one = icc.collectToArray([], 4);
            const expected_one = iterable.splice(0, 4);
            expect(collection_one).toStrictEqual(expected_one);
            const collection_two = icc.collectToArray([], 4);
            const expected_two = iterable.splice(0, 4);
            expect(collection_two).toStrictEqual(expected_two);
        });
    }
    /**
     *
     */
    testsCopyCallbacksOnto() {
        test('copyCallbacksOnto -> Can callbacks be copied to another instance of Iterator_Cascade_Callbacks?', () => {
            const iterable_one = [1, 2, 3, 4, 5];
            const iterable_two = [9, 8, 7, 6, 5];
            const icc_one = new this.iterator_cascade_callbacks(iterable_one);
            icc_one.filter((value) => {
                return value % 2 === 0;
            }).map((evens) => {
                return evens / 2;
            });
            const icc_two = icc_one.copyCallbacksOnto(iterable_two);
            const expected_one = iterable_one.filter((value) => {
                return value % 2 === 0;
            }).map((evens) => {
                return evens / 2;
            });
            const expected_two = iterable_two.filter((value) => {
                return value % 2 === 0;
            }).map((evens) => {
                return evens / 2;
            });
            const collection_one = icc_one.collect([]);
            const collection_two = icc_two.collect([]);
            expect(collection_one).toStrictEqual(expected_one);
            expect(collection_two).toStrictEqual(expected_two);
        });
        // test('copyCallbacksOnto ->', () => {});
    }
    /**
     *
     */
    testCollectToObject() {
        test('collectToObject -> Are Objects unmodified without callbacks?', () => {
            const icc = new this.iterator_cascade_callbacks(this.object_input);
            const collection = icc.collectToObject({});
            expect(collection).toStrictEqual(this.object_input);
        });
        test('collectToObject -> Is it okay to limit collection amount?', () => {
            const iterable = Array(20).fill(undefined).map((_, i) => i);
            const icc = new this.iterator_cascade_callbacks(iterable);
            const collection_one = icc.collectToObject({}, 4);
            const expected_one = Object.assign({}, iterable.splice(0, 4));
            expect(collection_one).toStrictEqual(expected_one);
            const collection_two = icc.collectToObject({}, 4);
            const expected_two = iterable.splice(0, 4).reduce((accumulator, value, index) => {
                accumulator[index + 4] = value;
                return accumulator;
            }, {});
            expect(collection_two).toStrictEqual(expected_two);
        });
        // test('collectToObject ->', () => {});
    }
    /**
     *
     */
    testCollectToFunction() {
        test('collectToFunction -> Are custom collecter callback functions suported?', () => {
            const map = new Map();
            const collectToMap = (target, value, index_or_key) => {
                target.set(index_or_key, value);
            };
            const icc = new this.iterator_cascade_callbacks(this.object_input);
            icc.collectToFunction(map, collectToMap);
            const expected = new Map(Object.entries(this.object_input));
            expect(map).toStrictEqual(expected);
        });
        test('collectToFunction -> Is it possible to limit collection built by callback functions?', () => {
            const iterable = Array(20).fill(undefined).map((_, i) => i);
            const icc = new this.iterator_cascade_callbacks(iterable);
            const collection_one = icc.collectToFunction([], (target, value) => {
                target.push(value);
                // return target;
            }, 4);
            const expected_one = iterable.splice(0, 4);
            expect(collection_one).toStrictEqual(expected_one);
            const collection_two = icc.collectToFunction([], (target, value) => {
                target.push(value);
                return target;
            }, 4);
            const expected_two = iterable.splice(0, 4);
            expect(collection_two).toStrictEqual(expected_two);
        });
        // test('collectToFunction -> ', () => {});
    }
    /**
     *
     */
    testCollect() {
        test('collect -> Is Array collection target recognized correctly?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.collect([]);
            expect(collection).toStrictEqual(this.array_input);
        });
        test('collect -> Is Object collection target recognized correctly?', () => {
            const icc = new this.iterator_cascade_callbacks(this.object_input);
            const collection = icc.collect({});
            expect(collection).toStrictEqual(this.object_input);
        });
        test('collect -> Is a custom collector function recognized correctly?', () => {
            const collectToDictionary = (target, value, index_or_key) => {
                if (!target.hasOwnProperty(index_or_key)) {
                    target[index_or_key] = value;
                }
            };
            const icc = new this.iterator_cascade_callbacks(this.object_input);
            const collection = { spam: true };
            icc.collect(collection, collectToDictionary);
            const expected = JSON.parse(JSON.stringify(this.object_input));
            expected['spam'] = true;
            expect(collection).toStrictEqual(expected);
        });
    }
    /**
     *
     */
    testsFilter() {
        test('filter -> Will filtering for even numbers break anything?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.filter((value) => {
                return value % 2 === 0;
            }).collect([]);
            const expected = this.array_input.filter((value) => {
                return value % 2 === 0;
            });
            expect(collection).toStrictEqual(expected);
        });
        test('filter -> What if filter returns `true` for all tests?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.map((value) => {
                return value * 2;
            }).filter((value) => {
                return value % 2 === 0;
            }).collect([]);
            const expected = this.array_input.map((value) => {
                return value * 2;
            }).filter((value) => {
                return value % 2 === 0;
            });
            expect(collection).toStrictEqual(expected);
        });
        test('filter -> What if filter returns `false` for all tests?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.filter((value) => {
                return isNaN(value);
            }).collect([]);
            const expected = this.array_input.filter((value) => {
                return isNaN(value);
            });
            expect(collection).toStrictEqual(expected);
        });
        test('filter -> Can `.filter()` and `.map()` be chained?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.map((value) => {
                return value + 1;
            }).filter((value) => {
                return value % 2 === 0;
            }).map((value) => {
                return value - 1;
            }).collect([]);
            const expected = this.array_input.map((value) => {
                return value + 1;
            }).filter((value) => {
                return value % 2 === 0;
            }).map((value) => {
                return value - 1;
            });
            expect(collection).toStrictEqual(expected);
        });
        // test('filter -> ', () => {});
    }
    /**
     *
     */
    testsForEach() {
        test('forEach -> Is it fead values in the proper order?', () => {
            const expected = this.array_input.map((value) => {
                return value * 2;
            });
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            icc.map((value) => {
                return value * 2;
            }).forEach((value, index_or_key, { callback_object, iterator_cascade_callbacks }, expected) => {
                expect(value).toStrictEqual(expected.shift());
            }, expected).collect([]);
        });
        // test('forEach ->', () => {});
    }
    /**
     *
     */
    testsLimit() {
        test('limit -> Can I has 2 elements?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.limit(2).collect([]);
            const expected = this.array_input.slice(0, 2);
            expect(collection).toStrictEqual(expected);
        });
        test('limit -> Will pre-filtering cause any issues?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.filter((value) => {
                return value % 2 === 0;
            }).limit(2).collect([]);
            const expected = this.array_input.filter((value) => {
                return value % 2 === 0;
            }).slice(0, 2);
            expect(collection).toStrictEqual(expected);
        });
        test('limit -> Do callbacks after `.limit()` get called?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.limit(2).map((value) => {
                return value * 2;
            }).collect([]);
            const expected = this.array_input.slice(0, 2).map((value) => {
                return value * 2;
            });
            expect(collection).toStrictEqual(expected);
        });
        // test('limit -> ', () => {});
    }
    /**
     * @TODO: Sort out why JestJS does not recognize tests as covering lines within `inspect_wrapper` function
     */
    testsInspect() {
        test('inspect -> Is it possible to inspect before and after `map` callback?', () => {
            const expected_one = [...this.array_input];
            const expected_two = this.array_input.map((value) => {
                return value * 2;
            });
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            icc.inspect((value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...paramaters) => {
                expect(value).toStrictEqual(paramaters[0].shift());
            }, expected_one).map((value) => {
                return value * 2;
            }).inspect((value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...paramaters) => {
                expect(value).toStrictEqual(paramaters[0].shift());
            }, expected_two);
        });
        test('inspect ->', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            icc.inspect((value, index_or_key, references, ...paramaters) => {
                expect(paramaters).toBeInstanceOf(Array);
            }, 'foo', 'bar');
            icc.collect([]);
        });
        // test('inspect ->', () => {});
    }
    /**
     *
     */
    testsNext() {
        test('next -> Will `for` loop without callbacks yield expected values', () => {
            const input_copy = [...this.array_input];
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            for (let results of icc) {
                const [value, index] = results;
                const expected = input_copy.shift();
                expect(value).toStrictEqual(expected);
            }
        });
        // test('next -> ', () => {});
    }
    /**
     *
     */
    testsMap() {
        test('map -> Does chaining one callback break anything?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.map((value) => { return value * 2; }).collect([]);
            const expected = this.array_input.map((value) => { return value * 2; });
            expect(collection).toStrictEqual(expected);
        });
        test('map -> Can multiple map callbacks be chained as expected?', () => {
            const iterable = [9, 8, 7, 6, 5];
            const icc = new this.iterator_cascade_callbacks(iterable);
            const collection = icc.map((value) => {
                return value * 2;
            }).map((doubled) => {
                return Math.pow(doubled, 2);
            }).map((squared) => {
                return squared / 3;
            }).collect([]);
            const expected = iterable.map((value) => {
                return value * 2;
            }).map((doubled) => {
                return Math.pow(doubled, 2);
            }).map((squared) => {
                return squared / 3;
            });
            expect(collection).toStrictEqual(expected);
        });
        test('map -> Is it okay for map callbacks to return `value` / `index_or_key` Tuple', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.map((value, index_or_key) => {
                return [index_or_key % 2 === 0, index_or_key];
            }).collect([]);
            const expected = this.array_input.map((value, index) => {
                return index % 2 === 0;
            });
            expect(collection).toStrictEqual(expected);
        });
        // test('map -> ', () => {});
    }
    /**
     *
     */
    testsPopCallbackObject() {
        test('popCallbackObject -> Does popping defined callback return an instance of `Callback_Object`?', () => {
            const icc = new this.iterator_cascade_callbacks(['1', 2, NaN]);
            const map_callback = (value, index_or_key, references, ...parameters) => {
                return value;
            };
            icc.map(map_callback);
            const popped_callback_object = icc.popCallbackObject();
            expect(popped_callback_object).toBeInstanceOf(this.callback_object);
        });
        test('popCallbackObject -> Will popping an undefined callback return `undefined`?', () => {
            const icc = new this.iterator_cascade_callbacks(['1', 2, NaN]);
            const popped_callback_object = icc.popCallbackObject();
            expect(popped_callback_object).toBeUndefined();
        });
        // test('popCallbackObject -> ', () => {});
    }
    /**
     *
     */
    testsPopCallbackWrapper() {
        test('popCallbackWrapper -> ', () => {
            const icc = new this.iterator_cascade_callbacks(['1', 2, NaN]);
            const map_callback = (value, index_or_key, references, ...parameters) => {
                return value;
            };
            icc.map(map_callback);
            const popped_callback_wrapper = icc.popCallbackWrapper();
            expect(popped_callback_wrapper).toBeInstanceOf(Function);
        });
        test('popCallbackWrapper -> ', () => {
            const icc = new this.iterator_cascade_callbacks(['1', 2, NaN]);
            const popped_callback_object = icc.popCallbackWrapper();
            expect(popped_callback_object).toBeUndefined();
        });
        // test('popCallbackWrapper -> ', () => {});
    }
    /**
     *
     */
    testsSkip() {
        test('skip -> May I skip over first element?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.skip(1).collect([]);
            const expected = this.array_input.filter((value, index) => {
                return index > 0;
            });
            expect(collection).toStrictEqual(expected);
        });
        test('skip -> What about stepping over first even result?', () => {
            const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
            const icc = new this.iterator_cascade_callbacks(iterable);
            const collection = icc.filter((value) => {
                return value % 2 === 0;
            }).skip(1).collect([]);
            const expected = iterable.filter((value) => {
                return value % 2 === 0;
            }).filter((evens, index) => {
                return index > 0;
            });
            expect(collection).toStrictEqual(expected);
        });
        test('skip -> Does iteration stop if skip amount exceeds `this.iterator` elements?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.skip(this.array_input.length).collect([]);
            expect(collection).toStrictEqual([]);
        });
        // test('skip ->', () => {});
    }
    /**
     *
     */
    testsStep() {
        test('step -> Does steping over every other element function?', () => {
            const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
            const icc = new this.iterator_cascade_callbacks(iterable);
            const collection = icc.step(1).collect([]);
            const expected = iterable.filter((value, index) => {
                return index % 2 !== 0;
            });
            expect(collection).toStrictEqual(expected);
        });
        test('step -> Will stepping over all elements produce empty results?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.step(this.array_input.length).collect([]);
            expect(collection).toStrictEqual([]);
        });
        test('step -> Is it posible to step over every other even?', () => {
            const iterable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
            const icc = new this.iterator_cascade_callbacks(iterable);
            const collection = icc.filter((value) => {
                return value % 2 === 0;
            }).step(1).collect([]);
            const expected = iterable.filter((value, index) => {
                return value % 2 === 0;
            }).filter((value, index) => {
                return index % 2 !== 0;
            });
            expect(collection).toStrictEqual(expected);
        });
        // test('step ->', () => {});
    }
    /**
     *
     */
    testsTake() {
        test('take -> Can I has 2 elements?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            const collection = icc.take(2).collect([]);
            const expected = this.array_input.slice(0, 2);
            expect(collection).toStrictEqual(expected);
        });
        test('take -> Can I has 4 elements at a time?', () => {
            const iterable = Array(20).fill(undefined).map((_, i) => i);
            const icc = new this.iterator_cascade_callbacks(iterable);
            icc.take(4);
            Array(4).fill(undefined).forEach((_, i) => {
                const collection = icc.collect([]);
                const expected = iterable.splice(0, 4);
                expect(collection).toStrictEqual(expected);
            });
        });
        test('take -> Is anything broken by callbacks prior to taking?', () => {
            const iterable = Array(20).fill(undefined).map((_, i) => i);
            const icc = new this.iterator_cascade_callbacks(iterable);
            icc.map((value) => {
                return value * 2;
            }).take(4);
            Array(4).fill(undefined).forEach((_, i) => {
                const collection = icc.collect([]);
                const expected = iterable.splice(0, 4).map((value) => {
                    return value * 2;
                });
                expect(collection).toStrictEqual(expected);
            });
        });
        test('take -> Is anything broken by callbacks after taking?', () => {
            const iterable = Array(20).fill(undefined).map((_, i) => i);
            const icc = new this.iterator_cascade_callbacks(iterable);
            icc.take(4).map((value) => {
                return value * 2;
            });
            Array(4).fill(undefined).forEach((_, i) => {
                const collection = icc.collect([]);
                const expected = iterable.splice(0, 4).map((value) => {
                    return value * 2;
                });
                expect(collection).toStrictEqual(expected);
            });
        });
        // test('take -> ', () => {});
    }
    /**
     *
     */
    testsValuesAreEqual() {
        const input = [1, 2, 3];
        test(`valuesAreEqual -> is ${input} equal to [1, 2, 3]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreEqual([1, 2, 3]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreEqual -> is ${input} **not** equal to [1, 2, 4]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreEqual([1, 2, 4]);
            expect(comparison).toBe(false);
        });
        test('valuesAreEqual -> is "spam" equal to "spam"?', () => {
            const icc = new this.iterator_cascade_callbacks("spam");
            const comparison = icc.valuesAreEqual("spam");
            expect(comparison).toBe(true);
        });
        // test(`valuesAreEqual -> is ${input} equal to []?`, () => {});
    }
    /**
     *
     */
    testsValuesAreGreaterOrEqual() {
        const input = [1, 2, 3];
        const s_input = `[${input.join(', ')}]`;
        test(`valuesAreGreaterOrEqual -> is ${s_input} greater or equal to [1, 2, 3]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterOrEqual([1, 2, 3]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreGreaterOrEqual -> is ${s_input} greater or equal to [1, 2, 2]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterOrEqual([1, 2, 2]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreGreaterOrEqual -> is ${s_input} **not** greater or equal to [1, 2, 4]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterOrEqual([1, 2, 4]);
            expect(comparison).toBe(false);
        });
        test(`valuesAreGreaterOrEqual -> is ${s_input} **not** greater or equal to [1, 2, 3, 1]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterOrEqual([1, 2, 3, 1]);
            expect(comparison).toBe(false);
        });
        test(`valuesAreGreaterOrEqual -> is ${s_input} **not** greater or equal to 'spam'`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterOrEqual('spam');
            expect(comparison).toBe(false);
        });
        // test('valuesAreGreaterOrEqual ->', () => {});
    }
    /**
     *
     */
    testsValuesAreGreaterThan() {
        const input = [1, 2, 3];
        const s_input = `[${input.join(', ')}]`;
        test(`valuesAreGreaterThan -> is ${s_input} greater than [1, 2, 2]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterThan([1, 2, 2]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreGreaterThan -> is ${s_input} **not** greater than [1, 2, 3, 1]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterThan([1, 2, 3, 1]);
            expect(comparison).toBe(false);
        });
        test(`valuesAreGreaterThan -> is ${s_input} **not** greater than [1, 2, 3]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterThan([1, 2, 3]);
            expect(comparison).toBe(false);
        });
        test(`valuesAreGreaterThan -> is ${s_input} **not** greater than [1, 2, 4]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterThan([1, 2, 4]);
            expect(comparison).toBe(false);
        });
        test(`valuesAreGreaterThan -> is ${s_input} **not** greater than 'spam'`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreGreaterThan('spam');
            expect(comparison).toBe(false);
        });
        // test('valuesAreGreaterThan ->', () => {});
    }
    /**
     *
     */
    testsValuesAreLessOrEqual() {
        const input = [1, 2, 3];
        const s_input = `[${input.join(', ')}]`;
        test(`valuesAreLessOrEqual -> is ${s_input} less or equal to [1, 2, 3]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessOrEqual([1, 2, 3]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreLessOrEqual -> is ${s_input} less or equal to [1, 2, 4]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessOrEqual([1, 2, 4]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreLessOrEqual -> is ${s_input} less or equal to [1, 2, 3, 1]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessOrEqual([1, 2, 3, 1]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreLessOrEqual -> is ${s_input} **not** less or equal to [1, 2, 2]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessOrEqual([1, 2, 2]);
            expect(comparison).toBe(false);
        });
        test(`valuesAreLessOrEqual -> is ${s_input} **not** less or equal to 'spam'`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessOrEqual('spam');
            expect(comparison).toBe(false);
        });
        // test('valuesAreLessOrEqual ->', () => {});
    }
    /**
     *
     */
    testsValuesAreLessThan() {
        const input = [1, 2, 3];
        const s_input = `[${input.join(', ')}]`;
        test(`valuesAreLessThan -> is ${s_input} less than [1, 2, 4]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessThan([1, 2, 4]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreLessThan -> is ${s_input} less than [1, 2, 3, 1]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessThan([1, 2, 3, 1]);
            expect(comparison).toBe(true);
        });
        test(`valuesAreLessThan -> is ${s_input} **not** less than [1, 2, 3]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessThan([1, 2, 3]);
            expect(comparison).toBe(false);
        });
        test(`valuesAreLessThan -> is ${s_input} **not** less than [1, 2, 2]?`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessThan([1, 2, 2]);
            expect(comparison).toBe(false);
        });
        test(`valuesAreLessThan -> is ${s_input} **not** less than 'spam'`, () => {
            const icc = new this.iterator_cascade_callbacks(input);
            const comparison = icc.valuesAreLessThan('spam');
            expect(comparison).toBe(false);
        });
        // test('valuesAreLessThan ->', () => {});
    }
    /**
     *
     */
    testsValuesCompare() {
        test('valuesCompare -> is [1, 2, 3] === [1, 2, 3]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3]);
            const comparison = icc.valuesCompare([1, 2, 3]);
            expect(comparison).toBe('===');
        });
        test('valuesCompare -> is [1, 2, 3] >= [1, 2, 2]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3]);
            const comparison = icc.valuesCompare([1, 2, 2]);
            expect(comparison).toBe('>=');
        });
        test('valuesCompare -> is [1, 2, 3] <= [1, 2, 4]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3]);
            const comparison = icc.valuesCompare([1, 2, 4]);
            expect(comparison).toBe('<=');
        });
        test('valuesCompare -> is [1, 2, 3] < [1, 2, 3, 1]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3]);
            const comparison = icc.valuesCompare([1, 2, 3, 1]);
            expect(comparison).toBe('<');
        });
        test('valuesCompare -> is [1, 2, 3, "foo"] !== [1, 2, 3]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3, 'foo']);
            const comparison = icc.valuesCompare([1, 2, 3]);
            expect(comparison).toBe('!==');
        });
        test('valuesCompare -> is [1, 2, 3, "foo"] != [1, 2, 3, "bar"]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3, 'foo']);
            const comparison = icc.valuesCompare([1, 2, 3, 'bar']);
            expect(comparison).toBe('!=');
        });
        test('valuesCompare -> is [1, 2, 3, "foo"] === [1, 2, 3, "foo"]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3, 'foo']);
            const comparison = icc.valuesCompare([1, 2, 3, 'foo']);
            expect(comparison).toBe('===');
        });
        test('valuesCompare -> is [1, 2, "3", "foo"] == [1, 2, 3, "foo"]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, '3', 'foo']);
            const comparison = icc.valuesCompare([1, 2, 3, 'foo']);
            expect(comparison).toBe('==');
        });
        test('valuesCompare -> is [1, 2, 3, 1] > [1, 2, 3]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3, 1]);
            const comparison = icc.valuesCompare(new this.iterator_cascade_callbacks([1, 2, 3]));
            expect(comparison).toBe('>');
        });
        test('valuesCompare -> is [1, 2, 4] >= [1, 2, 3]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 4]);
            const comparison = icc.valuesCompare(new this.iterator_cascade_callbacks([1, 2, 3]));
            expect(comparison).toBe('>=');
        });
        test('valuesCompare -> is [1, 2, 3] <= [1, 2, 4]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, 3]);
            const comparison = icc.valuesCompare(new this.iterator_cascade_callbacks([1, 2, 4]));
            expect(comparison).toBe('<=');
        });
        test('valuesCompare -> is [1, 2, "3"] < [1, 2, 4]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, '3']);
            const comparison = icc.valuesCompare(new this.iterator_cascade_callbacks([1, 2, 4]));
            expect(comparison).toBe('<');
        });
        test('valuesCompare -> is [1, 2, "4"] > [1, 2, 3]', () => {
            const icc = new this.iterator_cascade_callbacks([1, 2, '4']);
            const comparison = icc.valuesCompare(new this.iterator_cascade_callbacks([1, 2, 3]));
            expect(comparison).toBe('>');
        });
        // test('valuesCompare ->', () => {});
    }
    /**
     *
     */
    testsZip() {
        test('zip -> Is it possible to zip number and character arrays into Iterator_Cascade_Callbacks instance?', () => {
            const icc_zip = this.iterator_cascade_callbacks.zip([1, 2, 3], [...'abc']);
            const collection = icc_zip.collect([]);
            const expected = [
                [[1, 0], ['a', 0]],
                [[2, 1], ['b', 1]],
                [[3, 2], ['c', 2]],
            ];
            expect(collection).toStrictEqual(expected);
        });
        test('zip -> Is it possible to zip instances of Iterator_Cascade_Callbacks?', () => {
            const icc_one = new this.iterator_cascade_callbacks([1, 2, 3]);
            icc_one.map((value) => {
                return value * 2;
            });
            const icc_two = new this.iterator_cascade_callbacks([9, 8, 7]);
            icc_two.map((value) => {
                return value * 2;
            });
            const icc_zip = this.iterator_cascade_callbacks.zip(icc_one, icc_two);
            const collection = icc_zip.collect([]);
            const expected = [
                [[2, 0], [18, 0]],
                [[4, 1], [16, 1]],
                [[6, 2], [14, 2]],
            ];
            expect(collection).toStrictEqual(expected);
        });
        // test('zip ->', () => {});
    }
    /**
     *
     */
    testsZipValues() {
        test('zipValues -> Will it zip values of `Iterator_Cascade_Callbacks` instances?', () => {
            const icc_one = new this.iterator_cascade_callbacks([1, 2, 3]);
            const icc_two = new this.iterator_cascade_callbacks([4, 5, 6]);
            const icc_zip = this.iterator_cascade_callbacks.zipValues(icc_one, icc_two);
            const collection = icc_zip.collect([]);
            const expected = [
                [1, 4],
                [2, 5],
                [3, 6],
            ];
            expect(collection).toStrictEqual(expected);
        });
        test('zipValues -> Will coerce iterables into `Iterator_Cascade_Callbacks` instances?', () => {
            const icc_zip = this.iterator_cascade_callbacks.zipValues([1, 2, 3], [...'abc']);
            const collection = icc_zip.collect([]);
            const expected = [
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ];
            expect(collection).toStrictEqual(expected);
        });
        test('zipValues -> What happens when iterators are uneven in length?', () => {
            const icc_zip = this.iterator_cascade_callbacks.zipValues([1, 2, 3], [...'ab']);
            const collection = icc_zip.collect([]);
            const expected = [
                [1, 'a'],
                [2, 'b'],
                [3, undefined],
            ];
            expect(collection).toStrictEqual(expected);
        });
        // test('zipValues ->', () => {});
    }
    /**
     *
     */
    testsEdgeCases() {
        test('testsEdgeCases -> What happens when extra parameters are provided?', () => {
            const map_callback = (value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...parameters) => {
                if (parameters.length > index_or_key) {
                    return [parameters.splice(index_or_key)[0], index_or_key];
                }
                return [value, index_or_key];
            };
            const icc = new this.iterator_cascade_callbacks([1, 2, 3, 4]);
            icc.map(map_callback, 'first', 'second', 'third');
            const collection = icc.collect([]);
            expect(collection).toStrictEqual(['first', 'second', 'third', 4]);
        });
        // test('tests Edge Cases ->', () => {});
    }
    /**
     *
     */
    testsErrorStates() {
        test('testsErrorStates -> `.constructor()` -- Will unsported input throw an Error?', () => {
            expect(() => { new this.iterator_cascade_callbacks(42); }).toThrow(TypeError);
        });
        test('testsErrorStates -> `.collect()` -- Will an unsuported collection target throw an Error?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            // @ts-ignore
            expect(() => { icc.collect(''); }).toThrow(TypeError);
        });
        test('testsErrorStates -> `.map()` -- Does `.next()` re-throw errors from callbacks?', () => {
            const icc = new this.iterator_cascade_callbacks(this.array_input);
            icc.map(value => {
                throw new Error('Please re-throw this `.next()` method!');
            });
            expect(() => {
                const [value, index_or_key] = icc.next();
            }).toThrowError('Please re-throw this `.next()` method!');
        });
        // test('testsErrorStates -> ', () => {});
    }
}
const test__iterator_cascade_callbacks = new Test__Iterator_Cascade_Callbacks();
test__iterator_cascade_callbacks.runTests();
//# sourceMappingURL=tests-iterator-cascade-callbacks.js.map