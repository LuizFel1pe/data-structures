import { describe, test, expect } from '@jest/globals';
import heapSort from '../../algorithms/sort/heap.js';
import { createNonSortedArray, createSortedArray } from './helper.js';

const SIZE = 100;

describe('Test Heap Sort', () => {
  test('Work with non-sorted array', () => {
    const array = createNonSortedArray(SIZE);
    const expectArray = createSortedArray(SIZE);

    const result = heapSort(array);
    expect(result).toEqual(expectArray);
  });

  test('Work with sorted array should do nothing', () => {
    const array = createSortedArray(SIZE);
    const result = heapSort(array);
    expect(result).toEqual(array);
  });
});
