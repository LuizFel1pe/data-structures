function knapSack(capacity, weights, values) {
  const items = values.length;
  let load = 0;
  let val = 0;
  for (let i = 0; i < items && load < capacity; i++) {
    if (weights[i] <= capacity - load) {
      val += values[i];
      load += weights[i];
    } else {
      const r = (capacity - load) / weights[i];
      val += r * values[i];
      load += weights[i];
    }
  }

  return val;
}

const weights = [2, 3, 4];
const values = [3, 4, 5];
const capacity = 6;
console.log(knapSack(capacity, weights, values));
