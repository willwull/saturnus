import authenticate from "api/authentication";

/* Action types */
export const REQUEST_SNOOWRAP = "REQUEST_SNOOWRAP";
export const RECEIVE_SNOOWRAP = "RECEIVE_SNOOWRAP";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const REQUEST_MORE_POSTS = "REQUEST_MORE_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const CHANGE_SUBREDDIT = "CHANGE_SUBREDDIT";

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

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

function requestMorePosts(subreddit) {
  return {
    type: REQUEST_MORE_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit, posts) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts,
    receivedAt: Date.now(),
  };
}

export function fetchPosts(subreddit) {
  return async (dispatch, getState) => {
    const { r } = getState().snoowrap;
    dispatch(requestPosts(subreddit));
    const posts = await r.getHot(subreddit);
    dispatch(receivePosts(subreddit, posts));
  };
}

export function fetchMorePosts(subreddit) {
  return async (dispatch, getState) => {
    const { items } = getState().posts;
    dispatch(requestMorePosts(subreddit));
    // fetchMore will return a Listing with _both_ previous and new posts
    const itemsWithNew = await items.fetchMore({ amount: 25 });
    dispatch(receivePosts(subreddit, itemsWithNew));
  };
}

function changeCurrentSub(subreddit) {
  return { type: CHANGE_SUBREDDIT, subreddit };
}

export function setCurrentSub(subreddit) {
  return dispatch => {
    dispatch(changeCurrentSub(subreddit));
    dispatch(fetchPosts(subreddit));
  };
}
