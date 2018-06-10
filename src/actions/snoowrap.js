import reddit from "api/reddit";
import * as LocalCache from "LocalCache";
import { appOnlyOauth, getAuthTokens } from "api/authentication";
import { fetchUser } from "./user";

export const REQUEST_SNOOWRAP = "REQUEST_SNOOWRAP";
export const RECEIVE_SNOOWRAP = "RECEIVE_SNOOWRAP";
export const SNOOWRAP_ERROR = "SNOOWRAP_ERROR";

function receiveSnoowrap(authType) {
  return {
    type: RECEIVE_SNOOWRAP,
    receivedAt: Date.now(),
    authType,
  };
}

function snoowrapError() {
  return {
    type: SNOOWRAP_ERROR,
  };
}

/**
 * Initializes Snoowrap with app only authentication, when the user
 * hasn't logged in with an account.
 */
export function initSnoowrap() {
  return async dispatch => {
    dispatch({
      type: REQUEST_SNOOWRAP,
    });

    const authCredentials = await appOnlyOauth();
    const accessToken = authCredentials.access_token;

    reddit.initAppOnly(accessToken);

    dispatch(receiveSnoowrap("appOnly"));
  };
}

/**
 * Initializes Snoowrap from an auth code.
 * This is used when the user logs in for the first time, after
 * they are redirected back from reddit.
 *
 * This action will also store the auth tokens in localStorage.
 *
 * @param {String} authCode
 */
export function authSnoowrap(authCode) {
  return async dispatch => {
    dispatch({ type: REQUEST_SNOOWRAP });

    try {
      const tokens = await getAuthTokens(authCode);
      reddit.initRefreshToken(tokens.refresh_token);

      const user = await dispatch(fetchUser());

      // store the tokens in cache
      LocalCache.storeAuthTokens(user.name, tokens);
      LocalCache.storeLastActiveUser(user.name);

      dispatch(receiveSnoowrap("auth"));
    } catch (error) {
      console.log(error);
      dispatch(snoowrapError());
    }
  };
}

/**
 * Initializes Snoowrap (and gets user info) from a refresh token.
 * This is used when the user has logged in in the past, and their
 * refresh token has been fetched before.
 *
 * @param {String} refreshToken
 */
export function initRefreshToken(refreshToken) {
  return async dispatch => {
    dispatch({ type: REQUEST_SNOOWRAP });

    try {
      reddit.initRefreshToken(refreshToken);

      const user = await dispatch(fetchUser());

      LocalCache.storeLastActiveUser(user.name);

      dispatch(receiveSnoowrap("auth"));
    } catch (error) {
      // if there is some error (e.g. if the refresh token is invalid)
      // fall back to userless initialization
      console.log("fell back to userless");
      console.log(error);
      dispatch(initSnoowrap());
    }
  };
}
