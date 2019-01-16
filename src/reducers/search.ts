import { Subreddit } from "snoowrap";
import {
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  SET_SEARCH_INPUT_VALUE,
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
    case SET_SEARCH_INPUT_VALUE:
      return { ...state, query: action.query };
    case REQUEST_SEARCH_RESULTS:
      return { ...state, isLoading: true, query: action.query };
    case RECEIVE_SEARCH_RESULTS:
      return { ...state, isLoading: false, subreddits: action.subreddits };
    default:
      return state;
  }
}
