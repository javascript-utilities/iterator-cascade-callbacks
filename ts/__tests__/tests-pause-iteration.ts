#!/usr/bin/env node


'use strict';


class Tests__Pause_Iteration {
  constructor() {
    this.pause_iteration = require('../iterator-cascade-callbacks').Pause_Iteration;
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
      const pause_iteration = new this.pause_iteration('Test message');
      expect(pause_iteration).toBeInstanceOf(this.pause_iteration);
    });

    test('constructor -> Is it okay to not define a message string?', () => {
      const pause_iteration = new this.pause_iteration();
      expect(pause_iteration).toBeInstanceOf(this.pause_iteration);
    });

    // test('constructor ->', () => {});
  }
}


const tests_pause_iteration = new Tests__Pause_Iteration();
tests_pause_iteration.runTests();


interface Tests__Pause_Iteration {
  pause_iteration: ICC.Pause_Iteration;
}

