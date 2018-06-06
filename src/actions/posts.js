import moment from "moment-mini";

/* Action types */
export const REQUEST_POSTS = "REQUEST_POSTS";
export const REQUEST_MORE_POSTS = "REQUEST_MORE_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

/* Action creators */
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

function shouldFetchMore(state) {
  const { posts } = state;

  // if no posts have been fetched, we should fetch
  if (!posts.receivedAt) return true;

  // if we have already fetched, only fetch again if it was 10 minutes ago
  const then = moment(posts.receivedAt);
  const diff = moment().diff(then, "minutes");
  return diff > 10;
}

export function fetchPosts(subreddit) {
  return async (dispatch, getState) => {
    const state = getState();
    if (!shouldFetchMore(state)) return;

    const { r } = state.snoowrap;
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
