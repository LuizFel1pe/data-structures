import { swap, defaultCompare, Compare } from '../../utils/index.js';
import createNonSortedArray from './helper.js';

function bubbleSort(array, compareFn = defaultCompare) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}

const array = createNonSortedArray(10);
console.log(array);
console.log(bubbleSort(array));
