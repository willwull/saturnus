import reddit from "api/reddit";

export const REQUEST_SUBREDDIT = "REQUEST_SUBREDDIT";
export const RECEIVE_SUBREDDIT = "RECEIVE_SUBREDDIT";
export const SUBREDDIT_ERROR = "SUBREDDIT_ERROR";

function receiveSubreddit(subreddit, data) {
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
      console.log(stored);
      return; // no need to fetch again
    }
    try {
      const r = reddit.getSnoowrap();

      dispatch({ type: REQUEST_SUBREDDIT, subreddit });

      const data = await r.getSubreddit(subreddit).fetch();
      console.log(data);

      dispatch(receiveSubreddit(subreddit, data));
    } catch (error) {
      console.error(error);
      dispatch({ type: SUBREDDIT_ERROR });
    }
  };
}
