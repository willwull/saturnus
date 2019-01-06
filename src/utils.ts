/**
 * Takes an url and checks if it links to an image
 * @param {string} url
 * @returns {boolean}
 */
export function isImgUrl(url: string): boolean {
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
export function shortenNumber(num: number): string {
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
export function splitUrl(url: string): string[] {
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
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Copies a string to clipboard. Will only work as a response
 * to a user action, e.g. click handlers.
 *
 * @param {string} str
 */
export function copyToClipboard(str: string) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, el.value.length); // required to work on iOS
  document.execCommand("copy");
  document.body.removeChild(el);
}
