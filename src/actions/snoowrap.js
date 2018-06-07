import reddit from "api/reddit";

export const REQUEST_SNOOWRAP = "REQUEST_SNOOWRAP";
export const RECEIVE_SNOOWRAP = "RECEIVE_SNOOWRAP";

export function initSnoowrap() {
  return async dispatch => {
    dispatch({
      type: REQUEST_SNOOWRAP,
    });

    await reddit.authenticate();

    dispatch({
      type: RECEIVE_SNOOWRAP,
    });
  };
}
