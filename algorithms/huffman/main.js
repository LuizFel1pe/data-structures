console.time('huffman');
const ASCII_LENGTH = 256;

const text = 'Vamos aprender a programar';
const frequencyTable = new Array(ASCII_LENGTH).fill(0);

class Node {
  constructor(symbol, frequency) {
    this.symbol = symbol;
    this.frequency = frequency;
    this.next = null;
    this.left = null;
    this.right = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.length = 0;
  }
}

function fillFrequencyTable(text, table) {
  for (let letter of text) {
    let index = letter.charCodeAt();
    table[index]++;
  }
}

fillFrequencyTable(text, frequencyTable);

function sortedInsert(list, node) {
  let aux = list.head;

  if (list.head == null) {
    list.head = node;
  } else if (node.frequency < list.head.frequency) {
    node.next = list.head;
    list.head = node;
  } else {
    while (aux.next != null && aux.next.frequency <= node.frequency) {
      aux = aux.next;
    }
    node.next = aux.next;
    aux.next = node;
  }

  list.length++;
}

function fillList(table, list) {
  let newNode;
  table.forEach((frequency, index) => {
    if (frequency > 0) {
      const char = String.fromCharCode(index);
      newNode = new Node(char, frequency);
      sortedInsert(list, newNode);
    }
  });
}

const list = new List();
fillList(frequencyTable, list);

function removeNode(list) {
  let aux = null;

  if (list.head != null) {
    aux = list.head;
    list.head = aux.next;
    aux.next = null;
    list.length--;
  }

  return aux;
}

function getTree(list) {
  let firstNode;
  let secondNode;
  while (list.length > 1) {
    firstNode = removeNode(list);
    secondNode = removeNode(list);
    let newNode = new Node('+', firstNode.frequency + secondNode.frequency);
    newNode.left = firstNode;
    newNode.right = secondNode;

    sortedInsert(list, newNode);
  }

  return list.head;
}

let tree = getTree(list);

function getHeight(root) {
  if (root == null) {
    return -1;
  }

  let left = getHeight(root.left) + 1;
  let right = getHeight(root.right) + 1;

  return Math.max(left, right);
}

function generateDictionary(dictionary, root, path) {
  if (root.left == null && root.right == null) {
    let index = root.symbol.charCodeAt();
    dictionary[index] = path;
  } else {
    let left = path + '0';
    let right = path + '1';

    generateDictionary(dictionary, root.left, left);
    generateDictionary(dictionary, root.right, right);
  }
}
// Debug
frequencyTable.forEach((frequency, index) => {
  if (frequency !== 0) {
    console.log(
      `Index: ${index} => Frequency: ${frequency} => char: ${String.fromCharCode(
        index
      )}`
    );
  }
});

let current = list.head;
console.log(`Length: ${list.length}`)
while (current) {
  console.log(`Character: ${current.symbol}, frequency: ${current.frequency}`);
  current = current.next;
}

function printTree(node, length) {
  if (node.left == null && node.right == null) {
      console.log(`Leaf: ${node.symbol}, Height: ${length}`);
  } else {
    printTree(node.left, length + 1);
    printTree(node.right, length + 1);
  }
}

printTree(tree, 0);

let dictionary = new Array(ASCII_LENGTH).fill('');
generateDictionary(dictionary, tree, '');

function printDictionary(dictionary) {
  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i].length > 0)
      console.log(`${i} string: ${dictionary[i]}`);
  }
}

printDictionary(dictionary);

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

let encoded = encode(dictionary, text);
console.log(encoded);
let decoded = decode(encoded, tree);
console.log(decoded);
console.timeEnd('huffman');
