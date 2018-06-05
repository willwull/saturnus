import { REQUEST_POSTS, RECEIVE_POSTS } from "actions";

export default function posts(
  state = {
    isLoading: false,
    items: [],
  },
  action,
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return { ...state, isLoading: true };
    case RECEIVE_POSTS:
      return { ...state, isLoading: false, items: action.posts };
    default:
      return state;
  }
}
