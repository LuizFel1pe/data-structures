import Node from './node.js';

export default class List {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  insert(node) {
    let current = this.head;

    if (this.head == null) {
      this.head = node;
    } else if (node.frequency < this.head.frequency) {
      node.next = this.head;
      this.head = node;
    } else {
      while (current.next != null && current.next.frequency <= node.frequency) {
        current = current.next;
      }

      node.next = current.next;
      current.next = node;
    }

    this.length++;
  }

  removeNode() {
    let current = null;

    if (this.head != null) {
      current = this.head;
      this.head = current.next;
      current.next = null;
      this.length--;
    }

    return current;
  }

  generateList(table) {
    let newNode;
    table.forEach((frequency, index) => {
      if (frequency > 0) {
        const char = String.fromCharCode(index);
        newNode = new Node(char, frequency);
        this.insert(newNode);
      }
    });
  }
}
