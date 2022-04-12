import { expect, describe, test, beforeEach } from '@jest/globals';
import Deque from '../../queue/deque.js';

describe('Deque', () => {
  let deque;

  beforeEach(() => {
    deque = new Deque();
  });

  test('starts empty', () => {
    expect(deque.size()).toEqual(0);
    expect(deque.isEmpty()).toBeTruthy();
  });

  test('add elements in the back', () => {
    deque.addBack(1);
    expect(deque.size()).toEqual(1);

    deque.addBack(2);
    expect(deque.size()).toEqual(2);

    deque.addBack(3);
    expect(deque.size()).toEqual(3);
  });

  test('add elements in the front', () => {
    deque.addFront(1);
    expect(deque.size()).toEqual(1);

    deque.addFront(2);
    expect(deque.size()).toEqual(2);

    deque.addFront(3);
    expect(deque.size()).toEqual(3);

    deque.removeFront();
    deque.addFront(4);
    expect(deque.size()).toEqual(3);
  });

  test('remove elements from the back', () => {
    deque.addBack(1);
    deque.addBack(2);
    deque.addBack(3);
    deque.addFront(0);

    expect(deque.removeBack()).toEqual(3);
    expect(deque.removeBack()).toEqual(2);
    expect(deque.removeBack()).toEqual(1);
    expect(deque.removeBack()).toEqual(0);
    expect(deque.removeBack()).toEqual(null);
  });

  test('remove elements from the front', () => {
    deque.addFront(1);
    deque.addBack(2);
    deque.addBack(3);
    deque.addFront(0);
    deque.addFront(-1);
    deque.addFront(-2);

    expect(deque.removeFront()).toEqual(-2);
    expect(deque.removeFront()).toEqual(-1);
    expect(deque.removeFront()).toEqual(0);
    expect(deque.removeFront()).toEqual(1);
    expect(deque.removeFront()).toEqual(2);
    expect(deque.removeFront()).toEqual(3);
    expect(deque.removeFront()).toEqual(null);
  });

  test('allows to peek at the front element in the deque without removing it', () => {
    expect(deque.peekFront()).toEqual(undefined);

    deque.addFront(1);
    expect(deque.peekFront()).toEqual(1);
    deque.addBack(2);
    expect(deque.peekFront()).toEqual(1);
    deque.addBack(3);
    expect(deque.peekFront()).toEqual(1);
    deque.addFront(0);
    expect(deque.peekFront()).toEqual(0);
    deque.addFront(-1);
    expect(deque.peekFront()).toEqual(-1);
    deque.addFront(-2);
    expect(deque.peekFront()).toEqual(-2);
  });

  test('allows to peek at the last element in the deque without removing it', () => {
    expect(deque.peekBack()).toEqual(undefined);

    deque.addFront(1);
    expect(deque.peekBack()).toEqual(1);
    deque.addBack(2);
    expect(deque.peekBack()).toEqual(2);
    deque.addBack(3);
    expect(deque.peekBack()).toEqual(3);
    deque.addFront(0);
    expect(deque.peekBack()).toEqual(3);
    deque.addFront(-1);
    expect(deque.peekBack()).toEqual(3);
    deque.addFront(-2);
    expect(deque.peekBack()).toEqual(3);
  });

  test('returns the correct size', () => {
    expect(deque.size()).toEqual(0);

    deque.addFront(1);
    expect(deque.size()).toEqual(1);
    deque.addBack(2);
    expect(deque.size()).toEqual(2);
    deque.addBack(3);
    expect(deque.size()).toEqual(3);
    deque.addFront(0);
    expect(deque.size()).toEqual(4);
    deque.addFront(-1);
    expect(deque.size()).toEqual(5);
    deque.addFront(-2);
    expect(deque.size()).toEqual(6);

    deque.clear();
    expect(deque.size()).toEqual(0);

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.size()).toEqual(2);

    deque.removeFront();
    deque.removeBack();
    expect(deque.size()).toEqual(0);
  });

  test('returns if it is empty', () => {
    expect(deque.isEmpty()).toBeTruthy();

    deque.addFront(1);
    expect(deque.isEmpty()).toBeFalsy();
    deque.addBack(2);
    expect(deque.isEmpty()).toBeFalsy();

    deque.clear();
    expect(deque.isEmpty()).toBeTruthy();

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.isEmpty()).toBeFalsy();

    deque.removeFront();
    expect(deque.isEmpty()).toBeFalsy();
    deque.removeBack();
    expect(deque.isEmpty()).toBeTruthy();
  });

  test('clears the queue', () => {
    deque.clear();
    expect(deque.isEmpty()).toBeTruthy();

    deque.addFront(1);
    deque.addBack(2);

    deque.clear();
    expect(deque.isEmpty()).toBeTruthy();
  });
});