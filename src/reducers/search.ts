import { Subreddit, Submission, Listing } from "snoowrap";
import {
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SUB_SEARCH,
  RECEIVE_POST_SEARCH,
} from "../actions/search";
import { mapPostsToId } from "./posts";

// MARK: Types

export type SearchState = {
  lastSearchQuery: string;
  lastSearchSub: string;
  isLoading: boolean;
  isLoadingPosts: boolean;
  subreddits: Subreddit[];
  /** List of post IDs */
  posts: string[];
  originalPostListing: Listing<Submission> | null;
};

const defaultState: SearchState = {
  lastSearchQuery: "",
  lastSearchSub: "",
  isLoading: false,
  isLoadingPosts: false,
  subreddits: [],
  posts: [],
  originalPostListing: null,
};

// MARK: Reducer

export default function search(state = defaultState, action: any): SearchState {
  switch (action.type) {
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
      return {
        ...state,
        isLoadingPosts: false,
        posts: mapPostsToId(action.posts),
        originalPostListing: action.posts,
      };
    default:
      return state;
  }
}
