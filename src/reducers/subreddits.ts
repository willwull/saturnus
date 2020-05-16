import {
  REQUEST_SUBREDDIT,
  RECEIVE_SUBREDDIT,
  SUBREDDIT_ERROR,
  REQUEST_SUBSCRIBE_TO_SUB,
  RECEIVED_SUBSCRIBE_TO_SUB,
  RECEIVED_UNSUBSCRIBE_TO_SUB,
} from "../actions/subreddits";
import { Subreddit } from "snoowrap";
import * as LocalCache from "../LocalCache";

// MARK: Types

export type SpecificSubState = {
  data: Subreddit | null;
  error: boolean;
  isLoading: boolean;
  isLoadingSubscription: boolean;
};

export type SubredditState = {
  [key: string]: SpecificSubState;
};

// MARK: State and reducers

const defaultState: SpecificSubState = {
  data: null,
  error: false,
  isLoading: false,
  isLoadingSubscription: false,
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
    case REQUEST_SUBSCRIBE_TO_SUB:
      return { ...state, isLoadingSubscription: true };
    case RECEIVED_SUBSCRIBE_TO_SUB:
    case RECEIVED_UNSUBSCRIBE_TO_SUB:
      return { ...state, isLoadingSubscription: false, data: action.data };
    default:
      return state;
  }
}

const defaultSubState: SubredditState = {};
Object.entries(LocalCache.getAllCachedSubreddits()).forEach(
  ([subreddit, data]) => {
    defaultSubState[subreddit] = {
      ...defaultState,
      data,
    };
  },
);
export default function subreddits(
  state: SubredditState = defaultSubState,
  action: any,
): SubredditState {
  switch (action.type) {
    case REQUEST_SUBSCRIBE_TO_SUB:
    case RECEIVED_SUBSCRIBE_TO_SUB:
    case RECEIVED_UNSUBSCRIBE_TO_SUB:
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
