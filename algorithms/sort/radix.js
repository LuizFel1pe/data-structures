import { createNonSortedArray } from '../../tests/sort/helper.js';

function findMinMax(array) {
  let min = array[0];
  let max = array[0];
  for (let el of array) {
    if (el < min) {
      min = el;
    }

    if (el > max) {
      max = el;
    }
  }

  return { min, max };
}

function countingSortRadix(array, radixBase, significantDigit, min) {
  let bucketsIndex;
  const buckets = [];
  const aux = [];
  for (let i = 0; i < radixBase; i++) {
    buckets[i] = 0;
  }

  for (let i = 0; i < array.length; i++) {
    bucketsIndex = Math.floor(
      ((array[i] - min) / significantDigit) % radixBase
    );
    buckets[bucketsIndex]++;
  }

  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1];
  }

  for (let i = array.length - 1; i >= 0; i--) {
    bucketsIndex = Math.floor(
      ((array[i] - min) / significantDigit) % radixBase
    );
    aux[--buckets[bucketsIndex]] = array[i];
  }

  return aux;
}

function radixSort(array, radixBase = 10) {
  if (array.length < 2) return array;

  const { min, max } = findMinMax(array);

  let significantDigit = 1;
  while ((max - min) / significantDigit >= 1) {
    array = countingSortRadix(array, radixBase, significantDigit, min);
    significantDigit *= radixBase;
  }

  return array;
}

const array = createNonSortedArray(100);
console.log(radixSort(array));
