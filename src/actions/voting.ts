import { ThunkDispatch } from "redux-thunk";
import { PostsState } from "../reducers/posts";
import { Action } from "redux";
import { Submission } from "snoowrap";
import reddit from "../api/reddit";
import { debounce } from "../utils";

export const POST_VOTE = "POST_VOTE";

/**
 * Vote on a post or a comment
 * @param direction 0 = unvote, 1 = upvote, -1 = downvote
 * @param name The prefixed id, e.g. t3_b4vsbb
 */
async function voteOnContent(direction: 0 | 1 | -1, name: string) {
  const r = reddit.getSnoowrap();
  try {
    await r.oauthRequest({
      uri: `/api/vote`,
      method: "post",
      form: {
        dir: direction,
        id: name,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

const debouncedVote = debounce(voteOnContent);

export function postVote(post: Submission, vote = "") {
  return (dispatch: ThunkDispatch<PostsState, void, Action>) => {
    // Since we clone the post class, we apparently lose the vote functions.
    // because of this, instead of calling Submission#upvote, we do a POST
    // request directly to the vote endpoint.
    const updatedPost = { ...post };
    const oldScore = post.score;
    let newVote = post.likes;
    let newScore = oldScore;

    if (post.likes === true && vote === "up") {
      newVote = null;
      newScore = oldScore - 1;
      debouncedVote(0, post.name);
    } else if (post.likes === false && vote === "down") {
      newVote = null;
      newScore = oldScore + 1;
      debouncedVote(0, post.name);
    } else if (vote === "up") {
      newVote = true;
      newScore = post.likes === false ? oldScore + 2 : oldScore + 1;
      debouncedVote(1, post.name);
    } else if (vote === "down") {
      newVote = false;
      newScore = post.likes === true ? oldScore - 2 : oldScore - 1;
      debouncedVote(-1, post.name);
    }

    // The reddit api for voting doesn't respond with an updated instance of the post,
    // so we optimistically assume that the vote will be succesfull and update locally.
    updatedPost.likes = newVote;
    updatedPost.score = newScore;
    dispatch({
      type: POST_VOTE,
      updatedPost,
    });
  };
}
