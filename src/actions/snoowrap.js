import moment from "moment-mini";
import reddit from "api/reddit";
import { appOnlyOauth } from "api/authentication";

export const REQUEST_SNOOWRAP = "REQUEST_SNOOWRAP";
export const RECEIVE_SNOOWRAP = "RECEIVE_SNOOWRAP";

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

    reddit.init(accessToken);

    dispatch({
      type: RECEIVE_SNOOWRAP,
      accessToken,
      receivedAt: Date.now(),
    });
  };
}
