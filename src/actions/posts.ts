import moment from "moment-mini";
import reddit from "../api/reddit";
import { Submission } from "snoowrap";
import { RootState } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { PostsState, PostsSortMode, PostsTimes } from "../reducers/posts";
import { Action } from "redux";

// MARK: Action types

export const REQUEST_POSTS = "REQUEST_POSTS";
export const REQUEST_MORE_POSTS = "REQUEST_MORE_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const FETCH_POST_ERROR = "FETCH_POST_ERROR";

export const DEFAULT_SORT_MODE = "best";

// MARK: Action functions

function requestPosts(
  subreddit: string,
  sortMode: PostsSortMode,
  time: PostsTimes,
) {
  return {
    type: REQUEST_POSTS,
    subreddit,
    sortMode,
    time,
  };
}

function requestMorePosts(subreddit: string) {
  return {
    type: REQUEST_MORE_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit: string, posts: Submission[]) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts,
    receivedAt: Date.now(),
  };
}

function fetchPostError(subreddit: string) {
  return {
    type: FETCH_POST_ERROR,
    subreddit,
  };
}

// MARK: Thunk actions

function shouldFetch(
  state: RootState,
  subreddit: string,
  sortMode: PostsSortMode,
  time: PostsTimes,
) {
  const { posts } = state;

  const currentSub = posts.bySubreddit[subreddit];

  // if nothing has been fetched for the current sub, we need to fetch
  if (!currentSub || !currentSub.receivedAt) {
    return true;
  }

  // if the user changes sort mode, we should fetch new and skip the cache
  if (sortMode !== currentSub.sortMode) {
    return true;
  }

  if (time !== currentSub.time) {
    return true;
  }

  // if we have already fetched, only fetch again if it was 10 minutes ago
  const then = moment(currentSub.receivedAt);
  const diff = moment().diff(then, "minutes");
  return diff > 10;
}

export function fetchPosts(
  subreddit: string,
  sortMode: PostsSortMode = DEFAULT_SORT_MODE,
  time: PostsTimes = "month",
) {
  return async (
    dispatch: ThunkDispatch<PostsState, void, Action>,
    getState: () => RootState,
  ) => {
    const state = getState();
    if (!shouldFetch(state, subreddit, sortMode, time)) return;

    const r = reddit.getSnoowrap();
    dispatch(requestPosts(subreddit, sortMode, time));

    try {
      let posts;
      const sub = subreddit ? `/${subreddit}` : "";

      switch (sortMode) {
        case "hot":
          posts = await r.getHot(subreddit);
          break;
        case "top":
          posts = await (r as any).getTop(subreddit, { time });
          break;
        case "new":
          posts = await r.getNew(subreddit);
          break;
        case "controversial":
          posts = await (r as any).getControversial(subreddit, { time });
          break;
        case "rising":
          posts = await r.getRising(subreddit);
          break;
        default:
          posts = await (r as any).oauthRequest({
            uri: `${sub}/best`,
            method: "get",
          });
      }

      dispatch(receivePosts(subreddit, posts));
    } catch (error) {
      console.error(error);
      dispatch(fetchPostError(subreddit));
    }
  };
}

export function fetchMorePosts(subreddit: string) {
  return async (
    dispatch: ThunkDispatch<PostsState, void, Action>,
    getState: () => RootState,
  ) => {
    const { originalListing } = getState().posts.bySubreddit[subreddit];

    if (originalListing === null) {
      console.error(
        "Tried to fetch more, but listing was null. Subreddit:",
        subreddit,
      );
      return;
    }

    dispatch(requestMorePosts(subreddit));

    // fetchMore will return a Listing with _both_ previous and new posts
    const itemsWithNew = await originalListing.fetchMore({ amount: 25 });

    dispatch(receivePosts(subreddit, itemsWithNew));
  };
}
