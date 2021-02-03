#!/usr/bin/env node


'use strict';


class Tests__Stop_Iteration {
  constructor() {
    this.stop_iteration = require('../iterator-cascade-callbacks').Stop_Iteration;
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
    test('constructor -> Is passing a string message acceptable?', () => {
      const stop_iteration = new this.stop_iteration('Test message');
      expect(stop_iteration).toBeInstanceOf(this.stop_iteration);
    });

    test('constructor -> Is it okay to not define a message string?', () => {
      const stop_iteration = new this.stop_iteration();
      expect(stop_iteration).toBeInstanceOf(this.stop_iteration);
    });

    // test('constructor ->', () => {});
  }
}


const tests_stop_iteration = new Tests__Stop_Iteration();
tests_stop_iteration.runTests();


interface Tests__Stop_Iteration {
  stop_iteration: ICC.Stop_Iteration;
}

