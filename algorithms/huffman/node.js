export default class Node {
  constructor(symbol, frequency) {
    this.symbol = symbol;
    this.frequency = frequency;
    this.next = null;
    this.left = null;
    this.right = null;
  }
}