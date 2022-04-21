console.time('huffman');
import FrequencyTable from './frequencyTable.js';
import List from './list.js';
import Tree from './tree.js';
import Dictionary from './dictionary.js';

const ASCII_LENGTH = 256;
const text = 'Vamos aprender a programar';

const table = new FrequencyTable(ASCII_LENGTH).getFrequencyTable(text);
const list = new List();
list.generateList(table);
const tree = new Tree().getTree(list);
const dict = new Dictionary(ASCII_LENGTH).generateDictionary(tree, '');

function encode(dictionary, text) {
  let index = 0;
  let binary = '';
  for (let i = 0; i < text.length; i++) {
    index = text[i].charCodeAt();
    binary += dictionary[index];
  }

  return binary;
}

function decode(encoded, node) {
  let aux = node;
  let decoded = '';
  for (let i = 0; i < encoded.length; i++) {
    if (encoded[i] === '0') {
      aux = aux.left;
    } else {
      aux = aux.right;
    }

    if (aux.left == null && aux.right == null) {
      decoded += aux.symbol;
      aux = node;
    }
  }

  return decoded;
}

let encoded = encode(dict, text);
let decoded = decode(encoded, tree);

console.log(encoded);
console.log(decoded);
console.timeEnd('huffman');
