import moment from "moment-mini";
import reddit from "../api/reddit";
import { RootState } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { CurrentPostState } from "../reducers/currentPost";
import { Action } from "redux";

export const REQUEST_CURRENT_POST = "REQUEST_CURRENT_POST";
export const RECEIVE_CURRENT_POST = "RECEIVE_CURRENT_POST";
export const ERROR_CURRENT_POST = "ERROR_CURRENT_POST";

function shouldFetch(state: RootState, postId: string) {
  const {
    currentPost: { receivedAt },
  } = state;

  const previousFetchTime = receivedAt[postId];
  if (!previousFetchTime) {
    // if we haven't fetched the full post yet, we should do it
    return true;
  }

  // otherwise, we only do it if 10 minutes have passed, in order
  // to save on network requests
  const then = moment(previousFetchTime);
  const diff = moment().diff(then, "minutes");
  return diff > 10;
}

export function fetchCurrentPost(postId: string) {
  return async (
    dispatch: ThunkDispatch<CurrentPostState, void, Action>,
    getState: () => RootState,
  ) => {
    const state = getState();
    if (!shouldFetch(state, postId)) {
      dispatch({
        type: RECEIVE_CURRENT_POST,
        post: state.posts.byId[postId],
        receivedAt: state.currentPost.receivedAt[postId],
      });
      return;
    }

    dispatch({
      type: REQUEST_CURRENT_POST,
      postId,
    });

    const r = reddit.getSnoowrap();
    r.getSubmission(postId)
      .fetch()
      .then(post => {
        dispatch({
          type: RECEIVE_CURRENT_POST,
          post,
          receivedAt: Date.now(),
        });
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: ERROR_CURRENT_POST,
          errorMsg: error.message,
        });
      });
  };
}
