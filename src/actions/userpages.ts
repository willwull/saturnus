import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { UserState } from "../reducers/user";
import reddit from "../api/reddit";
import { RootState } from "../reducers";
import { Listing, Submission } from "snoowrap";

export const REQUEST_USER_OVERVIEW = "REQUEST_USER_OVERVIEW";
export const RECEIVE_USER_OVERVIEW = "RECEIVE_USER_OVERVIEW";
export const REQUEST_MORE_USER_OVERVIEW = "REQUEST_MORE_USER_OVERVIEW";

export function getOverviewForUser(username: string) {
  return async (dispatch: ThunkDispatch<UserState, void, Action>) => {
    dispatch({
      type: REQUEST_USER_OVERVIEW,
      username,
    });

    const r = reddit.getSnoowrap();
    const user = r.getUser(username);
    const [userInfo, postsAndComments] = await Promise.all([
      user.fetch(),
      user.getOverview(),
    ]);
    dispatch({
      type: RECEIVE_USER_OVERVIEW,
      username,
      userInfo,
      content: postsAndComments,
      hasMoreContent: !postsAndComments.isFinished,
    });
  };
}

export function fetchMoreUserContent(username: string) {
  return async (
    dispatch: ThunkDispatch<UserState, void, Action>,
    getState: () => RootState,
  ) => {
    const userOverview = getState().userpages[username];
    if (!userOverview) {
      return;
    }

    const { originalListing } = userOverview;
    dispatch({ type: REQUEST_MORE_USER_OVERVIEW, username });

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
      type: RECEIVE_USER_OVERVIEW,
      username,
      content: oldAndNewContent,
      hasMoreContent: !oldAndNewContent.isFinished,
    });
  };
}
