import Node from './node.js';

export default class Tree {
  getTree(list) {
    let firstNode;
    let secondNode;
    while (list.length > 1) {
      firstNode = list.removeNode();
      secondNode = list.removeNode();
      let newNode = new Node('+', firstNode.frequency + secondNode.frequency);
      newNode.left = firstNode;
      newNode.right = secondNode;

      list.insert(newNode);
    }

    return list.head;
  }
}
