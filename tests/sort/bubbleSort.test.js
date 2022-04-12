import { describe, test, expect } from '@jest/globals';
import bubbleSort from '../../algorithms/sort/bubble.js';
import { createNonSortedArray, createSortedArray } from './helper.js';

const SIZE = 100;

describe('Test bubble Sort', () => {
  test('Work with non-sorted array', () => {
    const array = createNonSortedArray(SIZE);
    const expectArray = createSortedArray(SIZE);

    const result = bubbleSort(array);
    expect(result).toEqual(expectArray)
  });

  test('Work with sorted array should do nothing', () => {
    const array = createSortedArray(SIZE);
    const result = bubbleSort(array);
    expect(result).toEqual(array);
  })
});
