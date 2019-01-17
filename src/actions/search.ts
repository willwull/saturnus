import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Subreddit, Submission } from "snoowrap";
import reddit from "../api/reddit";
import { RootState } from "../reducers";

export const SET_SEARCH_INPUT_VALUE = "SET_SEARCH_INPUT_VALUE";
export const REQUEST_SEARCH_RESULTS = "REQUEST_SEARCH_RESULTS";
export const RECEIVE_SUB_SEARCH = "RECEIVE_SUB_SEARCH";
export const RECEIVE_POST_SEARCH = "RECEIVE_POST_SEARCH";

export function setSearchValue(query: string) {
  return {
    type: SET_SEARCH_INPUT_VALUE,
    query,
  };
}

export function search(query: string, subreddit = "") {
  return (
    dispatch: ThunkDispatch<any, void, Action>,
    getState: () => RootState,
  ) => {
    const state = getState();
    if (
      query === state.search.lastSearchQuery &&
      state.search.subreddits.length > 0
    ) {
      // searched for the same thing, no need to perform a new search
      console.log("Skipping search, same query", query);
      return;
    }

    dispatch({
      type: REQUEST_SEARCH_RESULTS,
      query,
    });

    const r = reddit.getSnoowrap();

    // TODO: snoowrap type is wrong, again...
    (r as any).searchSubreddits({ query }).then((results: Subreddit[]) => {
      console.log(results);

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
      console.log(results);

      dispatch({
        type: RECEIVE_POST_SEARCH,
        posts: results,
      });
    });
  };
}
