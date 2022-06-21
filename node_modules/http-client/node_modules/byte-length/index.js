"use strict";

/*
 * Calculate the byte lengths for utf8 encoded strings.
 *
 * @param {String} str
 * @return {Number}
 */
module.exports = function byteLength (str) {
  var i, len;
  if (!str) return 0;
  str = str.toString();

  for (i = len = str.length; i--;) {
    var code = str[i].charCodeAt();
    if (0xDC00 <= code && code <= 0xDFFF) i--;
    if (0x7f < code && code <= 0x7ff) len++;
    else if (0x7ff < code && code <= 0xffff) len += 2;
  }

  return len;
};
