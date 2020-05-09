import { Comment } from "snoowrap";
import { RECEIVE_MY_SAVED_CONTENT } from "../actions/user";
import { MixedContent, contentIsPost } from "./user";
import { RECEIVE_USER_OVERVIEW } from "../actions/userpages";

// MARK: Types

type IdCommentDict = {
  [key: string]: Comment;
};

export type CommentsState = {
  byId: IdCommentDict;
};

// MARK: Helper functions

function combineWithNewContent(
  oldComments: IdCommentDict,
  newContent: MixedContent[],
): IdCommentDict {
  const newContentObj = { ...oldComments };
  newContent.forEach(postOrComment => {
    if (!contentIsPost(postOrComment)) {
      newContentObj[postOrComment.id] = postOrComment as Comment;
    }
  });
  return newContentObj;
}

// MARK: State and reducer

const defaultState: CommentsState = {
  byId: {},
};

export default function comments(
  state = defaultState,
  action: any,
): CommentsState {
  switch (action.type) {
    case RECEIVE_USER_OVERVIEW:
    case RECEIVE_MY_SAVED_CONTENT:
      return {
        ...state,
        byId: combineWithNewContent(state.byId, action.content),
      };
    default:
      return state;
  }
}
