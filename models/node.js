import { Colors } from '../utils/index.js';

export class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

export class DoublyNode {
  constructor(element) {
    this.prev = null;
    this.next = null;
    this.element = element;
  }
}

export class NodeTree {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export class RedBlackNode {
  constructor(key) {
    this.key = key;
    this.color = null;
    this.parent = null;
    this.left - null;
    this.right = null;
  }
}

