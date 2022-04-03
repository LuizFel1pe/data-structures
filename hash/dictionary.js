import ValuePair from '../models/valuePair.js';
import { defaultStr } from '../utils/index.js';

export default class Dictionary {
  constructor(toStr = defaultStr) {
    this.toStr = toStr;
    this.table = {};
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStr(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStr(key)];
      return true;
    }
    return false;
  }

  hasKey(key) {
    return this.table[this.toStr(key)] != null;
  }

  get(key) {
    const valuePair = this.table[this.toStr(key)];
    return valuePair == null ? null : valuePair.value;
  }

  clear() {
    this.table = {};
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }

  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }

  keyValues() {
    return Object.values(this.table);
  }

  forEach(cb) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      cb(valuePairs[i].key, valuePairs[i].value);
    }
  }

  toString() {
    if (this.isEmpty()) return '';

    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString}\n${valuePairs[i].toString()}`;
    }
    
    return objString;
  }
}

const map = new Dictionary();
map.set('Luiz', 'luizfelipe@gmail.com');
map.set('Josh', 'josh@gmail.com');
// console.log(map.toString());
map.remove('Luiz');
console.log(map.toString());

function log(key, value) {
  console.log(key, value);
}

map.forEach(log);