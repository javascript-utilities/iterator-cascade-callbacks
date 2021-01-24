#!/usr/bin/env node


'use strict';


interface Count_Iterator {
  constructor: typeof Count_Iterator;
}


/**
 *
 */
class Count_Iterator {
  value: number;
  done: boolean;

  constructor(value: number = -1) {
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
};



/**
 * Enables static methods to be called from within class methods
 * @see {link} - https://github.com/Microsoft/TypeScript/issues/3841
 */
interface Test__Iterator_Cascade_Callbacks {
  constructor: typeof Test__Iterator_Cascade_Callbacks;
}

/**
 * Enables static methods to be called from within class methods
 * @see {link} - https://github.com/Microsoft/TypeScript/issues/3841
 * @see {link} - https://stackoverflow.com/questions/12952248/interfaces-with-construct-signatures-not-type-checking
 */
interface Iterator_Cascade_Callbacks {
  // constructor: typeof Iterator_Cascade_Callbacks;
  new(arg: any): Iterator_Cascade_Callbacks;
  iteratorFromArray(iterable: any[]): Generator<any[], void, unknown>;
  iteratorFromObject(iterable: any[]): Generator<any[], void, unknown>;
  iteratorFromGenerator(iterable: any[]): Generator<any[], void, unknown>;
  UUID(): string;
}


/**
 * Tests methods for instance(s) of `Iterator_Cascade_Callbacks` class
 */
class Test__Iterator_Cascade_Callbacks {
  iterator_cascade_callbacks: Iterator_Cascade_Callbacks;

  array_input: any[];
  class_input: any;
  // class_input: Count_Iterator;
  // class_input: Function | Count_Iterator;
  object_input: { [key: string]: any };
  generator_input: Function;
  iterator_input: { next: Function };

  constructor() {
    this.iterator_cascade_callbacks = require('../iterator-cascade-callbacks').Iterator_Cascade_Callbacks;

    this.array_input = [9, 8, 7];

    this.class_input = Count_Iterator;

    this.generator_input = function* () { for (let value of [6, 5, 4]) { yield value; }};

    this.iterator_input = (function* () { for (let value of [6, 5, 4]) { yield value; }})();

    this.object_input = { spam: 'flavored', canned: 'ham' };
  }

  /**
   *
   */
  runTests() {
    this.testConstructor();

    /* Test `static` methods */
    this.testIteratorFromArray();

    /* Test instance methods */
    this.testCollectToArray();
    this.testCollectToFunction();
    this.testCollectToObject();
    this.testCollect();

    this.testsFilter();
    this.testsNext();
    this.testsLimit();
    this.testsMap();
    this.testsSkip();
    this.testsStep();
    // this.testsTake();

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
      const icc = new this.iterator_cascade_callbacks(function* () { for (let value of [6, 5, 4]) { yield value; }});
      const collection = icc.collectToArray([]);
      expect(collection).toStrictEqual([6, 5, 4]);
    });

    test('collectToArray -> Is collection from Iterator function to Array supported?', () => {
      const icc = new this.iterator_cascade_callbacks((function* () { for (let value of [6, 5, 4]) { yield value; }})());
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
  testCollectToObject() {
    test('collectToObject -> Are Objects unmodified without callbacks?', () => {
      const icc = new this.iterator_cascade_callbacks(this.object_input);
      const collection = icc.collectToObject({});
      expect(collection).toStrictEqual(this.object_input);
    });

    test('collectToObject ->', () => {
      const iterable = Array(20).fill(undefined).map((_, i) => i);

      const icc = new this.iterator_cascade_callbacks(iterable);

      const collection_one = icc.collectToObject({}, 4);
      const expected_one = Object.assign({}, iterable.splice(0, 4));
      expect(collection_one).toStrictEqual(expected_one);

      const collection_two = icc.collectToObject({}, 4);
      const expected_two = iterable.splice(0, 4).reduce((accumulator, value, index) => {
        accumulator[index + 4] = value;
        return accumulator;
      }, ({} as { [key: string]: number }));
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
      const collectToMap: Collect_To_Function = (target, value, index_or_key) => {
        (target as Map<(number | string), any>).set(index_or_key, value);
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
      const collectToDictionary: Collect_To_Function = (target, value, index_or_key) => {
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
   *
   */
  testsNext() {
    test('next -> Will `for` loop without callbacks yield expected values', () => {
      const input_copy = [...this.array_input];
      const icc = new this.iterator_cascade_callbacks(this.array_input);
      for (let [value, index] of icc) {
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
        return doubled ** 2;
      }).map((squared) => {
        return squared / 3;
      }).collect([]);

      const expected = iterable.map((value) => {
        return value * 2;
      }).map((doubled) => {
        return doubled ** 2;
      }).map((squared) => {
        return squared / 3;
      });

      expect(collection).toStrictEqual(expected);
    });

    test('map -> Is it okay for map callbacks to return `value` / `index_or_key` Tuple', () => {
      const icc = new this.iterator_cascade_callbacks(this.array_input);

      const collection = icc.map((value, index_or_key) => {
        return [(index_or_key as number) % 2 === 0, index_or_key];
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
  // testsTake() {
  //   test('take -> Can I has 2 elements?', () => {
  //     const icc = new this.iterator_cascade_callbacks(this.array_input);
  //     const collection = icc.take(2).collect([]);
  //     const expected = this.array_input.slice(0, 2);
  //     expect(collection).toStrictEqual(expected);
  //   });
  //   test('take -> ', () => {
  //     const iterable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  //     const icc = new this.iterator_cascade_callbacks(iterable);
  //     const collection = icc.take(2).collect([]);
  //     (collection as any[]).push(icc.take(2).collect([]));
  //     const expected = iterable.slice(0, 4);
  //     expect(collection).toStrictEqual(expected);
  //   });
  //   // test('take -> ', () => {});
  // }

  /**
   *
   */
  testsErrorStates() {
    test('testsErrorStates -> `.constructor()` -- Will unsported input throw an Error?', () => {
      expect(() => { new this.iterator_cascade_callbacks('Spam Flavored Ham'); }).toThrow(TypeError);
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

