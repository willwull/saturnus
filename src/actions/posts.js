import moment from "moment-mini";
import reddit from "api/reddit";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const REQUEST_MORE_POSTS = "REQUEST_MORE_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const FETCH_POST_ERROR = "FETCH_POST_ERROR";

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

function fetchPostError(subreddit) {
  return {
    type: FETCH_POST_ERROR,
    subreddit,
  };
}

function shouldFetch(state, subreddit, sort) {
  const { posts, sort: currentSort } = state;

  // if the user changes sort mode, we should fetch new and skip the cache
  if (sort !== currentSort) return true;

  const currentSub = state.posts[subreddit];

  // if nothing has been fetched for the current sub, we need to fetch
  if (!currentSub || !currentSub.receivedAt) return true;

  // if we have already fetched, only fetch again if it was 10 minutes ago
  const then = moment(posts.receivedAt);
  const diff = moment().diff(then, "minutes");
  return diff > 10;
}

export function fetchPosts(subreddit, sort = "hot") {
  return async (dispatch, getState) => {
    const state = getState();
    if (!shouldFetch(state, subreddit, sort)) return;

    const r = reddit.getSnoowrap();
    dispatch(requestPosts(subreddit));

    try {
      let posts;
      const sub = subreddit ? `/${subreddit}` : "";

      switch (sort) {
        case "hot":
          posts = await r.getHot(subreddit);
          break;
        case "top":
          posts = await r.getTop(subreddit);
          break;
        case "new":
          posts = await r.getNew(subreddit);
          break;
        case "controversial":
          posts = await r.getControversial(subreddit);
          break;
        case "rising":
          posts = await r.getRising(subreddit);
          break;
        default:
          posts = await r.oauthRequest({
            uri: `${sub}/best`,
            method: "get",
          });
      }

      console.log(sort);
      console.log(posts);
      dispatch(receivePosts(subreddit, posts));
    } catch (error) {
      console.error(error);
      dispatch(fetchPostError(subreddit));
    }
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
