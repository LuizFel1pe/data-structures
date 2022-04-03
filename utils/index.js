export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};

export function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }

  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function defaultStr(item) {
  if (item === null) return 'NULL';

  if (item === undefined) return 'UNDEFINED';

  if (typeof item === 'string' || item instanceof String) return `${item}`;

  return item.toString();
}

export const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};

export const Colors = {
  RED: 0,
  BLACK: 1,
};

export const GraphColors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2,
};

import { RedBlackNode } from '../models/node.js';
export function createNode(key) {
  const node = new RedBlackNode(key);

  const leftLeaf = new RedBlackNode(null);
  leftLeaf.color = Colors.BLACK;
  leftLeaf.parent = node;

  const rightLeaf = new RedBlackNode(null);
  rightLeaf.color = Colors.BLACK;
  rightLeaf.parent = node;

  node.left = leftLeaf;
  node.right = rightLeaf;
  return node;
}

export function createLeafNode(parent) {
  let node = new RedBlackNode(null);
  node.color = Colors.BLACK;
  node.parent = parent;
  return node;
}

export function isNull(node) {
  return (
    node == null ||
    (node.key == null &&
      node.color === Colors.BLACK &&
      node.left == null &&
      node.right == null)
  );
}

export function swap(array, a, b) {
  const tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}
