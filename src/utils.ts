import moment from "moment-mini";

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
 * 1000 -> 1k
 * 10000000 -> 1m
 *
 * @param {number} num
 * @param {string} numberOfDecimals
 * @returns {string}
 */
export function shortenNumber(num: number): string {
  if (!num) return "0";

  if (num < 1000) return num.toString();

  if (num < 1000000) {
    const newNum = num / 1000;
    const rounded = Math.round(newNum * 10) / 10;
    return `${rounded}k`;
  }

  const newNum = num / 1000000;
  const rounded = Math.round(newNum * 10) / 10;
  return `${rounded}m`;
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

/**
 * Creates a short time difference string.
 *
 * @export
 * @param {number} time
 * @returns {string}
 */
export function shortTimeDiff(time: number): string {
  const longDate = moment.unix(time).fromNow(true);
  console.log(longDate);
  if (longDate === "a few seconds") return "now";

  const short = longDate
    .replace(/an?/, "1")
    .replace(/\sseconds?/, "s")
    .replace(/\sminutes?/, "m")
    .replace(/\shours?/, "h")
    .replace(/\sdays?/, "d")
    .replace(/\smonths?/, "mo")
    .replace(/\syears?/, "y");

  return short;
}
