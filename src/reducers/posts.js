import {
  REQUEST_POSTS,
  REQUEST_MORE_POSTS,
  RECEIVE_POSTS,
} from "actions/posts";

function postsInSubreddit(
  state = {
    items: [],
    receivedAt: null,
    isLoading: false,
    isLoadingMore: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return { ...state, isLoading: true };
    case REQUEST_MORE_POSTS:
      return { ...state, isLoadingMore: true };
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

export default function posts(state = {}, action) {
  const subreddit = action.subreddit || "";

  // all action types should fall through
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_MORE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [subreddit]: postsInSubreddit(state[subreddit], action),
      };
    default:
      return state;
  }
}
