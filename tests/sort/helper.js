import { swap } from '../../utils/index.js';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(array, i, randomIndex);
  }
  return array;
}

function createNonSortedArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(i);
  }

  return shuffle(array);
}

function createSortedArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(i);
  }

  return array;
}

export { createNonSortedArray, createSortedArray };
