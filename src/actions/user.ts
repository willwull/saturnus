import reddit from "../api/reddit";
import * as LocalCache from "../LocalCache";
import { initSnoowrap } from "./snoowrap";
import { ThunkDispatch } from "redux-thunk";
import { UserState } from "../reducers/user";
import { Action } from "redux";
import { RootState } from "../reducers";
import { RedditUser } from "snoowrap";

export const USER_SIGN_OUT = "USER_SIGN_OUT";
export const SET_USER_STATUS = "SET_USER_STATUS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVED_USER = "RECEIVED_USER";

export const REQUEST_MY_SUBS = "REQUEST_MY_SUBS";
export const RECEIVE_MY_SUBS = "RECEIVE_MY_SUBS";
export const MY_SUBS_ERROR = "MY_SUBS_ERROR";

export const REQUEST_MY_SAVED_CONTENT = "REQUEST_MY_SAVED_CONTENT";
export const RECEIVE_MY_SAVED_CONTENT = "RECEIVE_MY_SAVED_CONTENT";

function setUser(user: RedditUser) {
  return { type: RECEIVED_USER, user };
}

export function setUserStatus(loggedIn: boolean) {
  return {
    type: SET_USER_STATUS,
    status: loggedIn,
  };
}

export function fetchUser() {
  return (dispatch: ThunkDispatch<UserState, void, Action>) => {
    const r = reddit.getSnoowrap();
    dispatch({
      type: REQUEST_USER,
    });

    // for some reason, writing this as async triggers a TS error
    return r.getMe().then(user => {
      console.log(user);

      dispatch(setUser(user));

      LocalCache.storeLastActiveUser(user.name);

      return user;
    });
  };
}

export function signOut() {
  return (dispatch: ThunkDispatch<UserState, void, Action>) => {
    // clear cache so the user's saved refresh tokens are cleared
    LocalCache.clearSession();

    dispatch({
      type: USER_SIGN_OUT,
    });
    dispatch(initSnoowrap());
  };
}

export type SubFetchOptions = {
  skipCache: boolean;
};
export function fetchMySubs(options: SubFetchOptions = { skipCache: false }) {
  return async (
    dispatch: ThunkDispatch<UserState, void, Action>,
    getState: () => RootState,
  ) => {
    dispatch({ type: REQUEST_MY_SUBS });

    try {
      const state = getState();

      if (!options.skipCache) {
        const cachedSubs = LocalCache.getStoredSubs();
        if (cachedSubs && cachedSubs.length > 0) {
          console.log(cachedSubs);
          dispatch({ type: RECEIVE_MY_SUBS, subscriptions: cachedSubs });
          return;
        }
      }

      const r = reddit.getSnoowrap();

      let subscriptions;
      if (state.user.loggedIn) {
        subscriptions = await r.getSubscriptions();
      } else {
        // get default subs if not logged in
        console.log("User not logged in, fetching defaults");
        subscriptions = await r.getDefaultSubreddits();
      }

      subscriptions = await subscriptions.fetchAll();
      console.log(subscriptions);

      if (state.user.loggedIn) {
        // if logged in user, cache their subscriptions
        LocalCache.storeMySubs(subscriptions, (state.user.data as any).name);
      }

      dispatch({ type: RECEIVE_MY_SUBS, subscriptions });
    } catch (error) {
      console.error(error);
      dispatch({
        type: MY_SUBS_ERROR,
      });
    }
  };
}

// MARK: Saved Content

export function fetchSavedContent() {
  return async (
    dispatch: ThunkDispatch<UserState, void, Action>,
    getState: () => RootState,
  ) => {
    dispatch({ type: REQUEST_MY_SAVED_CONTENT });

    const userData = getState().user.data!;

    const content = await userData.getSavedContent();

    dispatch({
      type: RECEIVE_MY_SAVED_CONTENT,
      content,
    });
  };
}
