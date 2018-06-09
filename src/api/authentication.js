import Snoowrap from "snoowrap";
import credentials from "./credentials";

const { protocol, host } = window.location;
export const REDIRECT_URI = `${protocol}//${host}`;

/**
 * Generates an access token for userless actions, aka Application Only OAuth.
 * Read more: https://github.com/reddit-archive/reddit/wiki/OAuth2#application-only-oauth
 *
 * Returns object of shape: {
 *  access_token: string
 *  token_type: "bearer"
 *  device_id: "DO_NOT_TRACK_THIS_DEVICE"
 *  expires_in: 3600
 *  scope: "*"
 * }
 */
export async function appOnlyOauth() {
  const formData = new FormData();
  formData.append(
    "grant_type",
    "https://oauth.reddit.com/grants/installed_client",
  );
  formData.append("device_id", "DO_NOT_TRACK_THIS_DEVICE");

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "post",
    headers: {
      Authorization: `Basic ${window.btoa(`${credentials.clientId}:`)}`,
    },
    body: formData,
  });
  const json = await res.json();
  return json;
}

export async function getAuthTokens(code) {
  const formData = new FormData();
  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("redirect_uri", REDIRECT_URI);

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "post",
    headers: {
      Authorization: `Basic ${window.btoa(`${credentials.clientId}:`)}`,
    },
    body: formData,
  });
  const json = await res.json();
  return json;
}

/**
 * Creates a url that takes the user to a page where they can let this
 * app use their account
 *
 * If a redirectPath is passed, that string will be embedded in the state,
 * so the state will be something like "13384719:/r/funny"
 *
 * @param {String} redirectPath
 */
export function getAuthUrl(verificationState = "") {
  const options = {
    clientId: credentials.clientId,
    scope: [
      "account",
      "creddits",
      "edit",
      "flair",
      "history",
      "identity",
      "livemanage",
      "modconfig",
      "modcontributors",
      "modflair",
      "modlog",
      "modothers",
      "modposts",
      "modself",
      "modwiki",
      "mysubreddits",
      "privatemessages",
      "read",
      "report",
      "save",
      "submit",
      "subscribe",
      "vote",
      "wikiedit",
      "wikiread",
    ],
    redirectUri: REDIRECT_URI,
    permanent: true,
    state: verificationState,
  };

  const authUrl = Snoowrap.getAuthUrl(options);
  return authUrl;
}
