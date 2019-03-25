import {
  REQUEST_SUBREDDIT,
  RECEIVE_SUBREDDIT,
  SUBREDDIT_ERROR,
} from "../actions/subreddits";
import { Subreddit } from "snoowrap";

// MARK: Types

export type SpecificSubState = {
  data: Subreddit | null;
  error: boolean;
  isLoading: boolean;
};

export type SubredditState = {
  [key: string]: SpecificSubState;
};

// MARK: State and reducers

const defaultState: SpecificSubState = {
  data: null,
  error: false,
  isLoading: false,
};

function specificSub(
  state: SpecificSubState = defaultState,
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
