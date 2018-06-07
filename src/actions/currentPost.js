export const REQUEST_CURRENT_POST = "REQUEST_CURRENT_POST";
export const RECEIVE_CURRENT_POST = "RECEIVE_CURRENT_POST";

export function fetchCurrentPost(postId) {
  return async (dispatch, getState) => {
    dispatch({
      type: REQUEST_CURRENT_POST,
      postId,
    });

    console.log("object");
    const { r } = getState().snoowrap;
    console.log(r);
    const currentPost = await r.getSubmission(postId).fetch();
    console.log(currentPost);
  };
}
