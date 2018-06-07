import reddit from "api/reddit";

export const REQUEST_CURRENT_POST = "REQUEST_CURRENT_POST";
export const RECEIVE_CURRENT_POST = "RECEIVE_CURRENT_POST";
export const ERROR_CURRENT_POST = "ERROR_CURRENT_POST";

export function fetchCurrentPost(postId) {
  return async dispatch => {
    dispatch({
      type: REQUEST_CURRENT_POST,
      postId,
    });

    try {
      const r = reddit.getSnoowrap();
      const post = await r.getSubmission(postId).fetch();
      console.log(post);

      dispatch({
        type: RECEIVE_CURRENT_POST,
        post,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_CURRENT_POST,
        errorMsg: error.message,
      });
    }
  };
}
