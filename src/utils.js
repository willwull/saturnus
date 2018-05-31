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
  if (num < 1000) return num;

  let exponent = num.toString().length;
  const decimal = 10 ** numberOfDecimals;
  exponent -= exponent % 3;
  const temp = 10 ** exponent; // ?
  const numberWithoutSuffix = Math.round((num * decimal) / temp) / decimal;
  return numberWithoutSuffix + " kMGTPE"[exponent / 3];
}

/**
 * Takes in an url, removes http://www. or https://www. and returns
 * an array which contains the domain as the first element and
 * the rest as the second element.
 *
 * Example: https://www.reddit.com/r/funny => ["reddit.com", "/r/funny"]
 *
 * @param {String} url
 */
export function splitUrl(url) {
  const newUrl = url.replace(/^https?:\/\/(www\.)?/, "");
  const [domain, ...rest] = newUrl.split("/");
  return [domain, `/${rest.join("/")}`];
}
