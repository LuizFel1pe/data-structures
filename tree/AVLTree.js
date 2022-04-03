import BinarySearchTree from './binarySearchTree.js';
import { BalanceFactor, Compare, defaultCompare } from '../utils/index.js';
import { NodeTree } from '../models/node.js';

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.root = null;
    this.compareFn = compareFn;
  }

  insertNode(node, key) {
    if (node == null) {
      return new NodeTree(key);
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node;
    }

    const bFactor = this.getBalanceFactor(node);
    if (bFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationRight(node);
      } else {
        return this.rotationLR(node);
      }
    }

    if (bFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationLeft(node);
      } else {
        return this.rotationRL(node);
      }
    }
    return node;
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  removeNode(node, key) {
    node = super.removeNode(node, key);
    if (node == null) {
      return node;
    }

    const bFactor = this.getBalanceFactor(node);
    if (bFactor === BalanceFactor.UNBALANCED_LEFT) {
      const bFactorLeft = this.getBalanceFactor(node.left);
      if (bFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRight(node);
      } else {
        return this.rotationLeftRight(node);
      }
    }

    if (bFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const bFactorRight = this.getBalanceFactor(node.right);
      if (bFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        console.log('here');
        return this.rotationLeft(node);
      } else {
        console.log('log')
        return this.rotationRL(node);
      }
    }

    return node;
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  rotationRight(node) {
    let tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  rotationLeft(node) {
    let tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  rotationRL(node) {
    node.right = this.rotationRight(node.right);
    return this.rotationLeft(node);
  }

  rotationLR(node) {
    node.left = this.rotationLeft(node.left);
    return this.rotationRight(node);
  }

  getBalanceFactor(node) {
    const heightDifference =
      this.getNodeHeight(node.right) - this.getNodeHeight(node.left);

    switch (heightDifference) {
      case 2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case -2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }

    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }
}

const avl = new AVLTree();
avl.insert(70);
avl.insert(80);
avl.insert(50);
avl.insert(72);
avl.insert(90);
avl.insert(75);
avl.insert(74)
// avl.insert(95)
avl.remove(70);
avl.preOrder(node => console.log(node.key));
