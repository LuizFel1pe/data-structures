export default class Dictionary {
  constructor(encodingLength) {
    this.dict = new Array(encodingLength).fill('');
  }

  generateDictionary(node, binaryCode) {
    if (node.left == null && node.right == null) {
      let index = node.symbol.charCodeAt();
      this.dict[index] = binaryCode;
    } else {
      let left = binaryCode + '0';
      let right = binaryCode + '1';

      this.generateDictionary(node.left, left);
      this.generateDictionary(node.right, right);
    }

    return this.dict;
  }
}
