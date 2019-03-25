import {
  RECEIVED_USER,
  SET_USER_STATUS,
  REQUEST_USER,
  USER_SIGN_OUT,
  REQUEST_MY_SUBS,
  RECEIVE_MY_SUBS,
  MY_SUBS_ERROR,
  REQUEST_MY_SAVED_CONTENT,
  RECEIVE_MY_SAVED_CONTENT,
  REQUST_MORE_SAVED_CONTENT,
  DID_SAVE_CONTENT,
} from "../actions/user";
import { RedditUser, Comment, Submission } from "snoowrap";
import { SimpleSubreddit } from "../components/SubredditList";
import * as LocalCache from "../LocalCache";
import { POST_VOTE } from "../actions/voting";

// MARK: Types

export type UserState = {
  loggedIn: boolean;
  isLoading: boolean;
  data: RedditUser | null;
  subsLoading: boolean;
  subscriptions: SimpleSubreddit[];
  subsError: string | null;
  savedContent: SavedContentState;
};

export type SavedContentState = {
  hasFetched: boolean;
  content: (Comment | Submission)[];
  hasMoreContent: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
};

// MARK: Default state

const defaultSavedContent: SavedContentState = {
  hasFetched: false,
  content: [],
  hasMoreContent: true,
  isLoading: false,
  isLoadingMore: false,
};

const defaultUser: UserState = {
  loggedIn: !!LocalCache.getLastActiveUser(),
  isLoading: false,
  data: null,
  subsLoading: false,
  subscriptions: [],
  subsError: null,
  savedContent: defaultSavedContent,
};

// MARK: Saved content

function updateContentAfterVote(
  content: (Comment | Submission)[],
  updatedPost: Submission,
): (Comment | Submission)[] {
  const newContent = content.map(content => {
    if (content.id === updatedPost.id) {
      return updatedPost;
    }

    return content;
  });
  return newContent;
}

function updateContentAfterSave(
  state: SavedContentState,
  updatedPost: Comment | Submission,
  saved: boolean,
): SavedContentState {
  // saved new content, add it to our local list
  if (saved) {
    if (state.hasFetched) {
      return {
        ...state,
        content: [updatedPost, ...state.content],
      };
    }
  }

  // unsaved content, remove it from our local list
  return {
    ...state,
    content: state.content.filter(content => content.id !== updatedPost.id),
  };
}

function savedContent(
  state = defaultSavedContent,
  action: any,
): SavedContentState {
  switch (action.type) {
    case POST_VOTE:
      return {
        ...state,
        content: updateContentAfterVote(state.content, action.updatedPost),
      };
    case DID_SAVE_CONTENT:
      return updateContentAfterSave(
        state,
        action.affectedContent,
        action.saved,
      );
    case REQUEST_MY_SAVED_CONTENT:
      return {
        ...state,
        isLoading: true,
      };
    case REQUST_MORE_SAVED_CONTENT:
      return {
        ...state,
        isLoadingMore: true,
      };
    case RECEIVE_MY_SAVED_CONTENT:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false,
        hasFetched: true,
        content: action.content,
        hasMoreContent: action.hasMoreContent,
      };
    default:
      return state;
  }
}

// MARK: Main reducer

export default function user(state = defaultUser, action: any): UserState {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, isLoading: true };
    case SET_USER_STATUS:
      return { ...state, loggedIn: action.status };
    case RECEIVED_USER:
      return { ...state, loggedIn: true, isLoading: false, data: action.user };
    case USER_SIGN_OUT:
      return { ...state, loggedIn: false, isLoading: false, data: null };
    case REQUEST_MY_SUBS:
      return { ...state, subsLoading: true, subsError: null };
    case RECEIVE_MY_SUBS:
      return {
        ...state,
        subsLoading: false,
        subscriptions: action.subscriptions,
      };
    case MY_SUBS_ERROR:
      return {
        ...state,
        subsLoading: false,
        subsError: "Something went wrong",
      };
    case POST_VOTE:
    case DID_SAVE_CONTENT:
    case REQUEST_MY_SAVED_CONTENT:
    case REQUST_MORE_SAVED_CONTENT:
    case RECEIVE_MY_SAVED_CONTENT:
      return {
        ...state,
        savedContent: savedContent(state.savedContent, action),
      };
    default:
      return state;
  }
}
