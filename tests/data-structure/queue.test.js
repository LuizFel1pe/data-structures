import { expect, describe, test, beforeEach } from '@jest/globals';
import Queue from '../../queue/queue.js';

describe('test suite for queue', () => {
  let queue;
  beforeEach(() => {
    queue = new Queue();
  });

  test('it should start empty', () => {
    expect(queue.size()).toEqual(0);
    expect(queue.isEmpty()).toBeTruthy();
  });

  test('it should enqueue elements', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.size()).toEqual(4);
  });

  test('it should remove a element from back of queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);

    expect(queue.dequeue()).toEqual(1);
    expect(queue.dequeue()).toEqual(2);
    expect(queue.dequeue()).toEqual(3);
    expect(queue.dequeue()).toEqual(4);
    expect(queue.dequeue()).toBeNull();
  });

  test('FIFO logic', () => {
    queue.enqueue(1);
    expect(queue.peek()).toEqual(1);
    queue.enqueue(2);
    expect(queue.peek()).toEqual(1);
    queue.enqueue(3);
    expect(queue.peek()).toEqual(1);

    expect(queue.dequeue()).toEqual(1);
    expect(queue.peek()).toEqual(2);
    expect(queue.dequeue()).toEqual(2);
    expect(queue.dequeue()).toEqual(3);
    expect(queue.dequeue()).toBeNull();
  });

  test('it should returns the correct size', () => {
    expect(queue.size()).toEqual(0);
    queue.enqueue(1);
    expect(queue.size()).toEqual(1);
    queue.enqueue(2);
    expect(queue.size()).toEqual(2);
    queue.enqueue(3);
    expect(queue.size()).toEqual(3);

    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.size()).toEqual(3);

    queue.dequeue();
    expect(queue.size()).toEqual(2);
    queue.dequeue();
    expect(queue.size()).toEqual(1);
    queue.dequeue();
    expect(queue.size()).toEqual(0);
    queue.dequeue();
    expect(queue.size()).toEqual(0);
  });
});
