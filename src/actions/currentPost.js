import moment from "moment-mini";
import reddit from "api/reddit";

export const REQUEST_CURRENT_POST = "REQUEST_CURRENT_POST";
export const RECEIVE_CURRENT_POST = "RECEIVE_CURRENT_POST";
export const ERROR_CURRENT_POST = "ERROR_CURRENT_POST";

function shouldFetch(state, postId) {
  const {
    currentPost: { post, receivedAt },
  } = state;

  if (!post.id || post.id !== postId) return true;

  const then = moment(receivedAt);
  const diff = moment().diff(then, "minutes");
  return diff > 10;
}

export function fetchCurrentPost(postId) {
  return async (dispatch, getState) => {
    if (!shouldFetch(getState(), postId)) return;

    dispatch({
      type: REQUEST_CURRENT_POST,
      postId,
    });

    try {
      const r = reddit.getSnoowrap();
      const post = await r.getSubmission(postId).fetch();

      dispatch({
        type: RECEIVE_CURRENT_POST,
        post,
        receivedAt: Date.now(),
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: ERROR_CURRENT_POST,
        errorMsg: error.message,
      });
    }
  };
}
