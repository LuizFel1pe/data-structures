import { defaultCompare, Compare } from '../../utils/index.js';
import createNonSortedArray from './helper.js';

function merge(left, right, compareFn) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    const element =
      compareFn(left[i], right[j]) === Compare.LESS_THAN
        ? left[i++]
        : right[j++];
    result.push(element);
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) {
    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, array.length), compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}

const array = createNonSortedArray(10);
console.log(array);
console.log(mergeSort(array));
