import {
  RECEIVE_USER_OVERVIEW,
  REQUEST_USER_OVERVIEW,
  REQUEST_MORE_USER_OVERVIEW,
} from "../actions/userpages";
import { mapMixedContentToIds, MixedId } from "./user";
import { Listing, Submission, RedditUser } from "snoowrap";

type SpecificUserState = {
  hasLoaded: boolean;
  isLoadingContent: boolean;
  isLoadingMore: boolean;
  userInfo: RedditUser | null;
  overviewContentIds: MixedId[];
  originalListing: Listing<Submission | Comment> | null;
  hasMoreContent: boolean;
};

export type UserPagesState = {
  [key: string]: SpecificUserState;
};

const defaultSpecificUserState: SpecificUserState = {
  hasLoaded: false,
  isLoadingContent: false,
  isLoadingMore: false,
  userInfo: null,
  overviewContentIds: [],
  originalListing: null,
  hasMoreContent: false,
};
function specificUserState(state = defaultSpecificUserState, action: any) {
  switch (action.type) {
    case REQUEST_USER_OVERVIEW:
      return {
        ...state,
        isLoadingContent: true,
      };
    case REQUEST_MORE_USER_OVERVIEW:
      return {
        ...state,
        isLoadingMore: true,
      };
    case RECEIVE_USER_OVERVIEW:
      return {
        ...state,
        hasLoaded: true,
        isLoadingContent: false,
        userInfo: action.userInfo,
        overviewContentIds: mapMixedContentToIds(action.content),
        originalListing: action.content,
        hasMoreContent: action.hasMoreContent,
      };
    default:
      return state;
  }
}

const defaultState: UserPagesState = {};
export default function userpages(state = defaultState, action: any) {
  switch (action.type) {
    case REQUEST_USER_OVERVIEW:
    case REQUEST_MORE_USER_OVERVIEW:
    case RECEIVE_USER_OVERVIEW:
      return {
        ...state,
        [action.username]: specificUserState(state[action.username], action),
      };
    default:
      return state;
  }
}
