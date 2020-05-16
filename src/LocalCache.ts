import { Subreddit } from "snoowrap";
import { SimpleSubreddit } from "./components/SubredditList";

const VERIFICATION_STATE = "verification_state";
const REDDIT_AUTH_TOKENS = "reddit_auth_tokens";
const LAST_ACTIVE_USER = "last_active_user";
const MY_SUBSCRIPTIONS = "my_subscriptions";
const IS_DARK_THEME = "saturnus_dark_theme_on";
const SUBREDDITS = "cached_subreddits";

/* Generic functions */
function set(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function get(key: string) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}

/* Handling verfication state for when signing in for the first time */
export function storeVerificationState(value: any) {
  set(VERIFICATION_STATE, value);
}

export function getVerificationState() {
  return get(VERIFICATION_STATE);
}

/* Handling retrieved auth tokens so the user can sign in */
export function storeAuthTokens(username: string, value: any) {
  const storedValue = get(REDDIT_AUTH_TOKENS) || {};
  set(REDDIT_AUTH_TOKENS, { ...storedValue, [username]: value });
}

export function getAuthTokens() {
  return get(REDDIT_AUTH_TOKENS);
}

/* Handling the last active user, so we sign in with the correct one */
/* if the user has logged in with multiple accounts */
export function storeLastActiveUser(username: string) {
  set(LAST_ACTIVE_USER, username);
}

export function getLastActiveUser(): string | null {
  return get(LAST_ACTIVE_USER);
}

/* Since fetching all subscriptions can be slow, we can store it in our cache */
export function getStoredSubs(): SimpleSubreddit[] {
  const user = getLastActiveUser();
  if (!user) {
    return [];
  }
  const storedValue = get(MY_SUBSCRIPTIONS) || {};
  return storedValue[user];
}

export function storeMySubs(subscriptions: Subreddit[], user: string) {
  const stored = getStoredSubs();

  // The original subscriptions array contain a lot of information
  // that take up unnecessary storage since they aren't used within the
  // app anyway, so we only store what we need.
  // This also ensures we don't exceed the localStorage quota
  const stripped: SimpleSubreddit[] = subscriptions.map((sub) => ({
    id: sub.id,
    url: sub.url,
    icon_img: sub.icon_img,
    key_color: sub.key_color,
    display_name: sub.display_name,
    display_name_prefixed: sub.display_name_prefixed,
    user_has_favorited: (sub as any).user_has_favorited,
  }));

  set(MY_SUBSCRIPTIONS, { ...stored, [user]: stripped });
}

/* Cache which theme the user uses */
export function getStoredTheme(): boolean {
  return !!get(IS_DARK_THEME);
}

export function storeTheme(isDarkTheme: boolean) {
  set(IS_DARK_THEME, isDarkTheme);
}

/* To make subsequent visits to subreddits smoother, cache the sub data */
export function storeSubredditData(data: Subreddit) {
  const stored = get(SUBREDDITS);
  set(SUBREDDITS, { ...stored, [data.display_name]: data });
}

export function getSubredditData(subDisplayName: string): Subreddit | null {
  const stored = get(SUBREDDITS) ?? {};
  if (stored[subDisplayName]) {
    return stored[subDisplayName] as Subreddit;
  }
  return null;
}

export function getAllCachedSubreddits(): { [key: string]: Subreddit } {
  return get(SUBREDDITS) ?? {};
}

/**
 * Clear localStorage, except which theme is in use.
 */
export function clearSession() {
  const currentTheme = getStoredTheme();
  localStorage.clear();
  storeTheme(currentTheme);
}
