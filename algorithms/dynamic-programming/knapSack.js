function findValues(n, capacity, ks, weights, values) {
  let i = n;
  let k = capacity;
  console.log('Items that are part of the solution:');
  while (i > 0 && k > 0) {
    if (ks[i][k] !== ks[i - 1][k]) {
      console.log(
        `Item ${i} can be part of solution w, v: ${weights[i - 1]}, ${
          values[i - 1]
        }`
      );
      i--;
      k -= ks[i][k];
    } else {
      i--;
    }
  }
}

function knapSack(capacity, weights, values, items) {
  const ks = [];
  for (let i = 0; i <= items; i++) {
    ks[i] = [];
  }

  for (let i = 0; i <= items; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        ks[i][w] = 0;
      } else if (weights[i - 1] <= w) {
        const a = values[i - 1] + ks[i - 1][w - weights[i - 1]];
        const b = ks[i - 1][w];
        ks[i][w] = a > b ? a : b;
      } else {
        ks[i][w] = ks[i - 1][w];
      }
    }
  }

  findValues(items, capacity, ks, weights, values);
  return ks[items][capacity];
}

const values = [3, 4, 5];
const weights = [2, 3, 4];
const capacity = 5;
const n = values.length;
console.log(knapSack(capacity, weights, values, n));

/**
 *   0  0  0  0  0  0
 *   0  0  3  
 */