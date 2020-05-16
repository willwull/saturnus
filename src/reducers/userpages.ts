import {
  REQUEST_USER_INFO,
  RECEIVE_USER_INFO,
  UserpagePostHelpers,
  UserOverviewHelpers,
  UserpageCommentHelpers,
} from "../actions/userpages";
import { RedditUser } from "snoowrap";
import { FeedActionState } from "../actions/utils";

type SpecificUserState = {
  hasLoaded: boolean;
  isLoadingContent: boolean;
  isLoadingMore: boolean;
  userInfo: RedditUser | null;
  overview: FeedActionState;
  posts: FeedActionState;
  comments: FeedActionState;
};

export type UserPagesState = {
  [key: string]: SpecificUserState;
};

const defaultSpecificUserState: SpecificUserState = {
  hasLoaded: false,
  isLoadingContent: false,
  isLoadingMore: false,
  userInfo: null,
  overview: UserOverviewHelpers.defaultStateSlice,
  posts: UserpagePostHelpers.defaultStateSlice,
  comments: UserpageCommentHelpers.defaultStateSlice,
};
function specificUserState(
  state = defaultSpecificUserState,
  action: any,
): SpecificUserState {
  switch (action.type) {
    case REQUEST_USER_INFO:
      return {
        ...state,
        isLoadingContent: true,
      };
    case RECEIVE_USER_INFO:
      return {
        ...state,
        hasLoaded: true,
        isLoadingContent: false,
        userInfo: action.userInfo,
      };
    case UserOverviewHelpers.REQUEST_INITIAL:
      return {
        ...state,
        overview: UserOverviewHelpers.requestInitialReducer(state.overview),
      };
    case UserOverviewHelpers.REQUEST_MORE:
      return {
        ...state,
        overview: UserOverviewHelpers.requestMoreReducer(state.overview),
      };
    case UserOverviewHelpers.RECEIVE:
      return {
        ...state,
        overview: UserOverviewHelpers.receiveReducer(state.overview, action),
      };
    case UserpagePostHelpers.REQUEST_INITIAL:
      return {
        ...state,
        posts: UserpagePostHelpers.requestInitialReducer(state.posts),
      };
    case UserpagePostHelpers.REQUEST_MORE:
      return {
        ...state,
        posts: UserpagePostHelpers.requestMoreReducer(state.posts),
      };
    case UserpagePostHelpers.RECEIVE:
      return {
        ...state,
        posts: UserpagePostHelpers.receiveReducer(state.posts, action),
      };
    case UserpageCommentHelpers.REQUEST_INITIAL:
      return {
        ...state,
        comments: UserpageCommentHelpers.requestInitialReducer(state.comments),
      };
    case UserpageCommentHelpers.REQUEST_MORE:
      return {
        ...state,
        comments: UserpageCommentHelpers.requestMoreReducer(state.comments),
      };
    case UserpageCommentHelpers.RECEIVE:
      return {
        ...state,
        comments: UserpageCommentHelpers.receiveReducer(state.comments, action),
      };
    default:
      return state;
  }
}

const defaultState: UserPagesState = {};
export default function userpages(state = defaultState, action: any) {
  switch (action.type) {
    case REQUEST_USER_INFO:
    case RECEIVE_USER_INFO:
    case UserOverviewHelpers.REQUEST_INITIAL:
    case UserOverviewHelpers.REQUEST_MORE:
    case UserOverviewHelpers.RECEIVE:
    case UserpagePostHelpers.REQUEST_INITIAL:
    case UserpagePostHelpers.REQUEST_MORE:
    case UserpagePostHelpers.RECEIVE:
    case UserpageCommentHelpers.REQUEST_INITIAL:
    case UserpageCommentHelpers.REQUEST_MORE:
    case UserpageCommentHelpers.RECEIVE:
      return {
        ...state,
        [action.username]: specificUserState(state[action.username], action),
      };
    default:
      return state;
  }
}
