import { ThunkDispatch } from "redux-thunk";
import { PostsState } from "../reducers/posts";
import { Action } from "redux";
import { Submission } from "snoowrap";

export const POST_VOTE = "POST_VOTE";

export function postVote(post: Submission, vote = "") {
  return (dispatch: ThunkDispatch<PostsState, void, Action>) => {
    const updatedPost = post;
    const oldScore = post.score;
    let newVote = post.likes;
    let newScore = oldScore;

    if (post.likes === true && vote === "up") {
      newVote = null;
      newScore = oldScore - 1;
      post.unvote();
    } else if (post.likes === false && vote === "down") {
      newVote = null;
      newScore = oldScore + 1;
      post.unvote();
    } else if (vote === "up") {
      newVote = true;
      newScore = post.likes === false ? oldScore + 2 : oldScore + 1;
      post.upvote();
    } else if (vote === "down") {
      newVote = false;
      newScore = post.likes === true ? oldScore - 2 : oldScore - 1;
      post.downvote();
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
