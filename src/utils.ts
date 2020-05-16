import moment from "moment-mini";
import { useRef, useEffect } from "react";

/**
 * Custom hook that gives the previous value.
 *
 * @param value
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>(null);
  useEffect(() => {
    (ref as any).current = value;
  });
  return ref.current;
}

/**
 * Returns a promise that resolves after timeMs milliseconds.
 *
 * @param timeMs
 */
export function sleep(timeMs = 300): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeMs);
  });
}

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
  if (longDate === "a few seconds") return "now";

  const short = longDate
    .replace(/\sseconds?/, "s")
    .replace(/\sminutes?/, "m")
    .replace(/\shours?/, "h")
    .replace(/\sdays?/, "d")
    .replace(/\smonths?/, "mo")
    .replace(/\syears?/, "y")
    .replace(/an?/, "1");

  return short;
}

/**
 * Create a debounced version of a function.
 *
 * @param func The function to debounce
 * @param timeout Delay in ms
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  timeout = 500,
) {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}

/**
 * Puts spaces in numbers. E.g. 10000 -> "10 000"
 * @param num
 */
export function numberWithSpaces(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Takes in an element and smooth scrolls vertically it to scrollTarget.
 * Taken from: https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
 *
 * Usage:
 * smoothScroll(element, 400, 300); <-- scroll to 400px from the top
 *
 * smoothScroll(element, element.scrollTop + 300, 300); <-- scroll 300px from current position
 *
 * @param element
 * @param scrollTarget
 * @param animDuration
 */
export default function smoothScrollTo(
  element: Element,
  scrollTarget: number,
  animDuration: number,
): Promise<void> {
  const target = Math.round(scrollTarget);
  const duration = Math.round(animDuration);

  if (duration < 0) {
    return Promise.reject(new Error("bad duration"));
  }
  if (duration === 0) {
    element.scrollTop = target;
    return Promise.resolve();
  }

  const startTime = Date.now();
  const endTime = startTime + duration;

  const startTop = element.scrollTop;
  const distance = target - startTop;

  // based on http://en.wikipedia.org/wiki/Smoothstep
  const smoothStep = (start: number, end: number, point: number) => {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    const x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  };

  return new Promise((resolve) => {
    // This is to keep track of where the element's scrollTop is
    // supposed to be, based on what we're doing
    let previousTop = element.scrollTop;

    // This is like a think function from a game loop
    const scrollFrame = () => {
      if (element.scrollTop !== previousTop) {
        // reject(new Error("interrupted"));
        // ^ can be used if you need to detect if
        // scroll has been interrupted
        return;
      }

      // set the scrollTop for this frame
      const now = Date.now();
      const point = smoothStep(startTime, endTime, now);
      const frameTop = Math.round(startTop + distance * point);
      element.scrollTop = frameTop;

      // check if we're done!
      if (now >= endTime) {
        resolve();
        return;
      }

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (element.scrollTop === previousTop && element.scrollTop !== frameTop) {
        resolve();
        return;
      }
      previousTop = element.scrollTop;

      // schedule next frame for execution
      setTimeout(scrollFrame, 0);
    };

    // boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
}
