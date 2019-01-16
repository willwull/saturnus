import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Subreddit } from "snoowrap";
import reddit from "../api/reddit";
import { RootState } from "../reducers";

export const REQUEST_SEARCH_RESULTS = "REQUEST_SEARCH_RESULTS";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";

export function search(query: string) {
  return (
    dispatch: ThunkDispatch<any, void, Action>,
    getState: () => RootState,
  ) => {
    const state = getState();
    if (query === state.search.query) {
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
        type: RECEIVE_SEARCH_RESULTS,
        subreddits: results,
      });
    });
  };
}
