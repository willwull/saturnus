/**
 * Takes an url and checks if it links to an image
 * @param {String} url
 */
export function isImgUrl(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
}

/**
 * Shortens numbers over 1000.
 * 1000 -> 1k etc
 *
 * Taken from:
 * https://stackoverflow.com/questions/9345136/1000000-to-1m-and-1000-to-1k-and-so-on-in-js/9345181
 *
 * @param {Number} num
 * @param {Number} numberOfDecimals
 */
export function shortenNumber(num, numberOfDecimals = 1) {
  let exponent = num.toString().length;
  const decimal = 10 ** numberOfDecimals;
  exponent -= exponent % 3;
  const temp = 10 ** exponent; // ?
  const numberWithoutSuffix = Math.round((num * decimal) / temp) / decimal;
  return numberWithoutSuffix + " kMGTPE"[exponent / 3];
}
