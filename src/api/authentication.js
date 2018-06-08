import Snoowrap from "snoowrap";
import credentials from "./credentials";

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

/**
 * Creates a url that takes the user to a page where they can let this
 * app use their account
 */
export function getAuthUrl() {
  const { protocol, host } = window.location;
  const options = {
    clientId: credentials.clientId,
    scope: [
      "identity",
      "mysubreddits",
      "subscribe",
      "vote",
      "submit",
      "save",
      "edit",
      "history",
      "read",
      "privatemessages",
      "account",
    ],
    redirectUri: `${protocol}//${host}/auth_callback`,
    permanent: true,
  };

  const authUrl = Snoowrap.getAuthUrl(options);
  console.log(authUrl);
  return authUrl;
}
