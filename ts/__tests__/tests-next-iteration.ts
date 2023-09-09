#!/usr/bin/env node

import { Next_Iteration } from '../iterator-cascade-callbacks';

'use strict';


class Tests__Next_Iteration {
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
      const next_iteration = new Next_Iteration('Test message');
      expect(next_iteration).toBeInstanceOf(Next_Iteration);
    });

    test('constructor -> Is it okay to not define a message string?', () => {
      const next_iteration = new Next_Iteration();
      expect(next_iteration).toBeInstanceOf(Next_Iteration);
    });

    // test('constructor ->', () => {});
  }
}


const tests_next_iteration = new Tests__Next_Iteration();
tests_next_iteration.runTests();

