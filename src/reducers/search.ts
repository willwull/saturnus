import { Subreddit, Submission } from "snoowrap";
import {
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SUB_SEARCH,
  SET_SEARCH_INPUT_VALUE,
  RECEIVE_POST_SEARCH,
} from "../actions/search";

export type SearchState = {
  query: string;
  lastSearchQuery: string;
  lastSearchSub: string;
  isLoading: boolean;
  isLoadingPosts: boolean;
  subreddits: Subreddit[];
  posts: Submission[];
};

const defaultState: SearchState = {
  query: "",
  lastSearchQuery: "",
  lastSearchSub: "",
  isLoading: false,
  isLoadingPosts: false,
  subreddits: [],
  posts: [],
};

export default function search(state = defaultState, action: any): SearchState {
  switch (action.type) {
    case SET_SEARCH_INPUT_VALUE:
      return { ...state, query: action.query };
    case REQUEST_SEARCH_RESULTS:
      return {
        ...state,
        isLoading: true,
        isLoadingPosts: true,
        lastSearchQuery: action.query,
        lastSearchSub: action.subreddit,
      };
    case RECEIVE_SUB_SEARCH:
      return { ...state, isLoading: false, subreddits: action.subreddits };
    case RECEIVE_POST_SEARCH:
      return { ...state, isLoadingPosts: false, posts: action.posts };
    default:
      return state;
  }
}
