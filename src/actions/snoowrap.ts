import reddit from "../api/reddit";
import * as LocalCache from "../LocalCache";
import { appOnlyOauth, getAuthTokens } from "../api/authentication";
import { fetchUser, setUserStatus, fetchMySubs } from "./user";
import { SnoowrapAuthType, SnoowrapState } from "../reducers/snoowrap";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

export const REQUEST_SNOOWRAP = "REQUEST_SNOOWRAP";
export const RECEIVE_SNOOWRAP = "RECEIVE_SNOOWRAP";
export const SNOOWRAP_ERROR = "SNOOWRAP_ERROR";

function receiveSnoowrap(authType: SnoowrapAuthType) {
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
  return async (dispatch: ThunkDispatch<SnoowrapState, void, Action>) => {
    dispatch({
      type: REQUEST_SNOOWRAP,
    });

    try {
      const authCredentials = await appOnlyOauth();
      const accessToken = authCredentials.access_token;

      reddit.initAppOnly(accessToken);

      dispatch(receiveSnoowrap("appOnly"));
      dispatch(fetchMySubs({ skipCache: true }));
    } catch (error) {
      console.error(error);
      dispatch(snoowrapError());
    }
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
export function authSnoowrap(authCode: string) {
  return async (dispatch: ThunkDispatch<SnoowrapState, void, Action>) => {
    dispatch({ type: REQUEST_SNOOWRAP });

    try {
      const tokens = await getAuthTokens(authCode);
      reddit.initRefreshToken(tokens.refresh_token);

      // set user to logged in
      // this is needed so the user's subscriptions will be
      // fetched instead of the default subs
      dispatch(setUserStatus(true));
      dispatch(receiveSnoowrap("auth"));

      // for some reason, writing this as async triggers a TS error
      dispatch(fetchUser()).then((user) => {
        LocalCache.storeAuthTokens(user.name, tokens);
        dispatch(fetchMySubs({ username: user.name, skipCache: true }));
      });
    } catch (error) {
      console.error(error);
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
export function initRefreshToken(refreshToken: string) {
  return async (dispatch: ThunkDispatch<SnoowrapState, void, Action>) => {
    try {
      reddit.initRefreshToken(refreshToken);

      dispatch(receiveSnoowrap("auth"));

      dispatch(fetchUser()).then((user) => {
        dispatch(fetchMySubs({ username: user.name, skipCache: false }));
      });
    } catch (error) {
      // if there is some error (e.g. if the refresh token is invalid)
      // fall back to userless initialization
      console.log("fell back to userless");
      console.log(error);
      dispatch(initSnoowrap());
    }
  };
}
