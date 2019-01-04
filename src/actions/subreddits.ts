import reddit from "../api/reddit";
import { Subreddit } from "snoowrap";
import { ThunkDispatch } from "redux-thunk";
import { SubredditState } from "../reducers/subreddits";
import { Action } from "redux";
import { RootState } from "../reducers";

export const REQUEST_SUBREDDIT = "REQUEST_SUBREDDIT";
export const RECEIVE_SUBREDDIT = "RECEIVE_SUBREDDIT";
export const SUBREDDIT_ERROR = "SUBREDDIT_ERROR";

function receiveSubreddit(subreddit: string, data: Subreddit) {
  return {
    type: RECEIVE_SUBREDDIT,
    subreddit,
    data,
  };
}

export function fetchSubreddit(subreddit: string) {
  return (
    dispatch: ThunkDispatch<SubredditState, void, Action>,
    getState: () => RootState,
  ) => {
    const stored = getState().subreddits[subreddit];
    if (stored) {
      console.log(stored);
      return; // no need to fetch again
    }

    const r = reddit.getSnoowrap();

    dispatch({ type: REQUEST_SUBREDDIT, subreddit });

    // for some reason, writing this as async triggers a TS error
    r.getSubreddit(subreddit)
      .fetch()
      .then(data => {
        console.log(data);

        dispatch(receiveSubreddit(subreddit, data));
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: SUBREDDIT_ERROR });
      });
  };
}
