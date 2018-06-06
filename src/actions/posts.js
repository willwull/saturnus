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

function shouldFetch(state, subreddit) {
  const { posts } = state;

  const currentSub = state.posts[subreddit];

  // if nothing has been fetched for the current sub, we need to fetch
  if (!currentSub || !currentSub.receivedAt) return true;

  // if we have already fetched, only fetch again if it was 10 minutes ago
  const then = moment(posts.receivedAt);
  const diff = moment().diff(then, "minutes");
  return diff > 10;
}

export function fetchPosts(subreddit) {
  return async (dispatch, getState) => {
    const state = getState();
    if (!shouldFetch(state, subreddit)) return;

    const { r } = state.snoowrap;
    dispatch(requestPosts(subreddit));
    const posts = await r.getHot(subreddit);
    console.log(posts);
    dispatch(receivePosts(subreddit, posts));
  };
}

export function fetchMorePosts(subreddit) {
  return async (dispatch, getState) => {
    const { items } = getState().posts[subreddit];
    dispatch(requestMorePosts(subreddit));
    // fetchMore will return a Listing with _both_ previous and new posts
    const itemsWithNew = await items.fetchMore({ amount: 25 });
    dispatch(receivePosts(subreddit, itemsWithNew));
  };
}
