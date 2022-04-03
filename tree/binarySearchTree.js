import { NodeTree } from '../models/node.js';
import { Compare, defaultCompare } from '../utils/index.js';

export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new NodeTree(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new NodeTree(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  insert(key) {
    if (this.root == null) {
      this.root = new NodeTree(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  removeNode(node, key) {
    if (node == null) {
      return null
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }

      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }

      const aux = this.minNode(node.right);
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node; 
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  searchNode(node, key) {
    if (node != null) {
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        this.searchNode(node.left, key);
      } else if (this.compareFn(key, node.right)) {
        this.searchNode(node.right, key);
      } else {
        return true;
      }
    }
    return false;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  minNode(node) {
    let current = node;

    while (current != null && current.left != null) {
      current = current.left;
    }

    return current;
  }

  min() {
    return this.minNode(this.root);
  }

  preOrderTraverse(node, cb) {
    if (node != null) {
      this.preOrderTraverse(node.left, cb);
      cb(node);
      this.preOrderTraverse(node.right, cb);
    }
  }

  inOrder(cb) {
    this.preOrderTraverse(this.root, cb);
  }

  postOrderTraverse(node, cb) {
    if (node != null) {
      this.postOrderTraverse(node.left, cb);
      this.postOrderTraverse(node.right, cb);
      cb(node);
    }
  }

  postOrder(cb) {
    this.postOrderTraverse(this.root, cb);
  }

  preOrderTraverse(node, cb) {
    if (node != null) {
      cb(node);
      this.preOrderTraverse(node.left, cb);
      this.preOrderTraverse(node.right, cb);
    }
  }

  preOrder(cb) {
    this.preOrderTraverse(this.root, cb);
  }
}



