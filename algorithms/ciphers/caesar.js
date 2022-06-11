function caesar(cipher, shift) {
  let encrypted = '';
  for (let char of cipher) {
    let charCode = char.charCodeAt(0);
    // Ascii alphabetic range A..Z|a..z
    if (charCode >= 65 && charCode <= 122) {
      // 97 === a : 65 === A
      let first = char >= 'a' && char<= 'z' ? 97 : 65;
      let newChar = first + (charCode + shift - first) % 26;
      encrypted += String.fromCharCode(newChar); 
    } else {
      encrypted += char;
    }
  }
  return encrypted;
}
