import { assertValueCanBeRendered } from './assertValueCanBeRendered';
import { test, expect } from 'vitest';

test('should raise exeption when not a string or number', () => {
  expect(() => {
    assertValueCanBeRendered(true);
  }).toThrow('value is not a string or a number');
});

test('should not raise exeption when string', () => {
  expect(() => {
    assertValueCanBeRendered('something');
  }).not.toThrow();
});

test('should not raise exeption when number', () => {
  expect(() => {
    assertValueCanBeRendered(99);
  }).not.toThrow();
});
