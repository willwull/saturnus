import authenticate from "api/authentication";

/* Action types */
export const REQUEST_SNOOWRAP = "REQUEST_SNOOWRAP";
export const RECEIVE_SNOOWRAP = "RECEIVE_SNOOWRAP";

// export const CHANGE_SUBREDDIT = "CHANGE_SUBREDDIT";

/* Action creators */
function requestSnoowrap() {
  return {
    type: REQUEST_SNOOWRAP,
  };
}

function receiveSnoowrap(snoowrap) {
  return {
    type: RECEIVE_SNOOWRAP,
    snoowrap,
  };
}

export function initSnoowrap() {
  return async dispatch => {
    dispatch(requestSnoowrap());
    const snoowrap = await authenticate();
    dispatch(receiveSnoowrap(snoowrap));
  };
}

/*
function changeCurrentSub(subreddit) {
  return { type: CHANGE_SUBREDDIT, subreddit };
}

export function setCurrentSub(subreddit) {
  return dispatch => {
    dispatch(changeCurrentSub(subreddit));
    dispatch(fetchPosts(subreddit));
  };
}
*/
