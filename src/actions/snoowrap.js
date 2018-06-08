import moment from "moment-mini";
import reddit from "api/reddit";
import { appOnlyOauth } from "api/authentication";
import { setUserStatus } from "./user";

export const REQUEST_SNOOWRAP = "REQUEST_SNOOWRAP";
export const RECEIVE_SNOOWRAP = "RECEIVE_SNOOWRAP";
export const SNOOWRAP_ERROR = "SNOOWRAP_ERROR";

function receiveSnoowrap(accessToken = "") {
  return {
    type: RECEIVE_SNOOWRAP,
    accessToken,
    receivedAt: Date.now(),
  };
}

function snoowrapError() {
  return {
    type: SNOOWRAP_ERROR,
  };
}

function shouldInit(state) {
  const { snoowrap } = state;

  // if snoowrap hasn't been created yet at all
  if (!snoowrap.accessToken || !snoowrap.receivedAt) return true;

  // if we have a valid accessToken, we don't need to fetch another
  const then = moment(snoowrap.receivedAt);
  const diff = moment().diff(then, "seconds");
  return diff > 3600;
}

export function initSnoowrap() {
  return async (dispatch, getState) => {
    let accessToken;

    if (shouldInit(getState())) {
      dispatch({
        type: REQUEST_SNOOWRAP,
      });
      const authCredentials = await appOnlyOauth();
      accessToken = authCredentials.access_token;
    } else {
      ({ accessToken } = getState().snoowrap);
    }

    reddit.initAppOnly(accessToken);

    dispatch(receiveSnoowrap(accessToken));
  };
}

export function authSnoowrap(authCode) {
  return async dispatch => {
    try {
      await reddit.initAuthCode(authCode);
      dispatch(setUserStatus(true));
      dispatch(receiveSnoowrap());
    } catch (error) {
      console.log(error);
      dispatch(snoowrapError());
    }
  };
}

export function initRefreshToken(refreshToken) {
  return dispatch => {
    try {
      reddit.initRefreshToken(refreshToken);
      dispatch(setUserStatus(true));
      dispatch(receiveSnoowrap());
    } catch (error) {
      // if there is some error (e.g. if the refresh token is invalid)
      // fall back to userless initialization
      console.log("fell back to userless");
      dispatch(initSnoowrap());
    }
  };
}
