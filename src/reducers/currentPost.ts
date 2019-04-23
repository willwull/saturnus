import {
  RECEIVE_CURRENT_POST,
  REQUEST_CURRENT_POST,
  ERROR_CURRENT_POST,
} from "../actions/currentPost";
import { Submission } from "snoowrap";

// MARK: Types

type IdDateDict = {
  [key: string]: Date;
};

export type CurrentPostState = {
  postId: string;
  originalObj: Submission | null; // original snoowrap Submission
  isLoading: boolean;
  errorMsg: string | null;
  receivedAt: IdDateDict;
};

// MARK: State and reducer

const defaultState: CurrentPostState = {
  postId: "",
  originalObj: null,
  isLoading: false,
  errorMsg: null,
  receivedAt: {},
};

export default function currentPost(
  state: CurrentPostState = defaultState,
  action: any,
): CurrentPostState {
  switch (action.type) {
    case REQUEST_CURRENT_POST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
        postId: action.postId,
      };
    case RECEIVE_CURRENT_POST:
      return {
        ...state,
        isLoading: false,
        postId: (action.post as Submission).id,
        originalObj: action.post as Submission,
        receivedAt: {
          ...state.receivedAt,
          [action.post.id]: action.receivedAt,
        },
      };
    case ERROR_CURRENT_POST:
      return { ...state, isLoading: false, errorMsg: action.errorMsg };
    default:
      return state;
  }
}
