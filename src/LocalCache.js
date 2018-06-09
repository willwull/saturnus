const VERIFICATION_STATE = "verification_state";
const REDDIT_AUTH_TOKENS = "reddit_auth_tokens";
const LAST_ACTIVE_USER = "last_active_user";

/* Generic functions */
function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
  return JSON.parse(localStorage.getItem(key));
}

/* Handling verfication state for when signing in for the first time */
export function storeVerificationState(value) {
  set(VERIFICATION_STATE, value);
}

export function getVerificationState() {
  return get(VERIFICATION_STATE);
}

/* Handling retrieved auth tokens so the user can sign in */
export function storeAuthTokens(username, value) {
  const storedValue = get(REDDIT_AUTH_TOKENS) || {};
  set(REDDIT_AUTH_TOKENS, { ...storedValue, [username]: value });
}

export function getAuthTokens() {
  return get(REDDIT_AUTH_TOKENS);
}

/* Handling the last active user, so we sign in with the correct one */
/* if the user has logged in with multiple accounts */
export function storeLastActiveUser(username) {
  set(LAST_ACTIVE_USER, username);
}

export function getLastActiveUser() {
  return get(LAST_ACTIVE_USER);
}
