/**
 * Takes an url and checks if it links to an image
 * @param {string} url
 * @returns {boolean}
 */
export function isImgUrl(url) {
  return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) !== null;
}

/**
 * Shortens numbers over 1000.
 * 1000 -> 1k etc
 *
 * @param {number} num
 * @param {string} numberOfDecimals
 * @returns {string}
 */
export function shortenNumber(num) {
  if (num < 1000) return num.toString();

  const newNum = num / 1000;
  const rounded = Math.round(newNum * 10) / 10;
  return `${rounded}k`;
}

/**
 * Takes in an url, removes http://www. or https://www. and returns
 * an array which contains the domain as the first element and
 * the rest as the second element.
 *
 * Example: https://www.reddit.com/r/funny => ["reddit.com", "/r/funny"]
 *
 * @param {string} url
 * @returns {Array<string>}
 */
export function splitUrl(url) {
  const newUrl = url.replace(/^https?:\/\/(www\.)?/, "");
  const [domain, ...rest] = newUrl.split("/");
  return [domain, `/${rest.join("/")}`];
}

/**
 * Returns the string with the first letter capitalized.
 *
 * @param {string} string
 * @returns {string}
 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
