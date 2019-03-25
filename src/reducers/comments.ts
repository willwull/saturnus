import { Comment } from "snoowrap";

// MARK: Types

export type CommentsState = {
  byId: {
    [key: string]: Comment;
  };
};

// MARK: State and reducer

const defaultState: CommentsState = {
  byId: {},
};

export default function comments(state = defaultState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
