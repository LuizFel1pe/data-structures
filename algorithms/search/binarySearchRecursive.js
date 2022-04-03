import quickSort from '../sort/quick.js';
import createNonSortedArray from '../sort/helper.js';

function recursiveSearch(array, value, low, high) {
  if (low <= high) {  
    const mid = Math.floor((high + low) / 2);
    const element = array[mid];
    if (element < value) {
      return recursiveSearch(array, value, mid + 1, high);
    } else if (element > value) {
      return recursiveSearch(array, value, low, mid - 1);
    } else {
      return mid;
    }
  } 
  return null;
}

function binarySearch(array, value) {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length;
  return recursiveSearch(array, value, low, high);
}

const array = createNonSortedArray(50);
console.log(binarySearch(array, 50));