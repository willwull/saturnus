import { Action } from "redux";
import { Subreddit } from "snoowrap";
import { ThunkDispatch } from "redux-thunk";

import reddit from "../api/reddit";
import * as LocalCache from "../LocalCache";
import { SubredditState } from "../reducers/subreddits";
import { RootState } from "../reducers";

// MARK: Types

export const REQUEST_SUBREDDIT = "REQUEST_SUBREDDIT";
export const RECEIVE_SUBREDDIT = "RECEIVE_SUBREDDIT";
export const SUBREDDIT_ERROR = "SUBREDDIT_ERROR";

export const REQUEST_SUBSCRIBE_TO_SUB = "REQUEST_SUBSCRIBE_TO_SUB";
export const RECEIVED_SUBSCRIBE_TO_SUB = "RECEIVED_SUBSCRIBE_TO_SUB";
export const RECEIVED_UNSUBSCRIBE_TO_SUB = "RECEIVED_UNSUBSCRIBE_TO_SUB";

// MARK: Actions

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
      return; // no need to fetch again
    }

    const r = reddit.getSnoowrap();

    dispatch({ type: REQUEST_SUBREDDIT, subreddit });

    // for some reason, writing this as async triggers a TS error
    r.getSubreddit(subreddit)
      .fetch()
      .then((data) => {
        LocalCache.storeSubredditData(data);
        dispatch(receiveSubreddit(subreddit, data));
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: SUBREDDIT_ERROR });
      });
  };
}

// MARK: Subscription actions

function subscribe(name: string, action: "sub" | "unsub") {
  const r = reddit.getSnoowrap();
  return r.oauthRequest({
    uri: "/api/subscribe",
    method: "post",
    form: {
      action,
      sr_name: name,
      ...(action === "sub" && { skip_initial_defaults: true }),
    },
  });
}

export function subscribeToSub(subreddit: Subreddit, action: "sub" | "unsub") {
  return async (
    dispatch: ThunkDispatch<SubredditState, void, Action>,
    getState: () => RootState,
  ) => {
    dispatch({
      type: REQUEST_SUBSCRIBE_TO_SUB,
      subreddit: subreddit.display_name,
      data: { ...subreddit },
    });
    try {
      await subscribe(subreddit.display_name, action);

      const type =
        action === "sub"
          ? RECEIVED_SUBSCRIBE_TO_SUB
          : RECEIVED_UNSUBSCRIBE_TO_SUB;

      dispatch({
        type,
        subreddit: subreddit.display_name,
        data: { ...subreddit, user_is_subscriber: action === "sub" },
      });

      const state = getState();
      const subscriptions = [
        ...state.user.subscriptions,
        subreddit,
      ] as Subreddit[];
      LocalCache.storeMySubs(subscriptions, (state.user.data as any).name);
    } catch (error) {
      console.error("Error when subscribing");
      console.error(error);
    }
  };
}
