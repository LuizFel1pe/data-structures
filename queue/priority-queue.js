import PriorityElement from '../models/priority-element.js';
import { defaultCompare, Compare, swap } from '../utils/index.js';

class PriorityQueue {
  #queue;
  #length;
  #compareFn;
  constructor(compareFn = defaultCompare) {
    this.#queue = [];
    this.#compareFn = compareFn;
  }

  #getLeftNode(index) {
    return 2 * index + 1;
  }

  #getRightNode(index) {
    return 2 * index + 2;
  }

  #getParentNode(index) {
    if (index === 0) {
      return null;
    }

    return Math.floor((index - 1) / 2);
  }

  #siftUp(index) {
    let parent = this.#getParentNode(index);
    while (
      index > 0 &&
      this.#compareFn(
        this.#queue[parent].priority,
        this.#queue[index].priority
      ) === Compare.BIGGER_THAN
    ) {
      swap(this.#queue, parent, index);
      index = parent;
      parent = this.#getParentNode(index);
    }
  }

  #siftDown(index) {
    let element = index;
    const left = this.#getLeftNode(index);
    const right = this.#getRightNode(index);
    const size = this.#queue.length;

    if (
      left < size &&
      this.#compareFn(
        this.#queue[element].priority,
        this.#queue[left].priority
      ) === Compare.BIGGER_THAN
    ) {
      element = left;
    }

    if (
      right < size &&
      this.#compareFn(
        this.#queue[element].priority,
        this.#queue[right].priority
      ) === Compare.BIGGER_THAN
    ) {
      element = right;
    }

    if (index !== element) {
      swap(this.#queue, index, element);
      this.#siftDown(element);
    }
  }

  enqueue(element, priority) {
    if (element != null && priority != null) {
      const priorityElement = new PriorityElement(element, priority);
      this.#queue.push(priorityElement);
      this.#siftUp(this.#queue.length - 1);
      return true;
    }

    return false;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.#length === 1) {
      return this.#queue.pop();
    }

    const removedElement = this.#queue[0];
    this.#queue[0] = this.#queue.pop();
    this.#siftDown(0); // Sift down index = 0
    return removedElement;
  }

  size() {
    return this.#queue.length;
  }

  isEmpty() {
    return this.#queue.length === 0;
  }

  forEach(fn) {
    if (this.isEmpty()) {
      return '';
    }

    for (let i = 0; i < this.#queue.length; i++) {
      fn(this.#queue[i], i, this.#queue);
    }
  }
}