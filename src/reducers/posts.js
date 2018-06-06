import {
  REQUEST_POSTS,
  REQUEST_MORE_POSTS,
  RECEIVE_POSTS,
} from "actions/posts";

export default function posts(
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
