import {
  RECEIVE_CURRENT_POST,
  REQUEST_CURRENT_POST,
  ERROR_CURRENT_POST,
} from "actions/currentPost";

export default function currentPost(
  state = {
    post: {},
    isLoading: false,
    errorMsg: null,
    receivedAt: null,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_CURRENT_POST:
      return { ...state, isLoading: true };
    case RECEIVE_CURRENT_POST:
      return {
        ...state,
        isLoading: false,
        post: action.post,
        receivedAt: action.receivedAt,
      };
    case ERROR_CURRENT_POST:
      return { ...state, isLoading: false, errorMsg: action.errorMsg };
    default:
      return state;
  }
}
