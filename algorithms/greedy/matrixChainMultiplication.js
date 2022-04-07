export default function matrixChainOrder(p, i = 1, j = p.length - 1) {
  if (i === j) {
    return 0;
  }

  let min = Number.MAX_SAFE_INTEGER;
  for (let k = i; k < j; k++) {
    const count =
      matrixChainOrder(p, i, k) +
      matrixChainOrder(p, k + 1, j) +
      p[i - 1] * p[k] * p[j];

    if (count < min) {
      min = count;
    }
  }
  return min;
}

const p = [
  10,
  100,
  5,
  50,
  1,
  54,
  54,
  87,
  7,
  78,
  7,
  5456,
  5,
  46,
  4,
  5,
  564,
  54,
  654,
  564,
  65,
  45,
  645,
  4,
  654,
  6,
  56,
  545,
  4,
];
console.log(matrixChainOrder(p));
