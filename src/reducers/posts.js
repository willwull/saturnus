import {
  REQUEST_POSTS,
  REQUEST_MORE_POSTS,
  RECEIVE_POSTS,
  FETCH_POST_ERROR,
} from "actions/posts";
import { POST_VOTE } from "actions/voting";

import { USER_SIGN_OUT } from "actions/user";

function postsInSubreddit(
  state = {
    items: [],
    sortMode: "",
    time: "",
    receivedAt: null,
    isLoading: false,
    isLoadingMore: false,
    error: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isLoading: true,
        error: false,
        sortMode: action.sortMode,
        time: action.time,
      };
    case REQUEST_MORE_POSTS:
      return { ...state, isLoadingMore: true };
    case FETCH_POST_ERROR:
      return { ...state, isLoading: false, error: true };
    case RECEIVE_POSTS:
      return {
        ...state,
        items: action.posts,
        receivedAt: action.receivedAt,
        isLoading: false,
        isLoadingMore: false,
      };
    default:
      return state;
  }
}

function updatePostsAfterVote(state = {}, action) {
  console.log("updatePostsAfterVote");
  let newState = {};
  Object.entries(state).forEach(([key, subreddit]) => {
    const { updatedPost } = action;
    const { items } = subreddit;
    newState = {
      ...newState,
      [key]: {
        ...subreddit,
        items: items.map(post => {
          if (post.id === updatedPost.id) {
            console.log("old: ", post);
            console.log("new: ", updatedPost);
          }
          return post.id === updatedPost.id ? updatedPost : post;
        }),
      },
    };
  });
  console.log(newState);
  return newState;
}

export default function posts(state = {}, action) {
  const subreddit = action.subreddit || "";

  // all action types should fall through
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_MORE_POSTS:
    case FETCH_POST_ERROR:
    case REQUEST_POSTS:
      return {
        ...state,
        [subreddit]: postsInSubreddit(state[subreddit], action),
      };
    case POST_VOTE:
      return updatePostsAfterVote(state, action);
    case USER_SIGN_OUT:
      // if the user signs out, we can clear the stored posts, since
      // we need to fetch the front page again
      return {};
    default:
      return state;
  }
}
