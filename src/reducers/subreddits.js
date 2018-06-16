import {
  REQUEST_SUBREDDIT,
  RECEIVE_SUBREDDIT,
  SUBREDDIT_ERROR,
} from "actions/subreddits";

function specificSub(
  state = {
    isLoading: false,
    data: {},
    error: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_SUBREDDIT:
      return { ...state, isLoading: true, error: false };
    case RECEIVE_SUBREDDIT:
      return { ...state, isLoading: false, data: action.data };
    case SUBREDDIT_ERROR:
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
}

export default function subreddits(state = {}, action) {
  switch (action.type) {
    case REQUEST_SUBREDDIT:
    case RECEIVE_SUBREDDIT:
      return {
        ...state,
        [action.subreddit]: specificSub(state[action.subreddit], action),
      };
    default:
      return state;
  }
}
