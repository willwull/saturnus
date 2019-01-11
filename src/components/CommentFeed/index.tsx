import React from "react";
import ContentBox from "../ContentBox";
import Comment, { CommentInterface } from "../Comment";
import { NoComments } from "./styles";
import "./CommentFeed.scss";

type Props = {
  comments: CommentInterface[];
  isModal: boolean; // just passed through to Comment
};

function CommentFeed({ comments, isModal }: Props) {
  let content;
  if (comments.length > 0) {
    content = comments.map(comment => (
      <div key={comment.id} className="comment-thread">
        <Comment comment={comment} isModal={isModal} />
      </div>
    ));
  } else {
    content = <NoComments>No comments :(</NoComments>;
  }

  return <ContentBox className="comment-feed">{content}</ContentBox>;
}

export default CommentFeed;
