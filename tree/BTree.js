import { BTreeNode } from '../models/node.js';

class BTreeProps {
  constructor(degree) {
      this.degree = degree;
      this.maxKeys = degree - 1;
      this.midKeyIndex = parseInt((degree - 1) / 2);
    }

  isMaxedOut(node) {
    return node.keys.length === this.maxKeys;
  }

  splitChild(parent, childIndex) {
    const child = parent.children[childIndex];
    const middleKey = child.keys[this.midKeyIndex];
    const rightKeys = child.keys.splice(this.midKeyIndex).splice(1);
    const rightChildren = !child.isLeaf()
      ? child.children.splice(this.midKeyIndex + 1)
      : null;
    const newChildNode = new BTreeNode(rightKeys, rightChildren);
    parent.keys.splice(childIndex, 0, middleKey);
    parent.children.splice(childIndex + 1, 0, newChildNode);
  }

  insert(node, key) {
    let index = node.keys.length - 1;
    while (index >= 0 && node.keys[index] >= key) {
      index -= 1;
    }

    let uIndex = index + 1;
    if (node.isLeaf()) {
      node.keys.splice(uIndex, 0, key);
    } else {
      if (this.isMaxedOut(node.children[uIndex])) {
        this.splitChild(node, uIndex);
        if (node.keys[uIndex] < key) {
          uIndex += 1;
        }
      }

      this.insert(node.children[uIndex], key);
    }
  }

  traverseNode(node, depth) {
    if (node.isLeaf()) {
      console.log(`depth: ${depth}, [${node.keys}]`);
    } else {
      let _depth = depth + 1;
      for (let index in node.keys) {
        this.traverseNode(node.children[index], _depth);
        console.log(`Depth: ${depth}, [${node.keys}]`);
      }
      this.traverseNode(node.children[node.children.length - 1], depth);
    }
  }
}

class BTree {
  constructor(branchFactor = 2) {
    // degree = 2 * branchFactor
    this.root = new BTreeNode(null, null); // First Node don't have keys neither children so null for both
    this.props = new BTreeProps(2 * branchFactor);
  }

  insert(key) {
    if (this.props.isMaxedOut(this.root)) {
      let newRoot = new BTreeNode(null, null);
      const oldRoot = this.root;
      this.root = newRoot;
      this.root.children.splice(0, 0, oldRoot);
      this.props.splitChild(this.root, 0)
    }
    this.props.insert(this.root, key)
  }

  traverse() {
    this.props.traverseNode(this.root, 0); 
  }

  search(key) {
    let currentNode = this.root;
    let index;
    while (true) {
      index = currentNode.keys.length - 1;
      while (index >= 0 && currentNode.keys[index] > key) {
        index -= 1;
      }

      let uIndex = index + 1;
      if (index >= 0 && currentNode.keys[uIndex - 1] == key) {
        return true;
      } else if (currentNode.isLeaf()) {
        return false;
      } else {
        currentNode = currentNode.children[uIndex];
      }
    }
  }
}