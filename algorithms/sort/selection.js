import { swap, Compare, defaultCompare } from '../../utils/index.js';
import createNonSortedArray from './helper.js';

function selectionSort(array, compareFn = defaultCompare) {
  let minIndex;
  for (let i = 0; i < array.length - 1; i++) {
    minIndex = i;
    for (let j = i; j < array.length; j++) {
      if (compareFn(array[minIndex], array[j]) === Compare.BIGGER_THAN) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(array, i, minIndex);
    }
  }
  return array;
}

const array = createNonSortedArray(10);
console.log(array);
console.log(selectionSort(array));
