#!/usr/bin/env node

import { Stop_Iteration } from '../lib/errors';

'use strict';


class Tests__Stop_Iteration {
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
      const stop_iteration = new Stop_Iteration('Test message');
      expect(stop_iteration).toBeInstanceOf(Stop_Iteration);
    });

    test('constructor -> Is it okay to not define a message string?', () => {
      const stop_iteration = new Stop_Iteration();
      expect(stop_iteration).toBeInstanceOf(Stop_Iteration);
    });

    // test('constructor ->', () => {});
  }
}


const tests_stop_iteration = new Tests__Stop_Iteration();
tests_stop_iteration.runTests();

