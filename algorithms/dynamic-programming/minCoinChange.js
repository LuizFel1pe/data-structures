export default function minCoinChange(coins, amount) {
  const cache = [];

  const makeChange = value => {
    if (!value) return [];

    if (cache[value]) return cache[value];

    let min = [];
    let newMin;
    let newAmount = 0;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      newAmount = value - coin;

      if (newAmount >= 0) {
        newMin = makeChange(newAmount);
      }

      if (newAmount >= 0 && (newMin.length < min.length || min.length === 0)) {
        min = [coin].concat(newMin);
        console.log(`New Min ${min} for ${value}`);
      }
    }

    return (cache[value] = min);
  };

  return makeChange(amount);
}

console.log(minCoinChange([1, 5, 10, 25], 3000));