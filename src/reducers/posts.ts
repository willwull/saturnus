import {
  REQUEST_POSTS,
  REQUEST_MORE_POSTS,
  RECEIVE_POSTS,
  FETCH_POST_ERROR,
} from "../actions/posts";
import { POST_VOTE } from "../actions/voting";
import {
  USER_SIGN_OUT,
  RECEIVE_MY_SAVED_CONTENT,
  DID_SAVE_CONTENT,
  DID_UNSAVE_CONTENT,
} from "../actions/user";
import { Submission, Listing } from "snoowrap";
import { RECEIVE_POST_SEARCH } from "../actions/search";
import { RECEIVE_CURRENT_POST } from "../actions/currentPost";
import { contentIsPost, MixedContent } from "./user";
import { UserpagePostHelpers, UserOverviewHelpers } from "../actions/userpages";

// MARK: Types

export type PostsSortMode =
  | "best"
  | "hot"
  | "top"
  | "controversial"
  | "new"
  | "rising"
  | "";

export type PostsTimes = "all" | "hour" | "day" | "week" | "month" | "year";

export type IdPostDict = {
  [key: string]: Submission;
};

export type PostsInSubState = {
  /** items will be a list of post IDs */
  items: string[];
  /** The original listing object fetched by Snoowrap, used when fetching more */
  originalListing: Listing<Submission> | null;
  sortMode: PostsSortMode;
  time: PostsTimes;
  receivedAt: Date | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: boolean;
};

export type PostsState = {
  byId: IdPostDict;
  bySubreddit: {
    [key: string]: PostsInSubState;
  };
};

// MARK: Helper functions

export function mapPostsToId(posts: Submission[] = []): string[] {
  return posts.map((post) => post.id);
}

export function mapIdsToPosts(
  ids: string[],
  postsState: PostsState,
): Submission[] {
  return ids.map((id) => postsState.byId[id]).filter((p) => p !== undefined);
}

/**
 * Takes the old posts by ID, and returns a copy that also contains
 * the new post IDs.
 * @param oldPosts
 * @param newPosts
 */
function combineWithNewPosts(
  oldPosts: IdPostDict,
  newPosts: Submission[],
): IdPostDict {
  const newPostsObj = { ...oldPosts };
  newPosts.forEach((post) => {
    newPostsObj[post.id] = post;
  });
  return newPostsObj;
}

// MARK: State and reducers

const defaultState: PostsState = {
  byId: {},
  bySubreddit: {},
};

const defaultSubState: PostsInSubState = {
  items: [],
  originalListing: null,
  sortMode: "",
  time: "month",
  receivedAt: null,
  isLoading: false,
  isLoadingMore: false,
  error: false,
};

function postsInSubreddit(
  state: PostsInSubState = defaultSubState,
  action: any,
): PostsInSubState {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isLoading: true,
        error: false,
        sortMode: action.sortMode,
        time: action.time,
      };
    case REQUEST_MORE_POSTS:
      return { ...state, isLoadingMore: true };
    case FETCH_POST_ERROR:
      return { ...state, isLoading: false, error: true };
    case RECEIVE_POSTS:
      return {
        ...state,
        items: mapPostsToId(action.posts), // action.posts includes old and new
        originalListing: action.posts,
        receivedAt: action.receivedAt,
        isLoading: false,
        isLoadingMore: false,
      };
    default:
      return state;
  }
}

export default function posts(
  state: PostsState = defaultState,
  action: any,
): PostsState {
  const subreddit = action.subreddit || "";

  switch (action.type) {
    case RECEIVE_CURRENT_POST: {
      const newPost = action.post as Submission;
      return {
        ...state,
        byId: {
          ...state.byId,
          [newPost.id]: newPost,
        },
      };
    }
    case RECEIVE_POST_SEARCH:
      return {
        ...state,
        byId: combineWithNewPosts(state.byId, action.posts),
      };
    case UserpagePostHelpers.RECEIVE:
    case UserOverviewHelpers.RECEIVE:
    case RECEIVE_MY_SAVED_CONTENT:
      return {
        ...state,
        byId: combineWithNewPosts(
          state.byId,
          action.content.filter(contentIsPost),
        ),
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        byId: combineWithNewPosts(state.byId, action.posts),
        bySubreddit: {
          ...state.bySubreddit,
          [subreddit]: postsInSubreddit(state.bySubreddit[subreddit], action),
        },
      };
    case REQUEST_MORE_POSTS:
    case FETCH_POST_ERROR:
    case REQUEST_POSTS:
      return {
        ...state,
        bySubreddit: {
          ...state.bySubreddit,
          [subreddit]: postsInSubreddit(state.bySubreddit[subreddit], action),
        },
      };
    case POST_VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.updatedPost.id]: action.updatedPost,
        },
      };
    case DID_SAVE_CONTENT:
    case DID_UNSAVE_CONTENT: {
      const content: MixedContent = action.affectedContent;
      return {
        ...state,
        byId: {
          ...state.byId,
          [content.id]: content as Submission,
        },
      };
    }
    case USER_SIGN_OUT:
      // if the user signs out, we can clear the stored posts, since
      // we need to fetch the front page again
      return defaultState;
    default:
      return state;
  }
}
