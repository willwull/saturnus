import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Subreddit, Submission } from "snoowrap";
import reddit from "../api/reddit";
import { RootState } from "../reducers";

export const REQUEST_SEARCH_RESULTS = "REQUEST_SEARCH_RESULTS";
export const RECEIVE_SUB_SEARCH = "RECEIVE_SUB_SEARCH";
export const RECEIVE_POST_SEARCH = "RECEIVE_POST_SEARCH";

export function search(query: string, subreddit = "") {
  return (
    dispatch: ThunkDispatch<any, void, Action>,
    getState: () => RootState,
  ) => {
    const state = getState();
    if (
      query === state.search.lastSearchQuery &&
      subreddit === state.search.lastSearchSub &&
      state.search.subreddits.length > 0
    ) {
      // searched for the same thing, no need to perform a new search
      return;
    }

    dispatch({
      type: REQUEST_SEARCH_RESULTS,
      query,
      subreddit,
    });

    const r = reddit.getSnoowrap();

    // TODO: snoowrap type is wrong, again...
    (r as any).searchSubreddits({ query }).then((results: Subreddit[]) => {
      dispatch({
        type: RECEIVE_SUB_SEARCH,
        subreddits: results,
      });
    });

    const options = {
      query,
      subreddit: subreddit || null,
    };

    (r as any).search(options).then((results: Submission[]) => {
      dispatch({
        type: RECEIVE_POST_SEARCH,
        posts: results,
      });
    });
  };
}
