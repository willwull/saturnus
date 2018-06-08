import moment from "moment-mini";
import reddit from "api/reddit";
import { appOnlyOauth } from "api/authentication";

export const REQUEST_SNOOWRAP = "REQUEST_SNOOWRAP";
export const RECEIVE_SNOOWRAP = "RECEIVE_SNOOWRAP";

function shouldInit(state) {
  const { snoowrap } = state;

  // if nothing has been fetched for the current sub, we need to fetch
  if (!snoowrap.accessToken || !snoowrap.receivedAt) return true;

  // if we have already fetched, only fetch again if it was 10 minutes ago
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
