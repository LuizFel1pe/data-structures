import { describe, beforeEach, test, expect } from '@jest/globals';
import Set from '../../set/set.js';

describe('test suite set', () => {
  let set;
  const elements = [5, 7, 9, 3, 45, 74, 56];

  function insertElements() {
    elements.forEach(e => set.add(e));
  }

  beforeEach(() => {
    set = new Set();
  });

  test('it should start empty', () => {
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toBeTruthy();
  });

  test('addElement', () => {
    insertElements();

    expect(set.isEmpty()).toBeFalsy();
    expect(set.size()).toBe(elements.length);
  });

  test('does not allow duplicated items', () => {
    for (let i = 0; i < elements.length; i++) {
      expect(set.add(elements[i])).toBeTruthy();
    }

    for (let i = 0; i < elements.length; i++) {
      expect(set.add(elements[i])).toBeFalsy();
    }
  });

  test('remove elements', () => {
    insertElements();

    for (let e of elements) {
      expect(set.delete(e)).toBeTruthy;
    }

    // Element not exist
    expect(set.delete(7)).toBeFalsy();
    expect(set.size()).toEqual(0);
  });

  test('return if elements exist', () => {
    insertElements();

    expect(set.has(45)).toBeTruthy();
    expect(set.has(9)).toBeTruthy();
    expect(set.has(2)).toBeFalsy();
  });

  test('return the correct size', () => {
    expect(set.size()).toEqual(0);
    insertElements();
    expect(set.size()).toEqual(elements.length);
  });

  test('union between sets', () => {
    const set1 = new Set();
    const set2 = new Set();

    set1.add(1);
    set1.add(2);
    set1.add(3);
    set1.add(4);

    set2.add(3);
    set2.add(4);
    set2.add(5);
    set2.add(6);
    set2.add(7);

    const unionSet = set1.union(set2);
    expect(unionSet.values()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test('Intersection between sets', () => {
    const set1 = new Set();
    const set2 = new Set();

    let set3 = set1.intersection(set2);
    expect(set3.size()).toEqual(0);

    set1.add(1);
    set1.add(2);
    set1.add(3);
    set1.add(4);

    set2.add(3);
    set2.add(4);
    set2.add(5);
    set2.add(6);
    set2.add(7);

    const intersectionSet = set1.intersection(set2);
    expect(intersectionSet.values()).toEqual([3, 4]);
  });

  test('Difference between sets', () => {
    const set1 = new Set();
    const set2 = new Set();

    set1.add(1);
    set1.add(2);
    set1.add(3);
    set1.add(4);

    set2.add(3);
    set2.add(4);
    set2.add(5);
    set2.add(6);
    set2.add(7);

    const diffSet1 = set1.difference(set2);
    expect(diffSet1.values()).toEqual([1, 2]);

    const diffSet2 = set2.difference(set1);
    expect(diffSet2.values()).toEqual([5, 6, 7]);
  });

  test('Is it subset of', () => {
    const set1 = new Set();
    const set2 = new Set();

    set1.add(3);
    set1.add(4);

    set2.add(3);
    set2.add(4);
    set2.add(5);
    set2.add(6);
    set2.add(7);

    let isSubset = set1.isSubsetOf(set2);
    expect(isSubset).toBeTruthy()

    isSubset = set2.isSubsetOf(set1);
    expect(isSubset).toBeFalsy();
  });
});
