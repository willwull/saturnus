import {
  REQUEST_SUBREDDIT,
  RECEIVE_SUBREDDIT,
  SUBREDDIT_ERROR,
} from "../actions/subreddits";
import { Subreddit } from "snoowrap";

export type SpecificSubState = {
  isLoading: boolean;
  data: Subreddit | null;
  error: boolean;
};

export type SubredditState = {
  [key: string]: SpecificSubState;
};

function specificSub(
  state: SpecificSubState = {
    isLoading: false,
    data: null,
    error: false,
  },
  action: any,
): SpecificSubState {
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

export default function subreddits(
  state: SubredditState = {},
  action: any,
): SubredditState {
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
