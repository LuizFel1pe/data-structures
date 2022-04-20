import { expect, describe, test, jest } from '@jest/globals';
import HashTable from '../../hash/hashTable.js';
import { defaultStr } from '../../utils/index.js';

class MyObj {
  constructor(el1, el2) {
    this.el1 = el1;
    this.el2 = el2;
  }

  toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`;
  }
}

describe('HashTable', () => {
  const A = 'Jonathan';
  const B = 'Jamie';
  const C = 'Sue';

  function loseLoseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }

    const hashKey = defaultStr(key);
    let hash = 0;
    for (let i = 0; i < hashKey.length; i++) {
      hash += hashKey.charCodeAt(i);
    }
    return hash % 37;
  }

  test('starts empty', () => {
    const hashTable = new HashTable();
    expect(hashTable.size()).toEqual(0);
    expect(hashTable.isEmpty()).toBeTruthy();
  });

  test('puts values with number key without collisions', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBeTruthy();
    }
    expect(hashTable.size()).toEqual(size);
    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      const linkedList = table[i];
      expect(linkedList.size()).toEqual(1);
      const valuePair = linkedList.getHead();
      expect(valuePair.element.key).toEqual(i);
      expect(valuePair.element.value).toEqual(i);
    }
  });

  test('puts values with string key without collisions', () => {
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;

    expect(hashTable.put('1', 1)).toBeTruthy();
    expect(hashTable.put('10', 10)).toBeTruthy();
    expect(hashTable.put('100', 100)).toBeTruthy();
    expect(hashTable.put('1000', 1000)).toBeTruthy();
    const table = hashTable.getTable();
    let linkedList = table[12];
    expect(linkedList.size()).toEqual(1);
    let valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual('1');
    expect(valuePair.element.value).toEqual(1);
    linkedList = table[23];
    expect(linkedList.size()).toEqual(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual('10');
    expect(valuePair.element.value).toEqual(10);
    linkedList = table[34];
    expect(linkedList.size()).toEqual(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual('100');
    expect(valuePair.element.value).toEqual(100);
    linkedList = table[8];
    expect(linkedList.size()).toEqual(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual('1000');
    expect(valuePair.element.value).toEqual(1000);
  });

  test('puts values with object key without collisions', () => {
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;

    const myObjList = [];
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1));
      expect(hashTable.put(myObjList[i - 1], myObjList[i - 1])).toBeTruthy();
    }
    const table = hashTable.getTable();
    let linkedList = table[1];
    expect(linkedList.size()).toEqual(1);
    let valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual(myObjList[0]);
    expect(valuePair.element.value).toEqual(myObjList[0]);
    linkedList = table[3];
    expect(linkedList.size()).toEqual(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual(myObjList[1]);
    expect(valuePair.element.value).toEqual(myObjList[1]);
    linkedList = table[5];
    expect(linkedList.size()).toEqual(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual(myObjList[2]);
    expect(valuePair.element.value).toEqual(myObjList[2]);
    linkedList = table[7];
    expect(linkedList.size()).toEqual(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual(myObjList[3]);
    expect(valuePair.element.value).toEqual(myObjList[3]);
    linkedList = table[9];
    expect(linkedList.size()).toEqual(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).toEqual(myObjList[4]);
    expect(valuePair.element.value).toEqual(myObjList[4]);
  });

  test('puts values with collisions', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBeTruthy();
    }
    expect(hashTable.size()).toEqual(size);
    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i + 10)).toBeTruthy();
    }
    expect(hashTable.size()).toEqual(size * 2);
    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i + 100)).toBeTruthy();
    }
    expect(hashTable.size()).toEqual(size * 3);
    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      const linkedList = table[i];
      expect(linkedList.size()).toEqual(3);
      let valuePair = linkedList.getHead();
      expect(valuePair.element.key).toEqual(i);
      expect(valuePair.element.value).toEqual(i);
      valuePair = valuePair.next;
      expect(valuePair.element.key).toEqual(i);
      expect(valuePair.element.value).toEqual(i + 10);
      valuePair = valuePair.next;
      expect(valuePair.element.key).toEqual(i);
      expect(valuePair.element.value).toEqual(i + 100);
    }
  });

  test('removes elements without collisions', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBeTruthy();
    }
    expect(hashTable.size()).toEqual(size);
    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).toBeTruthy();
    }

    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).toBeFalsy();
    }
    expect(hashTable.isEmpty()).toBeTruthy();
  });
  function addValuesCollision() {
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;
    expect(hashTable.put(A, `${A}@email.com`)).toBeTruthy();
    expect(hashTable.put(B, `${B}@email.com`)).toBeTruthy();
    expect(hashTable.put(C, `${C}@email.com`)).toBeTruthy();
    expect(hashTable.size()).toEqual(3);
    const expectedHash = 5;
    expect(hashTable.hashCode(A)).toEqual(expectedHash);
    expect(hashTable.hashCode(B)).toEqual(expectedHash);
    expect(hashTable.hashCode(C)).toEqual(expectedHash);
    expect(hashTable.getTable()[expectedHash].size()).toEqual(3);
    return hashTable;
  }
  function removeWithCollision(a, b, c) {
    const hashTable = addValuesCollision();
    hashTable.hashCode = loseLoseHashCode;
    expect(hashTable.remove(a)).toBeTruthy();
    expect(hashTable.get(a)).toBeNull();
    expect(hashTable.remove(b)).toBeTruthy();
    expect(hashTable.get(a)).toBeNull();
    expect(hashTable.get(b)).toBeNull();
    expect(hashTable.remove(c)).toBeTruthy();
    expect(hashTable.get(a)).toBeNull();
    expect(hashTable.get(b)).toBeNull();
    expect(hashTable.get(c)).toBeNull();
    expect(hashTable.isEmpty()).toBeTruthy();
  }

  test('removes elements with collisions', () => {
    removeWithCollision(A, B, C);
    removeWithCollision(A, C, B);
    removeWithCollision(B, A, C);
    removeWithCollision(B, C, A);
    removeWithCollision(C, A, B);
    removeWithCollision(C, B, A);
  });

  test('returns toString primitive types without collisions', () => {
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;
    expect(hashTable.toString()).toEqual('');
    hashTable.put(1, 1);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]}');
    hashTable.put(2, 2);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]},{2 => [#2: 2]}');
    hashTable.clear();
    expect(hashTable.toString()).toEqual('');
  });

  test('returns toString primitive types without collisions', () => {
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;
    hashTable.put('el1', 1);
    expect(hashTable.toString()).toEqual('{36 => [#el1: 1]}');
    hashTable.put('el2', 2);
    expect(hashTable.toString()).toEqual('{0 => [#el2: 2]},{36 => [#el1: 1]}');
  });

  test('returns toString objects without collisions', () => {
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;
    let myObj = new MyObj(1, 2);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).toEqual('{1 => [#1|2: 1|2]}');
    myObj = new MyObj(3, 4);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).toEqual(
      '{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}'
    );
  });

  test('returns toString with collisions', () => {
    const hashTable = new HashTable();
    hashTable.hashCode = loseLoseHashCode;

    expect(hashTable.toString()).toEqual('');
    hashTable.put(1, 1);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]}');
    hashTable.put(2, 2);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]},{2 => [#2: 2]}');
    hashTable.put(1, 10);
    expect(hashTable.toString()).toEqual(
      '{1 => [#1: 1],[#1: 10]},{2 => [#2: 2]}'
    );
    hashTable.clear();
    expect(hashTable.toString()).toEqual('');
  });
});
