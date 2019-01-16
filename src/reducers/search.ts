import { Subreddit } from "snoowrap";
import {
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
} from "../actions/search";

export type SearchState = {
  query: string;
  isLoading: boolean;
  subreddits: Subreddit[];
};

const defaultState: SearchState = {
  query: "",
  isLoading: false,
  subreddits: [],
};

export default function search(state = defaultState, action: any): SearchState {
  switch (action.type) {
    case REQUEST_SEARCH_RESULTS:
      return { ...state, isLoading: true, query: action.query };
    case RECEIVE_SEARCH_RESULTS:
      return { ...state, isLoading: false, subreddits: action.subreddits };
    default:
      return state;
  }
}
