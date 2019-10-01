import React, { useState } from "react";
import { Comment as IComment } from "snoowrap";
import ContentBox from "../ContentBox";
import Comment from "../Comment";
import { NoComments } from "./styles";
import "./CommentFeed.scss";
import PrimaryButton from "../Buttons/PrimaryButton";

type Props = {
  comments: IComment[];
  isModal: boolean; // just passed through to Comment
};

const COMMENT_LIMIT_INCREMENT = 10;

function CommentFeed({ comments, isModal }: Props) {
  const [commentLimit, setCommentLimit] = useState(COMMENT_LIMIT_INCREMENT);

  function loadMore() {
    setCommentLimit(commentLimit + COMMENT_LIMIT_INCREMENT);
  }

  let content;
  if (comments.length > 0) {
    const displayedComments = comments.slice(0, commentLimit);

    content = displayedComments.map(comment => (
      <div key={comment.id} className="comment-thread">
        <Comment comment={comment} isModal={isModal} />
      </div>
    ));
  } else {
    content = <NoComments>No comments :(</NoComments>;
  }

  return (
    <ContentBox className="comment-feed">
      {content}
      {comments.length > commentLimit && (
        <PrimaryButton className="more-comments-btn" onClick={loadMore}>
          Show more comments
        </PrimaryButton>
      )}
    </ContentBox>
  );
}

export default CommentFeed;
