import { expect, describe, test, beforeEach } from '@jest/globals';
import Dictionary from '../../hash/dictionary.js';

class MyObj {
  constructor(el1, el2) {
    this.el1 = el1;
    this.el2 = el2;
  }

  toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`;
  }
}

describe('test suite dictionary/map', () => {
  let dictionary;
  beforeEach(() => {
    dictionary = new Dictionary();
  });

  test('should start empty', () => {
    expect(dictionary.size()).toEqual(0);
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  test('Set keys and values', () => {
    const expectResult =
      '[#Luiz: luizfelipe@gmail.com],[#Josh: josh@gmail.com]';

    dictionary.set('Luiz', 'luizfelipe@gmail.com');
    dictionary.set('Josh', 'josh@gmail.com');
    expect(dictionary.toString()).toBe(expectResult);
    expect(dictionary.keys()).toEqual(['Luiz', 'Josh']);
    expect(dictionary.values()).toEqual(['luizfelipe@gmail.com', 'josh@gmail.com']);
  });

  test('sets values with number key', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    for (let i = min; i <= max; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }
    expect(dictionary.size()).toEqual(size);
    const keys = dictionary.keys();
    expect(keys.length).toEqual(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(i + 1);
    }
  });

  test('sets values with object', () => {
    const dict = new Dictionary();
    const min = 0;
    const max = 5;
    const size = max - min;
    const myObjList = [];
    for (let i = min; i < max; i++) {
      myObjList.push(new MyObj(i, i + 1));
    }
    for (let i = min; i < max; i++) {
      expect(dict.set(myObjList[i], myObjList[i])).toBeTruthy();
    }
    expect(dict.size()).toEqual(size);
    for (let i = min; i < max; i++) {
      expect(dict.get(myObjList[i])).toEqual(myObjList[i]);
    }
    const keys = dict.keys();
    expect(keys.length).toEqual(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(myObjList[i]);
    }
    const values = dict.values();
    expect(values.length).toEqual(size);
    for (let i = 0; i < values.length; i++) {
      expect(values[i]).toEqual(myObjList[i]);
    }
  });

  function customToString(key) {
    return `####${key.toString()}`;
  }

  test('sets values with custom toString function', () => {
    const dict = new Dictionary(customToString);
    const min = 0;
    const max = 5;
    const size = max - min;
    const myObjList = [];
    for (let i = min; i < max; i++) {
      myObjList.push(new MyObj(i, i + 1));
    }
    for (let i = min; i < max; i++) {
      expect(dict.set(myObjList[i], myObjList[i])).toBeTruthy();
    }
    expect(dict.size()).toEqual(size);
    for (let i = min; i < max; i++) {
      expect(dict.get(myObjList[i])).toEqual(myObjList[i]);
    }
    const keys = dict.keys();
    expect(keys.length).toEqual(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(myObjList[i]);
    }
    const values = dict.values();
    expect(values.length).toEqual(size);
    for (let i = 0; i < values.length; i++) {
      expect(values[i]).toEqual(myObjList[i]);
    }
  });

  test('removes elements', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    for (let i = min; i <= max; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }
    expect(dictionary.size()).toEqual(size);
    for (let i = min; i <= max; i++) {
      expect(dictionary.remove(i)).toBeTruthy();
    }
    // elements do not exist
    for (let i = min; i <= max; i++) {
      expect(dictionary.remove(i)).toEqual(false);
    }
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  test('returns the correct size', () => {
    expect(dictionary.size()).toEqual(0);
    const max = 5;
    for (let i = 1; i < max; i++) {
      dictionary.set(i, i);
      expect(dictionary.size()).toEqual(i);
    }
    for (let i = 1; i < max; i++) {
      dictionary.remove(i);
      expect(dictionary.size()).toEqual(max - i - 1);
    }
    expect(dictionary.size()).toEqual(0);
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  test('returns if element exists', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    for (let i = min; i <= max; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }
    expect(dictionary.size()).toEqual(size);
    for (let i = min; i <= max; i++) {
      expect(dictionary.hasKey(i)).toBeTruthy();
      expect(dictionary.remove(i)).toBeTruthy();
      expect(dictionary.hasKey(i)).toEqual(false);
    }
  });

  test('returns if it is empty', () => {
    expect(dictionary.isEmpty()).toBeTruthy();
    for (let i = 1; i < 5; i++) {
      dictionary.set(i, i);
      expect(dictionary.isEmpty()).toEqual(false);
    }
    for (let i = 1; i < 5; i++) {
      dictionary.remove(i);
      expect(dictionary.isEmpty()).toEqual(!(i < 4));
    }
    expect(dictionary.size()).toEqual(0);
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  test('clears the dictionary', () => {
    dictionary.clear();
    expect(dictionary.isEmpty()).toBeTruthy();
    dictionary.set(1, 1);
    dictionary.set(2, 2);
    dictionary.clear();
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  test('returns values, keys and value pairs', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    for (let i = min; i <= max; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }
    expect(dictionary.size()).toEqual(size);
    const keys = dictionary.keys();
    const values = dictionary.values();
    const valuePairs = dictionary.keyValues();
    expect(keys.length).toEqual(size);
    expect(values.length).toEqual(size);
    expect(valuePairs.length).toEqual(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(i + 1);
      expect(values[i]).toEqual(i + 1);
      expect(valuePairs[i].key).toEqual(i + 1);
      expect(valuePairs[i].value).toEqual(i + 1);
    }
  });

  test('allows to iterate with forEach', () => {
    for (let i = 1; i <= 5; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }
    dictionary.forEach((k, v) => {
      expect(dictionary.hasKey(k)).toBeTruthy();
      expect(dictionary.get(k)).toEqual(v);
    });
  });

  test('allows to iterate with forEach and interrupt', () => {
    for (let i = 1; i <= 5; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }
    const size = dictionary.keys().length;
    let index = 1;
    dictionary.forEach((k, v) => {
      expect(dictionary.hasKey(k)).toBeTruthy();
      expect(dictionary.get(k)).toEqual(v);
      index++;
    });
    expect(index).toEqual(size + 1);
    index = 1;
    dictionary.forEach((k, v) => {
      expect(dictionary.hasKey(k)).toBeTruthy();
      expect(dictionary.get(k)).toEqual(v);
      index++;
      return !(k % 3 === 0);
    });
    expect(index).toEqual(size - 1);
  });

  test('returns toString primitive types', () => {
    expect(dictionary.toString()).toEqual('');
    dictionary.set(1, 1);
    expect(dictionary.toString()).toEqual('[#1: 1]');
    dictionary.set(2, 2);
    expect(dictionary.toString()).toEqual('[#1: 1],[#2: 2]');
    dictionary.clear();
    expect(dictionary.toString()).toEqual('');
  });

  test('returns toString primitive types: string', () => {
    const dict = new Dictionary();
    dict.set('el1', 1);
    expect(dict.toString()).toEqual('[#el1: 1]');
    dict.set('el2', 2);
    expect(dict.toString()).toEqual('[#el1: 1],[#el2: 2]');
  });

  test('returns toString objects', () => {
    const dict = new Dictionary();
    expect(dict.toString()).toEqual('');
    let myObj = new MyObj(1, 2);
    dict.set(myObj, myObj);
    expect(dict.toString()).toEqual('[#1|2: 1|2]');
    myObj = new MyObj(3, 4);
    dict.set(myObj, myObj);
    expect(dict.toString()).toEqual('[#1|2: 1|2],[#3|4: 3|4]');
  });
});
