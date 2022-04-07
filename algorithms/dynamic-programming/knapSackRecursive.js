function knapSack(capacity, weights, values, n) {
  if (n === 0 || capacity === 0) {
    return 0;
  }

  if (weights[n - 1] > capacity) {
    return knapSack(capacity, weights, values, n - 1);
  }

  const a =
    values[n - 1] + knapSack(capacity - weights[n - 1], weights, values, n - 1);
  
  const b = knapSack(capacity, weights, values, n - 1);
  return a > b ? a : b;
}

const values = [3, 4, 5];
const weights = [2, 3, 4];
const capacity = 5;
const n = values.length;
console.log(knapSack(capacity, weights, values, n));