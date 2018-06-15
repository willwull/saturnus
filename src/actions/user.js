import reddit from "api/reddit";
import * as LocalCache from "LocalCache";
import { initSnoowrap } from "./snoowrap";

export const USER_SIGN_OUT = "USER_SIGN_OUT";
export const SET_USER_STATUS = "SET_USER_STATUS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVED_USER = "RECEIVED_USER";

export const REQUEST_MY_SUBS = "REQUEST_MY_SUBS";
export const RECEIVE_MY_SUBS = "RECEIVE_MY_SUBS";
export const MY_SUBS_ERROR = "MY_SUBS_ERROR";

function setUser(user) {
  return { type: RECEIVED_USER, user };
}

export function fetchUser() {
  return async dispatch => {
    const r = reddit.getSnoowrap();
    dispatch({
      type: REQUEST_USER,
    });
    const user = await r.getMe();
    console.log(user);

    dispatch(setUser(user));
    return user;
  };
}

export function signOut() {
  return dispatch => {
    // clear cache so the user's saved refresh tokens are cleared
    LocalCache.clearAll();

    dispatch({
      type: USER_SIGN_OUT,
    });
    dispatch(initSnoowrap());
  };
}

export function fetchMySubs() {
  return async (dispatch, getState) => {
    dispatch({ type: REQUEST_MY_SUBS });

    try {
      const cachedSubs = LocalCache.getStoredSubs();
      if (cachedSubs) {
        console.log(cachedSubs);
        dispatch({ type: RECEIVE_MY_SUBS, subscriptions: cachedSubs });
        return;
      }

      const state = getState();
      const r = reddit.getSnoowrap();

      let subscriptions;
      if (state.user.loggedIn) {
        subscriptions = await r.getSubscriptions();
      } else {
        // get default subs if not logged in
        subscriptions = await r.getDefaultSubreddits();
      }

      subscriptions = await subscriptions.fetchAll();
      console.log(subscriptions);

      if (state.user.loggedIn) {
        // if logged in user, cache their subscriptions
        LocalCache.storeMySubs(subscriptions);
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
