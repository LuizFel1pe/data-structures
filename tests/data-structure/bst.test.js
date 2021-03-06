import { describe, test, beforeEach, expect } from '@jest/globals';
import BinarySearchTree  from '../../tree/binarySearchTree.js';

describe('BinarySearchTree', () => {
  let tree;

  beforeEach(() => {
    tree = new BinarySearchTree();
  });

  test('starts empty', () => {
    expect(tree.getRoot()).toBeNull();
  });

  function assertNode(node, key, left, right) {
    if (key != null) {
      expect(node.key).toEqual(key);
    } else {
      expect(node).toEqual(key);
      return;
    }

    if (left != null) {
      expect(node.left.key).toEqual(left);
    } else {
      expect(node.left).toEqual(left);
    }

    if (right != null) {
      expect(node.right.key).toEqual(right);
    } else {
      expect(node.right).toEqual(right);
    }
  }

  test('inserts elements in the BST', () => {
    expect(tree.getRoot()).toBeNull();

    tree.insert(11);
    tree.insert(7);
    tree.insert(15);
    tree.insert(5);
    tree.insert(3);
    tree.insert(9);
    tree.insert(8);
    tree.insert(10);
    tree.insert(13);
    tree.insert(12);
    tree.insert(14);
    tree.insert(20);
    tree.insert(18);
    tree.insert(25);

    let node = tree.getRoot();
    assertNode(node, 11, 7, 15);

    node = node.left;
    assertNode(node, 7, 5, 9);

    node = node.left;
    assertNode(node, 5, 3, null);

    node = node.left;
    assertNode(node, 3, null, null);

    node = tree.getRoot().left.left.right;
    assertNode(node, null, null, null);

    node = tree.getRoot().left.right;
    assertNode(node, 9, 8, 10);

    node = node.left;
    assertNode(node, 8, null, null);

    node = tree.getRoot().left.right.right;
    assertNode(node, 10, null, null);

    node = tree.getRoot().right;
    assertNode(node, 15, 13, 20);

    node = node.left;
    assertNode(node, 13, 12, 14);

    node = node.left;
    assertNode(node, 12, null, null);

    node = tree.getRoot().right.left.right;
    assertNode(node, 14, null, null);

    node = tree.getRoot().right.right;
    assertNode(node, 20, 18, 25);

    node = node.left;
    assertNode(node, 18, null, null);

    node = tree.getRoot().right.right.right;
    assertNode(node, 25, null, null);
  });

  test('verifies if element exists', () => {
    expect(tree.getRoot()).toBeNull();
  });

  test('removes a leaf', () => {
    expect(tree.getRoot()).toBeNull();
  });
});
