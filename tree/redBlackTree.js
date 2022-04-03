import { Colors, createNode, createLeafNode, isNull } from '../utils/index.js';
import BinarySearchTree from './binarySearchTree.js';

export default class RedBlackTree extends BinarySearchTree {
  constructor() {
    super();
    this.root = null;
  }

  rotationLeft(node) {
    const aux = node.right;

    if (isNull(aux.left)) {
      node.right = createLeafNode(node);
    } else {
      node.right = aux.left;
    }

    if (!isNull(aux.left)) {
      aux.left.parent = node;
    }

    aux.parent = node.parent;
    if (isNull(node.parent)) {
      this.root = aux;
    } else {
      if (node === node.parent.left) {
        node.parent.left = aux;
      } else {
        node.parent.right = aux;
      }
    }
    aux.left = node;
    node.parent = aux;
  }

  rotationRight(node) {
    const aux = node.left;
    if (isNull(aux.right)) {
      node.left = createLeafNode(node);
    } else {
      node.left = aux.right;
    }

    if (!isNull(aux.right)) {
      aux.right.parent = node;
    }

    aux.parent = node.parent;
    if (isNull(node.parent)) {
      this.root = aux;
    } else {
      if (node === node.parent.right) {
        node.parent.right = aux;
      } else {
        node.parent.left = aux;
      }
    }
    aux.right = node;
    node.parent = aux;
  }

  insert(key) {
    let parentNode = null;
    let currentNode = this.root;
    const newNode = createNode(key);
    if (this.root == null) {
      this.root = newNode;
      this.root.color = Colors.BLACK;
    } else {
      while (!isNull(currentNode)) {
        parentNode = currentNode;
        if (newNode.key < currentNode.key) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
      newNode.parent = parentNode;

      if (newNode.key < parentNode.key) {
        parentNode.left = newNode;
      } else {
        parentNode.right = newNode;
      }

      newNode.left = createLeafNode(newNode);
      newNode.right = createLeafNode(newNode);
      newNode.color = Colors.RED;
      this.fixUpTreeProperties(newNode);
    }
  }

  fixUpTreeProperties(node) {
    while (node.parent != null && node.parent.color === Colors.RED) {
      let uncle = null;
      if (node.parent === node.parent.parent.left) {
        uncle = node.parent.parent.right;
        if (uncle != null && uncle.color === Colors.RED) {
          node.parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node.parent.parent.color = Colors.RED;
          node = node.parent.parent;
          continue;
        } 

        if (node === node.parent.right) {
          node = node.parent;
          this.rotationLeft(node);
        }
        node.parent.color = Colors.BLACK;
        node.parent.parent.color = Colors.RED;
        this.rotationRight(node.parent.parent);
      } else {
        uncle = node.parent.parent.left;
        if (uncle != null && uncle.color === Colors.RED) {
          node.parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node.parent.parent.color = Colors.RED;
          node = node.parent.parent;
          continue;
        }

        if (node === node.parent.left) {
          node = node.parent;
          this.rotationRight(node);
        }

        node.parent.color = Colors.BLACK;
        node.parent.parent.color = Colors.RED;
        this.rotationLeft(node.parent.parent);
      }
    }
    this.root.color = Colors.BLACK;
  }

  inOrderTraverse(node, cb) {
    if (isNull(node)) {
      return;
    }

    this.inOrderTraverse(node.left, cb);
    cb(node);
    this.inOrderTraverse(node.right, cb);
  }

  inOrder(cb) {
    this.inOrderTraverse(this.root, cb);
  }

  preOrderTraverse(node, cb) {
    if (isNull(node)) {
      return;
    }

    cb(node); 
    this.preOrderTraverse(node.left, cb);
    this.preOrderTraverse(node.right, cb);
  }

  preOrder(cb) {
    this.preOrderTraverse(this.root, cb);
  }

  postOrderTraverse(node, cb) {
    if (isNull(node)) {
      return;
    }

    this.postOrderTraverse(node.left, cb);
    this.postOrderTraverse(node.right, cb);
    cb(node);
  }

  postOrder(cb) {
    this.postOrderTraverse(this.root, cb);
  }
}

const tree = new RedBlackTree();
tree.insert(10);
tree.insert(5);
tree.insert(11);
tree.insert(6);
tree.insert(15);
tree.insert(20);
tree.insert(1);
tree.insert(21);
tree.insert(7);

tree.preOrder(node => console.log(node.key));
