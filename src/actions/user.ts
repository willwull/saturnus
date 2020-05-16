import reddit from "../api/reddit";
import * as LocalCache from "../LocalCache";
import { initSnoowrap } from "./snoowrap";
import { ThunkDispatch } from "redux-thunk";
import { UserState } from "../reducers/user";
import { Action } from "redux";
import { RootState } from "../reducers";
import { RedditUser, Listing, Submission, Comment } from "snoowrap";

// MARK: Types

export const USER_SIGN_OUT = "USER_SIGN_OUT";
export const SET_USER_STATUS = "SET_USER_STATUS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVED_USER = "RECEIVED_USER";

export const REQUEST_MY_SUBS = "REQUEST_MY_SUBS";
export const RECEIVE_MY_SUBS = "RECEIVE_MY_SUBS";
export const MY_SUBS_ERROR = "MY_SUBS_ERROR";

export const REQUEST_MY_SAVED_CONTENT = "REQUEST_MY_SAVED_CONTENT";
export const REQUST_MORE_SAVED_CONTENT = "REQUEST_MORE_SAVED_CONTENT";
export const RECEIVE_MY_SAVED_CONTENT = "RECEIVE_MY_SAVED_CONTENT";
export const DID_SAVE_CONTENT = "DID_SAVE_CONTENT";
export const DID_UNSAVE_CONTENT = "DID_UNSAVE_CONTENT";

// MARK: Actions

function setUser(user: RedditUser) {
  return { type: RECEIVED_USER, user };
}

export function setUserStatus(loggedIn: boolean) {
  return {
    type: SET_USER_STATUS,
    status: loggedIn,
  };
}

// MARK: Thunk actions

export function fetchUser() {
  return (dispatch: ThunkDispatch<UserState, void, Action>) => {
    console.log("fetch user");
    const r = reddit.getSnoowrap();
    dispatch({
      type: REQUEST_USER,
    });

    // for some reason, writing this as async triggers a TS error
    return r.getMe().then(user => {
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
  /** Omit username if logged out */
  username?: string;
  skipCache: boolean;
};
export function fetchMySubs(options: SubFetchOptions = { skipCache: false }) {
  return async (dispatch: ThunkDispatch<UserState, void, Action>) => {
    dispatch({ type: REQUEST_MY_SUBS });

    console.log(options);

    try {
      if (!options.skipCache) {
        const cachedSubs = LocalCache.getStoredSubs();
        if (cachedSubs && cachedSubs.length > 0) {
          dispatch({ type: RECEIVE_MY_SUBS, subscriptions: cachedSubs });
          return;
        }
      }

      const r = reddit.getSnoowrap();

      let subscriptions;
      if (options.username) {
        subscriptions = await r.getSubscriptions();
      } else {
        // get default subs if not logged in
        subscriptions = await r.getDefaultSubreddits();
      }

      subscriptions = await subscriptions.fetchAll();

      if (options.username) {
        // if logged in user, cache their subscriptions
        LocalCache.storeMySubs(subscriptions, options.username);
      }

      dispatch({ type: RECEIVE_MY_SUBS, subscriptions });
    } catch (error) {
      console.error("Error when fetching subscriptions:", error);
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
      hasMoreContent: !content.isFinished,
    });
  };
}

export function fetchMoreSavedContent() {
  return async (
    dispatch: ThunkDispatch<UserState, void, Action>,
    getState: () => RootState,
  ) => {
    const { originalListing } = getState().user.savedContent;
    dispatch({ type: REQUST_MORE_SAVED_CONTENT });

    if (!originalListing) {
      console.error("Tried to fetch more saved content, but listing was null");
      return;
    }

    const oldAndNewContent: Listing<
      Comment | Submission
    > = await originalListing.fetchMore({
      amount: 25,
      skipReplies: true,
    });

    dispatch({
      type: RECEIVE_MY_SAVED_CONTENT,
      content: oldAndNewContent,
      hasMoreContent: !oldAndNewContent.isFinished,
    });
  };
}

async function saveApi(name: string, action: "save" | "unsave") {
  const r = reddit.getSnoowrap();
  try {
    await r.oauthRequest({
      uri: `/api/${action}`,
      method: "post",
      form: { id: name },
    });
  } catch (error) {
    console.error(error);
  }
}

export function saveContent(content: Submission | Comment) {
  return async (dispatch: ThunkDispatch<UserState, void, Action>) => {
    const contentCopy = { ...content };
    if (!content.saved) {
      saveApi(content.name, "save");
      contentCopy.saved = true;
      dispatch({
        type: DID_SAVE_CONTENT,
        affectedContent: contentCopy,
      });
    } else {
      saveApi(content.name, "unsave");
      contentCopy.saved = false;
      dispatch({
        type: DID_UNSAVE_CONTENT,
        affectedContent: contentCopy,
      });
    }
  };
}
