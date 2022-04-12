import { expect, describe, test, beforeEach } from '@jest/globals';
import DoublyLinkedList from '../../linked-list/doublyLinkedList.js';

describe('DoublyLinkedList', () => {
  let list;
  const testElements = [1, 5, 7, 6, 9, 8, 4];

  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  function pushElements() {
    for (let i = 0; i < testElements.length; i++) {
      list.push(testElements[i]);
    }
  }

  test('starts empty', () => {
    expect(list.size()).toEqual(0);
    expect(list.isEmpty()).toBeTruthy();
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
  });

  test('push elements', () => {
    pushElements();

    expect(list.size()).toEqual(testElements.length);
  });

  test('returns element at specific index: invalid position', () => {
    expect(list.getElementAt(3)).toBeNull();
  });

  test('inserts element at the first position', () => {
    const element = 1;
    pushElements();

    expect(list.insert(element, 0)).toBeTruthy();
    expect(list.getHead().element).toEqual(element);

    list.insert(11, 0);
    list.insert(27, 0);
    list.insert(14, 0);
    list.insert(74, 0);
    list.insert(65, 0);

    expect(list.getHead().element).toEqual(65);
  });

  test('inserts elements invalid position empty list', () => {
    expect(list.insert(1, 1)).toBeFalsy();
  });

  test('inserts elements invalid position not empty list', () => {
    const element = 1;
    expect(list.insert(element, 0)).toBeTruthy();
    expect(list.insert(element, 2)).toBeFalsy();
  });

  test('inserts elements at the end of list', () => {
    const max = 10;
    for (let i = 1; i < max; i++) {
      list.insert(i, i - 1);
    }

    expect(list.getTail().element).toEqual(9);
  });

  test('inserts elements in the middle of list', () => {
    pushElements();
    // list 1, 5, 7, 6, 9, 8, 4

    expect(list.insert(2, 1)).toBeTruthy();
    let current = list.getHead();
    expect(current.next.element).toEqual(2);
  });

  test('removes invalid elements', () => {
    pushElements();
    expect(list.remove(77)).toBeFalsy();
  });

  test('removes valid elements', () => {
    pushElements();

    testElements.forEach(element => {
      list.remove(element);
    })

    expect(list.size()).toEqual(0);
  });

  test('removes element invalid position empty list', () => {
    let element;

    for (let i = 1; i <= 3; i++) {
      element = list.removeAt(i - 1);
      expect(element).toBeNull();
    }
  });

  test('removes element invalid position not empty list', () => {
    pushElements();

    expect(list.removeAt(testElements.length)).toBeNull();
  });

  test('removes first element list single element', () => {
    const value = 1;
    list.push(value);

    const element = list.removeAt(0);
    expect(element).not.toBeNull();
    expect(element).toEqual(value);

    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
    expect(list.isEmpty()).toBeTruthy();
  });

  test('removes first element list multiple elements', () => {
    pushElements();
    // list 1, 5, 7, 6, 9, 8, 4

    const element = list.removeAt(0);
    expect(element).not.toBeNull();
    expect(element).toEqual(1);

    // list need to be 5, 7, 6, 9, 8, 4
    let current = list.getHead();
    expect(current.element).toEqual(5);
    for (let i = 1; i < testElements.length; i++) {
      expect(current.element).toEqual(testElements[i]);
      current = current.next;
    }
  });

  test('removes element from end of list', () => {
    pushElements();
    // list 1, 5, 7, 6, 9, 8, 4
    
    let element;
    for (let i = testElements.length - 1; i >= 0; i--) {
      element = list.removeAt(i);
      expect(element).not.toBeNull();
      expect(element).toEqual(testElements[i]);
    }

    expect(list.size()).toEqual(0);
  });

  test('removes element from middle of list', () => {
    pushElements();     
    // list 1, 5, 7, 6, 9, 8, 4

    const element = list.removeAt(1);
    expect(element).not.toBeNull();
    expect(element).toEqual(5);

    // list needs to be 1, 7, 6, 9, 8, 4
    let current = list.getHead();
    expect(current.next.element).toEqual(7);
    current = current.next;
    expect(current.prev.element).toEqual(1);
  });

  test('returns the correct size', () => {
    expect(list.size()).toEqual(0);

    pushElements();

    expect(list.size()).toEqual(testElements.length);

    for (let i = 0; i < testElements.length; i++) {
      list.remove(testElements[i]);
    }

    expect(list.size()).toEqual(0);
  });

  test('returns if it is empty', () => {
    expect(list.isEmpty()).toBeTruthy();
    for (let i = 0; i < 10; i++) {
      list.push(i);
      expect(list.isEmpty()).toBeFalsy();
    }

    for (let i = 1; i < 10; i++) {
      list.remove(i);
      expect(list.isEmpty()).toBeFalsy();
    }

    pushElements();
    expect(list.isEmpty()).toBeFalsy();

    list.clear();
    expect(list.isEmpty()).toBeTruthy();
  });
});
