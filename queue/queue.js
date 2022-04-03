export default class Queue {
  #count;
  #lowestCount;
  #items;
  constructor() {
    this.#count = 0;
    this.#lowestCount = 0;
    this.#items = {};
  }

  enqueue(element) {
    this.#items[this.#count] = element;
    this.#count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const result = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.#lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.#items[this.#lowestCount];
  }

  isEmpty() {
    return this.#count - this.#lowestCount === 0;
  }

  size() {
    return this.#count - this.#lowestCount;
  }

  clear() {
    this.items = {};
    this.#count = 0;
    this.#lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }

    let objString = `${this.#items[this.#lowestCount]}`;
    for (let i = this.#lowestCount + 1; i < this.#count; i++) {
      objString = `${objString}, ${this.#items[i]}`;
    }

    return objString;
  }
}

// const queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);
// queue.enqueue(5);
// console.log(queue.toString());
// queue.dequeue();
// console.log(queue.toString());
// console.log(queue.peek());
// console.log(queue.size());
