import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../reducers";
import { Action } from "redux";
import { Listing } from "snoowrap";
import { MixedId, mapMixedContentToIds, MixedContent } from "../reducers/user";

/**
 * A function which will return a promise containing the listing for this feed.
 */
type FeedActionLoadFunction<FunctionArgs> = (
  arg: FunctionArgs,
) => Promise<{
  extraData: { [key: string]: any };
  listing: Listing<MixedContent>;
}>;

/**
 * Function to extract the original listing from the state, in order to fetch more.
 */
type FeedActionStateGetter<FunctionArgs> = (
  state: RootState,
  arg: FunctionArgs,
) => Listing<MixedContent> | null;

export type FeedActionStateData = {
  hasFetched: boolean;
  /** The original listing, used to fetch more */
  listing: Listing<MixedContent> | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMoreContent: boolean;
};

export type FeedActionState = {
  /** Content is a list of IDs */
  content: MixedId[];
  data: FeedActionStateData;
};

/**
 * A helper function to create thunk actions for Reddit feeds.
 * Will create one function for the initial fetch and one function for
 * fetching more content ("load more").
 *
 * @param actionNameSuffix The Redux action name string
 * @param loadFunc Function that returns the listing for this feed
 * @param listingGetter A function that returns the original listing for fetching more
 * @param actionExtraData Any extra data to pass to each dispatched action
 */
export function createFeedActions<FunctionArgs = void>(
  actionNameSuffix: string,
  loadFunc: FeedActionLoadFunction<FunctionArgs>,
  listingGetter: FeedActionStateGetter<FunctionArgs>,
  actionExtraData?: (arg: FunctionArgs) => { [key: string]: any },
) {
  const REQUEST_INITIAL = `REQ_INIT_${actionNameSuffix}`;
  const REQUEST_MORE = `REQ_MORE_${actionNameSuffix}`;
  const RECEIVE = `REC_${actionNameSuffix}`;

  function fetchInitial(arg: FunctionArgs) {
    return async (dispatch: ThunkDispatch<RootState, void, Action>) => {
      dispatch({
        ...actionExtraData?.(arg),
        type: REQUEST_INITIAL,
      });

      const { listing, extraData } = await loadFunc(arg);

      dispatch({
        ...actionExtraData?.(arg),
        ...extraData,
        type: RECEIVE,
        content: listing,
        hasMoreContent: !listing.isFinished,
      });
    };
  }

  function fetchMore(arg: FunctionArgs) {
    return async (
      dispatch: ThunkDispatch<RootState, void, Action>,
      getState: () => RootState,
    ) => {
      const originalListing = listingGetter(getState(), arg);

      if (!originalListing) {
        console.error(
          "Tried to fetch more saved content, but listing was null",
        );
        return;
      }

      dispatch({ ...actionExtraData?.(arg), type: REQUEST_MORE });

      const oldAndNewContent: Listing<MixedContent> = await originalListing.fetchMore(
        {
          amount: 25,
          skipReplies: true,
        },
      );

      dispatch({
        ...actionExtraData?.(arg),
        type: RECEIVE,
        content: oldAndNewContent,
        hasMoreContent: !oldAndNewContent.isFinished,
      });
    };
  }

  function requestInitialReducer(state: FeedActionState): FeedActionState {
    return {
      ...state,
      data: {
        ...state.data,
        hasFetched: true,
        isLoading: true,
      },
    };
  }

  function requestMoreReducer(state: FeedActionState): FeedActionState {
    return {
      ...state,
      data: {
        ...state.data,
        isLoadingMore: true,
      },
    };
  }

  function receiveReducer(
    state: FeedActionState,
    action: { content: Listing<MixedContent>; hasMoreContent: boolean },
  ): FeedActionState {
    return {
      ...state,
      content: mapMixedContentToIds(action.content),
      data: {
        ...state.data,
        isLoading: false,
        isLoadingMore: false,
        listing: action.content,
        hasMoreContent: action.hasMoreContent,
      },
    };
  }

  const defaultStateSlice: FeedActionState = {
    content: [],
    data: {
      hasFetched: false,
      listing: null,
      isLoading: false,
      isLoadingMore: false,
      hasMoreContent: false,
    },
  };

  return {
    fetchInitial,
    fetchMore,
    defaultStateSlice,
    REQUEST_INITIAL,
    REQUEST_MORE,
    RECEIVE,
    requestInitialReducer,
    requestMoreReducer,
    receiveReducer,
  };
}
