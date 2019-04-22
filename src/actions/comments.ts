import { Listing, Comment } from "snoowrap";
import { ThunkDispatch } from "redux-thunk";
import { CommentsState } from "../reducers/comments";
import { Action } from "redux";

// MARK: Types

export const REQUEST_MORE_REPLIES = "REPLIES_MORE_REPLIES";
export const RECEIVE_MORE_REPLIES = "RECEIVE_MORE_REPLIES";

// MARK: Action creators

export function getMoreReplies(comment: Comment, postId: string) {
  return async (dispatch: ThunkDispatch<CommentsState, void, Action>) => {
    dispatch({
      type: REQUEST_MORE_REPLIES,
    });

    const newReplies = await comment.replies.fetchMore({ amount: 20 });
  };
}
