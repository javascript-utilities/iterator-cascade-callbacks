#!/usr/bin/env node

import { Pause_Iteration } from '../lib/errors';

'use strict';


class Tests__Pause_Iteration {
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
      const pause_iteration = new Pause_Iteration('Test message');
      expect(pause_iteration).toBeInstanceOf(Pause_Iteration);
    });

    test('constructor -> Is it okay to not define a message string?', () => {
      const pause_iteration = new Pause_Iteration();
      expect(pause_iteration).toBeInstanceOf(Pause_Iteration);
    });

    // test('constructor ->', () => {});
  }
}


const tests_pause_iteration = new Tests__Pause_Iteration();
tests_pause_iteration.runTests();

