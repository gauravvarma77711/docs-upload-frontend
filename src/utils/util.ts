/* eslint-disable no-mixed-operators */
const Util = {
    toBinaryStr: function(str: string) {
      const encoder = new TextEncoder();
      // 1: split the UTF-16 string into an array of bytes
      const charCodes: any = encoder.encode(str);
      // 2: concatenate byte data to create a binary string
      return String.fromCharCode(...charCodes);
    }
}

export default Util;

