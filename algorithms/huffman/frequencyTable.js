class FrequencyTable {
  constructor(encodingLength) {
    this.table = new Array(encodingLength).fill(0);    
  }

  getFrequencyTable(text) {
    for (let letter of text) {
      let index = letter.charCodeAt();
      this.table[index]++;
    }

    return this.table;
  }
}

export default FrequencyTable;