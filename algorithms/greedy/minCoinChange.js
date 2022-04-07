function minCoinChange(coins, amount) {
  const change = [];
  let total = 0;
  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    while (total + coin <= amount) {
      change.push(coin);
      total += coin;
    }
  }
  return change;
}

console.log(minCoinChange([1, 5, 10, 25], 36));