import createNonSortedArray from '../sort/helper.js';
import quickSort from '../sort/quick.js';

function interpolationSearch(array, value) {
  let sortedArray = quickSort(array);
  let low = 0;
  let high = array.length - 1;
  let position = -1;
  let delta = -1;
  while (low <= high && value >= array[low] && value <= array[high]) {
    delta = (value - array[low]) / (array[high] - array[low]);
    position = low + Math.floor((high - low) * delta); // position equation
    if (array[position] === value) {
      return position;
    }

    if (array[position] < value) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return null;
}

const array = createNonSortedArray(50);
console.log(interpolationSearch(array, 15));