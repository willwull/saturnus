import Snoowrap from "snoowrap";
import credentials from "./credentials";

/**
 * Generates an access token for userless actions, aka Application Only OAuth.
 * Read more: https://github.com/reddit-archive/reddit/wiki/OAuth2#application-only-oauth
 */
async function appOnlyOauth() {
  const formData = new FormData();
  formData.append(
    "grant_type",
    "https://oauth.reddit.com/grants/installed_client",
  );
  formData.append("device_id", "DO_NOT_TRACK_THIS_DEVICE");

  try {
    const res = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "post",
      headers: {
        Authorization: `Basic ${window.btoa(`${credentials.clientId}:`)}`,
      },
      body: formData,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Creates an instance of Snoowrap.
 * Authenticates with app only OAuth by default.
 *
 * TODO: authenticate with logged in users
 */
export default async function authenticate() {
  // TODO: check localStorage for access token and create a new instance of snoowrap with that
  const appOnly = await appOnlyOauth();
  const snoo = new Snoowrap({
    userAgent: credentials.userAgent,
    accessToken: appOnly.access_token,
  });
  return snoo;
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
