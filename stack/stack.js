class Stack {
  #items;
  #count;
  constructor() {
    this.#items = {};
    this.#count = 0;
  }

  push(element) {
    this.#items[this.#count] = element;
    this.#count++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    this.#count--;
    const result = this.#items[this.#count];
    delete this.#items[this.#count];
    return result;
  }

  isEmpty() {
    return this.#count === 0;
  }

  size() {
    return this.#count;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.#items[this.#count - 1];
  }

  clear() {
    this.#items = {};
    this.#count = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }

    let objString = `${this.#items[0]}`;
    for (let i = 1; i < this.#count; i++) {
      objString = `${objString}, ${this.#items[i]}`;
    }
    return objString;
  }
}

const stack = new Stack();
stack.push(5);
stack.push(18);
stack.push(16);
stack.push(6);
stack.push(47);
stack.push(11);
stack.push(4);
stack.push(41);
console.log(stack.toString());