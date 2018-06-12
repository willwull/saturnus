import React from "react";
import PropTypes from "prop-types";
import ContentBox from "components/ContentBox";
import Comment from "components/Comment";
import "./CommentFeed.scss";

function CommentFeed({ comments }) {
  return (
    <ContentBox className="comment-feed">
      {comments.map(comment => (
        <div key={comment.id} className="comment-thread">
          <Comment comment={comment} />
        </div>
      ))}
    </ContentBox>
  );
}

CommentFeed.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentFeed;
