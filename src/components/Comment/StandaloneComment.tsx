import React from "react";
import Comment, { Props } from ".";
import { StandaloneCommentWrapper, CommentContext } from "./styles";
import { NavClickTarget } from "../Post/styles";

function StandaloneComment(props: Props) {
  const { comment } = props;
  return (
    <StandaloneCommentWrapper>
      <Comment {...props} />
      <CommentContext>
        <b>{(comment as any).link_title}</b>
        <br />
        {comment.subreddit_name_prefixed}
      </CommentContext>
      <NavClickTarget
        to={{ pathname: comment.permalink, state: { modal: true } }}
      >
        Comment permalink
      </NavClickTarget>
    </StandaloneCommentWrapper>
  );
}

export default StandaloneComment;
