import Snoowrap from "snoowrap";
import credentials from "./credentials";
import { AppOnlyTokens, AuthTokens } from "../models";

const { protocol, host } = window.location;
export const REDIRECT_URI = `${protocol}//${host}`;

/**
 * Generates an access token for userless actions, aka Application Only OAuth.
 * Read more: https://github.com/reddit-archive/reddit/wiki/OAuth2#application-only-oauth
 */
export async function appOnlyOauth(): Promise<AppOnlyTokens> {
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
 * After the user is redirected back to the app (after granting access in Reddit),
 * the URL will contain a code. This code is used to fetch access and refresh
 * tokens for the user.
 *
 * @param code Code from URL after successful redirect
 */
export async function getAuthTokens(code: string): Promise<AuthTokens> {
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
 * @param redirectPath
 * @returns URL where the user can grant access to this app.
 */
export function getAuthUrl(verificationState = ""): string {
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
