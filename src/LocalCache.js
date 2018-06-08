export function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get(key) {
  return JSON.parse(localStorage.getItem(key));
}
