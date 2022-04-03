import { swap, Compare, defaultCompare } from '../../utils/index.js';
import createNonSortedArray from './helper.js';

function insertionSort(array, compareFn = defaultCompare) {
  let temp;
  for (let i = 1; i < array.length; i++) {
    let j = i;
    temp = array[i];
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }
  return array;
}

const array = createNonSortedArray(10);
console.log(array);
console.log(insertionSort(array));
