import { defaultStr } from '../utils/index.js';
import ValuePair from '../models/valuePair.js';

class HashTable {
  constructor(toStr = defaultStr) {
    this.toStr = toStr;
    this.table = {};
  }

  put(key, value) {
    if (key != null && value != null) {
      const hash = this.hashCode(key);
      if (this.table[hash] == null) {
        this.table[hash] = new ValuePair(key, value);
      } else {
        let index = hash + 1;
        while (this.table[hash] != null) {
          index++;
        }
        this.tabla[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  remove(key) {
    const hash = this.hashCode(key);
    if (this.table[hash]) {
      if (this.table[hash].key === key) {
        delete this.table[hash];
        this.verifyRemoveSideEffect(key, hash);
        return true;
      }
      let index = hash + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }

      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }

  get(key) {
    const hash = this.hashCode(key);
    if (this.table[hash] != null) {
      if (this.table[hash].key === key) {
        return this.table[hash].value;
      }

      let index = hash + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[hash].value;
      }
    }
    return null;
  }

  hashCode(key) {
    return this.djb2HashCode(key);
  }

  djb2HashCode(key) {
    const tableKey = this.toStr(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = hash * 33 + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }

  toString() {
    const keys = Object.keys(this.table);
    let objString = `[${keys[0]} => ${this.table[keys[0]].toString()}]\n`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString}[${keys[i]} => ${this.table[
        keys[i]
      ].toString()}]`;
    }
    return objString;
  }

  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this,table[index];
        removedPosition = index;
      }
      index++;
    }
  }
}

const table = new HashTable();
table.put('eu', 'Luiz Felipe');
table.put('lol', 'Luiz Silva');
console.log(table.toString());
