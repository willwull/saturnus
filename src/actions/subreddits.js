import reddit from "api/reddit";

export const REQUEST_SUBREDDIT = "REQUEST_SUBREDDIT";
export const RECEIVE_SUBREDDIT = "RECEIVE_SUBREDDIT";
export const SUBREDDIT_ERROR = "SUBREDDIT_ERROR";

function recevieSubreddit(subreddit, data) {
  return {
    type: RECEIVE_SUBREDDIT,
    subreddit,
    data,
  };
}

export function fetchSubreddit(subreddit) {
  return async (dispatch, getState) => {
    const stored = getState().subreddits[subreddit];
    if (stored) {
      dispatch(recevieSubreddit(subreddit, stored));
    }
    try {
      const r = reddit.getSnoowrap();

      dispatch({ type: REQUEST_SUBREDDIT, subreddit });

      const data = await r.getSubreddit(subreddit).fetch();
      console.log(data);

      dispatch(recevieSubreddit(subreddit, data));
    } catch (error) {
      console.error(error);
      dispatch({ type: SUBREDDIT_ERROR });
    }
  };
}
