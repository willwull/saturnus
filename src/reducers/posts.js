import { REQUEST_POSTS, REQUEST_MORE_POSTS, RECEIVE_POSTS } from "actions";

export default function posts(
  state = {
    isLoading: false,
    isLoadingMore: false,
    items: [],
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
        isLoading: false,
        isLoadingMore: false,
        items: action.posts,
      };
    default:
      return state;
  }
}
