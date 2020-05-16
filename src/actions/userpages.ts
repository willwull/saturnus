import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { UserState } from "../reducers/user";
import reddit from "../api/reddit";
import { createFeedActions } from "./utils";

export const REQUEST_USER_INFO = "REQUEST_USER_INFO";
export const RECEIVE_USER_INFO = "RECEIVE_USER_INFO";

export function getUserInfo(username: string) {
  return async (dispatch: ThunkDispatch<UserState, void, Action>) => {
    dispatch({
      type: REQUEST_USER_INFO,
      username,
    });

    const r = reddit.getSnoowrap();
    const user = r.getUser(username);
    const [userInfo] = await Promise.all([user.fetch()]);
    dispatch({
      type: RECEIVE_USER_INFO,
      username,
      userInfo,
    });
  };
}

export const UserOverviewHelpers = createFeedActions<string>(
  "USER_PAGE_OVERVIEW",
  async (username: string) => {
    const r = reddit.getSnoowrap();
    const user = r.getUser(username);
    const userOverview = await user.getOverview();
    return {
      listing: userOverview,
      extraData: {
        username,
      },
    };
  },
  (state, username) => state.userpages[username].overview.data.listing,
  (username) => ({ username }),
);

export const UserpagePostHelpers = createFeedActions<string>(
  "USER_PAGE_POSTS",
  async (username: string) => {
    const r = reddit.getSnoowrap();
    const user = r.getUser(username);
    const posts = await user.getSubmissions();
    return {
      listing: posts,
      extraData: {
        username,
      },
    };
  },
  (state, username) => state.userpages[username].posts.data.listing,
  (username) => ({ username }),
);

export const UserpageCommentHelpers = createFeedActions<string>(
  "USER_PAGE_COMMENTS",
  async (username: string) => {
    const r = reddit.getSnoowrap();
    const user = r.getUser(username);
    const comments = await user.getComments();
    return {
      listing: comments,
      extraData: {
        username,
      },
    };
  },
  (state, username) => state.userpages[username].comments.data.listing,
  (username) => ({ username }),
);
