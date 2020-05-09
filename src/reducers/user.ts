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
  DID_UNSAVE_CONTENT,
} from "../actions/user";
import { RedditUser, Comment, Submission, Listing } from "snoowrap";
import { SimpleSubreddit } from "../components/SubredditList";
import * as LocalCache from "../LocalCache";
import { POST_VOTE } from "../actions/voting";
import { PostsState } from "./posts";
import { CommentsState } from "./comments";
import {
  RECEIVED_SUBSCRIBE_TO_SUB,
  RECEIVED_UNSUBSCRIBE_TO_SUB,
} from "../actions/subreddits";

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
  contentIds: MixedId[];
  originalListing: Listing<Submission | Comment> | null;
  hasMoreContent: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
};

export type MixedContent = Submission | Comment;

export type MixedId = {
  type: "submission" | "comment";
  id: string;
};

// MARK: Default state

const defaultSavedContent: SavedContentState = {
  hasFetched: false,
  contentIds: [],
  originalListing: null,
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

// MARK: Helper functions

export function contentIsPost(content: MixedContent): boolean {
  return !!(content as Submission).title;
}

export function mapMixedContentToIds(content: MixedContent[]): MixedId[] {
  return content.map(obj => {
    if (contentIsPost(obj)) {
      return {
        type: "submission",
        id: obj.id,
      };
    }
    return {
      type: "comment",
      id: obj.id,
    };
  });
}

export function mapMixedIdsToContent(
  ids: MixedId[],
  posts: PostsState,
  comments: CommentsState,
): MixedContent[] {
  return ids.map(mixedId => {
    if (mixedId.type === "submission") {
      return posts.byId[mixedId.id];
    }
    return comments.byId[mixedId.id];
  });
}

// MARK: Saved content

function updateContentAfterSave(
  state: SavedContentState,
  updatedPost: Comment | Submission,
): SavedContentState {
  // saved new content, add it to our local list
  if (state.hasFetched) {
    const newId: MixedId = {
      type: "submission",
      id: updatedPost.id,
    };

    return {
      ...state,
      contentIds: [newId, ...state.contentIds],
    };
  }
  return state;
}

function savedContent(
  state = defaultSavedContent,
  action: any,
): SavedContentState {
  switch (action.type) {
    case DID_SAVE_CONTENT:
      return updateContentAfterSave(state, action.affectedContent);
    case DID_UNSAVE_CONTENT:
      return {
        ...state,
        contentIds: state.contentIds.filter(
          content => content.id !== action.affectedContent.id,
        ),
      };
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
        contentIds: mapMixedContentToIds(action.content),
        originalListing: action.content,
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
    case RECEIVED_SUBSCRIBE_TO_SUB:
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.data],
      };
    case RECEIVED_UNSUBSCRIBE_TO_SUB:
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          sub => sub.id !== action.data.id,
        ),
      };
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
    case DID_UNSAVE_CONTENT:
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
