import quickSort from '../sort/quick.js';
import createNonSortedArray from '../sort/helper.js';

function binarySearch(array, value) {
  const sortedArray = quickSort(array);
  let low = 0;
  let high = sortedArray.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = sortedArray[mid];
    if (element < value) {
      low = mid + 1;
    } else if (element > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return null;
}

const array = createNonSortedArray(50);
console.log(array);
console.log(binarySearch(array, 50));
console.log(binarySearch(array, 14));
console.log(binarySearch(array, 78));