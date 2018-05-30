/**
 * Takes an url and checks if it links to an image
 * @param {String} url
 */
export function isImgUrl(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
}
