import { expect, describe, test, beforeEach } from '@jest/globals';
import LinkedList from '../../linked-list/linkedList.js';

describe('test suite for linked-list', () => {
  let list;
  const listSize = 10;

  function verifyList() {
    let current = list.getHead();
    expect(current).not.toBeNull();
    for (let i = 0; i < listSize; i++) {
      expect(current.element).toEqual(i);
      current = current.next;
    }
  }

  beforeEach(() => {
    list = new LinkedList();
  });

  test('starts empty', () => {
    expect(list.size()).toEqual(0);
    expect(list.isEmpty()).toBeTruthy();
    expect(list.getHead()).toBeNull();
  });

  test('it should push elements', () => {
    for (let i = 0; i < listSize; i++) {
      list.push(i);
    }

    expect(list.size()).toEqual(listSize);
    verifyList();
  });

  test('returns null at specific element index that is not in list', () => {
    expect(list.getElementAt(3)).toBeNull();
  });

  test('it remove elements from list', () => {
    expect(list.remove()).toBeNull();

    const elements = [1, 5, 7, 6, 9, 8, 4];
    for (let i = 0; i < elements.length; i++) {
      list.push(elements[i]);
    }

    expect(list.removeAt(0)).toEqual(1);
    expect(list.size()).toEqual(6);
    const indexOf8 = list.indexOf(8);
    expect(list.removeAt(indexOf8)).toEqual(8);
    expect(list.size()).toEqual(5);

    // 5 -> 7 -> 6 -> 9 -> 4
    let current = list.getHead();
    expect(current.element).toEqual(5);
    current = current.next;
    expect(current.element).toEqual(7);
    current = current.next;
    expect(current.element).toEqual(6);
    current = current.next;
    expect(current.element).toEqual(9);
    current = current.next;
    expect(current.element).toEqual(4);
  });

  test('it should clear list', () => {
    const elements = [1, 5, 7, 6, 9, 8, 4];
    for (let i = 0; i < elements.length; i++) {
      list.push(elements[i]);
    }

    list.clear();
    expect(list.size()).toEqual(0);
  });
});
